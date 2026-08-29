'use client'

import React from 'react'

interface ThemeQuickButtonProps {
    theme: 'dark' | 'light'
    onToggle: () => void
}

export const ThemeQuickButton: React.FC<ThemeQuickButtonProps> = ({ theme, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className="w-9 h-9 rounded-full bg-[#1d1d1d] hover:bg-[#282828] active:scale-95 text-white flex items-center justify-center transition-all border border-white/5"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
        >
            {/* Stylized Sun/Brightness Icon matching screenshot */}
            <svg
                className="w-4.5 h-4.5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
            </svg>
        </button>
    )
}

export default ThemeQuickButton
