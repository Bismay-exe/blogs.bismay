'use client'

import React, {
    forwardRef,
    useState,
    useEffect,
    type ComponentPropsWithoutRef,
    type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'
import {
    Heart,
    MessageCircle,
    Send,
    Bookmark,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    Repeat2,
} from 'lucide-react'
import { Icon } from '@iconify-icon/react'

export type InstagramPostCardProps = Readonly<
    {
        username?: string
        name?: string
        avatar?: string
        avatarAlt?: string
        location?: string
        audioTitle?: string
        isVerified?: boolean
        postUrl?: string
        mediaImage?: string
        mediaImages?: string[]
        likes?: number | string
        commentsCount?: number | string
        repostsCount?: number | string
        caption?: string
        timestamp?: string
        isLiked?: boolean
        isSaved?: boolean
        isReposted?: boolean
        menuIcon?: ReactNode
    } & ComponentPropsWithoutRef<'div'>
>

function sanitizeString(str?: string | null): string {
    if (!str) return ''
    return str.trim()
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

function formatCount(count?: number | string): string {
    if (count === undefined || count === null) return '0'
    if (typeof count === 'string') return count
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
    if (count >= 1_000) return `${(count / 1_000).toFixed(1).replace(/\.0$/, '')}K`
    return count.toLocaleString()
}

const DEFAULT_IMAGES = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
]

export const InstagramPostCard = forwardRef<HTMLDivElement, InstagramPostCardProps>(
    (
        {
            className,
            username: propUsername,
            name: propName,
            avatar: propAvatar,
            avatarAlt = 'Instagram avatar',
            location: propLocation,
            audioTitle: propAudioTitle,
            isVerified: propIsVerified = true,
            postUrl,
            mediaImage: propMediaImage,
            mediaImages: propMediaImages,
            likes: propLikes,
            commentsCount: propCommentsCount,
            repostsCount: propRepostsCount,
            caption: propCaption,
            timestamp: propTimestamp = 'RECENT POST',
            isLiked: initialLiked = true,
            isSaved: initialSaved = false,
            isReposted: initialReposted = false,
            menuIcon,
            ...props
        },
        ref
    ) => {
        const [liveData, setLiveData] = useState<{
            username?: string
            name?: string
            caption?: string
            mediaImage?: string
            mediaImages?: string[]
            avatar?: string
            likes?: string | number
            commentsCount?: string | number
            repostsCount?: string | number
        } | null>(null)

        const [liked, setLiked] = useState(initialLiked)
        const [saved, setSaved] = useState(initialSaved)
        const [reposted, setReposted] = useState(initialReposted)
        const [likeCount, setLikeCount] = useState<number | string>(propLikes ?? 1100)
        const [commentsCount, setCommentsCount] = useState<number | string>(propCommentsCount ?? 36)
        const [repostsCount, setRepostsCount] = useState<number | string>(propRepostsCount ?? 28)
        const [isExpanded, setIsExpanded] = useState(false)
        const [imgError, setImgError] = useState(false)
        const [showHeartPop, setShowHeartPop] = useState(false)
        const [currentImageIndex, setCurrentImageIndex] = useState(0)
        const [touchStartX, setTouchStartX] = useState<number | null>(null)

        // Fetch live metadata if postUrl is provided
        useEffect(() => {
            if (!postUrl) return
            let isMounted = true

            async function fetchMetadata() {
                try {
                    const res = await fetch(`/api/social-metadata?url=${encodeURIComponent(postUrl!)}`)
                    if (res.ok) {
                        const json = await res.json()
                        if (json.success && json.data && isMounted) {
                            setLiveData(json.data)
                            if (json.data.likes !== undefined) setLikeCount(json.data.likes)
                            if (json.data.commentsCount !== undefined) setCommentsCount(json.data.commentsCount)
                            if (json.data.repostsCount !== undefined) setRepostsCount(json.data.repostsCount)
                        }
                    }
                } catch (e) {
                    console.error('Failed to fetch Instagram live metadata:', e)
                }
            }

            fetchMetadata()
            return () => {
                isMounted = false
            }
        }, [postUrl])

        const rawUsername =
            liveData?.username && liveData.username !== 'instagram_user'
                ? liveData.username
                : propUsername || 'craftwork.design'
        const cleanUsername = sanitizeHandle(rawUsername) || propUsername || 'craftwork.design'
        const profileUrl = `https://instagram.com/${cleanUsername}`
        const targetPostUrl = postUrl ? sanitizeString(postUrl) : profileUrl

        const rawAvatarUrl =
            liveData?.avatar && !liveData.avatar.includes('instagram_user')
                ? liveData.avatar
                : propAvatar || `https://unavatar.io/instagram/${cleanUsername}`
        const avatarUrl = safeEncodeUrl(rawAvatarUrl)

        // Determine image list for carousel
        const images: string[] = (() => {
            if (propMediaImages && propMediaImages.length > 0) {
                return propMediaImages.map((img) => safeEncodeUrl(img) || img)
            }
            if (liveData?.mediaImages && liveData.mediaImages.length > 0) {
                return liveData.mediaImages.map((img) => safeEncodeUrl(img) || img)
            }
            if (propMediaImage) {
                return [safeEncodeUrl(propMediaImage) || propMediaImage]
            }
            if (liveData?.mediaImage) {
                return [safeEncodeUrl(liveData.mediaImage) || liveData.mediaImage]
            }
            return DEFAULT_IMAGES
        })()

        const caption =
            liveData?.caption &&
            !liveData.caption.toLowerCase().includes('see instagram photos and videos') &&
            !liveData.caption.toLowerCase().endsWith('on instagram')
                ? liveData.caption
                : propCaption ||
                  'Doodle Club — 10 hand-drawn packs in one bundle\n🎨\nHand-crafted vector illustrations for your next landing page or mobile app.'

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

        const handleRepostToggle = () => {
            if (typeof repostsCount === 'number') {
                if (!reposted) {
                    setRepostsCount(repostsCount + 1)
                    setReposted(true)
                } else {
                    setRepostsCount(Math.max(0, repostsCount - 1))
                    setReposted(false)
                }
            } else {
                setReposted(!reposted)
            }
        }

        const handleDoubleTap = () => {
            if (!liked) {
                setLiked(true)
                if (typeof likeCount === 'number') setLikeCount(likeCount + 1)
            }
            setShowHeartPop(true)
            setTimeout(() => setShowHeartPop(false), 800)
        }

        const nextImage = (e?: React.MouseEvent) => {
            e?.stopPropagation()
            setCurrentImageIndex((prev) => (prev + 1) % images.length)
        }

        const prevImage = (e?: React.MouseEvent) => {
            e?.stopPropagation()
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
        }

        const handleTouchStart = (e: React.TouchEvent) => {
            setTouchStartX(e.touches[0].clientX)
        }

        const handleTouchEnd = (e: React.TouchEvent) => {
            if (touchStartX === null) return
            const touchEndX = e.changedTouches[0].clientX
            const diff = touchStartX - touchEndX
            if (diff > 45) {
                nextImage()
            } else if (diff < -45) {
                prevImage()
            }
            setTouchStartX(null)
        }

        const renderCaptionWithTags = (text: string) => {
            const lines = text.split('\n')
            return lines.map((line, lineIdx) => {
                const parts = line.split(/(\s+)/)
                const content = parts.map((part, idx) => {
                    if (part.startsWith('#') || part.startsWith('@')) {
                        return (
                            <span key={idx} className="text-[#0095F6] dark:text-[#3897f0] hover:underline cursor-pointer">
                                {part}
                            </span>
                        )
                    }
                    return part
                })

                return (
                    <React.Fragment key={lineIdx}>
                        {lineIdx > 0 && <br />}
                        {content}
                    </React.Fragment>
                )
            })
        }

        return (
            <div
                ref={ref}
                data-slot="instagram-post-card"
                className={cn(
                    'w-full max-w-md rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#121212] font-sans shadow-lg shadow-black/5 dark:shadow-2xl dark:shadow-black/40 overflow-hidden transition-all duration-300',
                    className
                )}
                {...props}
            >
                {/* 1. Header */}
                <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5">
                    <div className="flex items-center gap-3 min-w-0">
                        {/* Story Gradient Avatar Ring */}
                        <a
                            href={profileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="relative p-0.5 rounded-full bg-linear-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shrink-0 group cursor-pointer"
                        >
                            <div className="w-9 h-9 rounded-full bg-white dark:bg-[#121212] p-[1.5px] overflow-hidden">
                                {avatarUrl && !imgError ? (
                                    <img
                                        src={avatarUrl}
                                        alt={avatarAlt}
                                        width={36}
                                        height={36}
                                        className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-200"
                                        referrerPolicy="no-referrer"
                                        onError={(e) => {
                                            const target = e.currentTarget
                                            if (!target.dataset.triedUnavatar) {
                                                target.dataset.triedUnavatar = '1'
                                                target.src = `https://unavatar.io/instagram/${cleanUsername}`
                                            } else if (!target.dataset.triedTwitter) {
                                                target.dataset.triedTwitter = '1'
                                                target.src = `https://unavatar.io/x/${cleanUsername}`
                                            } else {
                                                setImgError(true)
                                            }
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-white">
                                        {cleanUsername.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </a>

                        <div className="min-w-0 flex flex-col">
                            <div className="flex items-center gap-1.5 min-w-0">
                                <a
                                    href={profileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs font-bold text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity truncate"
                                >
                                    {cleanUsername}
                                </a>
                                {propIsVerified && (
                                    <Icon icon="solar:verified-check-bold" className="text-[#0095F6] text-xs shrink-0" />
                                )}
                            </div>
                            {(propLocation || propAudioTitle) ? (
                                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                                    {propLocation || propAudioTitle}
                                </span>
                            ) : liveData?.name && liveData.name !== cleanUsername ? (
                                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                                    {liveData.name}
                                </span>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                        <a
                            href={targetPostUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                            title="Open on Instagram"
                        >
                            <Icon icon="ri:instagram-line" className="text-lg text-neutral-800 dark:text-neutral-200" />
                        </a>
                    </div>
                </div>

                {/* 2. Media Area with Sliding Carousel Track */}
                <div
                    className="relative w-full aspect-3/4 bg-neutral-950 overflow-hidden cursor-pointer select-none group"
                    onDoubleClick={handleDoubleTap}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Sliding Track containing all images */}
                    <div
                        className="flex w-full h-full transition-transform duration-300 ease-out"
                        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    >
                        {images.map((imgSrc, idx) => (
                            <div key={idx} className="relative w-full h-full shrink-0 aspect-3/4 bg-neutral-900 overflow-hidden">
                                <img
                                    src={imgSrc}
                                    alt={`Instagram Post image ${idx + 1}`}
                                    className="w-full h-full object-cover select-none pointer-events-none"
                                    referrerPolicy="no-referrer"
                                    loading={idx === 0 ? "eager" : "lazy"}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Animated Heart Pop on Double Tap */}
                    {showHeartPop && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in zoom-in-50 fade-in duration-200 z-20">
                            <Heart className="w-24 h-24 fill-white text-white drop-shadow-2xl animate-bounce" />
                        </div>
                    )}

                    {/* Carousel Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            {currentImageIndex > 0 && (
                                <button
                                    type="button"
                                    onClick={prevImage}
                                    aria-label="Previous media"
                                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-all opacity-80 group-hover:opacity-100 shadow-md z-10 cursor-pointer"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                            )}
                            {currentImageIndex < images.length - 1 && (
                                <button
                                    type="button"
                                    onClick={nextImage}
                                    aria-label="Next media"
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-all opacity-80 group-hover:opacity-100 shadow-md z-10 cursor-pointer"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            )}

                            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-mono shadow-md z-10">
                                {currentImageIndex + 1}/{images.length}
                            </div>
                        </>
                    )}
                </div>

                {/* Carousel Dots Indicator (Directly below media) */}
                {images.length > 1 && (
                    <div className="flex items-center justify-center gap-1.5 pt-3 pb-0.5">
                        {images.map((_, idx) => {
                            const isActive = idx === currentImageIndex
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setCurrentImageIndex(idx)
                                    }}
                                    aria-label={`Go to slide ${idx + 1}`}
                                    className={cn(
                                        'rounded-full transition-all duration-200 cursor-pointer',
                                        isActive
                                            ? 'w-1.5 h-1.5 bg-[#0095F6]'
                                            : 'w-1.5 h-1.5 bg-neutral-600 hover:bg-neutral-500 dark:bg-neutral-600 dark:hover:bg-neutral-400'
                                    )}
                                />
                            )
                        })}
                    </div>
                )}

                {/* 3. Action Buttons & Caption Area */}
                <div className="px-4 pt-2 pb-3.5">
                    {/* Action Bar (Likes, Comments, Repost, Share, Bookmark) */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 sm:gap-5">
                            {/* Like Button + Count */}
                            <button
                                type="button"
                                onClick={handleLikeToggle}
                                className="flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-transform active:scale-110 cursor-pointer"
                                title={liked ? 'Unlike' : 'Like'}
                            >
                                <Heart
                                    size={21}
                                    className={cn(
                                        'transition-colors',
                                        liked
                                            ? 'fill-[#FF3040] text-[#FF3040]'
                                            : 'stroke-[1.8] hover:text-[#FF3040]'
                                    )}
                                />
                                <span className="text-xs sm:text-sm font-semibold tracking-tight">
                                    {formatCount(likeCount)}
                                </span>
                            </button>

                            {/* Comment Button + Count */}
                            <a
                                href={targetPostUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity"
                                title="Comment"
                            >
                                <MessageCircle size={21} className="stroke-[1.8] -rotate-90" />
                                <span className="text-xs sm:text-sm font-semibold tracking-tight">
                                    {formatCount(commentsCount)}
                                </span>
                            </a>

                            {/* Repost Button + Count */}
                            <button
                                type="button"
                                onClick={handleRepostToggle}
                                className="flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-transform active:scale-110 cursor-pointer"
                                title={reposted ? 'Undo Repost' : 'Repost'}
                            >
                                <Repeat2
                                    size={21}
                                    className={cn(
                                        'transition-colors stroke-[1.8]',
                                        reposted ? 'text-emerald-500 dark:text-emerald-400' : ''
                                    )}
                                />
                                <span className="text-xs sm:text-sm font-semibold tracking-tight">
                                    {formatCount(repostsCount)}
                                </span>
                            </button>

                            {/* Share / Direct Message */}
                            <a
                                href={targetPostUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity"
                                title="Share"
                            >
                                <Send size={20} className="stroke-[1.8] -rotate-12 translate-y-[-1px]" />
                            </a>
                        </div>

                        {/* Bookmark / Save Button */}
                        <button
                            type="button"
                            onClick={() => setSaved(!saved)}
                            className="text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-transform active:scale-110 cursor-pointer"
                            title={saved ? 'Remove from Saved' : 'Save'}
                        >
                            <Bookmark
                                size={21}
                                className={cn(
                                    'transition-colors',
                                    saved
                                        ? 'fill-neutral-900 dark:fill-white text-neutral-900 dark:text-white'
                                        : 'stroke-[1.8]'
                                )}
                            />
                        </button>
                    </div>

                    {/* Description / Caption Section */}
                    {caption && (
                        <div className="mt-3 text-xs sm:text-[13px] text-neutral-900 dark:text-neutral-100 leading-snug">
                            <a
                                href={profileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="font-bold text-neutral-900 dark:text-neutral-100 mr-1.5 hover:underline"
                            >
                                {cleanUsername}
                            </a>
                            <span className={cn('whitespace-pre-line', !isExpanded && 'line-clamp-2 inline')}>
                                {renderCaptionWithTags(caption)}
                            </span>
                            {(caption.length > 70 || caption.includes('\n')) && (
                                <button
                                    type="button"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="text-neutral-500 dark:text-neutral-400 font-normal hover:underline cursor-pointer block mt-1"
                                >
                                    {isExpanded ? '... less' : '... more'}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Comments line */}
                    {commentsCount && (
                        <a
                            href={targetPostUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="block mt-1 text-[11px] text-neutral-500 dark:text-neutral-400 hover:underline"
                        >
                            View all {commentsCount} comments
                        </a>
                    )}

                    {/* Timestamp & Direct Link */}
                    <div className="flex items-center justify-between mt-2 pt-2 zborder-t border-neutral-100 dark:border-neutral-800/60 pb-3 text-[10px] text-neutral-400 font-mono uppercase tracking-wider">
                        <span className='normal-case'>Instagram.com</span>
                        <a
                            href={targetPostUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-[#0095F6] hover:underline normal-case font-sans font-medium text-xs"
                        >
                            <span>View on Instagram</span>
                            <ArrowUpRight size={13} />
                        </a>
                    </div>
                </div>
            </div>
        )
    }
)

InstagramPostCard.displayName = 'InstagramPostCard'
export default InstagramPostCard
