'use client'

import React from 'react'
import { Eye, Sparkles, User, Tag, Clock, Calendar, Check, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { HeaderElementId } from '@/lib/reader-settings/types'
import { getFontFamily } from '@/lib/reader-settings/defaults'

export const LivePreview: React.FC = () => {
    const { settings } = useReaderSettings()
    const { layout, typography, appearance } = settings
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
        bannerMarginTop = 24,
        bannerMarginBottom = 32,
        rightWidgets,
    } = layout

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
                        {appearance.showCategory && (
                            <span className="px-2 py-0.5 rounded-md bg-accent/15 text-accent font-semibold uppercase tracking-wider text-[10px]">
                                React & Architecture
                            </span>
                        )}
                        {appearance.showPublishedDate && (
                            <span className="flex items-center gap-1">
                                <Calendar size={11} /> Feb 11, 2026
                            </span>
                        )}
                        {appearance.showReadingTime && (
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
                                ? 'w-[94%] mx-auto h-40 rounded-2xl shadow-2xl ring-1 ring-white/10'
                                : bannerWidth === 'breakout'
                                ? 'w-full h-36 rounded-2xl shadow-xl'
                                : bannerWidth === 'full-bleed'
                                ? 'w-[calc(100%+2rem)] -mx-4 h-40 rounded-none shadow-xl'
                                : 'w-full h-32 rounded-xl'
                        }`}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop"
                            alt="Preview banner"
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-white/80">
                            {bannerWidth === 'awwwards-80'
                                ? 'Awwwards 85% Viewport Banner'
                                : bannerWidth === 'breakout'
                                ? 'Breakout Hero Banner'
                                : bannerWidth === 'full-bleed'
                                ? 'Full Bleed Viewport'
                                : 'Contained Banner'}
                        </div>
                    </div>
                )

            case 'author':
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
                            <p className="text-[10px] text-sec font-mono mt-0.5">Software Engineer & Writer</p>
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
                            className={`tracking-tight text-fg leading-[1.05] transition-all ${
                                isCenter ? 'text-center' : 'text-left'
                            } ${typography.titleUppercase ? 'uppercase' : 'normal-case'}`}
                            style={{
                                fontFamily: headingFontFamily,
                                fontWeight: typography.titleFontWeight || 700,
                                fontSize: `${1.25 * typography.headingScale * (typography.titleScale || 1.0)}rem`,
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
                                className="px-2 py-0.5 rounded-md bg-fg/5 text-sec hover:text-fg text-[11px] font-mono border border-sec/15"
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

    const maxWidthClass =
        contentWidth === 'narrow' ? 'max-w-md' : contentWidth === 'wide' ? 'max-w-xl' : 'max-w-lg'

    return (
        <div className="space-y-3 sticky top-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Eye size={15} className="text-accent" />
                    <h3 className="text-sm font-bold text-fg tracking-tight">Live Real-Time Preview</h3>
                </div>
                <Link
                    href="/blogs/day-11-of-learning-react"
                    target="_blank"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-accent hover:underline"
                >
                    <span>Open Live Article</span>
                    <ExternalLink size={11} />
                </Link>
            </div>

            {/* Mock Window Shell */}
            <div className="rounded-3xl border border-sec/25 bg-bg/80 shadow-xl overflow-hidden backdrop-blur-md">
                {/* Mock Window Top Bar */}
                <div className="px-4 py-2.5 bg-fg/4 border-b border-sec/15 flex items-center justify-between text-xs font-mono text-sec">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                        <span className="ml-2 text-[11px] text-sec/70">/blogs/day-11-of-learning-react</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-accent/15 text-accent font-semibold">
                        {contentWidth.toUpperCase()} WIDTH
                    </span>
                </div>

                {/* Optional Reading Progress Bar */}
                {appearance.showReadingProgress && (
                    <div className="w-full h-1 bg-fg/5">
                        <div className="w-1/3 h-full bg-linear-to-r from-accent via-purple-500 to-indigo-400" />
                    </div>
                )}

                {/* Mock Navigation Header */}
                {showNavbar ? (
                    <div className="px-4 py-2 bg-fg/2 border-b border-sec/10 flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-fg">Bismay<span className="text-accent">.exe</span></span>
                        <div className="flex items-center gap-2 text-sec text-[11px]">
                            <span>Blogs</span>
                            <span>Series</span>
                            <span>About</span>
                        </div>
                    </div>
                ) : (
                    <div className="px-4 py-1 bg-amber-500/10 border-b border-amber-500/20 text-center text-[10px] font-mono text-amber-400">
                        Distraction-free mode enabled (Navbar hidden)
                    </div>
                )}

                {/* Mock Article Page Canvas */}
                <div className="p-4 sm:p-5 max-h-[520px] overflow-y-auto space-y-4">
                    {/* Header Zone (Rendered at top when in breakout mode) */}
                    {isBreakout ? (
                        <div className="space-y-4">
                            <div className="w-full space-y-3.5 mx-auto">
                                {headerOrder.map((id) => renderHeaderElement(id))}
                            </div>

                            {/* Body and Sidebars starting from Body text */}
                            <div className="flex gap-4 items-start pt-2 border-t border-sec/10">
                                {showLeftSidebar && appearance.showTableOfContents && (
                                    <div className="hidden lg:block w-24 shrink-0 space-y-2 pt-2 border-r border-sec/10 pr-2">
                                        <span className="text-[9px] font-mono uppercase text-sec font-bold block">TOC Minimap</span>
                                        <div className="space-y-1.5 opacity-60">
                                            <div className="h-1 bg-accent rounded-full w-3/4" />
                                            <div className="h-1 bg-sec/40 rounded-full w-1/2 ml-1" />
                                            <div className="h-1 bg-sec/40 rounded-full w-2/3 ml-1" />
                                            <div className="h-1 bg-accent/70 rounded-full w-4/5" />
                                        </div>
                                    </div>
                                )}

                                <div className={`flex-1 min-w-0 mx-auto ${maxWidthClass}`}>
                                    <div
                                        style={{
                                            fontFamily: bodyFontFamily,
                                            fontWeight: typography.bodyFontWeight || 400,
                                            fontSize: `${typography.bodyFontSize * 0.9}px`,
                                            lineHeight: typography.lineHeight,
                                        }}
                                    >
                                        <p
                                            className="text-fg/90"
                                            style={{ marginBottom: `${(typography.paragraphSpacing || 24) * 0.75}px` }}
                                        >
                                            In modern frontend applications, state management quickly becomes the backbone of scalable architecture. Passing props through multiple layers of nested components creates tedious boilerplate known as prop drilling.
                                        </p>

                                        <div
                                            className="p-3 rounded-xl bg-[#0E0E10] border border-white/10 text-[11px] overflow-hidden"
                                            style={{
                                                fontFamily: codeFontFamily,
                                                marginBottom: `${(typography.paragraphSpacing || 24) * 0.75}px`,
                                            }}
                                        >
                                            <span className="text-purple-400">const</span>{' '}
                                            <span className="text-blue-300">ThemeContext</span> ={' '}
                                            <span className="text-yellow-300">createContext</span>
                                            <span className="text-zinc-400">(</span>
                                            <span className="text-emerald-300">'dark'</span>
                                            <span className="text-zinc-400">);</span>
                                        </div>

                                        <p className="text-fg/80 text-[12px]">
                                            By creating a dedicated Provider component, downstream consumers can subscribe to context values instantly using the <code className="px-1 py-0.5 rounded bg-fg/10 font-mono text-[11px]">useContext</code> hook.
                                        </p>
                                    </div>
                                </div>

                                {showRightSidebar && (
                                    <div className="hidden md:block w-36 shrink-0 space-y-2.5 border-l border-sec/10 pl-3">
                                        <span className="text-[9px] font-mono uppercase text-sec font-bold block">Sidebar Widgets</span>
                                        {rightWidgets.profile && (
                                            <div className="p-2 rounded-lg bg-fg/3 border border-sec/15 text-[10px]">
                                                <p className="font-semibold text-fg">Profile</p>
                                                <p className="text-sec text-[9px]">Bismay.exe</p>
                                            </div>
                                        )}
                                        {rightWidgets.series && (
                                            <div className="p-2 rounded-lg bg-fg/3 border border-sec/15 text-[10px]">
                                                <p className="font-semibold text-fg">Series</p>
                                                <p className="text-sec text-[9px]">React Series (11)</p>
                                            </div>
                                        )}
                                        {rightWidgets.subscribeForm && (
                                            <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-[10px] text-accent">
                                                Newsletter
                                            </div>
                                        )}
                                        {rightWidgets.socials && (
                                            <div className="p-2 rounded-lg bg-fg/3 border border-sec/15 text-[10px] text-sec">
                                                Social Links
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-4 items-start">
                            {showLeftSidebar && appearance.showTableOfContents && (
                                <div className="hidden lg:block w-24 shrink-0 space-y-2 pt-2 border-r border-sec/10 pr-2">
                                    <span className="text-[9px] font-mono uppercase text-sec font-bold block">TOC Minimap</span>
                                    <div className="space-y-1.5 opacity-60">
                                        <div className="h-1 bg-accent rounded-full w-3/4" />
                                        <div className="h-1 bg-sec/40 rounded-full w-1/2 ml-1" />
                                        <div className="h-1 bg-sec/40 rounded-full w-2/3 ml-1" />
                                        <div className="h-1 bg-accent/70 rounded-full w-4/5" />
                                    </div>
                                </div>
                            )}

                            <div className={`flex-1 min-w-0 space-y-4 mx-auto transition-all ${maxWidthClass}`}>
                                {headerOrder.map((id) => renderHeaderElement(id))}

                                <div
                                    className="pt-2 border-t border-sec/10"
                                    style={{
                                        fontFamily: bodyFontFamily,
                                        fontWeight: typography.bodyFontWeight || 400,
                                        fontSize: `${typography.bodyFontSize * 0.9}px`,
                                        lineHeight: typography.lineHeight,
                                    }}
                                >
                                    <p
                                        className="text-fg/90"
                                        style={{ marginBottom: `${(typography.paragraphSpacing || 24) * 0.75}px` }}
                                    >
                                        In modern frontend applications, state management quickly becomes the backbone of scalable architecture. Passing props through multiple layers of nested components creates tedious boilerplate known as prop drilling.
                                    </p>

                                    <div
                                        className="p-3 rounded-xl bg-[#0E0E10] border border-white/10 text-[11px] overflow-hidden"
                                        style={{
                                            fontFamily: codeFontFamily,
                                            marginBottom: `${(typography.paragraphSpacing || 24) * 0.75}px`,
                                        }}
                                    >
                                        <span className="text-purple-400">const</span>{' '}
                                        <span className="text-blue-300">ThemeContext</span> ={' '}
                                        <span className="text-yellow-300">createContext</span>
                                        <span className="text-zinc-400">(</span>
                                        <span className="text-emerald-300">'dark'</span>
                                        <span className="text-zinc-400">);</span>
                                    </div>

                                    <p className="text-fg/80 text-[12px]">
                                        By creating a dedicated Provider component, downstream consumers can subscribe to context values instantly using the <code className="px-1 py-0.5 rounded bg-fg/10 font-mono text-[11px]">useContext</code> hook.
                                    </p>
                                </div>
                            </div>

                            {showRightSidebar && (
                                <div className="hidden md:block w-36 shrink-0 space-y-2.5 border-l border-sec/10 pl-3">
                                    <span className="text-[9px] font-mono uppercase text-sec font-bold block">Sidebar Widgets</span>
                                    {rightWidgets.profile && (
                                        <div className="p-2 rounded-lg bg-fg/3 border border-sec/15 text-[10px]">
                                            <p className="font-semibold text-fg">Profile</p>
                                            <p className="text-sec text-[9px]">Bismay.exe</p>
                                        </div>
                                    )}
                                    {rightWidgets.series && (
                                        <div className="p-2 rounded-lg bg-fg/3 border border-sec/15 text-[10px]">
                                            <p className="font-semibold text-fg">Series</p>
                                            <p className="text-sec text-[9px]">React Series (11)</p>
                                        </div>
                                    )}
                                    {rightWidgets.subscribeForm && (
                                        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-[10px] text-accent">
                                            Newsletter
                                        </div>
                                    )}
                                    {rightWidgets.socials && (
                                        <div className="p-2 rounded-lg bg-fg/3 border border-sec/15 text-[10px] text-sec">
                                            Social Links
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
