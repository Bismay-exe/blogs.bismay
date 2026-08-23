'use client'

import React from 'react'
import {
    CheckCircle2,
    Clock,
    Calendar,
    Sparkles,
    Share2,
    ListTree,
    Film,
    Video,
    Eye,
} from 'lucide-react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { ReaderAppearanceSettings, VideoPlayerSkin } from '@/lib/reader-settings/types'
import { VisualChoiceCard } from '@/components/ui/settings/VisualChoiceCard'
import { ToggleSwitch } from '@/components/ui/settings/ToggleSwitch'

interface AppearanceMeta {
    id: Exclude<keyof ReaderAppearanceSettings, 'videoPlayerSkin'>
    label: string
    description: string
    icon: React.ElementType
    badge: string
}

const APPEARANCE_OPTIONS: AppearanceMeta[] = [
    {
        id: 'showReadingProgress',
        label: 'Real-Time Reading Progress Bar',
        description: 'Smooth gradient scroll progress bar running along the top of the viewport.',
        icon: Sparkles,
        badge: 'Progress',
    },
    {
        id: 'showTableOfContents',
        label: 'Interactive Table of Contents',
        description: 'Auto-extracted heading tree and visual minimap on the left navigation rail.',
        icon: ListTree,
        badge: 'Navigation',
    },
    {
        id: 'showReadingTime',
        label: 'Estimated Reading Time Badge',
        description: 'Calculated minute counter (e.g. "8 min read") shown in article metadata.',
        icon: Clock,
        badge: 'Metadata',
    },
    {
        id: 'showPublishedDate',
        label: 'Publication / Update Date',
        description: 'Formatted date badge (e.g. "Feb 11, 2026") shown in article topbar.',
        icon: Calendar,
        badge: 'Metadata',
    },
    {
        id: 'showCategory',
        label: 'Article Category Tag',
        description: 'Category indicator (e.g. "React & Architecture") highlighted in topbar.',
        icon: CheckCircle2,
        badge: 'Taxonomy',
    },
    {
        id: 'showShareButtons',
        label: 'Quick Share & Copy Button',
        description: 'One-click copy page URL button with toast feedback.',
        icon: Share2,
        badge: 'Social',
    },
]

export const AppearanceSettings: React.FC = () => {
    const { settings, updateAppearance } = useReaderSettings()
    const { appearance } = settings

    const toggle = (key: Exclude<keyof ReaderAppearanceSettings, 'videoPlayerSkin'>) => {
        updateAppearance({ [key]: !appearance[key] })
    }

    const activeVideoSkin = appearance.videoPlayerSkin || 'modern'

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center border border-accent/25">
                    <Eye size={16} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-fg tracking-tight">
                        Appearance & Media Controls
                    </h3>
                    <p className="text-xs text-sec mt-0.5">
                        Configure embedded video player skin and toggle individual micro-indicators.
                    </p>
                </div>
            </div>

            {/* 1. Video Player Skin Selector (VisualChoiceCards) */}
            <div className="space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sec/70 font-semibold px-1">
                    Embedded Video Player Skin
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <VisualChoiceCard
                        title="Modern Studio Player"
                        description="Comprehensive playback bar with scrubber, time counter, volume slider, settings menu, and controls."
                        badge="Full Controls"
                        isSelected={activeVideoSkin === 'modern'}
                        onClick={() => updateAppearance({ videoPlayerSkin: 'modern' })}
                        icon={Video}
                        previewNode={
                            <div className="w-full flex flex-col justify-end h-full px-2 pb-1 space-y-1">
                                <div className="h-1 bg-accent rounded-full w-2/3" />
                                <div className="flex justify-between items-center text-[8px] font-mono text-sec">
                                    <span>▶ 01:24 / 04:30</span>
                                    <span>⚙ ⛶</span>
                                </div>
                            </div>
                        }
                    />

                    <VisualChoiceCard
                        title="Minimal Cinematic Skin"
                        description="Sleek, floating minimal controls with slim progress bar for a clean, cinematic reading flow."
                        badge="Focus"
                        isSelected={activeVideoSkin === 'minimal'}
                        onClick={() => updateAppearance({ videoPlayerSkin: 'minimal' })}
                        icon={Film}
                        previewNode={
                            <div className="w-full flex items-center justify-center h-full">
                                <div className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white text-xs">
                                    ▶
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>

            {/* 2. Micro-Indicators and Toggles */}
            <div className="space-y-2.5 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sec/70 font-semibold px-1">
                    Micro-UI Indicators & Chips
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {APPEARANCE_OPTIONS.map((item) => {
                        const isEnabled = Boolean(appearance[item.id])
                        const Icon = item.icon

                        return (
                            <div
                                key={item.id}
                                onClick={() => toggle(item.id)}
                                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 select-none ${
                                    isEnabled
                                        ? 'bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] border-sec/25 hover:border-accent/40'
                                        : 'bg-black/[0.01] dark:bg-white/[0.01] border-sec/10 opacity-55'
                                }`}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div
                                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                            isEnabled
                                                ? 'bg-accent/15 text-accent border border-accent/25'
                                                : 'bg-black/5 dark:bg-white/5 text-sec'
                                        }`}
                                    >
                                        <Icon size={16} />
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <h4
                                                className={`text-xs font-bold truncate ${
                                                    isEnabled ? 'text-fg' : 'text-sec'
                                                }`}
                                            >
                                                {item.label}
                                            </h4>
                                        </div>
                                        <p className="text-[11px] text-sec/80 truncate mt-0.5">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                <ToggleSwitch
                                    checked={isEnabled}
                                    onChange={() => toggle(item.id)}
                                    size="sm"
                                    ariaLabel={`Toggle ${item.label}`}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
