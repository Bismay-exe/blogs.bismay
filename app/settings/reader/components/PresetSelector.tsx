'use client'

import React from 'react'
import { Sparkles, Minimize2, BookOpen, Terminal, Maximize2, Award, Check } from 'lucide-react'
import { READER_PRESETS } from '@/lib/reader-settings/presets'
import { ReaderPresetId } from '@/lib/reader-settings/types'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

const PRESET_ICONS: Record<ReaderPresetId, React.ElementType> = {
    default: Sparkles,
    awwwards: Award,
    minimal: Minimize2,
    magazine: BookOpen,
    developer: Terminal,
    'distraction-free': Maximize2,
}

export const PresetSelector: React.FC = () => {
    const { activePreset, applyPreset } = useReaderSettings()

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-bold text-fg tracking-tight">One-Click Reading Presets</h3>
                    <p className="text-xs text-sec mt-0.5">
                        Instantly transform the entire reading experience with curated presets.
                    </p>
                </div>
                {activePreset === 'custom' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-mono text-[11px] font-medium">
                        Custom Configuration
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                {READER_PRESETS.map((preset) => {
                    const Icon = PRESET_ICONS[preset.id] || Sparkles
                    const isSelected = activePreset === preset.id

                    return (
                        <button
                            key={preset.id}
                            type="button"
                            onClick={() => applyPreset(preset.id)}
                            className={`group relative flex flex-col justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                                isSelected
                                    ? 'bg-accent/10 border-accent shadow-md shadow-accent/10 ring-1 ring-accent/30'
                                    : 'bg-fg/2 hover:bg-fg/4 border-sec/20 hover:border-sec/40'
                            }`}
                        >
                            <div className="space-y-2.5">
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                                            isSelected
                                                ? 'bg-accent text-white dark:text-[#0C0C0C]'
                                                : 'bg-fg/5 text-sec group-hover:text-fg group-hover:bg-fg/10'
                                        }`}
                                    >
                                        <Icon size={16} />
                                    </div>
                                    {preset.badge && (
                                        <span
                                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                                                isSelected
                                                    ? 'bg-accent/25 text-accent font-semibold'
                                                    : 'bg-fg/5 text-sec/80'
                                            }`}
                                        >
                                            {preset.badge}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="text-xs font-bold text-fg group-hover:text-accent transition-colors">
                                            {preset.name}
                                        </h4>
                                        {isSelected && (
                                            <Check size={13} className="text-accent stroke-[3]" />
                                        )}
                                    </div>
                                    <p className="text-[11px] text-sec line-clamp-2 mt-1 leading-relaxed">
                                        {preset.description}
                                    </p>
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
