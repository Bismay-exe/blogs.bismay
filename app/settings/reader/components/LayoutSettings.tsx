'use client'

import React from 'react'
import {
    Layout,
    Columns,
    Maximize,
    AlignCenter,
    AlignLeft,
    MoveVertical,
    Heading,
    User,
    Image as ImageIcon,
    SlidersHorizontal,
} from 'lucide-react'
import { ContentWidth, BannerWidth, TitleWidth, HeaderAlignment, AuthorStyle } from '@/lib/reader-settings/types'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { VisualChoiceCard } from '@/components/ui/settings/VisualChoiceCard'
import { SliderRow } from '@/components/ui/settings/SliderRow'
import { ToggleSwitch } from '@/components/ui/settings/ToggleSwitch'

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
            label: 'Focused Column',
            widthPx: '680px',
            desc: 'Compact editorial width for optimal reading speed and minimal eye strain.',
        },
        {
            id: 'default',
            label: 'Standard Balanced',
            widthPx: '768px',
            desc: 'Recommended blog article width with comfortable margins and line lengths.',
        },
        {
            id: 'wide',
            label: 'Expanded Canvas',
            widthPx: '920px',
            desc: 'Spacious canvas ideal for data tables, large code blocks, and diagrams.',
        },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center border border-accent/25">
                    <Layout size={16} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-fg tracking-tight">
                        Layout & Shell Architecture
                    </h3>
                    <p className="text-xs text-sec mt-0.5">
                        Configure peripheral rails, reading canvas width, header alignment, and hero banner breakout sizing.
                    </p>
                </div>
            </div>

            {/* 1. Peripheral Panels Toggles (Grouped iOS / macOS Cards) */}
            <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sec/70 font-semibold px-1">
                    Shell Rails & Focus Mode
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Top Navbar Toggle */}
                    <div
                        onClick={() => updateLayout({ showNavbar: !showNavbar })}
                        className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${
                            showNavbar
                                ? 'bg-black/[0.02] dark:bg-white/[0.02] border-sec/25 hover:border-accent/40'
                                : 'bg-black/[0.01] dark:bg-white/[0.01] border-sec/10 opacity-60'
                        }`}
                    >
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="w-8 h-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                                    <Layout size={16} />
                                </div>
                                <ToggleSwitch
                                    checked={showNavbar}
                                    onChange={(checked) => updateLayout({ showNavbar: checked })}
                                    size="sm"
                                />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-fg">Top Navigation Bar</h4>
                                <p className="text-[11px] text-sec/80 mt-0.5 leading-relaxed">
                                    Turn off for immersive focus mode on articles.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Left Sidebar TOC Toggle */}
                    <div
                        onClick={() => updateLayout({ showLeftSidebar: !showLeftSidebar })}
                        className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${
                            showLeftSidebar
                                ? 'bg-black/[0.02] dark:bg-white/[0.02] border-sec/25 hover:border-accent/40'
                                : 'bg-black/[0.01] dark:bg-white/[0.01] border-sec/10 opacity-60'
                        }`}
                    >
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="w-8 h-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                                    <Columns size={16} />
                                </div>
                                <ToggleSwitch
                                    checked={showLeftSidebar}
                                    onChange={(checked) => updateLayout({ showLeftSidebar: checked })}
                                    size="sm"
                                />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-fg">Left TOC Rail</h4>
                                <p className="text-[11px] text-sec/80 mt-0.5 leading-relaxed">
                                    Heading tree minimap and quick section link rail.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar Master Toggle */}
                    <div
                        onClick={() => updateLayout({ showRightSidebar: !showRightSidebar })}
                        className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${
                            showRightSidebar
                                ? 'bg-black/[0.02] dark:bg-white/[0.02] border-sec/25 hover:border-accent/40'
                                : 'bg-black/[0.01] dark:bg-white/[0.01] border-sec/10 opacity-60'
                        }`}
                    >
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="w-8 h-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                                    <Columns size={16} />
                                </div>
                                <ToggleSwitch
                                    checked={showRightSidebar}
                                    onChange={(checked) => updateLayout({ showRightSidebar: checked })}
                                    size="sm"
                                />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-fg">Right Sidebar Column</h4>
                                <p className="text-[11px] text-sec/80 mt-0.5 leading-relaxed">
                                    Author profile, series navigator, and newsletter cards.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Header Elements Alignment (Pinterest Ref 4 wireframe mode cards) */}
            <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2">
                    <AlignCenter size={14} className="text-accent" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sec/70 font-semibold">
                        Header Elements Alignment
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <VisualChoiceCard
                        title="Left-Aligned (Classic)"
                        description="Traditional blog structure with title, metadata, author, and tags left-aligned."
                        isSelected={headerAlignment === 'left'}
                        onClick={() => updateLayout({ headerAlignment: 'left' })}
                        icon={AlignLeft}
                        previewNode={
                            <div className="w-full flex flex-col gap-1.5 px-3">
                                <div className="h-1.5 bg-accent/70 rounded-full w-1/3" />
                                <div className="h-2 bg-fg/70 rounded-full w-4/5" />
                                <div className="h-1.5 bg-sec/40 rounded-full w-1/2" />
                            </div>
                        }
                    />

                    <VisualChoiceCard
                        title="Centered Alignment"
                        description="Awwwards editorial style with title, metadata chips, author badge, and tags centered."
                        badge="Awwwards"
                        isSelected={headerAlignment === 'center'}
                        onClick={() => updateLayout({ headerAlignment: 'center' })}
                        icon={AlignCenter}
                        previewNode={
                            <div className="w-full flex flex-col items-center gap-1.5 px-3">
                                <div className="h-1.5 bg-accent/70 rounded-full w-1/3" />
                                <div className="h-2 bg-fg/70 rounded-full w-4/5" />
                                <div className="h-1.5 bg-sec/40 rounded-full w-1/2" />
                            </div>
                        }
                    />
                </div>
            </div>

            {/* 3. Hero Banner Image Breakout Width Setting */}
            <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2">
                    <ImageIcon size={14} className="text-accent" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sec/70 font-semibold">
                        Hero Banner Breakout Width
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <VisualChoiceCard
                        title="Contained"
                        description="Fits within reading text column."
                        isSelected={bannerWidth === 'contained'}
                        onClick={() => updateLayout({ bannerWidth: 'contained' })}
                        previewNode={
                            <div className="w-full flex items-center justify-center">
                                <div className="w-16 h-8 rounded-lg bg-accent/30 border border-accent/40 flex items-center justify-center text-[9px] font-mono text-accent">
                                    Contained
                                </div>
                            </div>
                        }
                    />

                    <VisualChoiceCard
                        title="Breakout Width"
                        description="Expands beyond prose width."
                        badge="Breakout"
                        isSelected={bannerWidth === 'breakout'}
                        onClick={() => updateLayout({ bannerWidth: 'breakout' })}
                        previewNode={
                            <div className="w-full flex items-center justify-center">
                                <div className="w-24 h-8 rounded-lg bg-accent/40 border border-accent/50 flex items-center justify-center text-[9px] font-mono text-accent">
                                    Breakout
                                </div>
                            </div>
                        }
                    />

                    <VisualChoiceCard
                        title="Awwwards 85%"
                        description="Spans 85% with rounded margins."
                        badge="Awwwards"
                        isSelected={bannerWidth === 'awwwards-80'}
                        onClick={() => updateLayout({ bannerWidth: 'awwwards-80' })}
                        previewNode={
                            <div className="w-full flex items-center justify-center">
                                <div className="w-32 h-8 rounded-lg bg-accent/60 border border-accent/70 flex items-center justify-center text-[9px] font-mono text-white">
                                    85% Viewport
                                </div>
                            </div>
                        }
                    />

                    <VisualChoiceCard
                        title="Full Bleed"
                        description="Edge-to-edge screen cover."
                        isSelected={bannerWidth === 'full-bleed'}
                        onClick={() => updateLayout({ bannerWidth: 'full-bleed' })}
                        previewNode={
                            <div className="w-full flex items-center justify-center">
                                <div className="w-full h-8 rounded-none bg-accent/80 flex items-center justify-center text-[9px] font-mono text-white">
                                    100% Bleed
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>

            {/* 4. Article Title (H1) Width Setting */}
            <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2">
                    <Heading size={14} className="text-accent" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sec/70 font-semibold">
                        Article Title (H1) Width
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                        { id: 'contained', label: 'Contained', desc: 'Fits standard prose reading width.' },
                        { id: 'breakout', label: 'Breakout Width', desc: 'Expands up to 5xl container.', badge: 'Breakout' },
                        { id: 'awwwards-80', label: 'Awwwards 80%', desc: 'Spans 80% of screen width.', badge: 'Awwwards' },
                        { id: 'full-bleed', label: 'Full Bleed', desc: 'Spans maximum screen container.' },
                    ].map((opt) => (
                        <VisualChoiceCard
                            key={opt.id}
                            title={opt.label}
                            description={opt.desc}
                            badge={opt.badge}
                            isSelected={titleWidth === opt.id}
                            onClick={() => updateLayout({ titleWidth: opt.id as any })}
                        />
                    ))}
                </div>
            </div>

            {/* 5. Author Avatar Style Presentation */}
            <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2">
                    <User size={14} className="text-accent" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sec/70 font-semibold">
                        Author Avatar Presentation
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <VisualChoiceCard
                        title="Standard Inline"
                        description="Avatar sits beside author name in a neat horizontal badge."
                        isSelected={authorStyle === 'default'}
                        onClick={() => updateLayout({ authorStyle: 'default' })}
                        previewNode={
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-accent/30 border border-accent/40" />
                                <div className="space-y-1">
                                    <div className="h-1.5 w-12 bg-fg/70 rounded-full" />
                                    <div className="h-1 w-8 bg-sec/40 rounded-full" />
                                </div>
                            </div>
                        }
                    />

                    <VisualChoiceCard
                        title="Overlapping Hero"
                        description="Floating avatar overlapping the bottom of the hero cover."
                        badge="Creator"
                        isSelected={authorStyle === 'overlap'}
                        onClick={() => updateLayout({ authorStyle: 'overlap' })}
                        previewNode={
                            <div className="relative w-20 flex flex-col items-center">
                                <div className="w-full h-5 rounded-t-lg bg-zinc-700/60" />
                                <div className="w-7 h-7 -mt-3 rounded-lg bg-accent border-2 border-bg shadow-sm" />
                            </div>
                        }
                    />

                    <VisualChoiceCard
                        title="Compact Minimal"
                        description="Micro avatar with inline author signature for focus mode."
                        isSelected={authorStyle === 'compact'}
                        onClick={() => updateLayout({ authorStyle: 'compact' })}
                        previewNode={
                            <div className="flex items-center gap-1.5">
                                <div className="w-4 h-4 rounded-full bg-accent/40" />
                                <div className="h-1.5 w-14 bg-fg/60 rounded-full" />
                            </div>
                        }
                    />
                </div>
            </div>

            {/* 6. Banner Top and Bottom Margin Tactile Sliders (Voicu Apostol style) */}
            <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2">
                    <MoveVertical size={14} className="text-accent" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sec/70 font-semibold">
                        Hero Banner Vertical Spacing
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <SliderRow
                        label="Banner Top Spacing"
                        value={bannerMarginTop}
                        min={8}
                        max={56}
                        step={4}
                        unit="px"
                        minLabel="8px Tight"
                        maxLabel="56px Generous"
                        icon={MoveVertical}
                        onChange={(val) => updateLayout({ bannerMarginTop: val })}
                    />

                    <SliderRow
                        label="Banner Bottom Spacing"
                        value={bannerMarginBottom}
                        min={8}
                        max={64}
                        step={4}
                        unit="px"
                        minLabel="8px Snug"
                        maxLabel="64px Relaxed"
                        icon={MoveVertical}
                        onChange={(val) => updateLayout({ bannerMarginBottom: val })}
                    />
                </div>
            </div>

            {/* 7. Reading Column Width Options */}
            <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2">
                    <Maximize size={14} className="text-accent" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sec/70 font-semibold">
                        Reading Text Column Width
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {widthOptions.map((opt) => (
                        <VisualChoiceCard
                            key={opt.id}
                            title={opt.label}
                            description={opt.desc}
                            badge={opt.widthPx}
                            isSelected={contentWidth === opt.id}
                            onClick={() => updateLayout({ contentWidth: opt.id })}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
