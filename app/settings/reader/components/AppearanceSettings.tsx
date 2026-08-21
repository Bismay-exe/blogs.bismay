'use client'

import React from 'react'
import { CheckCircle2, Clock, Calendar, Sparkles, Share2, ListTree } from 'lucide-react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { ReaderAppearanceSettings } from '@/lib/reader-settings/types'

interface AppearanceMeta {
    id: keyof ReaderAppearanceSettings
    label: string
    description: string
    icon: React.ElementType
}

const APPEARANCE_OPTIONS: AppearanceMeta[] = [
    {
        id: 'showReadingProgress',
        label: 'Real-Time Reading Progress Bar',
        description: 'Smooth gradient scroll progress bar running along the top of the viewport.',
        icon: Sparkles,
    },
    {
        id: 'showTableOfContents',
        label: 'Interactive Table of Contents',
        description: 'Auto-extracted heading tree and visual minimap on the left navigation rail.',
        icon: ListTree,
    },
    {
        id: 'showReadingTime',
        label: 'Estimated Reading Time Badge',
        description: 'Calculated minute counter (e.g. "8 min read") shown in article metadata.',
        icon: Clock,
    },
    {
        id: 'showPublishedDate',
        label: 'Publication / Update Date',
        description: 'Formatted date badge (e.g. "Feb 11, 2026") shown in article topbar.',
        icon: Calendar,
    },
    {
        id: 'showCategory',
        label: 'Article Category Tag',
        description: 'Category indicator (e.g. "React & Architecture") highlighted in topbar.',
        icon: CheckCircle2,
    },
    {
        id: 'showShareButtons',
        label: 'Quick Share & Copy Button',
        description: 'One-click copy page URL button with toast feedback.',
        icon: Share2,
    },
]

export const AppearanceSettings: React.FC = () => {
    const { settings, updateAppearance } = useReaderSettings()
    const { appearance } = settings

    const toggle = (key: keyof ReaderAppearanceSettings) => {
        updateAppearance({ [key]: !appearance[key] })
    }

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-sm font-bold text-fg tracking-tight">Appearance & Micro-Indicators</h3>
                <p className="text-xs text-sec mt-0.5">
                    Toggle individual UI micro-indicators, progress bars, and metadata chips.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {APPEARANCE_OPTIONS.map((item) => {
                    const isEnabled = appearance[item.id]
                    const Icon = item.icon

                    return (
                        <div
                            key={item.id}
                            onClick={() => toggle(item.id)}
                            className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                                isEnabled
                                    ? 'bg-fg/2 border-sec/25 hover:border-accent/40'
                                    : 'bg-fg/1 border-sec/10 opacity-55'
                            }`}
                        >
                            <div className="space-y-2.5">
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                                            isEnabled
                                                ? 'bg-accent/15 text-accent border border-accent/20'
                                                : 'bg-fg/5 text-sec'
                                        }`}
                                    >
                                        <Icon size={15} />
                                    </div>
                                    <span
                                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                                            isEnabled
                                                ? 'bg-emerald-500/15 text-emerald-400 font-semibold'
                                                : 'bg-fg/5 text-sec'
                                        }`}
                                    >
                                        {isEnabled ? 'ON' : 'OFF'}
                                    </span>
                                </div>

                                <div>
                                    <h4 className={`text-xs font-semibold ${isEnabled ? 'text-fg' : 'text-sec'}`}>
                                        {item.label}
                                    </h4>
                                    <p className="text-[11px] text-sec mt-1 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
