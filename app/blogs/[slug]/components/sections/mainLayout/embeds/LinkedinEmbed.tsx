'use client'

import React from 'react'
import { LinkedinPostCard, LinkedinProfileCard } from '@/components/blog/socials'
import { ArrowUpRight } from 'lucide-react'
import { Icon } from '@iconify-icon/react'

interface LinkedinEmbedProps {
    url: string
    variant?: 'post' | 'profile' | 'card'
}

function parseLinkedinUrl(rawUrl: string) {
    const url = rawUrl.trim()

    // 1. Post or Pulse URL
    const postMatch = url.match(/linkedin\.com\/(?:posts|feed\/update|pulse)\/([^/?#]+)/i)
    if (postMatch) {
        return {
            type: 'post' as const,
            id: postMatch[1],
            url,
        }
    }

    // 2. Profile or Company URL
    const profileMatch = url.match(/linkedin\.com\/(?:in|company)\/([^/?#]+)/i)
    if (profileMatch) {
        return {
            type: 'profile' as const,
            username: profileMatch[1],
            url,
        }
    }

    return {
        type: 'generic' as const,
        url,
    }
}

const LinkedinEmbed: React.FC<LinkedinEmbedProps> = ({ url, variant }) => {
    const parsed = parseLinkedinUrl(url)

    if (variant === 'profile' || (!variant && parsed.type === 'profile')) {
        return (
            <div className="my-7 flex justify-center w-full">
                <LinkedinProfileCard
                    name={parsed.type === 'profile' ? parsed.username.replace(/-/g, ' ') : 'Bismay'}
                    profileUrl={url}
                />
            </div>
        )
    }

    if (variant === 'post' || (!variant && parsed.type === 'post')) {
        return (
            <div className="my-7 flex justify-center w-full">
                <LinkedinPostCard postUrl={url} />
            </div>
        )
    }

    // Fallback generic aesthetic card
    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group my-7 block overflow-hidden rounded-2xl border border-sec/25 bg-fg/2 hover:border-[#0A66C2]/60 hover:bg-fg/4 p-5 sm:p-6 transition-all duration-300 shadow-md shadow-black/5 hover:shadow-xl space-y-3"
        >
            {/* Header */}
            <div className="flex items-center justify-between text-xs text-sec">
                <div className="flex items-center gap-2 font-mono">
                    <div className="w-5 h-5 rounded bg-[#0A66C2] text-white flex items-center justify-center">
                        <Icon icon="ri:linkedin-fill" width="13" />
                    </div>
                    <span className="font-semibold text-fg/90">LinkedIn</span>
                    <span>•</span>
                    <span className="text-sec">Professional Network</span>
                </div>
                <div className="flex items-center gap-1 text-[#0A66C2] font-semibold text-xs">
                    <span>View on LinkedIn</span>
                    <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300 ease-in-out" />
                </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-fg group-hover:text-[#0A66C2] transition-colors leading-snug">
                    Connect & Read on LinkedIn
                </h4>
                <p className="text-xs sm:text-sm text-sec leading-relaxed line-clamp-2">
                    Follow career updates, web development posts, and professional projects shared on LinkedIn.
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-sec/15 text-xs text-sec font-mono">
                <span className="truncate max-w-[240px] sm:max-w-md">{url.replace(/^https?:\/\//, '')}</span>
                <span className="text-fg font-medium">linkedin.com</span>
            </div>
        </a>
    )
}

export default LinkedinEmbed
