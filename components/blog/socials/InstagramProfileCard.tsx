'use client'

import React, { forwardRef, useState, useEffect, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Link as LinkIcon, ArrowUpRight, Grid } from 'lucide-react'
import { Icon } from '@iconify-icon/react'

export type InstagramProfileCardProps = Readonly<
    {
        username?: string
        name?: string
        avatar?: string
        avatarAlt?: string
        category?: string
        bio?: string
        website?: string
        postsCount?: number | string
        followersCount?: number | string
        followingCount?: number | string
        isVerified?: boolean
        profileUrl?: string
        recentPosts?: string[]
        followLabel?: string
        followButton?: ReactNode
        onFollow?: () => void
    } & ComponentPropsWithoutRef<'div'>
>

function formatStat(num?: number | string): string {
    if (num === undefined || num === null) return '0'
    if (typeof num === 'string') return num
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
    if (num >= 10_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K`
    return num.toLocaleString()
}

function sanitizeHandle(raw?: string | null): string {
    if (!raw) return ''
    return raw.trim().replace(/^@/, '').replace(/[^a-zA-Z0-9._]/g, '')
}

function safeEncodeUrl(url?: string | null): string | undefined {
    if (!url) return undefined
    const clean = url.trim()
    if (!clean || !clean.startsWith('http')) return undefined
    try {
        return encodeURI(clean)
    } catch {
        return clean
    }
}

export const InstagramProfileCard = forwardRef<HTMLDivElement, InstagramProfileCardProps>(
    (
        {
            className,
            username: propUsername = 'bismay.exe',
            name: propName,
            avatar: propAvatar,
            avatarAlt = 'Instagram profile avatar',
            category: propCategory = 'Creator & Engineer',
            bio: propBio,
            website: propWebsite,
            postsCount: propPostsCount,
            followersCount: propFollowersCount,
            followingCount: propFollowingCount,
            isVerified: propIsVerified = true,
            profileUrl: propProfileUrl,
            recentPosts: propRecentPosts,
            followLabel = 'Follow',
            followButton,
            onFollow,
            ...props
        },
        ref
    ) => {
        const [liveData, setLiveData] = useState<{
            name?: string
            username?: string
            avatar?: string
            bio?: string
            followersCount?: string | number
            followingCount?: string | number
            postsCount?: string | number
        } | null>(null)

        const [isFollowing, setIsFollowing] = useState(false)
        const [imgError, setImgError] = useState(false)

        const cleanUsername = sanitizeHandle(liveData?.username || propUsername) || 'bismay.exe'
        const targetProfileUrl = propProfileUrl || `https://instagram.com/${cleanUsername}`

        // Fetch live metadata
        useEffect(() => {
            if (!targetProfileUrl) return
            let isMounted = true

            async function fetchProfile() {
                try {
                    const res = await fetch(`/api/social-metadata?url=${encodeURIComponent(targetProfileUrl)}`)
                    if (res.ok) {
                        const json = await res.json()
                        if (json.success && json.data && isMounted) {
                            setLiveData(json.data)
                        }
                    }
                } catch (e) {
                    console.error('Failed to fetch Instagram profile live metadata:', e)
                }
            }

            fetchProfile()
            return () => {
                isMounted = false
            }
        }, [targetProfileUrl])

        const name = liveData?.name || propName || cleanUsername
        const rawAvatarUrl = liveData?.avatar || propAvatar || (cleanUsername ? `https://unavatar.io/instagram/${cleanUsername}` : undefined)
        const avatarUrl = safeEncodeUrl(rawAvatarUrl)
        const bio =
            liveData?.bio ||
            propBio ||
            'Crafting high-performance web experiences & UI interactions.\nBuilding open-source tools with Next.js & Tailwind.'
        const postsCount = liveData?.postsCount || propPostsCount || 84
        const followersCount = liveData?.followersCount || propFollowersCount || 14200
        const followingCount = liveData?.followingCount || propFollowingCount || 420
        const website = propWebsite || (cleanUsername ? `${cleanUsername}.dev` : 'bismay.dev')

        const handleFollowClick = (e: React.MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (onFollow) {
                onFollow()
            } else {
                setIsFollowing((prev) => !prev)
            }
        }

        const renderBio = (text: string) => {
            return text.split('\n').map((line, lineIdx) => {
                const words = line.split(/(\s+)/)
                return (
                    <p key={lineIdx} className="leading-relaxed">
                        {words.map((word, wIdx) => {
                            if (word.startsWith('#') || word.startsWith('@')) {
                                return (
                                    <span key={wIdx} className="text-[#0095F6] dark:text-[#3897f0] hover:underline cursor-pointer">
                                        {word}
                                    </span>
                                )
                            }
                            return word
                        })}
                    </p>
                )
            })
        }

        const displayWebsite = website?.replace(/^https?:\/\//, '').replace(/\/$/, '')
        const targetWebsite = website?.startsWith('http') ? website : `https://${website}`

        return (
            <div
                ref={ref}
                data-slot="instagram-profile-card"
                className={cn(
                    'w-full max-w-md rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#121212] font-sans shadow-lg shadow-black/5 dark:shadow-2xl dark:shadow-black/40 overflow-hidden transition-all duration-300 p-5',
                    className
                )}
                {...props}
            >
                {/* 1. Header with App Branding */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">
                            {cleanUsername}
                        </span>
                        {propIsVerified && (
                            <Icon icon="solar:verified-check-bold" className="text-[#0095F6] text-sm shrink-0" />
                        )}
                    </div>

                    <a
                        href={targetProfileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors font-medium"
                        title="Open on Instagram"
                    >
                        <Icon icon="ri:instagram-line" className="text-base text-neutral-800 dark:text-neutral-200" />
                        <span>Instagram</span>
                    </a>
                </div>

                {/* 2. Profile Stats & Avatar Row */}
                <div className="flex items-center gap-6 py-4">
                    {/* Story Ring Avatar */}
                    <a
                        href={targetProfileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="relative p-[2.5px] rounded-full bg-linear-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shrink-0 group cursor-pointer"
                    >
                        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-[#121212] p-0.5 overflow-hidden">
                            {avatarUrl && !imgError ? (
                                <Image
                                    src={avatarUrl}
                                    alt={avatarAlt}
                                    width={80}
                                    height={80}
                                    className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-200"
                                    unoptimized
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-xl font-bold text-white">
                                    {cleanUsername.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                    </a>

                    {/* Stats columns */}
                    <div className="flex-1 grid grid-cols-3 text-center gap-2">
                        <div>
                            <div className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100">
                                {formatStat(postsCount)}
                            </div>
                            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">posts</div>
                        </div>
                        <div>
                            <div className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100">
                                {formatStat(followersCount)}
                            </div>
                            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">followers</div>
                        </div>
                        <div>
                            <div className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100">
                                {formatStat(followingCount)}
                            </div>
                            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">following</div>
                        </div>
                    </div>
                </div>

                {/* 3. Bio Details */}
                <div className="space-y-1 text-xs">
                    {name && <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">{name}</h3>}
                    {propCategory && <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">{propCategory}</span>}
                    {bio && <div className="text-neutral-800 dark:text-neutral-200 pt-1">{renderBio(bio)}</div>}

                    {website && (
                        <div className="pt-1.5">
                            <a
                                href={targetWebsite}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 font-semibold text-[#0095F6] hover:underline"
                            >
                                <LinkIcon size={12} className="shrink-0" />
                                <span className="truncate">{displayWebsite}</span>
                            </a>
                        </div>
                    )}
                </div>

                {/* 4. Action Buttons */}
                <div className="flex items-center gap-2.5 mt-4 pt-1">
                    {followButton ? (
                        followButton
                    ) : (
                        <button
                            type="button"
                            onClick={handleFollowClick}
                            className={cn(
                                'flex-1 py-2 px-4 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm',
                                isFollowing
                                    ? 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100'
                                    : 'bg-[#0095F6] hover:bg-[#1877F2] text-white hover:shadow-md'
                            )}
                        >
                            {isFollowing ? 'Following' : followLabel}
                        </button>
                    )}

                    <a
                        href={targetProfileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-4 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 transition-colors flex items-center justify-center gap-1"
                    >
                        <span>View Profile</span>
                        <ArrowUpRight size={13} />
                    </a>
                </div>
            </div>
        )
    }
)

InstagramProfileCard.displayName = 'InstagramProfileCard'
export default InstagramProfileCard
