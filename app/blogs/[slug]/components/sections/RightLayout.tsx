'use client'

import React from 'react'
import Profile from './rightLayout/Profile'
import Series from './rightLayout/Series'
import SubscribeForm from './rightLayout/SubscribeForm'
import Socials from './rightLayout/Socials'
import CommentForm from './rightLayout/CommentForm'
import CustomHtmlWidget from './rightLayout/CustomHtmlWidget'
import CustomMarkdownWidget from './rightLayout/CustomMarkdownWidget'
import { WidgetErrorBoundary } from './rightLayout/WidgetErrorBoundary'
import { useWidgetsSettings, WidgetInstance } from '@/lib/widgets-settings'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

interface RightLayoutProps {
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

export const renderWidgetComponent = (
    widget: WidgetInstance,
    articleData?: Record<string, any>,
    forceTheme?: 'dark' | 'light'
) => {
    switch (widget.type) {
        case 'profile':
            return <Profile />
        case 'series':
            return <Series />
        case 'subscribeForm':
            return <SubscribeForm />
        case 'socialLinks':
            return <Socials />
        case 'commentForm':
            return <CommentForm />
        case 'customHtml':
            return <CustomHtmlWidget widget={widget} articleData={articleData} forceTheme={forceTheme} />
        case 'customMarkdown':
            return <CustomMarkdownWidget widget={widget} articleData={articleData} />
        default:
            return null
    }
}

const RightLayout: React.FC<RightLayoutProps> = ({ articleData }) => {
    const { settings } = useReaderSettings()
    const { activeWidgets, showRightSidebar: widgetsShowRightSidebar } = useWidgetsSettings()
    const showRightSidebar = (settings.layout?.showRightSidebar ?? true) && widgetsShowRightSidebar

    if (!showRightSidebar) {
        return null
    }

    if (activeWidgets.length === 0) {
        return null
    }

    return (
        <aside className="w-full sm:max-w-76 shrink-0 h-full bg-transparent space-y-10 pt-7 pb-50 transition-all duration-300">
            {activeWidgets.map((widget) => (
                <WidgetErrorBoundary key={widget.id} widgetTitle={widget.title}>
                    {renderWidgetComponent(widget, articleData)}
                </WidgetErrorBoundary>
            ))}
        </aside>
    )
}

export default RightLayout
