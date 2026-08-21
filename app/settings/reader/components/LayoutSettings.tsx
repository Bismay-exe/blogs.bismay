'use client'

import React from 'react'
import {
    Layout,
    Columns,
    Eye,
    EyeOff,
    Maximize,
    Minimize,
    Image as ImageIcon,
    AlignCenter,
    AlignLeft,
    MoveVertical,
    Heading,
    User,
} from 'lucide-react'
import { ContentWidth, BannerWidth, TitleWidth, HeaderAlignment, AuthorStyle } from '@/lib/reader-settings/types'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

export const LayoutSettings: React.FC = () => {
    const { settings, updateLayout } = useReaderSettings()
    const {
        showNavbar,
        showLeftSidebar,
        showRightSidebar,
        contentWidth,
        bannerWidth = 'contained',
        titleWidth = 'contained',
        authorStyle = 'default',
        bannerMarginTop = 24,
        bannerMarginBottom = 32,
        headerAlignment = 'left',
    } = settings.layout

    const widthOptions: { id: ContentWidth; label: string; widthPx: string; desc: string }[] = [
        {
            id: 'narrow',
            label: 'Focused (Narrow)',
            widthPx: '680px',
            desc: 'Compact editorial width for optimal reading speed and minimal eye strain.',
        },
        {
            id: 'default',
            label: 'Balanced (Standard)',
            widthPx: '768px',
            desc: 'Recommended blog article width with comfortable margins and line lengths.',
        },
        {
            id: 'wide',
            label: 'Expanded (Wide)',
            widthPx: '920px',
            desc: 'Spacious canvas ideal for data tables, large code blocks, and diagrams.',
        },
    ]

    const authorStyleOptions: { id: AuthorStyle; label: string; desc: string; badge?: string }[] = [
        {
            id: 'default',
            label: 'Standard Inline',
            desc: 'Avatar sits beside author name in a neat horizontal badge.',
        },
        {
            id: 'overlap',
            label: 'Overlapping Hero Avatar',
            desc: 'Floating avatar overlapping bottom of the hero banner with clean creator byline.',
            badge: 'Creator Style',
        },
        {
            id: 'compact',
            label: 'Compact Minimal',
            desc: 'Micro avatar with inline author signature.',
        },
    ]

    const bannerOptions: { id: BannerWidth; label: string; desc: string; badge?: string }[] = [
        {
            id: 'contained',
            label: 'Contained',
            desc: 'Fits neatly inside the prose reading column.',
        },
        {
            id: 'breakout',
            label: 'Breakout Width',
            desc: 'Expands wider than the text container for prominent visual impact.',
            badge: 'Breakout',
        },
        {
            id: 'awwwards-80',
            label: 'Awwwards 85% Viewport',
            desc: 'Awwwards blog style: spans 85% of the screen width with elegant margins and rounded corners.',
            badge: 'Awwwards Style',
        },
        {
            id: 'full-bleed',
            label: 'Full Bleed Viewport',
            desc: 'Extends edge-to-edge across the entire screen.',
        },
    ]

    const titleWidthOptions: { id: TitleWidth; label: string; desc: string; badge?: string }[] = [
        {
            id: 'contained',
            label: 'Contained',
            desc: 'Title fits neatly inside the standard prose reading column.',
        },
        {
            id: 'breakout',
            label: 'Breakout Width',
            desc: 'Expands up to 5xl width for a prominent editorial presence.',
            badge: 'Breakout',
        },
        {
            id: 'awwwards-80',
            label: 'Awwwards 80% Viewport',
            desc: 'Spans 80% of the screen width for massive editorial impact.',
            badge: 'Awwwards Style',
        },
        {
            id: 'full-bleed',
            label: 'Full Bleed Width',
            desc: 'Spans the full screen container width.',
        },
    ]

    const alignmentOptions: { id: HeaderAlignment; label: string; icon: React.ElementType; desc: string; badge?: string }[] = [
        {
            id: 'left',
            label: 'Left-Aligned',
            icon: AlignLeft,
            desc: 'Classic blog structure with title, metadata, author, and tags starting from the left.',
        },
        {
            id: 'center',
            label: 'Centered Alignment',
            icon: AlignCenter,
            desc: 'Awwwards blog style with title, metadata chips, author badge, and tags centered.',
            badge: 'Awwwards Style',
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-sm font-bold text-fg tracking-tight">Layout & Shell Architecture</h3>
                <p className="text-xs text-sec mt-0.5">
                    Configure peripheral navigation bars, sidebars, reading canvas width, header alignment, title width, and breakout banner styling.
                </p>
            </div>

            {/* Layout Panels Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Navbar Master Toggle */}
                <div
                    onClick={() => updateLayout({ showNavbar: !showNavbar })}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        showNavbar
                            ? 'bg-fg/2 border-accent/40 ring-1 ring-accent/20'
                            : 'bg-fg/1 border-sec/15 opacity-70'
                    }`}
                >
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="w-8 h-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                                <Layout size={16} />
                            </div>
                            <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                                    showNavbar ? 'bg-emerald-500/15 text-emerald-400' : 'bg-fg/5 text-sec'
                                }`}
                            >
                                {showNavbar ? 'SHOWN' : 'HIDDEN'}
                            </span>
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold text-fg">Top Navigation Bar</h4>
                            <p className="text-[11px] text-sec mt-1">
                                Main header navigation. Turn off for immersive focus mode.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Left Sidebar TOC Toggle */}
                <div
                    onClick={() => updateLayout({ showLeftSidebar: !showLeftSidebar })}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        showLeftSidebar
                            ? 'bg-fg/2 border-accent/40 ring-1 ring-accent/20'
                            : 'bg-fg/1 border-sec/15 opacity-70'
                    }`}
                >
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="w-8 h-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                                <Columns size={16} />
                            </div>
                            <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                                    showLeftSidebar ? 'bg-emerald-500/15 text-emerald-400' : 'bg-fg/5 text-sec'
                                }`}
                            >
                                {showLeftSidebar ? 'SHOWN' : 'HIDDEN'}
                            </span>
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold text-fg">Left TOC Rail</h4>
                            <p className="text-[11px] text-sec mt-1">
                                Interactive heading minimap and quick navigation link rail.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar Master Toggle */}
                <div
                    onClick={() => updateLayout({ showRightSidebar: !showRightSidebar })}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        showRightSidebar
                            ? 'bg-fg/2 border-accent/40 ring-1 ring-accent/20'
                            : 'bg-fg/1 border-sec/15 opacity-70'
                    }`}
                >
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="w-8 h-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                                <Columns size={16} />
                            </div>
                            <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                                    showRightSidebar ? 'bg-emerald-500/15 text-emerald-400' : 'bg-fg/5 text-sec'
                                }`}
                            >
                                {showRightSidebar ? 'SHOWN' : 'HIDDEN'}
                            </span>
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold text-fg">Right Sidebar Column</h4>
                            <p className="text-[11px] text-sec mt-1">
                                Author profile, series navigator, and newsletter widgets.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header Zone Alignment (Left vs Centered Awwwards) */}
            <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                    <AlignCenter size={14} className="text-accent" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-fg font-mono">
                        Header Elements Alignment (Title, Author, Metadata, Tags)
                    </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {alignmentOptions.map((opt) => {
                        const isSelected = headerAlignment === opt.id
                        const Icon = opt.icon
                        return (
                            <div
                                key={opt.id}
                                onClick={() => updateLayout({ headerAlignment: opt.id })}
                                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                                    isSelected
                                        ? 'bg-accent/10 border-accent shadow-sm ring-1 ring-accent/30'
                                        : 'bg-fg/2 hover:bg-fg/4 border-sec/15'
                                }`}
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Icon size={16} className={isSelected ? 'text-accent' : 'text-sec'} />
                                            <h5 className={`text-xs font-bold ${isSelected ? 'text-fg' : 'text-sec'}`}>
                                                {opt.label}
                                            </h5>
                                        </div>
                                        {opt.badge && (
                                            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                                                {opt.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-sec leading-relaxed">
                                        {opt.desc}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Article Title Display Width Setting */}
            <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                    <Heading size={14} className="text-accent" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-fg font-mono">
                        Article Title (H1) Display Width
                    </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {titleWidthOptions.map((opt) => {
                        const isSelected = titleWidth === opt.id
                        return (
                            <div
                                key={opt.id}
                                onClick={() => updateLayout({ titleWidth: opt.id })}
                                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                                    isSelected
                                        ? 'bg-accent/10 border-accent shadow-sm ring-1 ring-accent/30'
                                        : 'bg-fg/2 hover:bg-fg/4 border-sec/15'
                                }`}
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h5 className={`text-xs font-bold ${isSelected ? 'text-fg' : 'text-sec'}`}>
                                            {opt.label}
                                        </h5>
                                        {opt.badge && (
                                            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                                                {opt.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-sec leading-relaxed">
                                        {opt.desc}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Banner Image Breakout Width Setting */}
            <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                    <ImageIcon size={14} className="text-accent" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-fg font-mono">
                        Hero Banner Image Display Width
                    </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {bannerOptions.map((opt) => {
                        const isSelected = bannerWidth === opt.id
                        return (
                            <div
                                key={opt.id}
                                onClick={() => updateLayout({ bannerWidth: opt.id })}
                                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                                    isSelected
                                        ? 'bg-accent/10 border-accent shadow-sm ring-1 ring-accent/30'
                                        : 'bg-fg/2 hover:bg-fg/4 border-sec/15'
                                }`}
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h5 className={`text-xs font-bold ${isSelected ? 'text-fg' : 'text-sec'}`}>
                                            {opt.label}
                                        </h5>
                                        {opt.badge && (
                                            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                                                {opt.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-sec leading-relaxed">
                                        {opt.desc}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Author Avatar Presentation Setting */}
            <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                    <User size={14} className="text-accent" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-fg font-mono">
                        Author Avatar Presentation & Style
                    </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {authorStyleOptions.map((opt) => {
                        const isSelected = authorStyle === opt.id
                        return (
                            <div
                                key={opt.id}
                                onClick={() => updateLayout({ authorStyle: opt.id })}
                                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                                    isSelected
                                        ? 'bg-accent/10 border-accent shadow-sm ring-1 ring-accent/30'
                                        : 'bg-fg/2 hover:bg-fg/4 border-sec/15'
                                }`}
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h5 className={`text-xs font-bold ${isSelected ? 'text-fg' : 'text-sec'}`}>
                                            {opt.label}
                                        </h5>
                                        {opt.badge && (
                                            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                                                {opt.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-sec leading-relaxed">
                                        {opt.desc}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Banner Top and Bottom Margin / Spacing Controls */}
            <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                    <MoveVertical size={14} className="text-accent" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-fg font-mono">
                        Banner Image Vertical Spacing
                    </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Banner Top Margin */}
                    <div className="p-4 rounded-2xl border border-sec/20 bg-fg/2 space-y-2.5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-fg font-mono">Banner Top Space</span>
                            <span className="text-xs font-mono font-bold text-accent">
                                {bannerMarginTop}px
                            </span>
                        </div>
                        <input
                            type="range"
                            min="8"
                            max="56"
                            step="4"
                            value={bannerMarginTop}
                            onChange={(e) => updateLayout({ bannerMarginTop: parseFloat(e.target.value) })}
                            className="w-full accent-accent cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-sec font-mono">
                            <span>8px Tight</span>
                            <span>56px Generous</span>
                        </div>
                    </div>

                    {/* Banner Bottom Margin */}
                    <div className="p-4 rounded-2xl border border-sec/20 bg-fg/2 space-y-2.5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-fg font-mono">Banner Bottom Space</span>
                            <span className="text-xs font-mono font-bold text-accent">
                                {bannerMarginBottom}px
                            </span>
                        </div>
                        <input
                            type="range"
                            min="8"
                            max="64"
                            step="4"
                            value={bannerMarginBottom}
                            onChange={(e) => updateLayout({ bannerMarginBottom: parseFloat(e.target.value) })}
                            className="w-full accent-accent cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-sec font-mono">
                            <span>8px Snug</span>
                            <span>64px Relaxed</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reading Content Canvas Width */}
            <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                    <Maximize size={14} className="text-accent" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-fg font-mono">
                        Reading Text Column Width
                    </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {widthOptions.map((opt) => {
                        const isSelected = contentWidth === opt.id
                        return (
                            <div
                                key={opt.id}
                                onClick={() => updateLayout({ contentWidth: opt.id })}
                                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                                    isSelected
                                        ? 'bg-accent/10 border-accent shadow-sm ring-1 ring-accent/30'
                                        : 'bg-fg/2 hover:bg-fg/4 border-sec/15'
                                }`}
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h5 className={`text-xs font-bold ${isSelected ? 'text-fg' : 'text-sec'}`}>
                                            {opt.label}
                                        </h5>
                                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-fg/5 text-sec">
                                            {opt.widthPx}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-sec leading-relaxed">
                                        {opt.desc}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
