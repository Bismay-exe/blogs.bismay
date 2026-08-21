'use client'

import React, { useState, useRef, useMemo } from 'react'
import { Plus, X, Hash, Sparkles } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export interface AnimatedTagsProps {
    className?: string
    initialTags?: string[]
    selectedTags?: string[]
    onChange?: (selected: string[]) => void
    placeholder?: string
    maxTags?: number
    label?: string
}

const DEFAULT_SUGGESTIONS = [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Tailwind',
    'CSS',
    'Hooks',
    'State',
    'WebDev',
    'Frontend',
    'Architecture',
    'Performance',
    'FullStack',
    'Node.js',
    'Design',
]

export default function AnimatedTags({
    initialTags = DEFAULT_SUGGESTIONS,
    selectedTags: controlledSelectedTags,
    onChange,
    className = '',
    placeholder = 'Type custom tag and press Enter...',
    label = 'Article Tags',
}: AnimatedTagsProps) {
    const [internalSelected, setInternalSelected] = useState<string[]>([])
    const [inputValue, setInputValue] = useState('')
    const [customPool, setCustomPool] = useState<string[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const shouldReduceMotion = useReducedMotion()

    const selectedTags = controlledSelectedTags ?? internalSelected

    // Pool of all available tags (initial suggestions + custom added tags)
    const allAvailableTags = useMemo(() => {
        const set = new Set([...initialTags, ...customPool])
        return Array.from(set)
    }, [initialTags, customPool])

    // Available unselected tags
    const unselectedTags = useMemo(() => {
        return allAvailableTags.filter(
            (tag) => !selectedTags.some((s) => s.toLowerCase() === tag.toLowerCase())
        )
    }, [allAvailableTags, selectedTags])

    // Filter suggestions based on typed input if typing
    const filteredSuggestions = useMemo(() => {
        if (!inputValue.trim()) return unselectedTags
        const query = inputValue.trim().toLowerCase()
        return unselectedTags.filter((t) => t.toLowerCase().includes(query))
    }, [unselectedTags, inputValue])

    const updateTags = (newTags: string[]) => {
        if (onChange) {
            onChange(newTags)
        } else {
            setInternalSelected(newTags)
        }
    }

    const handleAddTag = (tagToAdd: string) => {
        const clean = tagToAdd.trim().replace(/^#+/, '')
        if (!clean) return

        // Prevent duplicates (case-insensitive)
        if (selectedTags.some((t) => t.toLowerCase() === clean.toLowerCase())) {
            setInputValue('')
            return
        }

        // Remember custom tag in pool if not already in initial
        if (!allAvailableTags.some((t) => t.toLowerCase() === clean.toLowerCase())) {
            setCustomPool((prev) => [...prev, clean])
        }

        updateTags([...selectedTags, clean])
        setInputValue('')
        inputRef.current?.focus()
    }

    const handleRemoveTag = (tagToRemove: string) => {
        const newSelected = selectedTags.filter(
            (t) => t.toLowerCase() !== tagToRemove.toLowerCase()
        )
        updateTags(newSelected)
        inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            if (inputValue.trim()) {
                handleAddTag(inputValue)
            }
        } else if (e.key === 'Backspace' && !inputValue && selectedTags.length > 0) {
            handleRemoveTag(selectedTags[selectedTags.length - 1])
        }
    }

    return (
        <div className={`w-full flex flex-col gap-3 ${className}`}>
            {/* Input & Selected Tags Container */}
            <div className="flex flex-col gap-1.5">
                {label && (
                    <div className="flex items-center justify-between text-xs font-mono text-sec">
                        <span className="flex items-center gap-1.5 font-semibold text-fg">
                            <Hash size={13} className="text-accent" />
                            {label}
                        </span>
                        <span>{selectedTags.length} selected</span>
                    </div>
                )}

                <div
                    onClick={() => inputRef.current?.focus()}
                    className="flex min-h-[46px] w-full flex-wrap items-center gap-1.5 rounded-2xl border border-sec/20 bg-fg/2 p-2 focus-within:border-accent/60 focus-within:bg-fg/3 transition-all cursor-text shadow-2xs"
                >
                    <AnimatePresence mode="popLayout">
                        {selectedTags.map((tag) => (
                            <motion.div
                                key={tag}
                                layout
                                initial={
                                    shouldReduceMotion
                                        ? { opacity: 1 }
                                        : { opacity: 0, scale: 0.8, y: 8 }
                                }
                                animate={
                                    shouldReduceMotion
                                        ? { opacity: 1 }
                                        : { opacity: 1, scale: 1, y: 0 }
                                }
                                exit={
                                    shouldReduceMotion
                                        ? { opacity: 0 }
                                        : { opacity: 0, scale: 0.8, y: -8, filter: 'blur(4px)' }
                                }
                                transition={
                                    shouldReduceMotion
                                        ? { duration: 0 }
                                        : { type: 'spring', stiffness: 500, damping: 30 }
                                }
                                className="group flex items-center gap-1.5 rounded-xl bg-accent/15 border border-accent/30 text-fg px-2.5 py-1 text-xs font-mono font-medium select-none shadow-xs"
                            >
                                <span className="text-accent">#</span>
                                <span>{tag}</span>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleRemoveTag(tag)
                                    }}
                                    className="text-sec hover:text-rose-400 p-0.5 rounded-md hover:bg-rose-500/10 transition-colors cursor-pointer"
                                    title={`Remove #${tag}`}
                                >
                                    <X size={12} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Integrated Custom Tag Input */}
                    <div className="flex items-center flex-1 min-w-[150px] gap-1 px-1">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={
                                selectedTags.length === 0
                                    ? placeholder
                                    : 'Add more tags...'
                            }
                            className="w-full bg-transparent outline-none text-xs font-mono text-fg placeholder:text-sec/40 py-1"
                        />

                        {inputValue.trim() && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleAddTag(inputValue)
                                }}
                                className="px-2 py-0.5 rounded-lg bg-accent text-black font-bold text-xs font-mono hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                            >
                                + Add
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Suggested / Available Tags Chips */}
            {filteredSuggestions.length > 0 && (
                <div className="space-y-1.5 pt-0.5">
                    <div className="flex items-center gap-1 text-[11px] font-mono text-sec">
                        <Sparkles size={11} className="text-accent" />
                        <span>Suggested Tags (click to add):</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                        <AnimatePresence mode="popLayout">
                            {filteredSuggestions.slice(0, 12).map((tag) => (
                                <motion.button
                                    key={tag}
                                    type="button"
                                    layout
                                    initial={
                                        shouldReduceMotion
                                            ? { opacity: 1 }
                                            : { opacity: 0, scale: 0.85 }
                                    }
                                    animate={
                                        shouldReduceMotion
                                            ? { opacity: 1 }
                                            : { opacity: 1, scale: 1 }
                                    }
                                    exit={
                                        shouldReduceMotion
                                            ? { opacity: 0 }
                                            : { opacity: 0, scale: 0.85, filter: 'blur(3px)' }
                                    }
                                    transition={
                                        shouldReduceMotion
                                            ? { duration: 0 }
                                            : { type: 'spring', stiffness: 450, damping: 28 }
                                    }
                                    onClick={() => handleAddTag(tag)}
                                    className="group flex items-center gap-1 rounded-xl border border-sec/15 bg-fg/3 hover:bg-fg/8 hover:border-accent/40 px-2.5 py-1 text-xs font-mono text-sec hover:text-fg transition-colors cursor-pointer"
                                >
                                    <span>#{tag}</span>
                                    <Plus
                                        size={12}
                                        className="text-sec group-hover:text-accent transition-transform group-hover:scale-110"
                                    />
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    )
}
