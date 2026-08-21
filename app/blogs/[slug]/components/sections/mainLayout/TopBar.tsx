'use client'

import { ArrowLeftIcon, Calendar, Clock } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

interface TopBarProps {
    category?: string
    date?: string
    readingTimeMinutes?: number
}

const TopBar: React.FC<TopBarProps> = ({
    category = 'Engineering',
    date = 'Published',
    readingTimeMinutes = 5,
}) => {
    const { settings } = useReaderSettings()
    const { headerAlignment } = settings.layout
    const { appearance } = settings
    const isCenter = headerAlignment === 'center'

    return (
        <div className="pt-7">
            <div className={`md:hidden pb-5 translate-x-8 w-fit ${isCenter ? 'mx-auto' : ''}`}>
                <Link href="/blogs" className="project flex items-center gap-2 w-fit hover:text-accent transition-colors">
                    <ArrowLeftIcon size={20} className="list-line" /> back to blogs
                </Link>
            </div>
            <div className={`flex flex-wrap items-center gap-3.5 text-xs font-mono text-sec ${isCenter ? 'justify-center' : 'justify-start'}`}>
                {appearance.showCategory && category && (
                    <div className="bg-accent text-bg font-bold tracking-wider uppercase px-3 py-1 w-fit rounded-xl">
                        {category}
                    </div>
                )}
                {appearance.showPublishedDate && date && (
                    <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-sec/70" />
                        <span>{date}</span>
                    </span>
                )}
                {appearance.showReadingTime && readingTimeMinutes && (
                    <>
                        <div className="aspect-square w-1 bg-fg/40 rounded-full" />
                        <span className="flex items-center gap-1.5">
                            <Clock size={13} className="text-sec/70" />
                            <span>{readingTimeMinutes} min read</span>
                        </span>
                    </>
                )}
            </div>
        </div>
    )
}

export default TopBar
