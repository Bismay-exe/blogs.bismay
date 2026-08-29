'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export interface TTSState {
    isPlaying: boolean
    isPaused: boolean
    progress: number // 0 to 100
    currentParagraphIndex: number
    rate: number // 0.75, 1, 1.25, 1.5, 2
    supported: boolean
    voices: SpeechSynthesisVoice[]
    selectedVoice: SpeechSynthesisVoice | null
}

export function useArticleTTS(markdown: string) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [progress, setProgress] = useState(0)
    const [rate, setRateState] = useState<number>(1)
    const [supported, setSupported] = useState(false)
    const [currentChunkIndex, setCurrentChunkIndex] = useState(0)
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)

    const chunksRef = useRef<string[]>([])
    const currentChunkIndexRef = useRef(0)
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
    const rateRef = useRef(rate)
    rateRef.current = rate

    // Extract clean readable text from markdown
    const cleanMarkdown = useCallback((md: string): string[] => {
        if (!md) return []

        const cleaned = md
            // Remove code blocks
            .replace(/```[\s\S]*?```/g, '')
            // Remove inline code
            .replace(/`([^`]+)`/g, '$1')
            // Remove markdown links but keep text
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            // Remove images
            .replace(/!\[.*?\]\(.*?\)/g, '')
            // Remove HTML tags
            .replace(/<[^>]*>/g, '')
            // Remove headings markers
            .replace(/^#{1,6}\s+/gm, '')
            // Remove blockquotes
            .replace(/^>\s+/gm, '')
            // Remove list bullet markers
            .replace(/^[\*\-+]\s+/gm, '')
            .replace(/^\d+\.\s+/gm, '')
            // Remove horizontal rules
            .replace(/^[-*_]{3,}\s*$/gm, '')

        // Split into reasonable speech sentences/paragraphs
        const rawParagraphs = cleaned
            .split(/\n\s*\n/)
            .map((p) => p.replace(/\s+/g, ' ').trim())
            .filter((p) => p.length > 0)

        // Further split long paragraphs into sentences so speech synthesis doesn't cut off
        const resultChunks: string[] = []
        for (const para of rawParagraphs) {
            // Split by sentence boundaries while keeping sentences reasonable in length
            const sentences = para.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [para]
            for (const s of sentences) {
                const trimmed = s.trim()
                if (trimmed.length > 0) {
                    resultChunks.push(trimmed)
                }
            }
        }

        return resultChunks
    }, [])

    // Initialize Web Speech API & load voices
    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            setSupported(true)

            const loadVoices = () => {
                const availableVoices = window.speechSynthesis.getVoices()
                setVoices(availableVoices)

                // Pick a natural English voice if available
                const preferredVoice =
                    availableVoices.find(
                        (v) =>
                            v.lang.startsWith('en') &&
                            (v.name.includes('Natural') ||
                                v.name.includes('Enhanced') ||
                                v.name.includes('Google') ||
                                v.name.includes('Samantha') ||
                                v.name.includes('Daniel') ||
                                v.name.includes('Karen') ||
                                v.name.includes('Premium'))
                    ) ||
                    availableVoices.find((v) => v.lang.startsWith('en')) ||
                    availableVoices[0] ||
                    null

                setSelectedVoice(preferredVoice)
            }

            loadVoices()
            window.speechSynthesis.onvoiceschanged = loadVoices
        }

        return () => {
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel()
            }
        }
    }, [])

    // Prepare chunks when markdown changes
    useEffect(() => {
        chunksRef.current = cleanMarkdown(markdown)
    }, [markdown, cleanMarkdown])

    const speakChunk = useCallback(
        (index: number) => {
            if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
            const chunks = chunksRef.current
            if (index < 0 || index >= chunks.length) {
                // Done playing
                setIsPlaying(false)
                setIsPaused(false)
                setProgress(100)
                setCurrentChunkIndex(0)
                currentChunkIndexRef.current = 0
                return
            }

            window.speechSynthesis.cancel()

            currentChunkIndexRef.current = index
            setCurrentChunkIndex(index)
            const currentProgress = Math.round(((index + 1) / chunks.length) * 100)
            setProgress(currentProgress)

            const text = chunks[index]
            const utterance = new SpeechSynthesisUtterance(text)
            utteranceRef.current = utterance

            if (selectedVoice) {
                utterance.voice = selectedVoice
            }
            utterance.rate = rateRef.current

            utterance.onend = () => {
                if (isPlaying && !isPaused) {
                    speakChunk(index + 1)
                }
            }

            utterance.onerror = (e) => {
                if (e.error !== 'canceled' && e.error !== 'interrupted') {
                    console.warn('Speech synthesis error:', e)
                    if (isPlaying && !isPaused) {
                        speakChunk(index + 1)
                    }
                }
            }

            window.speechSynthesis.speak(utterance)
        },
        [selectedVoice, isPlaying, isPaused]
    )

    const play = useCallback(() => {
        if (!supported) return

        if (isPaused) {
            window.speechSynthesis.resume()
            setIsPaused(false)
            setIsPlaying(true)
            return
        }

        setIsPlaying(true)
        setIsPaused(false)
        speakChunk(currentChunkIndexRef.current)
    }, [supported, isPaused, speakChunk])

    const pause = useCallback(() => {
        if (!supported) return
        window.speechSynthesis.pause()
        setIsPaused(true)
    }, [supported])

    const stop = useCallback(() => {
        if (!supported) return
        window.speechSynthesis.cancel()
        setIsPlaying(false)
        setIsPaused(false)
        setProgress(0)
        setCurrentChunkIndex(0)
        currentChunkIndexRef.current = 0
    }, [supported])

    const skipForward = useCallback(() => {
        const next = Math.min(chunksRef.current.length - 1, currentChunkIndexRef.current + 2)
        speakChunk(next)
    }, [speakChunk])

    const skipBackward = useCallback(() => {
        const prev = Math.max(0, currentChunkIndexRef.current - 2)
        speakChunk(prev)
    }, [speakChunk])

    const setRate = useCallback(
        (newRate: number) => {
            setRateState(newRate)
            rateRef.current = newRate
            if (isPlaying && !isPaused) {
                // Restart current chunk with new rate
                speakChunk(currentChunkIndexRef.current)
            }
        },
        [isPlaying, isPaused, speakChunk]
    )

    return {
        isPlaying,
        isPaused,
        progress,
        rate,
        supported,
        currentChunkIndex,
        totalChunks: chunksRef.current.length,
        play,
        pause,
        stop,
        skipForward,
        skipBackward,
        setRate,
        voices,
        selectedVoice,
        setSelectedVoice,
    }
}
