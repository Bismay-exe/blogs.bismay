'use client'

import React from 'react'

const Author: React.FC = () => {
    const today = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })

    return (
        <div className="flex items-center gap-3.5 py-1">
            <div className="w-11 h-11 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-bold text-base shadow-sm">
                B
            </div>
            <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-fg text-sm">Bismay.exe</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/20">
                        Author
                    </span>
                </div>
                <p className="text-xs text-sec font-mono">{today} • React Learning Journal</p>
            </div>
        </div>
    )
}

export default Author
