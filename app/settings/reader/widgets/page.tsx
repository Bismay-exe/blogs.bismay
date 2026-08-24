'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import {
    SettingsPageHeader,
    SettingsCard,
    SettingsToggleRow,
} from '@/components/ui/settings'

export default function WidgetsSettingsPage() {
    const { settings, toggleWidget } = useReaderSettings()
    const { widgets } = settings

    return (
        <>
            <SettingsPageHeader title="Sidebar Widgets" />

            {/* Card: Grouped Widgets Switches */}
            <SettingsCard variant="divided">
                <SettingsToggleRow
                    title="Author profile"
                    description="Show author bio and avatar in the sidebar."
                    checked={widgets.profile}
                    onChange={() => toggleWidget('profile')}
                />
                <SettingsToggleRow
                    title="Series navigation"
                    description="Show tutorial chapters and series roadmap card."
                    checked={widgets.series}
                    onChange={() => toggleWidget('series')}
                />
                <SettingsToggleRow
                    title="Subscribe newsletter"
                    description="Show the 1-click email newsletter form."
                    checked={widgets.subscribeForm}
                    onChange={() => toggleWidget('subscribeForm')}
                />
                <SettingsToggleRow
                    title="Social links"
                    description="Show links to GitHub, X/Twitter, and LinkedIn."
                    checked={widgets.socialLinks}
                    onChange={() => toggleWidget('socialLinks')}
                />
            </SettingsCard>
        </>
    )
}
