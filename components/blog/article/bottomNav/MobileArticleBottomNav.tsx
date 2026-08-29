'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { useArticleTTS } from '@/lib/hooks/useArticleTTS'
import { TimePill } from './TimePill'
import { ReadListenSwitch } from './ReadListenSwitch'
import { ThemeQuickButton } from './ThemeQuickButton'
import { TypographyButton } from './TypographyButton'
import { TypographyBottomSheet } from './TypographyBottomSheet'
import { AudioMiniPlayer } from './AudioMiniPlayer'
import { CollapsedPill } from './CollapsedPill'

export interface MobileArticleBottomNavProps {
    markdown?: string
    readingTimeMinutes?: number
    title?: string
}

export const MobileArticleBottomNav: React.FC<MobileArticleBottomNavProps> = ({
    markdown = '',
    readingTimeMinutes = 5,
    title = '',
}) => {
    const { updateAppearance } = useReaderSettings()

    // Navigation & View States
    const [mode, setMode] = useState<'read' | 'listen'>('read')
    const [timeDisplayMode, setTimeDisplayMode] = useState<'clock' | 'remaining' | 'percent'>('clock')
    const [collapsed, setCollapsed] = useState(false)
    const [typographyOpen, setTypographyOpen] = useState(false)
    const [visible, setVisible] = useState(true)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [currentTimeString, setCurrentTimeString] = useState('12:07')
    const [theme, setTheme] = useState<'dark' | 'light'>('dark')

    // TTS Hook
    const tts = useArticleTTS(markdown)

    // Current real-world time clock string
    useEffect(() => {
        const updateClock = () => {
            const now = new Date()
            const hours = String(now.getHours()).padStart(2, '0')
            const minutes = String(now.getMinutes()).padStart(2, '0')
            setCurrentTimeString(`${hours}:${minutes}`)
        }
        updateClock()
        const timer = setInterval(updateClock, 10000)
        return () => clearInterval(timer)
    }, [])

    // Track scroll progress and auto-hide toolbar on rapid downward scroll
    useEffect(() => {
        let lastY = window.scrollY
        let ticking = false

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentY = window.scrollY
                    const totalScroll = document.documentElement.scrollTop || document.body.scrollTop
                    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
                    const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0

                    setScrollProgress(Math.min(100, Math.max(0, Math.round(progress))))

                    // Auto hide when scrolling down quickly, show when scrolling up
                    if (currentY > 120) {
                        if (currentY > lastY + 12 && !typographyOpen && !tts.isPlaying) {
                            setVisible(false)
                        } else if (currentY < lastY - 6) {
                            setVisible(true)
                        }
                    } else {
                        setVisible(true)
                    }

                    lastY = currentY
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [typographyOpen, tts.isPlaying])

    // Synchronize theme with DOM
    useEffect(() => {
        const checkTheme = () => {
            const isDark = document.documentElement.classList.contains('dark')
            setTheme(isDark ? 'dark' : 'light')
        }
        checkTheme()

        const observer = new MutationObserver(checkTheme)
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
        return () => observer.disconnect()
    }, [])

    // Toggle theme
    const toggleTheme = (targetTheme?: 'dark' | 'light') => {
        const nextTheme = targetTheme || (theme === 'dark' ? 'light' : 'dark')
        setTheme(nextTheme)
        document.documentElement.classList.remove('dark', 'light')
        document.documentElement.classList.add(nextTheme)

        try {
            localStorage.setItem('theme', nextTheme)
            updateAppearance({ theme: nextTheme })
        } catch {}
    }

    // Toggle Read / Listen
    const handleModeSwitch = (newMode: 'read' | 'listen') => {
        setMode(newMode)
        if (newMode === 'listen') {
            if (!tts.isPlaying && !tts.isPaused) {
                tts.play()
            }
        } else {
            if (tts.isPlaying) {
                tts.pause()
            }
        }
    }

    // Calculate time left based on scroll progress
    const remainingMinutes = Math.max(1, Math.ceil(readingTimeMinutes * (1 - scrollProgress / 100)))

    // Formatted time text for left capsule
    const getTimeText = () => {
        if (timeDisplayMode === 'clock') {
            return currentTimeString
        }
        if (timeDisplayMode === 'remaining') {
            return `${remainingMinutes}m left`
        }
        return `${scrollProgress}%`
    }

    return (
        <div className="fixed bottom-0 inset-x-0 z-50 pointer-events-none flex flex-col items-center justify-end pb-4 sm:pb-6 px-4">
            {/* Popover Backdrop Click Away */}
            {typographyOpen && (
                <div
                    className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-[2px] pointer-events-auto z-40 transition-opacity"
                    onClick={() => setTypographyOpen(false)}
                />
            )}

            {/* Typography Popover Sheet */}
            <TypographyBottomSheet
                isOpen={typographyOpen}
                onClose={() => setTypographyOpen(false)}
            />

            {/* Audio Mini-Player (Active in Listen mode) */}
            <AudioMiniPlayer
                isOpen={mode === 'listen'}
                title={title}
                tts={tts}
            />

            {/* Main Floating Bottom Pill Bar */}
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="pointer-events-auto flex flex-col items-center"
                    >
                        {collapsed ? (
                            /* Collapsed Minimalist Pill */
                            <CollapsedPill
                                timeText={getTimeText()}
                                mode={mode}
                                onExpand={() => setCollapsed(false)}
                            />
                        ) : (
                            /* Full Bottom Bar Matching Screenshot */
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-2 sm:gap-2.5 p-1.5 rounded-full bg-[#101010]/0 zshadow-[0_12px_40px_rgba(0,0,0,0.45)] zborder border-white/15 zbackdrop-blur-2xl">
                                    {/* 1. Left Pill: Clock & Reading Time */}
                                    <TimePill
                                        timeText={getTimeText()}
                                        onToggleMode={() =>
                                            setTimeDisplayMode((prev) =>
                                                prev === 'clock' ? 'remaining' : prev === 'remaining' ? 'percent' : 'clock'
                                            )
                                        }
                                    />

                                    {/* 2. Center Pill: Read / Listen Segmented Switch */}
                                    <ReadListenSwitch
                                        mode={mode}
                                        onModeChange={handleModeSwitch}
                                    />

                                    {/* 3. Right Button 1: Theme / Brightness Icon */}
                                    <ThemeQuickButton
                                        theme={theme}
                                        onToggle={() => toggleTheme()}
                                    />

                                    {/* 4. Right Button 2: Typography Tt Icon */}
                                    <TypographyButton
                                        isOpen={typographyOpen}
                                        onToggle={() => setTypographyOpen((prev) => !prev)}
                                    />
                                </div>

                                {/* 5. Bottom Collapse Chevron */}
                                <button
                                    onClick={() => setCollapsed(true)}
                                    className="p-1 mt-1 text-white/50 hover:text-white transition-colors active:scale-95"
                                    title="Collapse toolbar"
                                >
                                    <ChevronDown size={15} />
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default MobileArticleBottomNav
