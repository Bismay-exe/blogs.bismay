'use client'

import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Icon } from '@iconify-icon/react'

interface DevtoEmbedProps {
    url: string
}

const DevtoEmbed: React.FC<DevtoEmbedProps> = ({ url }) => {
    const parts = url.split('/')
    const rawSlug = parts[parts.length - 1] || ''
    const cleanSlug = rawSlug.replace(/-[a-z0-9]{4,6}$/, '')
    const titleWords = cleanSlug
        .split('-')
        .filter(Boolean)
        .map((w) => {
            if (w.toLowerCase() === 'crud') return 'CRUD'
            if (w.toLowerCase() === 'api') return 'API'
            if (w.toLowerCase() === 'ui') return 'UI'
            if (w.toLowerCase() === 'jsx') return 'JSX'
            if (w.toLowerCase() === 'dom') return 'DOM'
            return w.charAt(0).toUpperCase() + w.slice(1)
        })
        .join(' ')

    const title = titleWords.length > 5 ? titleWords : 'Dev.to Journal Post'
    const description =
        'A comprehensive hands-on journal covering React fundamentals, architecture breakdowns, state management, and real-world project experiments.'

    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group my-7 block overflow-hidden rounded-2xl border border-sec/25 bg-fg/2 hover:border-accent/50 hover:bg-fg/4 transition-all duration-300 shadow-md shadow-black/5 hover:shadow-xl"
        >
            <div className="p-5 sm:p-6 space-y-3">
                {/* Site name & Favicon */}
                <div className="flex items-center justify-between text-xs text-sec">
                    <div className="flex items-center gap-2 font-mono">
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black dark:bg-white text-white dark:text-black font-bold text-[10px]">
                            <Icon icon="fa-brands:dev" width="13" />
                            DEV
                        </span>
                        <span className="font-semibold text-fg/90">dev.to</span>
                        <span>•</span>
                        <span className="text-sec">Article</span>
                    </div>
                    <div className="flex items-center gap-1 text-accent font-semibold text-xs">
                        <span>Read on DEV</span>
                        <ArrowUpRight size={14} className='group-hover:rotate-45 transition-transform duration-300 ease-in-out' />
                    </div>
                </div>

                {/* OG Title */}
                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-fg group-hover:text-accent transition-colors leading-snug">
                    {title}
                </h4>

                {/* OG Description */}
                <p className="text-xs sm:text-sm text-sec leading-relaxed line-clamp-3">
                    {description}
                </p>

                {/* Author & Canonical URL Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-sec/15 text-xs text-sec font-mono">
                    <span className="truncate max-w-[240px] sm:max-w-md">{url.replace(/^https?:\/\//, '')}</span>
                    <span className="text-fg font-medium">by Bismay.exe</span>
                </div>
            </div>
        </a>
    )
}

export default DevtoEmbed
