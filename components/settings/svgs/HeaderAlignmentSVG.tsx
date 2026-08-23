'use client'

import React, { useId } from 'react'
import { HeaderAlignment } from '@/lib/reader-settings/types'

export interface HeaderAlignmentSVGProps extends React.SVGProps<SVGSVGElement> {
    alignment?: HeaderAlignment
    cardBgColor?: string
    elementColor?: string
    bannerColor?: string
}

export function HeaderAlignmentSVG({
    alignment = 'left',
    cardBgColor,
    elementColor,
    bannerColor,
    className = 'w-full h-auto',
    ...props
}: HeaderAlignmentSVGProps) {
    const rawId = useId()
    const uniqueId = rawId.replace(/[^a-zA-Z0-9_-]/g, '')

    const isCenter = alignment === 'center'
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
                <clipPath id={`align_clip_${uniqueId}`}>
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
            <g clipPath={`url(#align_clip_${uniqueId})`}>
                {isCenter ? (
                    <>
                        {/* 1. Centered Metadata */}
                        <rect x="108.5" y="27" width="29" height="5" rx="2.5" fill={elementColor} className={elementClass} />

                        {/* 2. Centered Title */}
                        <rect x="80.5" y="38" width="85" height="11" rx="4" fill={elementColor} className={elementClass} />

                        {/* 3. Banner */}
                        <rect x="63" y="55" width="120" height="47" rx="4" fill={bannerColor} className={bannerClass} />

                        {/* 4. Centered Subtitle / Author Bar */}
                        <rect x="98" y="114" width="50" height="7" rx="3.5" fill={elementColor} className={elementClass} />

                        {/* 5. Centered Body Content Lines */}
                        <rect x="67" y="126" width="112" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="65" y="133" width="116" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="63" y="140" width="120" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="66" y="147" width="114" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="65" y="154" width="117" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                    </>
                ) : (
                    <>
                        {/* 1. Left-aligned Metadata */}
                        <rect x="63" y="27" width="29" height="5" rx="2.5" fill={elementColor} className={elementClass} />

                        {/* 2. Left-aligned Title */}
                        <rect x="63" y="38" width="85" height="11" rx="4" fill={elementColor} className={elementClass} />

                        {/* 3. Banner */}
                        <rect x="63" y="55" width="120" height="47" rx="4" fill={bannerColor} className={bannerClass} />

                        {/* 4. Left-aligned Subtitle / Author Bar */}
                        <rect x="63" y="114" width="50" height="7" rx="3.5" fill={elementColor} className={elementClass} />

                        {/* 5. Left-aligned Body Content Lines */}
                        <rect x="63" y="126" width="112" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="63" y="133" width="116" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="63" y="140" width="120" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="63" y="147" width="114" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                        <rect x="63" y="154" width="117" height="5" rx="2.5" fill={elementColor} className={elementClass} />
                    </>
                )}
            </g>
        </svg>
    )
}

export default HeaderAlignmentSVG
