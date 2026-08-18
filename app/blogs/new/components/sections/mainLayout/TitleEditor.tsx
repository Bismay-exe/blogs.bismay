'use client'

import React from 'react'

interface TitleEditorProps {
    title: string
    subtitle?: string
    onTitleChange: (title: string) => void
    onSubtitleChange?: (subtitle: string) => void
}

const TitleEditor: React.FC<TitleEditorProps> = ({
    title,
    subtitle = '',
    onTitleChange,
    onSubtitleChange,
}) => {
    return (
        <div className="space-y-2">
            <textarea
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="🚀 Type your article title here..."
                rows={2}
                className="w-full bg-transparent resize-none text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-fg placeholder:text-sec/30 outline-none border-b border-transparent focus:border-accent/40 transition-colors leading-tight"
            />
            {onSubtitleChange && (
                <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => onSubtitleChange(e.target.value)}
                    placeholder="Add an optional subtitle / summary line..."
                    className="w-full bg-transparent text-sm sm:text-base text-sec placeholder:text-sec/30 outline-none border-b border-transparent focus:border-sec/30 transition-colors py-1"
                />
            )}
        </div>
    )
}

export default TitleEditor
