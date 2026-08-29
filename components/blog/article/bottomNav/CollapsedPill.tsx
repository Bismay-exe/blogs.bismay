'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, ChevronUp } from 'lucide-react'

interface CollapsedPillProps {
    timeText: string
    mode: 'read' | 'listen'
    onExpand: () => void
}

export const CollapsedPill: React.FC<CollapsedPillProps> = ({ timeText, mode, onExpand }) => {
    return (
        <motion.button
            onClick={onExpand}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#121212] text-white text-xs font-mono shadow-2xl border border-white/20 hover:border-white/40 transition-all backdrop-blur-lg"
        >
            <Clock size={13} className="text-white/80" />
            <span>{timeText}</span>
            <div className="w-1 h-1 rounded-full bg-white/40" />
            <span className="capitalize">{mode}</span>
            <ChevronUp size={14} className="text-white/60 ml-1" />
        </motion.button>
    )
}

export default CollapsedPill
