'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
    BookOpen,
    Sliders,
    Sparkles,
    ArrowRight,
    Type,
    Layout,
    SlidersHorizontal,
    Eye,
    Palette,
    Code2,
    Check,
    RotateCcw,
    FileText,
    ExternalLink,
    ChevronRight,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { CapsuleBreadcrumb } from '@/components/settings/CapsuleBreadcrumb'
import { ExportConfigModal } from '@/components/ui/settings/ExportConfigModal'

export default function SettingsHubPage() {
    const { settings, activePreset, applyPreset, resetToDefaults, isLoaded } = useReaderSettings()
    const [isExportOpen, setIsExportOpen] = useState(false)
    const [resetNotice, setResetNotice] = useState(false)

    const handleReset = () => {
        resetToDefaults()
        setResetNotice(true)
        setTimeout(() => setResetNotice(false), 2000)
    }

    if (!isLoaded) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            </div>
        )
    }

    const { layout, typography, appearance, articleLayout, widgets } = settings
    const headerOrder = articleLayout?.headerBuilder?.headerOrder || layout?.headerOrder || []
    const headerVisibility = articleLayout?.headerBuilder?.headerVisibility || layout?.headerVisibility || {}
    const visibleHeadersCount = headerOrder.filter((id) => headerVisibility[id]).length
    const enabledWidgetsCount = Object.values(widgets || layout?.rightWidgets || {}).filter(Boolean).length
    const headingFontName = typography.headingFont?.headingFont || typography.headingFontChoice || 'inter-tight'

    return (
        <div className="min-h-screen flex flex-col bg-bg text-fg">
            <Navbar />
            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-8">
                {/* Capsule Breadcrumb Ribbon */}
                <CapsuleBreadcrumb
                    currentPage="Settings Hub"
                    actionNode={
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sec/25 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-sec hover:text-fg text-xs font-mono transition-all cursor-pointer"
                            >
                                <RotateCcw size={12} className={resetNotice ? 'animate-spin' : ''} />
                                <span>{resetNotice ? 'Reset Done!' : 'Reset All'}</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsExportOpen(true)}
                                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent text-white dark:text-[#0C0C0C] text-xs font-mono font-bold shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
                            >
                                <Code2 size={13} />
                                <span>Export Config</span>
                            </button>
                        </div>
                    }
                />

                {/* Header Title & Intro */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight">
                            Studio & System Settings
                        </h1>
                        <p className="text-xs sm:text-sm text-sec mt-1">
                            Customize article reading dynamics, layout architecture, typography, and workspace preferences.
                        </p>
                    </div>

                    <Link
                        href="/settings/reader"
                        className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white dark:text-[#0C0C0C] font-mono font-bold text-xs shadow-sm shadow-accent/25 hover:opacity-95 transition-opacity"
                    >
                        <Sparkles size={13} />
                        <span>Open Reader Studio</span>
                        <ArrowRight size={13} />
                    </Link>
                </div>

                {/* Active Configuration Overview Card */}
                <div className="p-5 sm:p-6 rounded-3xl border border-sec/20 bg-black/2 dark:bg-white/2 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <h3 className="text-xs font-bold uppercase tracking-wider text-fg font-mono">
                                Current Active Configuration
                            </h3>
                        </div>
                        <span className="text-xs font-mono text-accent font-bold px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/25">
                            Preset: {activePreset.toUpperCase()}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-sec/10">
                            <span className="text-[10px] font-mono text-sec uppercase block">Reading Width</span>
                            <p className="text-xs font-bold text-fg mt-0.5 capitalize">{layout.contentWidth}</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-sec/10">
                            <span className="text-[10px] font-mono text-sec uppercase block">Heading Font</span>
                            <p className="text-xs font-bold text-fg mt-0.5 capitalize">{headingFontName}</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-sec/10">
                            <span className="text-[10px] font-mono text-sec uppercase block">Header Blocks</span>
                            <p className="text-xs font-bold text-fg mt-0.5">{visibleHeadersCount} / {headerOrder.length || 5} Visible</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-sec/10">
                            <span className="text-[10px] font-mono text-sec uppercase block">Sidebar Widgets</span>
                            <p className="text-xs font-bold text-fg mt-0.5">{enabledWidgetsCount} Active Cards</p>
                        </div>
                    </div>
                </div>

                {/* Main Navigation Studio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Card 1: Reader Studio */}
                    <Link
                        href="/settings/reader"
                        className="group p-6 rounded-3xl border border-sec/20 bg-black/2 dark:bg-white/2 hover:bg-black/4 dark:hover:bg-white/4 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-xs"
                    >
                        <div className="space-y-3.5">
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center border border-accent/25 group-hover:scale-105 transition-transform">
                                    <BookOpen size={22} />
                                </div>
                                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-accent/20 text-accent font-bold">
                                    Live Studio
                                </span>
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-fg group-hover:text-accent transition-colors">
                                    Reading Experience Studio
                                </h2>
                                <p className="text-xs text-sec mt-1.5 leading-relaxed">
                                    Customize header hierarchy, sidebar widgets, typography fonts, font sizes, line height, breakout margins, and distraction-free mode.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-sec/10 text-xs font-mono text-accent font-medium">
                            <span>Open Interactive Studio</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    {/* Card 2: Post & Article Content Management */}
                    <Link
                        href="/admin/posts"
                        className="group p-6 rounded-3xl border border-sec/20 bg-black/2 dark:bg-white/2 hover:bg-black/4 dark:hover:bg-white/4 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-xs"
                    >
                        <div className="space-y-3.5">
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/25 group-hover:scale-105 transition-transform">
                                    <FileText size={22} />
                                </div>
                                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                                    Admin Hub
                                </span>
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-fg group-hover:text-emerald-400 transition-colors">
                                    Article & Content Studio
                                </h2>
                                <p className="text-xs text-sec mt-1.5 leading-relaxed">
                                    Create new articles, write in Markdown, preview live AST blocks, manage tutorial series, and publish updates.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-sec/10 text-xs font-mono text-emerald-400 font-medium">
                            <span>Manage Articles</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>

                {/* Export Config Modal */}
                <ExportConfigModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
            </main>
            <Footer />
        </div>
    )
}
