'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { ReaderPresetId } from '@/lib/reader-settings/types'
import { READER_PRESETS } from '@/lib/reader-settings/presets'
import {
    SettingsPageHeader,
    SettingsCard,
    SettingsOptionCard,
} from '@/components/ui/settings'

export default function PresetsSettingsPage() {
    const { activePreset, applyPreset } = useReaderSettings()

    return (
        <>
            <SettingsPageHeader title="Reading Presets" />

            {/* Card 1: 1-Click Presets Grid */}
            <SettingsCard
                title="Curated Presets"
                description="Instantly transform article typography, widths, theme, and layout"
            >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {READER_PRESETS.map((preset) => (
                        <SettingsOptionCard
                            key={preset.id}
                            title={preset.name}
                            description={preset.description}
                            badge={preset.badge}
                            icon={preset.iconSymbol || '◫'}
                            isSelected={activePreset === preset.id}
                            onClick={() => applyPreset(preset.id as ReaderPresetId)}
                        />
                    ))}
                </div>
            </SettingsCard>
        </>
    )
}
