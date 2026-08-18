'use client'

import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Icon } from '@iconify-icon/react'

interface MediumEmbedProps {
    url: string
}

const MediumEmbed: React.FC<MediumEmbedProps> = ({ url }) => {
    const parts = url.split('/')
    const rawSlug = parts[parts.length - 1] || ''
    const cleanSlug = rawSlug.replace(/-[a-z0-9]{8,16}$/, '')
    const titleWords = cleanSlug
        .split('-')
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')

    const title = titleWords.length > 5 ? titleWords : 'Medium Story'

    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group my-7 block overflow-hidden rounded-2xl border border-sec/25 bg-fg/2 hover:border-accent/50 hover:bg-fg/4 p-5 sm:p-6 transition-all duration-300 shadow-md shadow-black/5 hover:shadow-xl space-y-3"
        >
            {/* Header */}
            <div className="flex items-center justify-between text-xs text-sec">
                <div className="flex items-center gap-2 font-mono">
                    <div className="w-5 h-5 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                        <Icon icon="ri:medium-fill" width="13" />
                    </div>
                    <span className="font-semibold text-fg/90">Medium</span>
                    <span>•</span>
                    <span className="text-sec">Publication</span>
                </div>
                <div className="flex items-center gap-1 text-accent font-semibold text-xs">
                    <span>Read on Medium</span>
                    <ArrowUpRight size={14} className='group-hover:rotate-45 transition-transform duration-300 ease-in-out' />
                </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-1">
                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-fg group-hover:text-accent transition-colors leading-snug">
                    {title}
                </h4>
                <p className="text-xs sm:text-sm text-sec leading-relaxed line-clamp-2">
                    Read the complete deep dive article, technical breakdown, and code examples published on Medium.
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-sec/15 text-xs text-sec font-mono">
                <span className="truncate max-w-[240px] sm:max-w-md">{url.replace(/^https?:\/\//, '')}</span>
                <span className="text-fg font-medium">medium.com</span>
            </div>
        </a>
    )
}

export default MediumEmbed
