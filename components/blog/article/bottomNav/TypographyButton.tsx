'use client'

import React from 'react'

interface TypographyButtonProps {
    isOpen: boolean
    onToggle: () => void
}

export const TypographyButton: React.FC<TypographyButtonProps> = ({ isOpen, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className={`w-9 h-9 rounded-full active:scale-95 transition-all flex items-center justify-center border ${
                isOpen
                    ? 'bg-white text-black border-white'
                    : 'bg-[#1d1d1d] hover:bg-[#282828] text-white border-white/5'
            }`}
            title="Customize Typography & Reading"
        >
            {/* Tt Icon */}
            <span className="font-serif text-[15px] font-medium leading-none select-none tracking-tighter">
                T<span className="text-[12px]">t</span>
            </span>
        </button>
    )
}

export default TypographyButton
