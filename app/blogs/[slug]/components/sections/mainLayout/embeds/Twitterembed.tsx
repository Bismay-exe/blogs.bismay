'use client'

import React from 'react'
import { TwitterProfileCard } from '@/components/blog/socials/TwitterProfileCard'
import { TwitterPostCard } from '@/components/blog/socials/TwitterPostCard'
import { TwitterPostCard2 } from '@/components/blog/socials/TwitterPostCard2'
import { ArrowUpRight } from 'lucide-react'
import { Icon } from '@iconify-icon/react'

interface TwitterEmbedProps {
    url: string
    variant?: 'card1' | 'card2'
}

/**
 * Decodes the exact creation Date from a Twitter Snowflake ID
 */
export function getTweetDateFromId(tweetId: string): Date | null {
    try {
        const idBigInt = BigInt(tweetId)
        // Twitter Snowflake epoch: 1288834974657 ms (Nov 04, 2010)
        const timestampMs = Number((idBigInt >> BigInt(22)) + BigInt(1288834974657))
        const d = new Date(timestampMs)
        return isNaN(d.getTime()) ? null : d
    } catch {
        return null
    }
}

export function formatTweetDate(date: Date): string {
    const timeStr = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })
    const dateStr = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
    return `${timeStr} · ${dateStr}`
}

/**
 * Extracts information from Twitter / X URLs:
 * - Tweet status: https://x.com/Bismay_exe/status/2050262576093958327?s=20
 * - User profile: https://x.com/Bismay_exe
 */
function parseTwitterUrl(rawUrl: string) {
    const url = rawUrl.trim()

    // 1. Tweet / Status Post URL pattern
    const tweetRegex = /(?:twitter\.com|x\.com)\/(?:#!\/)?([^/?#]+)\/status(?:es)?\/(\d+)/i
    const tweetMatch = url.match(tweetRegex)

    if (tweetMatch) {
        return {
            type: 'tweet' as const,
            username: tweetMatch[1],
            tweetId: tweetMatch[2],
            url,
        }
    }

    // 2. User Profile URL pattern
    const profileRegex = /(?:twitter\.com|x\.com)\/(?:#!\/)?([^/?#]+)\/?(?:\?.*)?$/i
    const profileMatch = url.match(profileRegex)

    if (profileMatch) {
        const handle = profileMatch[1]
        const reservedHandles = [
            'home',
            'explore',
            'notifications',
            'messages',
            'search',
            'hashtag',
            'i',
            'settings',
            'tos',
            'privacy',
            'intent',
            'share',
        ]

        if (!reservedHandles.includes(handle.toLowerCase())) {
            return {
                type: 'profile' as const,
                username: handle,
                url,
            }
        }
    }

    return {
        type: 'generic' as const,
        url,
    }
}

const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ url, variant = 'card2' }) => {
    if (!url) return null

    const parsed = parseTwitterUrl(url)

    // A. Profile Embed (e.g. https://x.com/Bismay_exe)
    if (parsed.type === 'profile') {
        const { username } = parsed
        return (
            <div className="my-7 flex justify-center w-full">
                <TwitterProfileCard
                    username={username}
                    profileUrl={url}
                />
            </div>
        )
    }

    // B. Tweet / Post Embed (e.g. https://x.com/Bismay_exe/status/2050262576093958327)
    if (parsed.type === 'tweet') {
        const { tweetId, username } = parsed
        const tweetDate = getTweetDateFromId(tweetId)
        const timestamp = tweetDate ? formatTweetDate(tweetDate) : undefined

        return (
            <div className="my-7 flex justify-center w-full">
                {variant === 'card1' ? (
                    <TwitterPostCard
                        username={username}
                        handle={`@${username}`}
                        avatar={`https://unavatar.io/x/${username}`}
                        tweetUrl={url}
                        timestamp={timestamp}
                    />
                ) : (
                    <TwitterPostCard2
                        id={tweetId}
                        tweetUrl={url}
                    />
                )}
            </div>
        )
    }

    // C. Generic X Link Fallback
    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group my-7 block overflow-hidden rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#121212] hover:border-accent/50 p-5 sm:p-6 transition-all duration-300 shadow-md shadow-black/5 hover:shadow-xl space-y-3"
        >
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2 font-mono">
                    <div className="w-5 h-5 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                        <Icon icon="ri:twitter-x-fill" width="12" />
                    </div>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">X (Twitter)</span>
                    <span>•</span>
                    <span className="text-neutral-500">Link</span>
                </div>
                <div className="flex items-center gap-1 text-accent font-semibold text-xs">
                    <span>View on X</span>
                    <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300 ease-in-out" />
                </div>
            </div>

            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed truncate">
                {url}
            </p>
        </a>
    )
}

export default TwitterEmbed
