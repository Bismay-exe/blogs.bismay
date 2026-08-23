'use client'

import React, { useId } from 'react'
import { BannerWidth } from '@/lib/reader-settings/types'

export interface BannerWidthPreviewSVGProps extends React.SVGProps<SVGSVGElement> {
    widthMode?: BannerWidth
    cardBgColor?: string
    elementColor?: string
    bannerColor?: string
}

export function BannerWidthPreviewSVG({
    widthMode = 'contained',
    cardBgColor,
    elementColor,
    bannerColor,
    className = 'w-full h-auto',
    ...props
}: BannerWidthPreviewSVGProps) {
    const rawId = useId()
    const uniqueId = rawId.replace(/[^a-zA-Z0-9_-]/g, '')

    const bgClass = cardBgColor ? undefined : 'fill-[#FFFFFF] dark:fill-[#141414]'
    const elementClass = elementColor ? undefined : 'fill-[#E9E9E9] dark:fill-[#272727]'
    const bannerClass = bannerColor ? undefined : elementClass

    return (
        <svg
            viewBox="0 0 246 179"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <defs>
                <clipPath id={`card_clip_${uniqueId}`}>
                    <rect width="246" height="179" rx="14" fill="white" />
                </clipPath>
            </defs>

            {/* Background Card */}
            <rect
                width="246"
                height="179"
                rx="14"
                fill={cardBgColor}
                className={bgClass}
            />

            {/* Card Content clipped to outer rounded container */}
            <g clipPath={`url(#card_clip_${uniqueId})`}>
                {/* 1. Top Metadata bar (always at x=80, y=32) */}
                <rect
                    x="80"
                    y="32"
                    width="29"
                    height="5"
                    rx="2.5"
                    fill={elementColor}
                    className={elementClass}
                />

                {/* 2. Hero Banner based on widthMode */}
                {widthMode === 'contained' && (
                    <rect
                        x="80"
                        y="44"
                        width="86"
                        height="47"
                        rx="4"
                        fill={bannerColor}
                        className={bannerClass}
                    />
                )}

                {widthMode === 'breakout' && (
                    <rect
                        x="63"
                        y="44"
                        width="120"
                        height="47"
                        rx="4"
                        fill={bannerColor}
                        className={bannerClass}
                    />
                )}

                {widthMode === 'awwwards-80' && (
                    <rect
                        x="27"
                        y="44"
                        width="192"
                        height="58"
                        rx="4"
                        fill={bannerColor}
                        className={bannerClass}
                    />
                )}

                {widthMode === 'full-bleed' && (
                    <rect
                        x="0"
                        y="44"
                        width="246"
                        height="58"
                        fill={bannerColor}
                        className={bannerClass}
                    />
                )}

                {/* 3. Title bar below banner */}
                <rect
                    x="80"
                    y={widthMode === 'awwwards-80' || widthMode === 'full-bleed' ? 114 : 103}
                    width="36"
                    height="7"
                    rx="3.5"
                    fill={elementColor}
                    className={elementClass}
                />

                {/* 4. Body Content Lines */}
                {(widthMode === 'contained' || widthMode === 'breakout') && (
                    <>
                        <rect x="80" y="115" width="81" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="80" y="122" width="83" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="80" y="129" width="86" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="80" y="136" width="81" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="80" y="143" width="84" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="80" y="150" width="86" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="80" y="157" width="86" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                    </>
                )}

                {(widthMode === 'awwwards-80' || widthMode === 'full-bleed') && (
                    <>
                        <rect x="80" y="126" width="81" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="80" y="133" width="83" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="80" y="140" width="86" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="80" y="147" width="86" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="80" y="154" width="84" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="80" y="161" width="86" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="80" y="168" width="86" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                    </>
                )}
            </g>
        </svg>
    )
}

export default BannerWidthPreviewSVG
