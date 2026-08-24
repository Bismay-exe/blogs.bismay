'use client'

import React, { useId } from 'react'
import { ContentWidth } from '@/lib/reader-settings/types'

export interface ContentWidthPreviewSVGProps extends React.SVGProps<SVGSVGElement> {
    widthMode?: ContentWidth
    cardBgColor?: string
    elementColor?: string
    bannerColor?: string
}

export function ContentWidthPreviewSVG({
    widthMode = 'default',
    cardBgColor,
    elementColor,
    bannerColor,
    className = 'w-full h-auto',
    ...props
}: ContentWidthPreviewSVGProps) {
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
                <clipPath id={`content_width_clip_${uniqueId}`}>
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
            <g clipPath={`url(#content_width_clip_${uniqueId})`}>
                {widthMode === 'narrow' && (
                    <>
                        {/* 1. Category Pill */}
                        <rect x="81" y="27" width="29" height="5" rx="2.5" fill={elementColor} className={elementClass} />

                        {/* 2. Title */}
                        <rect x="81" y="36" width="72" height="11" rx="4" fill={elementColor} className={elementClass} />

                        {/* 3. Hero Banner */}
                        <rect x="81" y="52" width="98" height="47" rx="4" fill={bannerColor} className={bannerClass} />

                        {/* 4. Subtitle / Byline */}
                        <rect x="81" y="106" width="32" height="7" rx="3.5" fill={elementColor} className={elementClass} />

                        {/* 5. Body Content Lines */}
                        <rect x="81" y="119" width="92" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="81" y="126" width="95" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="81" y="133" width="98" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="81" y="140" width="93" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="81" y="147" width="96" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="81" y="154" width="98" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="81" y="161" width="98" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                    </>
                )}

                {widthMode === 'default' && (
                    <>
                        {/* 1. Category Pill */}
                        <rect x="55" y="27" width="32" height="5" rx="2.5" fill={elementColor} className={elementClass} />

                        {/* 2. Title */}
                        <rect x="55" y="36" width="96" height="11" rx="4" fill={elementColor} className={elementClass} />

                        {/* 3. Hero Banner */}
                        <rect x="55" y="52" width="136" height="53" rx="4" fill={bannerColor} className={bannerClass} />

                        {/* 4. Subtitle / Byline */}
                        <rect x="55" y="112" width="56" height="7" rx="3.5" fill={elementColor} className={elementClass} />

                        {/* 5. Body Content Lines */}
                        <rect x="55" y="125" width="128" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="55" y="132" width="132" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="55" y="139" width="136" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="55" y="146" width="130" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="55" y="153" width="134" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="55" y="160" width="136" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="55" y="167" width="136" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                    </>
                )}

                {widthMode === 'wide' && (
                    <>
                        {/* 1. Category Pill */}
                        <rect x="27" y="27" width="57" height="5" rx="2.5" fill={elementColor} className={elementClass} />

                        {/* 2. Title */}
                        <rect x="27" y="36" width="141" height="11" rx="4" fill={elementColor} className={elementClass} />

                        {/* 3. Hero Banner */}
                        <rect x="27" y="53" width="192" height="63" rx="4" fill={bannerColor} className={bannerClass} />

                        {/* 4. Subtitle / Byline */}
                        <rect x="27" y="123" width="63" height="7" rx="3.5" fill={elementColor} className={elementClass} />

                        {/* 5. Body Content Lines */}
                        <rect x="27" y="135" width="182" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="27" y="142" width="186" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="27" y="149" width="192" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="27" y="156" width="184" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="27" y="163" width="190" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="27" y="170" width="192" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                    </>
                )}
            </g>
        </svg>
    )
}

export default ContentWidthPreviewSVG
