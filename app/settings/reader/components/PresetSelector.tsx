'use client'

import React from 'react'
import {
    Sparkles,
    Minimize2,
    BookOpen,
    Terminal,
    Maximize2,
    Award,
    Check,
    User,
    Compass,
    Layers,
} from 'lucide-react'
import { READER_PRESETS } from '@/lib/reader-settings/presets'
import { ReaderPresetId } from '@/lib/reader-settings/types'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

const PRESET_ICONS: Record<ReaderPresetId, React.ElementType> = {
    default: Sparkles,
    creator: User,
    awwwards: Award,
    minimal: Minimize2,
    magazine: BookOpen,
    developer: Terminal,
    'distraction-free': Maximize2,
}

const PRESET_GRADIENTS: Record<ReaderPresetId, string> = {
    default: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    creator: 'from-amber-500/20 via-orange-500/10 to-transparent',
    awwwards: 'from-rose-500/20 via-pink-500/10 to-transparent',
    minimal: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    magazine: 'from-sky-500/20 via-blue-500/10 to-transparent',
    developer: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    'distraction-free': 'from-cyan-500/20 via-teal-500/10 to-transparent',
}

export const PresetSelector: React.FC = () => {
    const { activePreset, applyPreset } = useReaderSettings()

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center border border-accent/25">
                        <Sparkles size={16} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-fg tracking-tight">
                            One-Click Reading Presets
                        </h3>
                        <p className="text-xs text-sec mt-0.5">
                            Transform layout, fonts, margins, breakout widths, and widgets in 1 click.
                        </p>
                    </div>
                </div>

                {activePreset === 'custom' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-mono text-[11px] font-bold shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        Custom Configuration
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold">
                        <Check size={11} strokeWidth={3} />
                        Preset Active: {activePreset.toUpperCase()}
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {READER_PRESETS.map((preset) => {
                    const Icon = PRESET_ICONS[preset.id] || Sparkles
                    const isSelected = activePreset === preset.id
                    const gradient = PRESET_GRADIENTS[preset.id] || PRESET_GRADIENTS.default

                    return (
                        <button
                            key={preset.id}
                            type="button"
                            onClick={() => applyPreset(preset.id)}
                            className={`group relative flex flex-col justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer overflow-hidden select-none ${
                                isSelected
                                    ? 'bg-linear-to-br ' +
                                      gradient +
                                      ' border-accent/80 shadow-md shadow-accent/10 ring-1 ring-accent/40'
                                    : 'bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] border-sec/15 hover:border-sec/35'
                            }`}
                        >
                            <div className="space-y-3 w-full">
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                                            isSelected
                                                ? 'bg-accent text-white dark:text-[#0C0C0C] shadow-sm shadow-accent/30 scale-105'
                                                : 'bg-black/5 dark:bg-white/5 text-sec group-hover:text-fg group-hover:bg-black/10 dark:group-hover:bg-white/10'
                                        }`}
                                    >
                                        <Icon size={16} />
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        {preset.badge && (
                                            <span
                                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                                                    isSelected
                                                        ? 'bg-accent/25 text-accent border border-accent/30'
                                                        : 'bg-black/5 dark:bg-white/5 text-sec/80'
                                                }`}
                                            >
                                                {preset.badge}
                                            </span>
                                        )}

                                        <div
                                            className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                                                isSelected
                                                    ? 'bg-accent text-white dark:text-[#0C0C0C]'
                                                    : 'border border-sec/20 opacity-0 group-hover:opacity-40'
                                            }`}
                                        >
                                            {isSelected && <Check size={11} strokeWidth={3.5} />}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4
                                        className={`text-xs font-bold transition-colors ${
                                            isSelected ? 'text-fg' : 'text-sec group-hover:text-fg'
                                        }`}
                                    >
                                        {preset.name}
                                    </h4>
                                    <p className="text-[11px] text-sec/80 line-clamp-2 mt-1 leading-relaxed">
                                        {preset.description}
                                    </p>
                                </div>
                            </div>

                            {isSelected && (
                                <div className="mt-3 pt-2 border-t border-accent/20 flex items-center justify-between text-[10px] font-mono text-accent">
                                    <span>Active Experience</span>
                                    <span>Applied</span>
                                </div>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
