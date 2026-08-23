'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { ReaderPresetId } from '@/lib/reader-settings/types'
import { READER_PRESETS } from '@/lib/reader-settings/presets'
import { ReaderNav } from '@/components/settings/ReaderNav'

export default function PresetsSettingsPage() {
    const { activePreset, applyPreset, isLoaded } = useReaderSettings()

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="w-8 h-8 rounded-full border-2 border-sec/30 border-t-fg animate-spin" />
            </div>
        )
    }

    return (
        <div className="relative bg-bg text-fg py-12 pl-18 pr-3 sm:pr-6">
            <ReaderNav />
            <div className="max-w-2xl mx-auto space-y-4">

                <h1 className="text-3xl font-bold tracking-tight text-fg mb-6">
                    Reading Presets
                </h1>

                {/* Card 1: 1-Click Presets Grid */}
                <div className="rounded-[28px] bg-fg/5 px-4 py-5 sm:px-7 sm:py-7 space-y-4">
                    <div>
                        <h2 className="text-base font-bold text-fg">Curated Presets</h2>
                        <p className="text-xs text-sec mt-0.5">
                            Instantly transform article typography, widths, theme, and layout
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {READER_PRESETS.map((preset) => {
                            const isSelected = activePreset === preset.id
                            return (
                                <button
                                    key={preset.id}
                                    type="button"
                                    onClick={() => applyPreset(preset.id as ReaderPresetId)}
                                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${isSelected
                                            ? 'border-fg bg-fg text-bg shadow-lg shadow-fg/10'
                                            : 'border-sec/15 bg-bg text-fg hover:border-sec/30 hover:shadow-lg shadow-fg/10'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="font-mono text-base">{preset.iconSymbol || '◫'}</span>
                                        {preset.badge && (
                                            <span
                                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isSelected ? 'bg-sec text-fg' : 'bg-sec/30 text-sec'
                                                    }`}
                                            >
                                                {preset.badge}
                                            </span>
                                        )}
                                    </div>
                                    <strong className="block text-sm font-bold">{preset.name}</strong>
                                    <p
                                        className={`text-xs sm:text-sm mt-1 leading-tight ${isSelected ? 'text-sec' : 'text-sec'
                                            }`}
                                    >
                                        {preset.description}
                                    </p>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
