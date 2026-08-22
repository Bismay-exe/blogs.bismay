'use client'

import React, { forwardRef, useState, useEffect, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Globe, ThumbsUp, MessageSquare, Repeat2, Send, ArrowUpRight, Plus, Check } from 'lucide-react'
import { Icon } from '@iconify-icon/react'

export type LinkedinPostCardProps = Readonly<
    {
        name?: string
        headline?: string
        avatar?: string
        avatarAlt?: string
        timestamp?: string
        postUrl?: string
        authorProfileUrl?: string
        content?: string
        mediaImage?: string
        mediaTitle?: string
        reactionsCount?: number | string
        commentsCount?: number | string
        repostsCount?: number | string
        isFollowingAuthor?: boolean
        menuIcon?: ReactNode
    } & ComponentPropsWithoutRef<'div'>
>

function formatCount(num?: number | string): string {
    if (num === undefined || num === null) return '0'
    if (typeof num === 'string') return num
    if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K`
    return num.toLocaleString()
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

export const LinkedinPostCard = forwardRef<HTMLDivElement, LinkedinPostCardProps>(
    (
        {
            className,
            name: propName,
            headline: propHeadline,
            avatar: propAvatar,
            avatarAlt = 'LinkedIn author avatar',
            timestamp = '2d • Edited • 🌐',
            postUrl = 'https://linkedin.com',
            authorProfileUrl = 'https://linkedin.com',
            content: propContent,
            mediaImage: propMediaImage,
            mediaTitle: propMediaTitle,
            reactionsCount: propReactionsCount,
            commentsCount: propCommentsCount,
            repostsCount: propRepostsCount,
            isFollowingAuthor: initialFollowing = false,
            menuIcon,
            ...props
        },
        ref
    ) => {
        const [liveData, setLiveData] = useState<{
            name?: string
            headline?: string
            content?: string
            mediaImage?: string
            avatar?: string
            reactionsCount?: string | number
            commentsCount?: string | number
            repostsCount?: string | number
        } | null>(null)

        const [isFollowing, setIsFollowing] = useState(initialFollowing)
        const [liked, setLiked] = useState(false)
        const [likeCount, setLikeCount] = useState<number | string>(propReactionsCount || 428)
        const [isExpanded, setIsExpanded] = useState(false)
        const [imgError, setImgError] = useState(false)

        useEffect(() => {
            if (!postUrl) return
            let isMounted = true

            async function fetchMetadata() {
                try {
                    const res = await fetch(`/api/social-metadata?url=${encodeURIComponent(postUrl)}`)
                    if (res.ok) {
                        const json = await res.json()
                        if (json.success && json.data && isMounted) {
                            setLiveData(json.data)
                            if (json.data.reactionsCount) setLikeCount(json.data.reactionsCount)
                        }
                    }
                } catch (e) {
                    console.error('Failed to fetch LinkedIn live metadata:', e)
                }
            }

            fetchMetadata()
            return () => {
                isMounted = false
            }
        }, [postUrl])

        const name = liveData?.name || propName || 'LinkedIn Creator'
        const headline = liveData?.headline || propHeadline || 'Senior Software Engineer | UI Systems & Architecture'
        const rawAvatarUrl = liveData?.avatar || propAvatar || `https://unavatar.io/x/${name.replace(/\s+/g, '_')}`
        const avatarUrl = safeEncodeUrl(rawAvatarUrl)
        const content =
            liveData?.content ||
            propContent ||
            "Excited to share our newest open-source release! 🚀\n\nWe completely re-architected our design system with Next.js 16, Tailwind CSS v4, and fluid micro-interactions. Performance improved by 40% with zero layout shift.\n\nCheck out the full breakdown and live demo below. Let me know what you think in the comments! 👇"
        const mediaImage = safeEncodeUrl(liveData?.mediaImage || propMediaImage)
        const commentsCount = liveData?.commentsCount || propCommentsCount || 36
        const repostsCount = liveData?.repostsCount || propRepostsCount || 14

        const handleLikeToggle = () => {
            if (typeof likeCount === 'number') {
                if (!liked) {
                    setLikeCount(likeCount + 1)
                    setLiked(true)
                } else {
                    setLikeCount(Math.max(0, likeCount - 1))
                    setLiked(false)
                }
            } else {
                setLiked(!liked)
            }
        }

        const renderContent = (text: string) => {
            return text.split('\n').map((line, lineIdx) => {
                const words = line.split(/(\s+)/)
                return (
                    <p key={lineIdx} className="leading-relaxed">
                        {words.map((word, wIdx) => {
                            if (word.startsWith('#') || word.startsWith('@')) {
                                return (
                                    <span key={wIdx} className="text-[#0A66C2] dark:text-[#70B5F9] font-medium hover:underline cursor-pointer">
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

        return (
            <div
                ref={ref}
                data-slot="linkedin-post-card"
                className={cn(
                    'w-full max-w-lg rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#121212] font-sans shadow-lg shadow-black/5 dark:shadow-2xl dark:shadow-black/40 overflow-hidden transition-all duration-300',
                    className
                )}
                {...props}
            >
                {/* 1. Header */}
                <div className="p-4 sm:p-5 pb-3">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                            {/* Avatar */}
                            <a
                                href={authorProfileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-700 bg-neutral-800 group"
                            >
                                {avatarUrl && !imgError ? (
                                    <Image
                                        src={avatarUrl}
                                        alt={avatarAlt}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                        unoptimized
                                        onError={() => setImgError(true)}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-[#0A66C2] text-white flex items-center justify-center font-bold text-base">
                                        {name.charAt(0)}
                                    </div>
                                )}
                            </a>

                            <div className="min-w-0 flex flex-col">
                                <div className="flex items-center gap-2">
                                    <a
                                        href={authorProfileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm font-bold text-neutral-900 dark:text-neutral-100 hover:text-[#0A66C2] dark:hover:text-[#70B5F9] transition-colors truncate"
                                    >
                                        {name}
                                    </a>
                                    <span className="text-[11px] text-neutral-400">• 1st</span>
                                </div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 leading-normal">
                                    {headline}
                                </p>
                                <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono mt-0.5">
                                    <span>{timestamp}</span>
                                    <Globe size={11} className="inline text-neutral-400" />
                                </div>
                            </div>
                        </div>

                        {/* Top Right Action & LinkedIn Icon */}
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                type="button"
                                onClick={() => setIsFollowing(!isFollowing)}
                                className={cn(
                                    'flex items-center gap-1 text-xs font-semibold py-1 px-2.5 rounded-lg transition-colors cursor-pointer',
                                    isFollowing
                                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                                        : 'text-[#0A66C2] hover:bg-[#0A66C2]/10 dark:text-[#70B5F9] dark:hover:bg-[#0A66C2]/20'
                                )}
                            >
                                {isFollowing ? (
                                    <>
                                        <Check size={13} />
                                        <span>Following</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus size={14} />
                                        <span>Follow</span>
                                    </>
                                )}
                            </button>

                            <a
                                href={postUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="w-7 h-7 rounded-md bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                                title="Open on LinkedIn"
                            >
                                <Icon icon="ri:linkedin-fill" width="16" />
                            </a>
                        </div>
                    </div>

                    {/* 2. Post Content */}
                    {content && (
                        <div className="mt-3 text-xs sm:text-[13px] text-neutral-800 dark:text-neutral-200 leading-relaxed">
                            <div className={cn(!isExpanded && 'line-clamp-4')}>{renderContent(content)}</div>
                            {content.length > 200 && !isExpanded && (
                                <button
                                    type="button"
                                    onClick={() => setIsExpanded(true)}
                                    className="text-neutral-500 dark:text-neutral-400 font-semibold hover:underline mt-1 cursor-pointer"
                                >
                                    ...see more
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* 3. Media Image Preview */}
                {mediaImage && (
                    <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden border-y border-neutral-100 dark:border-neutral-800">
                        <Image
                            src={mediaImage}
                            alt="LinkedIn post attachment"
                            width={800}
                            height={450}
                            className="w-full h-full object-cover"
                            unoptimized
                        />
                        {propMediaTitle && (
                            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                                <h4 className="text-xs sm:text-sm font-semibold truncate">{propMediaTitle}</h4>
                            </div>
                        )}
                    </div>
                )}

                {/* 4. Reaction Counters Line */}
                <div className="px-4 py-2.5 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 border-b border-neutral-100 dark:border-neutral-800/80 font-mono">
                    <div className="flex items-center gap-1.5">
                        <div className="flex -space-x-1 items-center">
                            <div className="w-4.5 h-4.5 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-[10px] shadow-sm z-20">
                                <ThumbsUp size={9} className="fill-white" />
                            </div>
                            <div className="w-4.5 h-4.5 rounded-full bg-[#E54335] text-white flex items-center justify-center text-[10px] shadow-sm z-10">
                                ❤️
                            </div>
                            <div className="w-4.5 h-4.5 rounded-full bg-[#F5BB5C] text-neutral-900 flex items-center justify-center text-[10px] shadow-sm">
                                💡
                            </div>
                        </div>
                        <span className="font-sans text-xs">{formatCount(likeCount)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-sans">
                        {commentsCount && <span>{formatCount(commentsCount)} comments</span>}
                        {repostsCount && (
                            <>
                                <span>•</span>
                                <span>{formatCount(repostsCount)} reposts</span>
                            </>
                        )}
                    </div>
                </div>

                {/* 5. Engagement Buttons */}
                <div className="p-2 grid grid-cols-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                    <button
                        type="button"
                        onClick={handleLikeToggle}
                        className={cn(
                            'flex items-center justify-center gap-1.5 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors cursor-pointer',
                            liked && 'text-[#0A66C2] dark:text-[#70B5F9]'
                        )}
                    >
                        <ThumbsUp size={16} className={cn(liked && 'fill-current')} />
                        <span className="hidden sm:inline">Like</span>
                    </button>

                    <a
                        href={postUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <MessageSquare size={16} />
                        <span className="hidden sm:inline">Comment</span>
                    </a>

                    <a
                        href={postUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <Repeat2 size={16} />
                        <span className="hidden sm:inline">Repost</span>
                    </a>

                    <a
                        href={postUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <Send size={15} />
                        <span className="hidden sm:inline">Send</span>
                    </a>
                </div>

                {/* 6. Footer Link */}
                <div className="px-4 py-2 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="font-mono text-[10px]">linkedin.com</span>
                    <a
                        href={postUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#0A66C2] dark:text-[#70B5F9] font-medium hover:underline"
                    >
                        <span>View on LinkedIn</span>
                        <ArrowUpRight size={13} />
                    </a>
                </div>
            </div>
        )
    }
)

LinkedinPostCard.displayName = 'LinkedinPostCard'
export default LinkedinPostCard
