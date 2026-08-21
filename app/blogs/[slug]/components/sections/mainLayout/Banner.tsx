'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

interface BannerProps {
    src?: string
    alt?: string
}

const Banner: React.FC<BannerProps> = ({
    src = 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fhew29obo84cj4o50024q.jpg',
    alt = 'Blog Banner',
}) => {
    const { settings } = useReaderSettings()
    const bannerWidth = settings.layout.bannerWidth || 'contained'
    const bannerMarginTop = settings.layout.bannerMarginTop ?? 24
    const bannerMarginBottom = settings.layout.bannerMarginBottom ?? 32

    if (!src) return null

    const marginStyle = {
        marginTop: `${bannerMarginTop}px`,
        marginBottom: `${bannerMarginBottom}px`,
    }

    // Contained width (default inside reading column)
    if (bannerWidth === 'contained') {
        return (
            <div
                style={marginStyle}
                className="w-full rounded-md sm:rounded-xl lg:rounded-2xl overflow-hidden border border-sec/15 bg-fg/2 transition-all duration-300"
            >
                <img
                    className="w-full h-full object-cover"
                    src={src}
                    alt={alt}
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
                    src={src}
                    alt={alt}
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
                    src={src}
                    alt={alt}
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
                src={src}
                alt={alt}
            />
        </div>
    )
}

export default Banner
