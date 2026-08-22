'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Icon } from '@iconify-icon/react'

interface PinterestEmbedProps {
    url: string
    maxWidth?: number | string
    height?: number
}

function extractPinId(url: string): string | null {
    const match = url.match(/(?:pinterest\.com\/pin\/|pin\/)(\d+)/i)
    return match ? match[1] : null
}

const PinterestEmbed: React.FC<PinterestEmbedProps> = ({
    url,
    maxWidth = 345,
    height: propHeight,
}) => {
    const [pinId, setPinId] = useState<string | null>(() => extractPinId(url))
    const [mediaImage, setMediaImage] = useState<string | null>(null)
    const [aspectRatio, setAspectRatio] = useState<number>(1.33)

    // Calculate scale factor relative to Pinterest's native 345px embed width
    const numericMaxWidth =
        typeof maxWidth === 'number'
            ? maxWidth
            : typeof maxWidth === 'string' && maxWidth.endsWith('px')
                ? parseInt(maxWidth, 10)
                : 345
    const scale = numericMaxWidth / 345

    // Base height (+106px accommodates both 1-line and 2-line titles with full bottom border)
    const baseHeight = propHeight
        ? Math.round(propHeight / scale)
        : Math.round(345 * aspectRatio + 106)
    const containerHeight = Math.round(baseHeight * scale)

    // Resolve pin ID and media image from API
    useEffect(() => {
        const directId = extractPinId(url)
        if (directId && !pinId) {
            setPinId(directId)
        }

        if (url.includes('pin.it') || url.includes('pinterest.com') || pinId) {
            fetch(`/api/social-metadata?url=${encodeURIComponent(url)}`)
                .then((res) => res.json())
                .then((json) => {
                    if (json.data?.pinId) {
                        setPinId(json.data.pinId)
                    }
                    if (json.data?.mediaImage) {
                        setMediaImage(json.data.mediaImage)
                    }
                })
                .catch((e) => console.error('Failed to resolve Pinterest metadata:', e))
        }
    }, [url, pinId])

    // Compute natural aspect ratio when image loads
    useEffect(() => {
        if (!mediaImage) return

        const img = new window.Image()
        img.src = mediaImage
        img.onload = () => {
            if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                setAspectRatio(img.naturalHeight / img.naturalWidth)
            }
        }
    }, [mediaImage])

    // If it's a Pin URL, render Pinterest's Official Full Embed Iframe with automatic scalable dimensions
    if (url.includes('pinterest.com/pin/') || url.includes('pin.it') || pinId) {
        if (!pinId) {
            return (
                <div className="my-7 flex justify-center w-full">
                    <div
                        className="w-full rounded-[32px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] p-4 flex flex-col space-y-3 animate-pulse"
                        style={{ maxWidth: `${numericMaxWidth}px`, height: `${containerHeight}px` }}
                    >
                        <div className="w-full aspect-[3/4] rounded-2xl bg-neutral-200 dark:bg-neutral-800/80" />
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-4/5" />
                        <div className="flex items-center gap-3 pt-2">
                            <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                            <div className="space-y-1">
                                <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded w-16" />
                                <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-28" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="my-7 flex justify-center w-full">
                <div
                    className="relative flex justify-center overflow-hidden transition-all duration-300"
                    style={{
                        width: `${numericMaxWidth}px`,
                        height: `${containerHeight}px`,
                    }}
                >
                    <iframe
                        src={`https://assets.pinterest.com/ext/embed.html?id=${pinId}`}
                        height={baseHeight}
                        width="345"
                        frameBorder="0"
                        scrolling="no"
                        title="Pinterest Pin"
                        className="border-0 rounded-[32px] transition-all duration-300"
                        style={{
                            width: '345px',
                            height: `${baseHeight}px`,
                            transform: `scale(${scale})`,
                            transformOrigin: 'top center',
                        }}
                        loading="lazy"
                    />
                </div>
            </div>
        )
    }

    // Generic aesthetic Pinterest banner card
    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group my-7 block overflow-hidden rounded-2xl border border-sec/25 bg-fg/2 hover:border-[#E60023]/60 hover:bg-fg/4 p-5 sm:p-6 transition-all duration-300 space-y-3"
        >
            {/* Header */}
            <div className="flex items-center justify-between text-xs text-sec">
                <div className="flex items-center gap-2 font-mono">
                    <div className="w-5 h-5 rounded-full bg-[#E60023] text-white flex items-center justify-center">
                        <Icon icon="ri:pinterest-fill" width="13" />
                    </div>
                    <span className="font-semibold text-fg/90">Pinterest</span>
                    <span>•</span>
                    <span className="text-sec">Inspiration</span>
                </div>
                <div className="flex items-center gap-1 text-[#E60023] font-semibold text-xs">
                    <span>View on Pinterest</span>
                    <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300 ease-in-out" />
                </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-fg group-hover:text-[#E60023] transition-colors leading-snug">
                    Explore Pins & Boards on Pinterest
                </h4>
                <p className="text-xs sm:text-sm text-sec leading-relaxed line-clamp-2">
                    Visual moodboards, architecture inspiration, UI mockups, and creative assets.
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-sec/15 text-xs text-sec font-mono">
                <span className="truncate max-w-[240px] sm:max-w-md">{url.replace(/^https?:\/\//, '')}</span>
                <span className="text-fg font-medium">pinterest.com</span>
            </div>
        </a>
    )
}

export default PinterestEmbed
