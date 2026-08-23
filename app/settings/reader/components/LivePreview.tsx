'use client'

import React, { useState } from 'react'
import {
    Eye,
    Sparkles,
    User,
    Tag,
    Clock,
    Calendar,
    Check,
    ExternalLink,
    Laptop,
    Tablet,
    Smartphone,
    Code2,
} from 'lucide-react'
import Link from 'next/link'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { HeaderElementId } from '@/lib/reader-settings/types'
import { getFontFamily } from '@/lib/reader-settings/defaults'
import { ExportConfigModal } from '@/components/ui/settings/ExportConfigModal'

export const LivePreview: React.FC = () => {
    const { settings } = useReaderSettings()
    const { layout, typography, appearance, articleInformation } = settings
    const {
        headerOrder,
        headerVisibility,
        headerAlignment = 'left',
        showNavbar,
        showLeftSidebar,
        showRightSidebar,
        contentWidth,
        bannerWidth = 'contained',
        titleWidth = 'contained',
        authorStyle = 'default',
        bannerMarginTop = 24,
        bannerMarginBottom = 32,
        rightWidgets,
    } = layout

    const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
    const [isExportOpen, setIsExportOpen] = useState(false)

    const isCenter = headerAlignment === 'center'
    const isBreakout =
        bannerWidth === 'breakout' ||
        bannerWidth === 'awwwards-80' ||
        bannerWidth === 'full-bleed' ||
        titleWidth === 'breakout' ||
        titleWidth === 'awwwards-80' ||
        titleWidth === 'full-bleed'

    const headingFontFamily = getFontFamily(typography.headingFont)
    const bodyFontFamily = getFontFamily(typography.bodyFont)
    const codeFontFamily = getFontFamily(typography.codeFont)

    // Render individual header element mock
    const renderHeaderElement = (id: HeaderElementId) => {
        if (!headerVisibility[id]) return null

        switch (id) {
            case 'topbar':
                return (
                    <div
                        key="topbar"
                        className={`flex items-center gap-2 flex-wrap text-[11px] font-mono text-sec pb-1 ${
                            isCenter ? 'justify-center' : 'justify-start'
                        }`}
                    >
                        {articleInformation?.showCategory && (
                            <span className="px-2 py-0.5 rounded-md bg-accent/15 text-accent font-semibold uppercase tracking-wider text-[10px]">
                                React & Architecture
                            </span>
                        )}
                        {articleInformation?.showPublishedDate && (
                            <span className="flex items-center gap-1">
                                <Calendar size={11} /> Feb 11, 2026
                            </span>
                        )}
                        {articleInformation?.showReadingTime && (
                            <span className="flex items-center gap-1">
                                <Clock size={11} /> 8 min read
                            </span>
                        )}
                    </div>
                )

            case 'banner':
                return (
                    <div
                        key="banner"
                        style={{
                            marginTop: `${bannerMarginTop * 0.7}px`,
                            marginBottom: `${bannerMarginBottom * 0.7}px`,
                        }}
                        className={`overflow-hidden relative bg-zinc-900 border border-white/10 transition-all duration-300 ${
                            bannerWidth === 'awwwards-80'
                                ? 'w-[94%] mx-auto h-36 rounded-2xl shadow-xl ring-1 ring-white/10'
                                : bannerWidth === 'breakout'
                                ? 'w-full h-34 rounded-2xl shadow-lg'
                                : bannerWidth === 'full-bleed'
                                ? 'w-[calc(100%+1.5rem)] -mx-3 h-36 rounded-none shadow-lg'
                                : 'w-full h-30 rounded-xl'
                        }`}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop"
                            alt="Preview banner"
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-[9px] font-mono text-white/90 border border-white/10">
                            {bannerWidth === 'awwwards-80'
                                ? 'Awwwards 85% Viewport'
                                : bannerWidth === 'breakout'
                                ? 'Breakout Hero'
                                : bannerWidth === 'full-bleed'
                                ? 'Full Bleed Viewport'
                                : 'Contained'}
                        </div>
                    </div>
                )

            case 'author':
                if (authorStyle === 'overlap') {
                    return (
                        <div
                            key="author"
                            className={`relative z-10 flex flex-col gap-1.5 transition-all ${
                                isCenter
                                    ? 'items-center text-center -mt-6 mx-auto'
                                    : 'items-start text-left -mt-6 ml-3'
                            }`}
                        >
                            <div className="w-10 h-10 rounded-xl bg-accent/25 border-2 border-bg ring-2 ring-accent/40 shadow-xl flex items-center justify-center text-accent font-bold text-xs">
                                B
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[11px] font-mono text-sec">
                                    By <span className="font-bold text-fg">Bismay.exe</span>
                                </p>
                            </div>
                        </div>
                    )
                }

                if (authorStyle === 'compact') {
                    return (
                        <div
                            key="author"
                            className={`flex items-center gap-1.5 py-0.5 text-[11px] font-mono text-sec ${
                                isCenter ? 'justify-center mx-auto' : 'justify-start'
                            }`}
                        >
                            <div className="w-4.5 h-4.5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-bold text-[9px]">
                                B
                            </div>
                            <span>
                                By <strong className="text-fg">Bismay.exe</strong>
                            </span>
                        </div>
                    )
                }

                return (
                    <div
                        key="author"
                        className={`flex items-center gap-2.5 py-1 ${
                            isCenter ? 'justify-center mx-auto' : 'justify-start'
                        }`}
                    >
                        <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-bold text-xs">
                            B
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-semibold text-fg leading-none">Bismay.exe</p>
                            <p className="text-[10px] text-sec font-mono mt-0.5">Software Engineer</p>
                        </div>
                    </div>
                )

            case 'title':
                return (
                    <div
                        key="title"
                        className={`transition-all duration-300 ${
                            titleWidth === 'awwwards-80'
                                ? 'w-full max-w-lg mx-auto'
                                : titleWidth === 'breakout'
                                ? 'w-full max-w-md mx-auto'
                                : 'w-full'
                        }`}
                    >
                        <h1
                            className={`tracking-tight text-fg leading-[1.1] transition-all ${
                                isCenter ? 'text-center' : 'text-left'
                            } ${typography.titleUppercase ? 'uppercase' : 'normal-case'}`}
                            style={{
                                fontFamily: headingFontFamily,
                                fontWeight: typography.titleFontWeight || 700,
                                fontSize: `${1.15 * typography.headingScale * (typography.titleScale || 1.0)}rem`,
                            }}
                        >
                            🚀 Day 11: Context API, Prop Drilling, Providers, and useContext()
                        </h1>
                    </div>
                )

            case 'tags':
                return (
                    <div
                        key="tags"
                        className={`flex items-center gap-1.5 flex-wrap ${
                            isCenter ? 'justify-center mx-auto' : 'justify-start'
                        }`}
                    >
                        {['React', 'Context API', 'State Management'].map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-sec text-[10px] font-mono border border-sec/15"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )

            default:
                return null
        }
    }

    const deviceWidthClass = {
        desktop: 'w-full',
        tablet: 'max-w-[420px] mx-auto',
        mobile: 'max-w-[320px] mx-auto',
    }[deviceMode]

    return (
        <div className="space-y-3 sticky top-6">
            {/* Top Toolbar Header */}
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <h3 className="text-xs font-bold text-fg uppercase tracking-wider font-mono">
                        Live Studio Canvas
                    </h3>
                </div>

                {/* Device Viewport Selector */}
                <div className="inline-flex p-0.5 rounded-xl bg-black/5 dark:bg-white/5 border border-sec/15">
                    <button
                        type="button"
                        onClick={() => setDeviceMode('desktop')}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            deviceMode === 'desktop'
                                ? 'bg-white dark:bg-zinc-800 text-fg shadow-xs'
                                : 'text-sec hover:text-fg'
                        }`}
                        title="Desktop Preview"
                    >
                        <Laptop size={13} />
                    </button>
                    <button
                        type="button"
                        onClick={() => setDeviceMode('tablet')}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            deviceMode === 'tablet'
                                ? 'bg-white dark:bg-zinc-800 text-fg shadow-xs'
                                : 'text-sec hover:text-fg'
                        }`}
                        title="Tablet Preview"
                    >
                        <Tablet size={13} />
                    </button>
                    <button
                        type="button"
                        onClick={() => setDeviceMode('mobile')}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            deviceMode === 'mobile'
                                ? 'bg-white dark:bg-zinc-800 text-fg shadow-xs'
                                : 'text-sec hover:text-fg'
                        }`}
                        title="Mobile Preview"
                    >
                        <Smartphone size={13} />
                    </button>
                </div>
            </div>

            {/* macOS Window Shell (Pinterest Ref 4 & 5) */}
            <div className="rounded-3xl border border-sec/20 bg-bg shadow-2xl overflow-hidden backdrop-blur-md transition-all duration-300">
                {/* Traffic Lights & URL Bar */}
                <div className="px-4 py-3 bg-black/[0.03] dark:bg-white/[0.04] border-b border-sec/15 flex items-center justify-between text-xs font-mono text-sec">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80 shadow-xs" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/80 shadow-xs" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-xs" />
                    </div>

                    <div className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-sec/10 text-[10px] text-sec/80 truncate max-w-[200px]">
                        blogs.bismay.exe/day-11
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/15 text-accent font-bold">
                        {contentWidth.toUpperCase()}
                    </span>
                </div>

                {/* Optional Reading Progress Bar */}
                {appearance.showReadingProgress && (
                    <div className="w-full h-1 bg-black/5 dark:bg-white/5">
                        <div className="w-2/5 h-full bg-linear-to-r from-accent via-purple-500 to-indigo-400" />
                    </div>
                )}

                {/* Mock Navigation Header */}
                {showNavbar ? (
                    <div className="px-4 py-2 bg-black/[0.01] dark:bg-white/[0.02] border-b border-sec/10 flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-fg">
                            Bismay<span className="text-accent">.exe</span>
                        </span>
                        <div className="flex items-center gap-2 text-sec text-[10px]">
                            <span>Blogs</span>
                            <span>Series</span>
                        </div>
                    </div>
                ) : (
                    <div className="px-4 py-1 bg-amber-500/10 border-b border-amber-500/20 text-center text-[10px] font-mono text-amber-400">
                        Distraction-free mode (Navbar hidden)
                    </div>
                )}

                {/* Mock Article Page Canvas */}
                <div className={`p-4 sm:p-5 max-h-[480px] overflow-y-auto space-y-4 ${deviceWidthClass}`}>
                    {/* Header Zone */}
                    <div className="space-y-3.5 mx-auto">
                        {headerOrder.map((id) => renderHeaderElement(id))}
                    </div>

                    {/* Article Body & Sidebars */}
                    <div className="flex gap-3 items-start pt-3 border-t border-sec/10">
                        {/* Left TOC minimap */}
                        {showLeftSidebar && layout.showTableOfContents && deviceMode === 'desktop' && (
                            <div className="hidden lg:block w-20 shrink-0 space-y-2 pt-1 border-r border-sec/10 pr-2">
                                <span className="text-[8px] font-mono uppercase text-sec/70 font-bold block">
                                    TOC Tree
                                </span>
                                <div className="space-y-1 opacity-60">
                                    <div className="h-1 bg-accent rounded-full w-3/4" />
                                    <div className="h-1 bg-sec/40 rounded-full w-1/2 ml-1" />
                                    <div className="h-1 bg-sec/40 rounded-full w-2/3 ml-1" />
                                    <div className="h-1 bg-accent/70 rounded-full w-4/5" />
                                </div>
                            </div>
                        )}

                        {/* Article Text Content */}
                        <div
                            className="flex-1 min-w-0"
                            style={{
                                fontFamily: bodyFontFamily,
                                fontWeight: typography.bodyFontWeight || 400,
                                fontSize: `${typography.bodyFontSize * 0.85}px`,
                                lineHeight: typography.lineHeight,
                            }}
                        >
                            <p
                                className="text-fg/90"
                                style={{
                                    marginBottom: `${(typography.paragraphSpacing || 24) * 0.65}px`,
                                }}
                            >
                                In modern frontend applications, state management quickly becomes the backbone of scalable architecture. Passing props through multiple layers of nested components creates tedious boilerplate known as prop drilling.
                            </p>

                            <div
                                className="p-3 rounded-xl bg-[#0E0E10] border border-white/10 text-[10px] overflow-hidden"
                                style={{
                                    fontFamily: codeFontFamily,
                                    marginBottom: `${(typography.paragraphSpacing || 24) * 0.65}px`,
                                }}
                            >
                                <span className="text-purple-400">const</span>{' '}
                                <span className="text-blue-300">ThemeContext</span> ={' '}
                                <span className="text-yellow-300">createContext</span>
                                <span className="text-zinc-400">(</span>
                                <span className="text-emerald-300">&apos;dark&apos;</span>
                                <span className="text-zinc-400">);</span>
                            </div>

                            <p className="text-fg/80 text-[11px]">
                                By creating a dedicated Provider component, downstream consumers can subscribe to context values instantly using the <code className="px-1 py-0.5 rounded bg-fg/10 font-mono text-[10px]">useContext</code> hook.
                            </p>
                        </div>

                        {/* Right Sidebar Widgets */}
                        {showRightSidebar && deviceMode === 'desktop' && (
                            <div className="hidden md:block w-32 shrink-0 space-y-2 border-l border-sec/10 pl-2.5">
                                <span className="text-[8px] font-mono uppercase text-sec/70 font-bold block">
                                    Widgets
                                </span>
                                {rightWidgets.profile && (
                                    <div className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-sec/15 text-[9px]">
                                        <p className="font-semibold text-fg">Bismay.exe</p>
                                    </div>
                                )}
                                {rightWidgets.series && (
                                    <div className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-sec/15 text-[9px]">
                                        <p className="font-semibold text-fg">React Series</p>
                                    </div>
                                )}
                                {rightWidgets.subscribeForm && (
                                    <div className="p-1.5 rounded-lg bg-accent/10 border border-accent/20 text-[9px] text-accent">
                                        Newsletter
                                    </div>
                                )}
                                {rightWidgets.socials && (
                                    <div className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-sec/15 text-[9px] text-sec">
                                        Socials
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Canvas Footer Toolbar (Pinterest Ref 1 style) */}
                <div className="px-4 py-2.5 bg-black/[0.03] dark:bg-white/[0.04] border-t border-sec/15 flex items-center justify-between text-xs font-mono">
                    <button
                        type="button"
                        onClick={() => setIsExportOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent text-white dark:text-[#0C0C0C] font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                    >
                        <Code2 size={13} />
                        <span>Export Config</span>
                    </button>

                    <Link
                        href="/blogs/day-11-of-learning-react"
                        target="_blank"
                        className="flex items-center gap-1 text-sec hover:text-fg transition-colors text-[11px]"
                    >
                        <span>Open Live Article</span>
                        <ExternalLink size={11} />
                    </Link>
                </div>
            </div>

            {/* Export Config Modal */}
            <ExportConfigModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
        </div>
    )
}
