'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { ContentWidth } from '@/lib/reader-settings/types'
import { ContentWidthPreviewSVG } from '@/components/settings/svgs/ContentWidthPreviewSVG'
import {
    SettingsPageHeader,
    SettingsCard,
    SettingsVisualCard,
    SettingsToggleRow,
} from '@/components/ui/settings'

export default function LayoutSettingsPage() {
    const { settings, updateLayout } = useReaderSettings()
    const { layout } = settings

    return (
        <>
            <SettingsPageHeader title="Reading Layout" />

            {/* Card 1: Content Width */}
            <SettingsCard
                title="Content Width"
                description="Control the reading column width for articles"
            >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                        { id: 'narrow', label: 'Narrow', width: '560px' },
                        { id: 'default', label: 'Default', width: '680px' },
                        { id: 'wide', label: 'Wide', width: '860px' },
                    ].map((w) => (
                        <SettingsVisualCard
                            key={w.id}
                            label={w.label}
                            sub={w.width}
                            isSelected={layout.contentWidth === w.id}
                            onClick={() => updateLayout({ contentWidth: w.id as ContentWidth })}
                            previewNode={
                                <ContentWidthPreviewSVG
                                    widthMode={w.id as ContentWidth}
                                    className="w-full h-auto"
                                />
                            }
                        />
                    ))}
                </div>
            </SettingsCard>

            {/* Card 2: Grouped Layout Toggles */}
            <SettingsCard variant="divided">
                <SettingsToggleRow
                    title="Navbar"
                    description="Show the top navigation header."
                    checked={layout.showNavbar}
                    onChange={(checked) => updateLayout({ showNavbar: checked })}
                />
                <SettingsToggleRow
                    title="Left sidebar"
                    description="Show the left rail container."
                    checked={layout.showLeftSidebar}
                    onChange={(checked) => updateLayout({ showLeftSidebar: checked })}
                />
                <SettingsToggleRow
                    title="Table of contents"
                    description="Keep the article heading minimap rail available."
                    checked={layout.showTableOfContents}
                    onChange={(checked) => updateLayout({ showTableOfContents: checked })}
                />
                <SettingsToggleRow
                    title="Right sidebar"
                    description="Show supporting article widgets and cards."
                    checked={layout.showRightSidebar}
                    onChange={(checked) => updateLayout({ showRightSidebar: checked })}
                />
            </SettingsCard>
        </>
    )
}
