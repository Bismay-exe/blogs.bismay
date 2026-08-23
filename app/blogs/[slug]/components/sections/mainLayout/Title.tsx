'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

interface TitleProps {
    title?: string
}

const Title: React.FC<TitleProps> = ({ title }) => {
    const { settings } = useReaderSettings()
    const headerAlignment = settings.articleLayout?.headerAlignment || settings.layout?.headerAlignment || 'left'
    const titleWidth = settings.articleLayout?.titleWidth || settings.layout?.titleWidth || 'contained'
    const titleUppercase = settings.typography?.titleFont?.titleUppercase ?? settings.typography?.titleUppercase ?? false
    const isCenter = headerAlignment === 'center'

    const titleElement = (
        <h1
            style={{
                fontFamily: 'var(--reader-title-font, var(--reader-heading-font, inherit))',
                fontWeight: 'var(--reader-title-font-weight, 700)',
                fontSize: 'calc(clamp(2rem, 4.5vw, 3.75rem) * var(--reader-title-scale, 1))',
            }}
            className={`tracking-tight text-fg leading-[0.9] pt-2 transition-all ${
                isCenter ? 'text-center' : 'text-left'
            } ${titleUppercase ? 'uppercase' : 'normal-case'}`}
        >
            {title || '🚀 Learning React Series'}
        </h1>
    )

    if (titleWidth === 'contained') {
        return titleElement
    }

    if (titleWidth === 'breakout') {
        return (
            <div className="w-full max-w-5xl mx-auto transition-all duration-300">
                {titleElement}
            </div>
        )
    }

    if (titleWidth === 'awwwards-80') {
        return (
            <div className="w-full lg:w-[80vw] relative left-1/2 -translate-x-1/2 transition-all duration-300">
                {titleElement}
            </div>
        )
    }

    // Full bleed width
    return (
        <div className="w-screen relative left-1/2 -translate-x-1/2 px-4 sm:px-8 transition-all duration-300">
            {titleElement}
        </div>
    )
}

export default Title
