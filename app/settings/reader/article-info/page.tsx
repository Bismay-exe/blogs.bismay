'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import {
    SettingsPageHeader,
    SettingsCard,
    SettingsToggleRow,
} from '@/components/ui/settings'

export default function ArticleInfoSettingsPage() {
    const { settings, updateArticleInformation } = useReaderSettings()
    const { articleInformation } = settings

    return (
        <>
            <SettingsPageHeader title="Article Information" />

            {/* Card: Grouped Article Info Toggles */}
            <SettingsCard variant="divided">
                <SettingsToggleRow
                    title="Reading time"
                    description="Show estimated reading duration badge."
                    checked={articleInformation.showReadingTime}
                    onChange={(checked) => updateArticleInformation({ showReadingTime: checked })}
                />
                <SettingsToggleRow
                    title="Published date"
                    description="Show article publication timestamp."
                    checked={articleInformation.showPublishedDate}
                    onChange={(checked) => updateArticleInformation({ showPublishedDate: checked })}
                />
                <SettingsToggleRow
                    title="Category"
                    description="Show the article taxonomy topic chip."
                    checked={articleInformation.showCategory}
                    onChange={(checked) => updateArticleInformation({ showCategory: checked })}
                />
                <SettingsToggleRow
                    title="Share buttons"
                    description="Show social share & copy URL action button."
                    checked={articleInformation.showShareButtons}
                    onChange={(checked) => updateArticleInformation({ showShareButtons: checked })}
                />
            </SettingsCard>
        </>
    )
}
