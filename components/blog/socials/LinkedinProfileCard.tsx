'use client'

import React, { forwardRef, useState, useEffect, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { MapPin, Building2, GraduationCap, Users, ArrowUpRight, Check, UserPlus } from 'lucide-react'
import { Icon } from '@iconify-icon/react'

export type LinkedinProfileCardProps = Readonly<
    {
        name?: string
        pronouns?: string
        headline?: string
        location?: string
        company?: string
        education?: string
        avatar?: string
        avatarAlt?: string
        coverImage?: string
        coverImageAlt?: string
        connectionsCount?: string | number
        followersCount?: string | number
        isOpenToWork?: boolean
        profileUrl?: string
        about?: string
        mutualCount?: number
        followButton?: ReactNode
        onFollow?: () => void
    } & ComponentPropsWithoutRef<'div'>
>

function formatStat(num?: number | string): string {
    if (num === undefined || num === null) return '500+'
    if (typeof num === 'string') return num
    if (num >= 10_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K`
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

export const LinkedinProfileCard = forwardRef<HTMLDivElement, LinkedinProfileCardProps>(
    (
        {
            className,
            name: propName,
            pronouns = 'He/Him',
            headline: propHeadline,
            location: propLocation,
            company: propCompany,
            education: propEducation,
            avatar: propAvatar,
            avatarAlt = 'LinkedIn profile avatar',
            coverImage: propCoverImage,
            coverImageAlt = 'LinkedIn banner background',
            connectionsCount: propConnectionsCount,
            followersCount: propFollowersCount,
            isOpenToWork = false,
            profileUrl = 'https://linkedin.com',
            about: propAbout,
            mutualCount = 24,
            followButton,
            onFollow,
            ...props
        },
        ref
    ) => {
        const [liveData, setLiveData] = useState<{
            name?: string
            headline?: string
            about?: string
            avatar?: string
            connectionsCount?: string | number
            followersCount?: string | number
        } | null>(null)

        const [isConnected, setIsConnected] = useState(false)
        const [imgError, setImgError] = useState(false)
        const [bannerError, setBannerError] = useState(false)

        useEffect(() => {
            if (!profileUrl || profileUrl === 'https://linkedin.com') return
            let isMounted = true

            async function fetchProfile() {
                try {
                    const res = await fetch(`/api/social-metadata?url=${encodeURIComponent(profileUrl)}`)
                    if (res.ok) {
                        const json = await res.json()
                        if (json.success && json.data && isMounted) {
                            setLiveData(json.data)
                        }
                    }
                } catch (e) {
                    console.error('Failed to fetch LinkedIn profile metadata:', e)
                }
            }

            fetchProfile()
            return () => {
                isMounted = false
            }
        }, [profileUrl])

        const name = liveData?.name || propName || 'Bismay'
        const headline =
            liveData?.headline ||
            propHeadline ||
            'Senior Software Engineer | UI Systems & Architecture | Open Source'
        const rawAvatarUrl = liveData?.avatar || propAvatar || `https://unavatar.io/x/${name.replace(/\s+/g, '_')}`
        const avatarUrl = safeEncodeUrl(rawAvatarUrl)
        const about =
            liveData?.about ||
            propAbout ||
            'Passionate about engineering elegant, high-throughput interfaces and accessible design systems. Building the next generation of web apps with Next.js, TypeScript, and modern CSS architecture.'
        const connectionsCount = liveData?.connectionsCount || propConnectionsCount || '500+'
        const followersCount = liveData?.followersCount || propFollowersCount || 14800
        const location = propLocation || 'San Francisco Bay Area'
        const company = propCompany || 'Next.js & React Ecosystem'
        const rawCoverImage =
            propCoverImage ||
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'
        const coverImage = safeEncodeUrl(rawCoverImage)

        const handleConnectClick = (e: React.MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (onFollow) {
                onFollow()
            } else {
                setIsConnected((prev) => !prev)
            }
        }

        return (
            <div
                ref={ref}
                data-slot="linkedin-profile-card"
                className={cn(
                    'w-full max-w-lg rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#121212] font-sans shadow-lg shadow-black/5 dark:shadow-2xl dark:shadow-black/40 overflow-hidden transition-all duration-300',
                    className
                )}
                {...props}
            >
                {/* 1. Panoramic Cover Banner */}
                <div className="relative h-28 sm:h-32 w-full bg-gradient-to-r from-[#004182] to-[#0A66C2] overflow-hidden">
                    {coverImage && !bannerError ? (
                        <Image
                            src={coverImage}
                            alt={coverImageAlt}
                            fill
                            className="object-cover"
                            unoptimized
                            onError={() => setBannerError(true)}
                        />
                    ) : null}

                    {/* LinkedIn Brand Badge Top Right */}
                    <a
                        href={profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold hover:bg-black/80 transition-colors shadow-md"
                    >
                        <Icon icon="ri:linkedin-fill" width="14" />
                        <span>LinkedIn</span>
                    </a>
                </div>

                {/* 2. Overlapping Avatar & Primary Info */}
                <div className="px-5 pb-5">
                    <div className="flex justify-between items-end -mt-12 sm:-mt-14 mb-3">
                        {/* Avatar */}
                        <div className="relative">
                            <div
                                className={cn(
                                    'w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white dark:border-[#121212] bg-neutral-800 overflow-hidden shadow-md relative',
                                    isOpenToWork && 'ring-2 ring-emerald-500'
                                )}
                            >
                                {avatarUrl && !imgError ? (
                                    <Image
                                        src={avatarUrl}
                                        alt={avatarAlt}
                                        width={112}
                                        height={112}
                                        className="w-full h-full object-cover"
                                        unoptimized
                                        onError={() => setImgError(true)}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-[#0A66C2] text-white flex items-center justify-center text-2xl font-bold">
                                        {name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            {/* Open to Work Badge */}
                            {isOpenToWork && (
                                <div className="absolute -bottom-1 inset-x-0 mx-auto w-fit px-2 py-0.5 rounded-full bg-emerald-600 text-[9px] font-bold text-white uppercase tracking-wider shadow-sm">
                                    #OpenToWork
                                </div>
                            )}
                        </div>

                        {/* Top Right Connect / View Button */}
                        <div className="flex items-center gap-2">
                            {followButton ? (
                                followButton
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleConnectClick}
                                    className={cn(
                                        'flex items-center gap-1.5 py-1.5 px-4 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm',
                                        isConnected
                                            ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                                            : 'bg-[#0A66C2] hover:bg-[#004182] text-white hover:shadow-md'
                                    )}
                                >
                                    {isConnected ? (
                                        <>
                                            <Check size={14} />
                                            <span>Connected</span>
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus size={14} />
                                            <span>Connect</span>
                                        </>
                                    )}
                                </button>
                            )}

                            <a
                                href={profileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors text-neutral-700 dark:text-neutral-300"
                                title="Open Full Profile"
                            >
                                <ArrowUpRight size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Name & Headline */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">
                                {name}
                            </h2>
                            {pronouns && (
                                <span className="text-xs text-neutral-400 font-normal">({pronouns})</span>
                            )}
                        </div>

                        <p className="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 leading-snug font-medium">
                            {headline}
                        </p>
                    </div>

                    {/* Metadata tags (Location, Company, Education) */}
                    <div className="mt-3 space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                        {location && (
                            <div className="flex items-center gap-1.5">
                                <MapPin size={13} className="shrink-0 text-neutral-400" />
                                <span>{location}</span>
                            </div>
                        )}
                        {company && (
                            <div className="flex items-center gap-1.5">
                                <Building2 size={13} className="shrink-0 text-neutral-400" />
                                <span className="truncate">{company}</span>
                            </div>
                        )}
                        {propEducation && (
                            <div className="flex items-center gap-1.5">
                                <GraduationCap size={13} className="shrink-0 text-neutral-400" />
                                <span className="truncate">{propEducation}</span>
                            </div>
                        )}
                    </div>

                    {/* Connections & Followers count */}
                    <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-[#0A66C2] dark:text-[#70B5F9]">
                        <div className="flex items-center gap-3">
                            <span className="hover:underline cursor-pointer">
                                {formatStat(connectionsCount)} connections
                            </span>
                            <span>•</span>
                            <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                                {formatStat(followersCount)} followers
                            </span>
                        </div>

                        {mutualCount > 0 && (
                            <div className="hidden sm:flex items-center gap-1 text-[11px] text-neutral-400 font-normal">
                                <Users size={12} />
                                <span>{mutualCount} mutual</span>
                            </div>
                        )}
                    </div>

                    {/* About snippet */}
                    {about && (
                        <div className="mt-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800/60 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            <span className="font-bold text-neutral-900 dark:text-neutral-100 block mb-1">About</span>
                            <p className="line-clamp-3">{about}</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
)

LinkedinProfileCard.displayName = 'LinkedinProfileCard'
export default LinkedinProfileCard
