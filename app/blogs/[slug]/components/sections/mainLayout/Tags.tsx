'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

interface TagsProps {
    tags?: string[]
}

const defaultTags = ['react', 'javascript', 'webdev', 'beginners']

const Tags: React.FC<TagsProps> = ({ tags = defaultTags }) => {
    const { settings } = useReaderSettings()
    const { headerAlignment } = settings.layout
    const isCenter = headerAlignment === 'center'
    const list = tags && tags.length > 0 ? tags : defaultTags

    return (
        <div className={`flex gap-3 items-center text-xs font-mono text-sec flex-wrap ${isCenter ? 'justify-center mx-auto' : 'justify-start'}`}>
            {list.map((tag, idx) => {
                const cleaned = tag.replace(/^#/, '')
                return (
                    <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-fg/4 hover:bg-fg/8 hover:text-fg border border-sec/15 cursor-pointer transition-all duration-200"
                    >
                        #{cleaned}
                    </span>
                )
            })}
        </div>
    )
}

export default Tags
