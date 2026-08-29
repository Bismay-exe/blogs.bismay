'use client'

import React from 'react'
import { Clock } from 'lucide-react'

interface TimePillProps {
    timeText: string
    onToggleMode: () => void
}

export const TimePill: React.FC<TimePillProps> = ({ timeText, onToggleMode }) => {
    return (
        <button
            onClick={onToggleMode}
            className="group flex items-center gap-2 pl-3.5 pr-4 py-2 rounded-full bg-[#1d1d1d] hover:bg-[#252525] active:scale-95 transition-all text-white text-xs font-medium font-sans border border-white/5"
            title="Click to toggle time display mode"
        >
            <Clock size={15} className="text-white/90 group-hover:scale-110 transition-transform" />
            <span className="tracking-tight text-[13px] font-medium text-white">
                {timeText}
            </span>
        </button>
    )
}

export default TimePill
