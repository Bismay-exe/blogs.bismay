'use client'

import React, { forwardRef, useState, useEffect, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify-icon/react'

export type PinterestPostCardProps = Readonly<
    {
        pinId?: string
        pinUrl?: string
        title?: string
        description?: string
        mediaImage?: string
        mediaImageAlt?: string
        sourceUrl?: string
        sourceDomain?: string
        authorName?: string
        authorAvatar?: string
        authorProfileUrl?: string
        boardName?: string
        savesCount?: number | string
        isSaved?: boolean
        menuIcon?: ReactNode
    } & ComponentPropsWithoutRef<'div'>
>

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

export const PinterestPostCard = forwardRef<HTMLDivElement, PinterestPostCardProps>(
    (
        {
            className,
            pinId: propPinId,
            pinUrl = 'https://pinterest.com',
            title: propTitle,
            description: propDescription,
            mediaImage: propMediaImage,
            mediaImageAlt = 'Pinterest Pin Image',
            authorName: propAuthorName,
            authorAvatar: propAuthorAvatar,
            authorProfileUrl: propAuthorProfileUrl,
            sourceDomain: propSourceDomain,
            ...props
        },
        ref
    ) => {
        // Extract numeric Pin ID directly from URL if present
        const directPinMatch =
            propPinId ||
            pinUrl.match(/(?:pinterest\.com\/pin\/|pin\/)(\d+)/i)?.[1]

        const [activePinId, setActivePinId] = useState<string | undefined>(directPinMatch)
        const [liveData, setLiveData] = useState<{
            pinId?: string
            title?: string
            description?: string
            mediaImage?: string
            authorName?: string
            authorAvatar?: string
            authorProfileUrl?: string
            sourceDomain?: string
            url?: string
        } | null>(null)
        const [isLoading, setIsLoading] = useState(!propMediaImage && Boolean(pinUrl && pinUrl !== 'https://pinterest.com'))
        const [imgError, setImgError] = useState(false)

        // Fetch live metadata (supports pin.it shortlinks & direct pinterest URLs)
        useEffect(() => {
            if (!pinUrl || pinUrl === 'https://pinterest.com') return

            let isMounted = true
            if (!liveData && !propMediaImage) {
                setIsLoading(true)
            }

            async function fetchPinMetadata() {
                try {
                    const res = await fetch(`/api/social-metadata?url=${encodeURIComponent(pinUrl)}`)
                    if (res.ok) {
                        const json = await res.json()
                        if (json.success && json.data && isMounted) {
                            setLiveData(json.data)
                            if (json.data.pinId) {
                                setActivePinId(json.data.pinId)
                            }
                        }
                    }
                } catch (e) {
                    console.error('Failed to resolve Pinterest pin metadata:', e)
                } finally {
                    if (isMounted) setIsLoading(false)
                }
            }

            fetchPinMetadata()
            return () => {
                isMounted = false
            }
        }, [pinUrl])

        // Determine title & publisher matching Pinterest official embed behavior
        const isGenericTitle =
            !propTitle &&
            (!liveData?.title ||
                liveData.title.toLowerCase().includes('found this on pinterest') ||
                liveData.title.toLowerCase() === 'pinterest' ||
                liveData.title.toLowerCase() === 'pinterest pin' ||
                liveData.title.toLowerCase() === 'pinterest inspiration')

        const displayTitle = isGenericTitle
            ? liveData?.description || propDescription || liveData?.title || propTitle || 'Pinterest Pin'
            : liveData?.title || propTitle || liveData?.description || propDescription || 'Pinterest Pin'

        const rawMediaImage =
            liveData?.mediaImage ||
            propMediaImage ||
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
        const mediaImage = safeEncodeUrl(rawMediaImage)
        const authorName = liveData?.authorName || propAuthorName || 'Pinterest Creator'
        const rawAvatar = liveData?.authorAvatar || propAuthorAvatar
        const avatarUrl = safeEncodeUrl(rawAvatar)
        const authorProfileUrl = liveData?.authorProfileUrl || propAuthorProfileUrl
        const targetPinUrl = liveData?.url || pinUrl || (activePinId ? `https://www.pinterest.com/pin/${activePinId}/` : 'https://pinterest.com')

        // Loading State Skeleton (Matching Official Pinterest Embed Shape)
        if (isLoading && !liveData && !propMediaImage) {
            return (
                <div
                    ref={ref}
                    data-slot="pinterest-skeleton"
                    className={cn('flex justify-center w-full my-6', className)}
                    {...props}
                >
                    <div className="w-full max-w-[290px] sm:max-w-[320px] rounded-[24px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] p-3 flex flex-col space-y-3 animate-pulse shadow-sm">
                        <div className="w-full aspect-[3/4] rounded-2xl bg-neutral-200 dark:bg-neutral-800/80" />
                        <div className="space-y-2 py-1">
                            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-4/5" />
                            <div className="flex items-center gap-2.5 pt-1.5">
                                <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 shrink-0" />
                                <div className="space-y-1">
                                    <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded w-16" />
                                    <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-28" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        // Native Official-Style Pinterest Embed Card
        return (
            <div
                ref={ref}
                data-slot="pinterest-post-card"
                className={cn('flex justify-center w-full my-6', className)}
                {...props}
            >
                <div className="w-full max-w-[290px] sm:max-w-[320px] rounded-[24px] border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#181818] font-sans shadow-sm shadow-black/5 dark:shadow-xl dark:shadow-black/30 overflow-hidden transition-all duration-300 group hover:border-neutral-300 dark:hover:border-neutral-700">
                    {/* Pin Media - Centered framing with subtle neutral background */}
                    <a
                        href={targetPinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block relative w-full overflow-hidden bg-[#f0f2f5] dark:bg-neutral-900 cursor-pointer"
                    >
                        {mediaImage ? (
                            <img
                                src={mediaImage}
                                alt={mediaImageAlt}
                                className="w-full h-auto max-h-[600px] object-cover sm:object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                                referrerPolicy="no-referrer"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full aspect-[3/4] bg-[#f0f2f5] dark:bg-neutral-900 flex items-center justify-center">
                                <Icon icon="ri:pinterest-fill" className="text-4xl text-[#E60023]" />
                            </div>
                        )}
                    </a>

                    {/* Pin Information (Exact Official Pinterest Widget Layout) */}
                    <div className="p-3.5 sm:p-4 space-y-2.5 bg-white dark:bg-[#181818]">
                        <a
                            href={targetPinUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="block text-sm sm:text-[14.5px] font-semibold text-neutral-900 dark:text-neutral-100 hover:underline leading-snug line-clamp-2"
                        >
                            {displayTitle}
                        </a>

                        {/* Author / Publisher Section */}
                        <div className="flex items-center gap-2.5 pt-1">
                            <a
                                href={authorProfileUrl || targetPinUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 overflow-hidden shrink-0 group-hover:opacity-90 cursor-pointer"
                            >
                                {avatarUrl && !imgError ? (
                                    <img
                                        src={avatarUrl}
                                        alt={authorName}
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                        onError={() => setImgError(true)}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 flex items-center justify-center text-xs font-semibold">
                                        {authorName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </a>

                            <div className="min-w-0 flex flex-col justify-center">
                                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-normal leading-tight">
                                    Published by
                                </span>
                                <a
                                    href={authorProfileUrl || targetPinUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs sm:text-[13px] font-normal text-neutral-900 dark:text-neutral-100 hover:underline truncate leading-tight mt-0.5"
                                >
                                    {authorName}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
)

PinterestPostCard.displayName = 'PinterestPostCard'
export default PinterestPostCard
