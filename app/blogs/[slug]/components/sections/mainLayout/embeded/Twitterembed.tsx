'use client'

import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Icon } from '@iconify-icon/react'

interface TwitterEmbedProps {
    url: string
}

const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ url }) => {
    const handleMatch = url.match(/(?:twitter\.com|x\.com)\/([^/]+)/)
    const handle = handleMatch ? handleMatch[1] : 'user'

    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group my-7 block overflow-hidden rounded-2xl border border-sec/25 bg-fg/2 hover:border-accent/50 hover:bg-fg/4 p-5 sm:p-6 transition-all duration-300 shadow-md shadow-black/5 hover:shadow-xl space-y-3"
        >
            {/* Header with X Logo */}
            <div className="flex items-center justify-between text-xs text-sec">
                <div className="flex items-center gap-2 font-mono">
                    <div className="w-5 h-5 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                        <Icon icon="ri:twitter-x-fill" width="12" />
                    </div>
                    <span className="font-semibold text-fg/90">X (Twitter)</span>
                    <span>•</span>
                    <span className="text-sec">Post</span>
                </div>
                <div className="flex items-center gap-1 text-accent font-semibold text-xs">
                    <span>View on X</span>
                    <ArrowUpRight size={14} className='group-hover:rotate-45 transition-transform duration-300 ease-in-out' />
                </div>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-bold">
                    {handle.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h4 className="font-bold text-fg group-hover:text-accent transition-colors leading-tight">
                        @{handle}
                    </h4>
                    <p className="text-xs text-sec font-mono">x.com/{handle}</p>
                </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-sec leading-relaxed line-clamp-3">
                View this update, thread, and conversation directly on X.
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-sec/15 text-xs text-sec font-mono">
                <span className="truncate max-w-[240px] sm:max-w-md">{url.replace(/^https?:\/\//, '')}</span>
                <span className="text-fg font-medium">x.com</span>
            </div>
        </a>
    )
}

export default TwitterEmbed
