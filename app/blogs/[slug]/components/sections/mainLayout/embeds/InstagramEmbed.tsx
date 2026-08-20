'use client'

import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Icon } from '@iconify-icon/react'

interface InstagramEmbedProps {
    url: string
}

const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ url }) => {
    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group my-7 block overflow-hidden rounded-2xl border border-sec/25 bg-fg/2 hover:border-rose-500/50 hover:bg-fg/4 p-5 sm:p-6 transition-all duration-300 shadow-md shadow-black/5 hover:shadow-xl space-y-3"
        >
            {/* Header */}
            <div className="flex items-center justify-between text-xs text-sec">
                <div className="flex items-center gap-2 font-mono">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center">
                        <Icon icon="ri:instagram-line" width="13" />
                    </div>
                    <span className="font-semibold text-fg/90">Instagram</span>
                    <span>•</span>
                    <span className="text-sec">Media</span>
                </div>
                <div className="flex items-center gap-1 text-rose-400 font-semibold text-xs---">
                    <span>View on Instagram</span>
                    <ArrowUpRight size={14} className='group-hover:rotate-45 transition-transform duration-300 ease-in-out' />
                </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-fg group-hover:text-rose-400 transition-colors leading-snug">
                    View Post & Stories on Instagram
                </h4>
                <p className="text-xs sm:text-sm text-sec leading-relaxed line-clamp-2">
                    Visual code snippets, behind-the-scenes dev stories, and UI reels.
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-sec/15 text-xs text-sec font-mono">
                <span className="truncate max-w-[240px] sm:max-w-md">{url.replace(/^https?:\/\//, '')}</span>
                <span className="text-fg font-medium">instagram.com</span>
            </div>
        </a>
    )
}

export default InstagramEmbed
