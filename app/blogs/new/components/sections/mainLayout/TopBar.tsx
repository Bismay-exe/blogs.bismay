'use client'

import React from 'react'
import { Clock, FileText, CheckCircle2, Sparkles } from 'lucide-react'

interface TopBarProps {
    wordCount: number
    readingTime: number
    status: string
    isSaved: boolean
}

const TopBar: React.FC<TopBarProps> = ({ wordCount, readingTime, status, isSaved }) => {
    return (
        <div className="flex items-center justify-between py-2 border-b border-sec/15 text-xs text-sec font-mono">
            <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/15 text-accent font-semibold uppercase text-[11px] tracking-wide border border-accent/20">
                    <Sparkles size={12} />
                    Editor
                </span>
                <span className="capitalize px-2 py-0.5 rounded-md bg-fg/5 text-fg/80 border border-sec/15">
                    {status}
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <FileText size={14} />
                    <span>{wordCount} words</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{readingTime} min read</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 size={13} />
                    <span className="text-[11px]">{isSaved ? 'Auto-saved' : 'Editing...'}</span>
                </div>
            </div>
        </div>
    )
}

export default TopBar
