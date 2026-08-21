'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
    Sparkles,
    RotateCcw,
    Sliders,
    Layers,
    Type,
    Layout,
    Eye,
    Check,
    ArrowLeft,
    ExternalLink,
} from 'lucide-react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { PresetSelector } from './components/PresetSelector'
import { HeaderEditor } from './components/HeaderEditor'
import { LayoutSettings } from './components/LayoutSettings'
import { SidebarSettings } from './components/SidebarSettings'
import { TypographySettings } from './components/TypographySettings'
import { AppearanceSettings } from './components/AppearanceSettings'
import { LivePreview } from './components/LivePreview'

export default function ReaderSettingsPage() {
    const { resetToDefaults, isLoaded } = useReaderSettings()
    const [resetNotice, setResetNotice] = useState(false)
    const [activeTab, setActiveTab] = useState<'all' | 'layout' | 'header' | 'typography' | 'sidebar' | 'appearance'>('all')

    const handleReset = () => {
        resetToDefaults()
        setResetNotice(true)
        setTimeout(() => setResetNotice(false), 2500)
    }

    if (!isLoaded) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Top Title & Header Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sec/15">
                <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-sec mb-1">
                        <Link href="/settings" className="hover:text-fg transition-colors">
                            Settings
                        </Link>
                        <span>/</span>
                        <span className="text-accent font-semibold">Reading Experience</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight">
                        Reading Experience Studio
                    </h1>
                    <p className="text-sm text-sec mt-1">
                        Full control over article layout order, sidebar widgets, typography fonts, and distraction-free mode.
                    </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-sec/25 bg-fg/3 hover:bg-fg/8 text-sec hover:text-fg text-xs font-mono font-medium transition-all duration-200 cursor-pointer"
                        title="Reset all settings to default preset"
                    >
                        <RotateCcw size={14} className={resetNotice ? 'animate-spin' : ''} />
                        <span>{resetNotice ? 'Reset to Defaults!' : 'Reset Defaults'}</span>
                    </button>

                    <Link
                        href="/blogs/day-11-of-learning-react"
                        target="_blank"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-white dark:text-[#0C0C0C] font-semibold text-xs font-mono shadow-md shadow-accent/20 hover:opacity-95 transition-opacity"
                    >
                        <span>View Live Article</span>
                        <ExternalLink size={13} />
                    </Link>
                </div>
            </div>

            {/* Section 1: One-Click Presets */}
            <section className="p-5 sm:p-6 rounded-3xl border border-sec/20 bg-fg/1">
                <PresetSelector />
            </section>

            {/* Quick Section Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[
                    { id: 'all', label: 'All Settings', icon: Sliders },
                    { id: 'header', label: 'Header Order', icon: Layers },
                    { id: 'layout', label: 'Layout & Shell', icon: Layout },
                    { id: 'sidebar', label: 'Sidebar Widgets', icon: Layout },
                    { id: 'typography', label: 'Typography', icon: Type },
                    { id: 'appearance', label: 'Appearance', icon: Eye },
                ].map((tab) => {
                    const Icon = tab.icon
                    const isSelected = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer shrink-0 ${
                                isSelected
                                    ? 'bg-accent text-white dark:text-[#0C0C0C] font-bold shadow-sm'
                                    : 'bg-fg/3 hover:bg-fg/7 text-sec hover:text-fg border border-sec/15'
                            }`}
                        >
                            <Icon size={13} />
                            <span>{tab.label}</span>
                        </button>
                    )
                })}
            </div>

            {/* Main Content & Live Preview Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                {/* Left / Main Settings Column (7 cols on XL) */}
                <div className="xl:col-span-7 space-y-8">
                    {/* Header Zone Reordering */}
                    {(activeTab === 'all' || activeTab === 'header') && (
                        <section className="p-5 sm:p-6 rounded-3xl border border-sec/20 bg-fg/1 space-y-4">
                            <HeaderEditor />
                        </section>
                    )}

                    {/* Layout & Width Settings */}
                    {(activeTab === 'all' || activeTab === 'layout') && (
                        <section className="p-5 sm:p-6 rounded-3xl border border-sec/20 bg-fg/1 space-y-4">
                            <LayoutSettings />
                        </section>
                    )}

                    {/* Right Sidebar Widgets */}
                    {(activeTab === 'all' || activeTab === 'sidebar') && (
                        <section className="p-5 sm:p-6 rounded-3xl border border-sec/20 bg-fg/1 space-y-4">
                            <SidebarSettings />
                        </section>
                    )}

                    {/* Typography Studio */}
                    {(activeTab === 'all' || activeTab === 'typography') && (
                        <section className="p-5 sm:p-6 rounded-3xl border border-sec/20 bg-fg/1 space-y-4">
                            <TypographySettings />
                        </section>
                    )}

                    {/* Appearance & Micro-Indicators */}
                    {(activeTab === 'all' || activeTab === 'appearance') && (
                        <section className="p-5 sm:p-6 rounded-3xl border border-sec/20 bg-fg/1 space-y-4">
                            <AppearanceSettings />
                        </section>
                    )}
                </div>

                {/* Right Sticky Column: Live Preview (5 cols on XL) */}
                <div className="xl:col-span-5">
                    <LivePreview />
                </div>
            </div>
        </div>
    )
}
