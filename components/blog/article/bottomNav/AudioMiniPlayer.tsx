'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, RotateCcw, RotateCw, Play, Pause } from 'lucide-react'
import { useArticleTTS } from '@/lib/hooks/useArticleTTS'

interface AudioMiniPlayerProps {
    isOpen: boolean
    title?: string
    tts: ReturnType<typeof useArticleTTS>
}

export const AudioMiniPlayer: React.FC<AudioMiniPlayerProps> = ({ isOpen, title, tts }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                    className="pointer-events-auto w-full max-w-sm mb-3 bg-[#141414] dark:bg-[#111111] text-white rounded-3xl p-4 shadow-2xl border border-white/15 z-40 backdrop-blur-xl space-y-3"
                >
                    {/* Audio Header & Progress */}
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                            <div className="w-7 h-7 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
                                <Volume2 size={14} className={tts.isPlaying ? 'animate-pulse' : ''} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold truncate text-white/90">
                                    {title || 'Article Narration'}
                                </p>
                                <p className="text-[10px] text-white/50 font-mono">
                                    Section {tts.currentChunkIndex + 1} of {Math.max(1, tts.totalChunks)} · {tts.progress}%
                                </p>
                            </div>
                        </div>

                        {/* Speed Multiplier Pill */}
                        <div className="flex items-center gap-1">
                            {[1, 1.25, 1.5, 2].map((sp) => (
                                <button
                                    key={sp}
                                    onClick={() => tts.setRate(sp)}
                                    className={`px-1.5 py-0.5 rounded-lg text-[10px] font-mono transition-all ${
                                        tts.rate === sp
                                            ? 'bg-white text-black font-bold'
                                            : 'text-white/60 hover:text-white bg-white/5'
                                    }`}
                                >
                                    {sp}x
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                            className="bg-linear-to-r from-accent to-purple-400 h-full transition-all duration-300 rounded-full"
                            style={{ width: `${tts.progress}%` }}
                        />
                    </div>

                    {/* Player Controls */}
                    <div className="flex items-center justify-center gap-6 pt-1">
                        <button
                            onClick={tts.skipBackward}
                            className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            title="Rewind"
                        >
                            <RotateCcw size={18} />
                        </button>

                        <button
                            onClick={tts.isPlaying ? tts.pause : tts.play}
                            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
                        >
                            {tts.isPlaying ? <Pause size={20} className="fill-black" /> : <Play size={20} className="fill-black ml-0.5" />}
                        </button>

                        <button
                            onClick={tts.skipForward}
                            className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            title="Forward"
                        >
                            <RotateCw size={18} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AudioMiniPlayer
