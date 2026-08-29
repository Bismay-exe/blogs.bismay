'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { FontChoice } from '@/lib/reader-settings/types'

interface TypographyBottomSheetProps {
    isOpen: boolean
    onClose: () => void
}

export const TypographyBottomSheet: React.FC<TypographyBottomSheetProps> = ({ isOpen, onClose }) => {
    const { settings, updateBodyFont } = useReaderSettings()
    const { typography } = settings

    const currentFontSize = typography.bodyFont?.bodyFontSize || typography.bodyFontSize || 17
    const currentFontChoice = typography.bodyFont?.bodyFont || typography.bodyFontChoice || 'sans'
    const currentLineHeight = typography.bodyFont?.lineHeight || typography.lineHeight || 1.77

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.96 }}
                    transition={{ type: 'spring', damping: 26, stiffness: 350 }}
                    className="pointer-events-auto w-full max-w-sm mb-3 bg-[#171717] dark:bg-[#151515] text-[#f5f5f5] rounded-3xl p-5 shadow-2xl border border-white/10 z-50 space-y-4 backdrop-blur-xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-serif font-bold px-1.5 py-0.5 rounded bg-white/10 text-white">
                                Tt
                            </span>
                            <span className="text-sm font-semibold text-white">Typography & Reading</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Font Size Adjuster */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs text-white/70">
                            <span>Text Size</span>
                            <span className="font-mono text-white/90">{currentFontSize}px</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 bg-black/40 p-1 rounded-2xl border border-white/5">
                            <button
                                onClick={() => updateBodyFont({ bodyFontSize: Math.max(14, currentFontSize - 1) })}
                                disabled={currentFontSize <= 14}
                                className="flex-1 py-2 rounded-xl text-sm font-serif font-medium bg-white/5 hover:bg-white/15 active:scale-95 disabled:opacity-30 transition-all flex items-center justify-center gap-1 text-white"
                            >
                                <span className="text-xs">A-</span>
                            </button>
                            <span className="text-xs font-mono px-3 text-white/60">
                                {currentFontSize === 17 ? 'Default' : `${currentFontSize}px`}
                            </span>
                            <button
                                onClick={() => updateBodyFont({ bodyFontSize: Math.min(26, currentFontSize + 1) })}
                                disabled={currentFontSize >= 26}
                                className="flex-1 py-2 rounded-xl text-sm font-serif font-medium bg-white/5 hover:bg-white/15 active:scale-95 disabled:opacity-30 transition-all flex items-center justify-center gap-1 text-white"
                            >
                                <span className="text-base font-bold">A+</span>
                            </button>
                        </div>
                    </div>

                    {/* Font Family Selector */}
                    <div className="space-y-2">
                        <span className="text-xs text-white/70">Typeface</span>
                        <div className="grid grid-cols-4 gap-1.5 bg-black/40 p-1 rounded-2xl border border-white/5">
                            {[
                                { id: 'sans', label: 'Sans', fontClass: 'font-sans' },
                                { id: 'serif', label: 'Serif', fontClass: 'font-serif' },
                                { id: 'inter-tight', label: 'Tight', fontClass: 'font-sans' },
                                { id: 'mono', label: 'Mono', fontClass: 'font-mono' },
                            ].map((item) => {
                                const isActive = currentFontChoice === item.id
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => updateBodyFont({ bodyFont: item.id as FontChoice })}
                                        className={`py-2 px-1 rounded-xl text-xs transition-all relative ${
                                            isActive
                                                ? 'bg-white text-black font-semibold shadow-md'
                                                : 'text-white/70 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        <span className={item.fontClass}>{item.label}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Line Spacing */}
                    <div className="space-y-2">
                        <span className="text-xs text-white/70">Line Height</span>
                        <div className="grid grid-cols-3 gap-1.5 bg-black/40 p-1 rounded-2xl border border-white/5">
                            {[
                                { label: 'Tight', value: 1.5 },
                                { label: 'Normal', value: 1.77 },
                                { label: 'Relaxed', value: 2.0 },
                            ].map((lh) => {
                                const isActive = Math.abs(currentLineHeight - lh.value) < 0.1
                                return (
                                    <button
                                        key={lh.label}
                                        onClick={() => updateBodyFont({ lineHeight: lh.value })}
                                        className={`py-1.5 rounded-xl text-xs transition-all ${
                                            isActive
                                                ? 'bg-white/20 text-white font-medium border border-white/20'
                                                : 'text-white/60 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        {lh.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default TypographyBottomSheet
