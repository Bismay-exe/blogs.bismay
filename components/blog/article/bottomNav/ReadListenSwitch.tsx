'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ReadListenSwitchProps {
    mode: 'read' | 'listen'
    onModeChange: (mode: 'read' | 'listen') => void
}

export const ReadListenSwitch: React.FC<ReadListenSwitchProps> = ({ mode, onModeChange }) => {
    return (
        <div className="relative flex items-center bg-[#1d1d1d] p-1 rounded-full border border-white/5">
            {/* Read Button */}
            <button
                onClick={() => onModeChange('read')}
                className={`relative z-10 px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                    mode === 'read' ? 'text-black font-semibold' : 'text-white/80 hover:text-white'
                }`}
            >
                {mode === 'read' && (
                    <motion.div
                        layoutId="segmented-active-pill"
                        className="absolute inset-0 bg-white rounded-full shadow-sm"
                        transition={{ type: 'spring', damping: 34, stiffness: 350 }}
                    />
                )}
                <span className="relative z-10">Read</span>
            </button>

            {/* Listen Button */}
            <button
                onClick={() => onModeChange('listen')}
                className={`relative z-10 px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                    mode === 'listen' ? 'text-black font-semibold' : 'text-white/80 hover:text-white'
                }`}
            >
                {mode === 'listen' && (
                    <motion.div
                        layoutId="segmented-active-pill"
                        className="absolute inset-0 bg-white rounded-full shadow-sm"
                        transition={{ type: 'spring', damping: 34, stiffness: 350 }}
                    />
                )}
                <span className="relative z-10">Listen</span>
            </button>
        </div>
    )
}

export default ReadListenSwitch
