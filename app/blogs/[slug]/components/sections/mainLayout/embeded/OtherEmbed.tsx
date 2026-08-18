'use client'

import React from 'react'
import { ArrowUpRight, Globe } from 'lucide-react'

interface OtherEmbedProps {
    url: string
}

const OtherEmbed: React.FC<OtherEmbedProps> = ({ url }) => {
    let hostname = 'External Link'
    try {
        hostname = new URL(url).hostname
    } catch {
        hostname = url.replace(/^https?:\/\//, '').split('/')[0] || 'link'
    }

    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group my-7 block overflow-hidden rounded-2xl border border-sec/25 bg-fg/2 hover:bg-fg/4 hover:border-accent/50 p-5 sm:p-6 transition-all duration-300 shadow-sm hover:shadow-md"
        >
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-sec font-mono">
                        <Globe size={13} />
                        <span className="font-semibold text-fg/80">{hostname}</span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-fg group-hover:text-accent transition-colors line-clamp-1">
                        {url}
                    </p>
                </div>
                <ArrowUpRight size={14} className='group-hover:rotate-45 transition-transform duration-300 ease-in-out' />
            </div>
        </a>
    )
}

export default OtherEmbed
