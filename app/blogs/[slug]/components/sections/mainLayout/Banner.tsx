'use client'

import React, { useState, useEffect } from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

interface BannerProps {
    src?: string
    alt?: string
}

const DEFAULT_FALLBACK_BANNER =
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop'

const Banner: React.FC<BannerProps> = ({
    src = DEFAULT_FALLBACK_BANNER,
    alt = 'Blog Banner',
}) => {
    const { settings } = useReaderSettings()
    const bannerWidth = settings.articleLayout?.bannerWidth || settings.layout?.bannerWidth || 'contained'
    const bannerMarginTop = settings.articleLayout?.bannerMarginTop ?? settings.layout?.bannerMarginTop ?? 24
    const bannerMarginBottom = settings.articleLayout?.bannerMarginBottom ?? settings.layout?.bannerMarginBottom ?? 32

    const [imgSrc, setImgSrc] = useState<string>(src || DEFAULT_FALLBACK_BANNER)

    useEffect(() => {
        if (src) {
            setImgSrc(src)
        }
    }, [src])

    const marginStyle = {
        marginTop: `${bannerMarginTop}px`,
        marginBottom: `${bannerMarginBottom}px`,
    }

    // Contained width (default inside reading column)
    if (bannerWidth === 'contained') {
        return (
            <div
                style={marginStyle}
                className="w-full rounded-md sm:rounded-xl lg:rounded-2xl overflow-hidden border border-sec/15 bg-fg/2 transition-all duration-300 relative"
            >
                <img
                    className="w-full h-full object-cover"
                    src={imgSrc}
                    alt={alt}
                    onError={() => setImgSrc(DEFAULT_FALLBACK_BANNER)}
                    loading="eager"
                />
            </div>
        )
    }

    // Breakout width (expands wider than reading column)
    if (bannerWidth === 'breakout') {
        return (
            <div
                style={marginStyle}
                className="relative w-full mx-auto rounded-md sm:rounded-xl lg:rounded-2xl overflow-hidden border border-sec/20 bg-fg/3 transition-all duration-300"
            >
                <img
                    className="w-full h-full object-cover"
                    src={imgSrc}
                    alt={alt}
                    onError={() => setImgSrc(DEFAULT_FALLBACK_BANNER)}
                    loading="eager"
                />
            </div>
        )
    }

    // Awwwards 80-85% viewport width with elegant margins & rounded corners
    if (bannerWidth === 'awwwards-80') {
        return (
            <div
                style={marginStyle}
                className="w-full lg:w-[80vw] relative left-1/2 -translate-x-1/2 rounded-md sm:rounded-xl lg:rounded-2xl overflow-hidden border border-sec/20 bg-fg/3 transition-all duration-300"
            >
                <img
                    className="w-full h-full object-cover max-h-[80vh]"
                    src={imgSrc}
                    alt={alt}
                    onError={() => setImgSrc(DEFAULT_FALLBACK_BANNER)}
                    loading="eager"
                />
            </div>
        )
    }

    // Full bleed width (Edge-to-edge 100vw)
    return (
        <div
            style={marginStyle}
            className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden transition-all duration-300"
        >
            <img
                className="w-full h-full object-cover"
                src={imgSrc}
                alt={alt}
                onError={() => setImgSrc(DEFAULT_FALLBACK_BANNER)}
                loading="eager"
            />
        </div>
    )
}

export default Banner
