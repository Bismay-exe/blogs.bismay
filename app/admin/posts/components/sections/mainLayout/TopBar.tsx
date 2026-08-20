'use client'

import React from 'react'
import { Clock, FileText, CheckCircle2, Sparkles, Code2 } from 'lucide-react'

interface TopBarProps {
    wordCount: number
    readingTime: number
    status: string
    isSaved: boolean
    format?: 'markdown' | 'mdx' | 'html'
    onFormatChange?: (format: 'markdown' | 'mdx' | 'html') => void
}

const TopBar: React.FC<TopBarProps> = ({
    wordCount,
    readingTime,
    status,
    isSaved,
    format = 'markdown',
    onFormatChange,
}) => {
    return (
        <div className="flex items-center justify-between pb-2 text-xs text-sec font-mono flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/15 text-accent font-semibold uppercase text-[11px] tracking-wide border border-accent/20">
                    <Sparkles size={12} />
                    Editor
                </span>

                <span className="capitalize px-2 py-0.5 rounded-md bg-fg/5 text-fg/80 border border-sec/15">
                    {status}
                </span>

                {/* Content Format selector */}
                {onFormatChange ? (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-fg/5 border border-sec/15 text-[11px] text-sec">
                        <Code2 size={11} className="text-accent" />
                        <select
                            value={format}
                            onChange={(e) => onFormatChange(e.target.value as 'markdown' | 'mdx' | 'html')}
                            className="bg-transparent uppercase outline-none font-mono text-fg cursor-pointer"
                        >
                            <option value="markdown" className="bg-bg text-fg">Markdown</option>
                            <option value="mdx" className="bg-bg text-fg">MDX</option>
                            <option value="html" className="bg-bg text-fg">HTML</option>
                        </select>
                    </div>
                ) : (
                    <span className="uppercase px-2 py-0.5 rounded-md bg-fg/5 text-fg/80 border border-sec/15 text-[11px]">
                        {format}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
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
