'use client'

import React, { useMemo } from 'react'
import { WidgetInstance } from '@/lib/widgets-settings'
import { interpolateTokens } from './CustomHtmlWidget'
import ArticleBody from '@/components/blog/article/ArticleBody'

interface CustomMarkdownWidgetProps {
    widget: WidgetInstance
    articleData?: {
        title?: string
        slug?: string
        category?: string
        date?: string
        readingTimeMinutes?: number
        tags?: string[]
        [key: string]: any
    }
}

const CustomMarkdownWidget: React.FC<CustomMarkdownWidgetProps> = ({ widget, articleData }) => {
    const rawMarkdown = widget.config?.markdown || ''
    const showHeader = widget.config?.customTitle !== undefined ? Boolean(widget.config.customTitle) : true
    const titleText = widget.config?.customTitle || widget.title

    const processedMarkdown = useMemo(
        () => interpolateTokens(rawMarkdown, articleData),
        [rawMarkdown, articleData]
    )

    return (
        <div className="w-full h-full custom-markdown-widget-card">
            {showHeader && titleText && (
                <div className="pb-3">
                    <h2 className="text-lg text-sec font-mono font-medium">
                        {titleText}
                    </h2>
                </div>
            )}

            <div className="w-full p-4 rounded-2xl border border-sec/20 bg-black/2 dark:bg-white/2 text-sm leading-relaxed text-fg">
                {processedMarkdown ? (
                    <ArticleBody content={processedMarkdown} />
                ) : (
                    <div className="text-xs text-sec/60 italic font-mono py-1">
                        Empty Markdown Callout
                    </div>
                )}
            </div>
        </div>
    )
}

export default CustomMarkdownWidget
