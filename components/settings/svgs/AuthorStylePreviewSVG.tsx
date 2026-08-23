'use client'

import React, { useId } from 'react'
import { AuthorStyle } from '@/lib/reader-settings/types'

export interface AuthorStylePreviewSVGProps extends React.SVGProps<SVGSVGElement> {
    styleMode?: AuthorStyle
    cardBgColor?: string
    elementColor?: string
    bannerColor?: string
}

export function AuthorStylePreviewSVG({
    styleMode = 'default',
    cardBgColor,
    elementColor,
    bannerColor,
    className = 'w-full h-auto',
    ...props
}: AuthorStylePreviewSVGProps) {
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
                <clipPath id={`author_clip_${uniqueId}`}>
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

            {/* Content Wireframe */}
            <g clipPath={`url(#author_clip_${uniqueId})`}>
                {/* 1. Hero Banner */}
                <rect
                    x="28"
                    y="18"
                    width="190"
                    height="74"
                    rx="8"
                    fill={bannerColor}
                    className={bannerClass}
                />

                {/* 2. Author Presentation Styles */}
                {styleMode === 'default' && (
                    <>
                        {/* Square Avatar */}
                        <rect
                            x="28"
                            y="100"
                            width="28"
                            height="28"
                            rx="6"
                            fill={elementColor}
                            className={elementClass}
                        />

                        {/* Name Line */}
                        <rect
                            x="64"
                            y="106"
                            width="58"
                            height="6"
                            rx="3"
                            fill={elementColor}
                            className={elementClass}
                        />

                        {/* Bio / Info Line */}
                        <rect
                            x="64"
                            y="117"
                            width="70"
                            height="5"
                            rx="2.5"
                            fill={elementColor}
                            className={elementClass}
                        />

                        {/* Article Text Lines */}
                        <rect x="28" y="138" width="176" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                        <rect x="28" y="146" width="182" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                        <rect x="28" y="154" width="190" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                        <rect x="28" y="162" width="184" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                        <rect x="28" y="170" width="190" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                    </>
                )}

                {styleMode === 'overlap' && (
                    <>
                        {/* Outer Cutout Border Ring for overlapping avatar */}
                        <rect
                            x="41"
                            y="71"
                            width="34"
                            height="34"
                            rx="8"
                            fill={cardBgColor}
                            className={bgClass}
                        />

                        {/* Floating Square Avatar Overlapping Banner */}
                        <rect
                            x="44"
                            y="74"
                            width="28"
                            height="28"
                            rx="6"
                            fill={elementColor}
                            className={elementClass}
                        />

                        {/* Name Line Below Avatar */}
                        <rect
                            x="44"
                            y="111"
                            width="58"
                            height="6"
                            rx="3"
                            fill={elementColor}
                            className={elementClass}
                        />

                        {/* Bio / Info Line */}
                        <rect
                            x="44"
                            y="121"
                            width="70"
                            height="5"
                            rx="2.5"
                            fill={elementColor}
                            className={elementClass}
                        />

                        {/* Article Text Lines */}
                        <rect x="28" y="138" width="176" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                        <rect x="28" y="146" width="182" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                        <rect x="28" y="154" width="190" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                        <rect x="28" y="162" width="184" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                        <rect x="28" y="170" width="190" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                    </>
                )}

                {styleMode === 'compact' && (
                    <>
                        {/* Small Circular Avatar */}
                        <circle
                            cx="34"
                            cy="106"
                            r="6"
                            fill={elementColor}
                            className={elementClass}
                        />

                        {/* Compact Metadata Line */}
                        <rect
                            x="46"
                            y="103.5"
                            width="38"
                            height="5"
                            rx="2.5"
                            fill={elementColor}
                            className={elementClass}
                        />

                        {/* Article Text Lines */}
                        <rect x="28" y="120" width="176" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                        <rect x="28" y="128" width="182" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                        <rect x="28" y="136" width="190" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                        <rect x="28" y="144" width="184" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                        <rect x="28" y="152" width="190" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                        <rect x="28" y="160" width="178" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                        <rect x="28" y="168" width="186" height="4.5" rx="2.25" fill={elementColor} className={elementClass} />
                    </>
                )}
            </g>
        </svg>
    )
}

export default AuthorStylePreviewSVG
