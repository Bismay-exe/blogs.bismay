'use client'

import React from 'react'
import Banner from './mainLayout/Banner'
import Author from './mainLayout/Author'
import Body from './mainLayout/Body'
import Tags from './mainLayout/Tags'
import Title from './mainLayout/Title'
import TopBar from './mainLayout/TopBar'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { HeaderElementId } from '@/lib/reader-settings/types'

export interface MainLayoutProps {
    markdown?: string
    title?: string
    bannerUrl?: string
    bannerAlt?: string
    tags?: string[]
    category?: string
    date?: string
    readingTimeMinutes?: number
}

export const HeaderZone: React.FC<MainLayoutProps> = ({
    title,
    bannerUrl,
    bannerAlt,
    tags,
    category,
    date,
    readingTimeMinutes,
}) => {
    const { settings } = useReaderSettings()
    const { headerOrder, headerVisibility, contentWidth, titleWidth = 'contained' } = settings.layout

    const maxWidthClass =
        contentWidth === 'narrow'
            ? 'max-w-2xl'
            : contentWidth === 'wide'
            ? 'max-w-5xl'
            : 'max-w-3xl'

    const renderHeaderItem = (id: HeaderElementId) => {
        if (!headerVisibility[id]) return null

        switch (id) {
            case 'topbar':
                return (
                    <TopBar
                        key="topbar"
                        category={category}
                        date={date}
                        readingTimeMinutes={readingTimeMinutes}
                    />
                )
            case 'banner':
                return bannerUrl ? (
                    <Banner key="banner" src={bannerUrl} alt={bannerAlt || title} />
                ) : null
            case 'author':
                return <Author key="author" />
            case 'title':
                return <Title key="title" title={title} />
            case 'tags':
                return tags && tags.length > 0 ? (
                    <Tags key="tags" tags={tags} />
                ) : null
            default:
                return null
        }
    }

    return (
        <div className="w-full space-y-6">
            {headerOrder.map((id) => {
                if (id === 'banner') {
                    return renderHeaderItem('banner')
                }
                if (id === 'title' && titleWidth !== 'contained') {
                    return renderHeaderItem('title')
                }
                return (
                    <div key={id} className={`w-full ${maxWidthClass} mx-auto`}>
                        {renderHeaderItem(id)}
                    </div>
                )
            })}
        </div>
    )
}

const Main: React.FC<MainLayoutProps> = ({
    markdown = '',
    title,
    bannerUrl,
    bannerAlt,
    tags,
    category,
    date,
    readingTimeMinutes,
}) => {
    const { settings } = useReaderSettings()
    const { contentWidth } = settings.layout

    const maxWidthClass =
        contentWidth === 'narrow'
            ? 'max-w-2xl'
            : contentWidth === 'wide'
            ? 'max-w-5xl'
            : 'max-w-3xl'

    return (
        <div className={`w-full ${maxWidthClass} mx-auto min-w-0 flex-1 space-y-6 pb-16 transition-all duration-300`}>
            {/* Header Zone (Contained) */}
            <HeaderZone
                title={title}
                bannerUrl={bannerUrl}
                bannerAlt={bannerAlt}
                tags={tags}
                category={category}
                date={date}
                readingTimeMinutes={readingTimeMinutes}
            />

            {/* Content Zone (Body) */}
            <Body content={markdown} />
        </div>
    )
}

export default Main
