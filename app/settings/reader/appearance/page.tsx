'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { ThemePreviewSVG } from '@/components/settings/svgs/ThemePreviewSVG'
import {
    SettingsPageHeader,
    SettingsCard,
    SettingsVisualCard,
    SettingsToggleRow,
} from '@/components/ui/settings'

const ACCENT_COLORS = [
    { name: 'Coral Red', value: '#ff6b6b' },
    { name: 'Sky Blue', value: '#4d96ff' },
    { name: 'Lavender Purple', value: '#9b51e0' },
    { name: 'Amber Gold', value: '#ffd93d' },
    { name: 'Lime Green', value: '#6bcb77' },
]

export default function AppearanceSettingsPage() {
    const { settings, updateAppearance } = useReaderSettings()

    const { appearance } = settings
    const activeTheme = appearance.theme || 'system'
    const activeAccent = appearance.accentColor || '#9b51e0'

    return (
        <>
            <SettingsPageHeader title="Appearance" />

            {/* Card 1: Theme Visual Wireframe Selector */}
            <SettingsCard
                title="Theme"
                description="Customize your UI color mode"
            >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <SettingsVisualCard
                        label="Dark"
                        sub="#141414"
                        isSelected={activeTheme === 'dark'}
                        onClick={() => updateAppearance({ theme: 'dark' })}
                        previewNode={<ThemePreviewSVG mode="dark" className="w-full h-auto" />}
                    />
                    <SettingsVisualCard
                        label="Light"
                        sub="Clean"
                        isSelected={activeTheme === 'light'}
                        onClick={() => updateAppearance({ theme: 'light' })}
                        previewNode={<ThemePreviewSVG mode="light" className="w-full h-auto" />}
                    />
                    <SettingsVisualCard
                        label="System"
                        sub="Auto"
                        isSelected={activeTheme === 'system'}
                        onClick={() => updateAppearance({ theme: 'system' })}
                        previewNode={<ThemePreviewSVG mode="system" className="w-full h-auto" />}
                    />
                </div>
            </SettingsCard>

            {/* Card 2: Accent Color Circles */}
            <SettingsCard
                title="Accent Color"
                description="A small touch of personality"
            >
                <div className="flex items-center gap-3">
                    {ACCENT_COLORS.map((color) => {
                        const isSelected = activeAccent.toLowerCase() === color.value.toLowerCase()
                        return (
                            <button
                                key={color.value}
                                type="button"
                                onClick={() => updateAppearance({ accentColor: color.value })}
                                className={`w-9 h-9 rounded-full transition-transform cursor-pointer ${
                                    isSelected ? 'scale-115 ring-3 ring-fg/30 shadow-md' : 'hover:scale-105 opacity-80 hover:opacity-100'
                                }`}
                                style={{ backgroundColor: color.value }}
                                title={color.name}
                            />
                        )
                    })}
                </div>
            </SettingsCard>

            {/* Card 3: Grouped Switch Rows */}
            <SettingsCard variant="divided">
                <SettingsToggleRow
                    title="Reading progress"
                    description="Show your progress while scrolling."
                    checked={appearance.showReadingProgress}
                    onChange={(checked) => updateAppearance({ showReadingProgress: checked })}
                />
                <SettingsToggleRow
                    title="Reduce motion"
                    description="Minimize animations and transitions."
                    checked={appearance.reduceMotion}
                    onChange={(checked) => updateAppearance({ reduceMotion: checked })}
                />
            </SettingsCard>
        </>
    )
}
