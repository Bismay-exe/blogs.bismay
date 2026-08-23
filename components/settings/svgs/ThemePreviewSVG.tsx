'use client'

import React, { useId } from 'react'
import { ReaderThemeMode } from '@/lib/reader-settings/types'

export interface ThemePreviewSVGProps extends React.SVGProps<SVGSVGElement> {
    mode?: ReaderThemeMode | 'adaptive'
    cardBgColor?: string
    elementColor?: string
}

export function ThemePreviewSVG({
    mode = 'adaptive',
    cardBgColor,
    elementColor,
    className = 'w-full h-auto',
    ...props
}: ThemePreviewSVGProps) {
    const rawId = useId()
    const uniqueId = rawId.replace(/[^a-zA-Z0-9_-]/g, '')

    let bgFill = cardBgColor
    let elementFill = elementColor
    let isSystemGradient = false

    if (!cardBgColor || !elementColor) {
        if (mode === 'dark') {
            bgFill = bgFill || '#141414'
            elementFill = elementFill || '#272727'
        } else if (mode === 'light') {
            bgFill = bgFill || '#FFFFFF'
            elementFill = elementFill || '#e4e4e7'
        } else if (mode === 'system') {
            isSystemGradient = true
            elementFill = elementFill || '#888888'
        }
    }

    const adaptiveBg = mode === 'adaptive' && !cardBgColor ? 'fill-[#FFFFFF] dark:fill-[#141414]' : undefined
    const adaptiveElement = mode === 'adaptive' && !elementColor ? 'fill-[#E9E9E9] dark:fill-[#272727]' : undefined

    return (
        <svg
            viewBox="0 0 246 179"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <defs>
                <clipPath id={`clip_${uniqueId}`}>
                    <rect width="246" height="144" fill="white" transform="translate(0 35)" />
                </clipPath>
                {isSystemGradient && (
                    <linearGradient
                        id={`grad_${uniqueId}`}
                        x1="0"
                        y1="0"
                        x2="246"
                        y2="0"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="#141414" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                )}
            </defs>

            {/* Background Card */}
            <rect
                width="246"
                height="179"
                rx="14"
                fill={isSystemGradient ? `url(#grad_${uniqueId})` : bgFill}
                className={adaptiveBg}
            />

            {/* Mock Article Content Wireframe */}
            <g clipPath={`url(#clip_${uniqueId})`}>
                <rect x="63" y="48" width="29" height="5" rx="2.5" fill={elementFill} className={adaptiveElement} />
                <rect x="63" y="59" width="85" height="11" rx="4" fill={elementFill} className={adaptiveElement} />
                <rect x="63" y="76" width="120" height="47" rx="4" fill={elementFill} className={adaptiveElement} />
                <rect x="63" y="135" width="50" height="7" rx="3.5" fill={elementFill} className={adaptiveElement} />
                <rect x="63" y="147" width="113" height="5" rx="2.5" fill={elementFill} className={adaptiveElement} />
                <rect x="63" y="154" width="116" height="5" rx="2.5" fill={elementFill} className={adaptiveElement} />
                <rect x="63" y="161" width="120" height="5" rx="2.5" fill={elementFill} className={adaptiveElement} />
                <rect x="63" y="168" width="114" height="5" rx="2.5" fill={elementFill} className={adaptiveElement} />
                <rect x="63" y="175" width="117" height="5" rx="2.5" fill={elementFill} className={adaptiveElement} />
            </g>
        </svg>
    )
}
export default ThemePreviewSVG
