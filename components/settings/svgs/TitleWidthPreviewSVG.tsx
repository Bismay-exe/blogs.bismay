'use client'

import React, { useId } from 'react'
import { TitleWidth } from '@/lib/reader-settings/types'

export interface TitleWidthPreviewSVGProps extends React.SVGProps<SVGSVGElement> {
    widthMode?: TitleWidth
    cardBgColor?: string
    elementColor?: string
    bannerColor?: string
}

export function TitleWidthPreviewSVG({
    widthMode = 'contained',
    cardBgColor,
    elementColor,
    bannerColor,
    className = 'w-full h-auto',
    ...props
}: TitleWidthPreviewSVGProps) {
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
                <clipPath id={`title_clip_${uniqueId}`}>
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
            <g clipPath={`url(#title_clip_${uniqueId})`}>
                {/* 1. Top Metadata bar (always at x=80, y=27) */}
                <rect
                    x="80"
                    y="27"
                    width="29"
                    height="5"
                    rx="2.5"
                    fill={elementColor}
                    className={elementClass}
                />

                {/* 2. Title (H1) Lines based on widthMode */}
                {widthMode === 'contained' && (
                    <>
                        <rect x="80" y="38" width="82" height="8" rx="4" fill={elementColor} className={elementClass} />
                        <rect x="80" y="49" width="86" height="8" rx="4" fill={elementColor} className={elementClass} />
                        <rect x="80" y="60" width="45" height="8" rx="4" fill={elementColor} className={elementClass} />
                    </>
                )}

                {widthMode === 'breakout' && (
                    <>
                        <rect x="63" y="38" width="114" height="8" rx="4" fill={elementColor} className={elementClass} />
                        <rect x="63" y="49" width="120" height="8" rx="4" fill={elementColor} className={elementClass} />
                        <rect x="63" y="60" width="62" height="8" rx="4" fill={elementColor} className={elementClass} />
                    </>
                )}

                {widthMode === 'awwwards-80' && (
                    <>
                        <rect x="27" y="38" width="182" height="8" rx="4" fill={elementColor} className={elementClass} />
                        <rect x="27" y="49" width="192" height="8" rx="4" fill={elementColor} className={elementClass} />
                        <rect x="27" y="60" width="98" height="8" rx="4" fill={elementColor} className={elementClass} />
                    </>
                )}

                {widthMode === 'full-bleed' && (
                    <>
                        <rect x="10" y="38" width="214" height="8" rx="4" fill={elementColor} className={elementClass} />
                        <rect x="10" y="49" width="226" height="8" rx="4" fill={elementColor} className={elementClass} />
                        <rect x="10" y="60" width="108" height="8" rx="4" fill={elementColor} className={elementClass} />
                    </>
                )}

                {/* 3. Hero Banner below title */}
                <rect
                    x="80"
                    y="75"
                    width="86"
                    height="47"
                    rx="4"
                    fill={bannerColor}
                    className={bannerClass}
                />

                {/* 4. Subtitle / Author Bar */}
                <rect
                    x="80"
                    y="130"
                    width="36"
                    height="7"
                    rx="3.5"
                    fill={elementColor}
                    className={elementClass}
                />

                {/* 5. Body Content Lines */}
                <rect x="80" y="142" width="81" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                <rect x="80" y="149" width="83" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                <rect x="80" y="156" width="86" height="5" rx="2.5" fill={elementColor} className={elementClass} />
            </g>
        </svg>
    )
}

export default TitleWidthPreviewSVG
