'use client'

import React from 'react'
import { Type, ALargeSmall, AlignLeft, Hash, Scale, MoveVertical, Heading, Space, CaseSensitive } from 'lucide-react'
import { FontChoice } from '@/lib/reader-settings/types'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

interface FontOption {
    id: FontChoice
    name: string
    fontFamily: string
    category: string
    sample: string
}

const FONT_OPTIONS: FontOption[] = [
    {
        id: 'inter-tight',
        name: 'Inter Tight',
        fontFamily: 'var(--font-inter-tight)',
        category: 'Awwwards & Editorial',
        sample: 'Award-winning editorial layout.',
    },
    {
        id: 'sans',
        name: 'Inter Sans',
        fontFamily: 'var(--font-sans)',
        category: 'Modern UI & Clean',
        sample: 'Sphinx of black quartz, judge my vow.',
    },
    {
        id: 'serif',
        name: 'Lora Serif',
        fontFamily: 'var(--font-serif)',
        category: 'Editorial & Bookish',
        sample: 'Sphinx of black quartz, judge my vow.',
    },
    {
        id: 'mono',
        name: 'JetBrains Mono',
        fontFamily: 'var(--font-mono)',
        category: 'Technical & Terminal',
        sample: 'const code = "clean & legible";',
    },
    {
        id: 'space-mono',
        name: 'Space Mono',
        fontFamily: 'var(--font-space-mono)',
        category: 'Retro & Geometric',
        sample: 'SELECT * FROM developer_mind;',
    },
]

export const TypographySettings: React.FC = () => {
    const { settings, updateTypography } = useReaderSettings()
    const {
        headingFont,
        bodyFont,
        codeFont,
        bodyFontSize,
        bodyFontWeight = 400,
        headingFontWeight = 700,
        titleFontWeight = 700,
        titleScale = 1.0,
        titleUppercase = false,
        lineHeight,
        paragraphSpacing = 24,
        headingMarginTop = 32,
        headingMarginBottom = 12,
        headingScale,
    } = settings.typography

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-sm font-bold text-fg tracking-tight">Typography Studio</h3>
                <p className="text-xs text-sec mt-0.5">
                    Fine-tune font families, weights, reading sizes, paragraph spacing, and heading margins.
                </p>
            </div>

            {/* Font Family Selectors */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Heading Font */}
                <div className="space-y-2.5 p-4 rounded-2xl border border-sec/20 bg-fg/2">
                    <div className="flex items-center gap-2">
                        <Hash size={15} className="text-accent" />
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-fg font-mono">
                            Heading Font
                        </h4>
                    </div>
                    <div className="space-y-1.5">
                        {FONT_OPTIONS.map((font) => (
                            <button
                                key={font.id}
                                type="button"
                                onClick={() => updateTypography({ headingFont: font.id })}
                                className={`w-full p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer flex items-center justify-between ${
                                    headingFont === font.id
                                        ? 'bg-accent/15 border-accent text-fg font-bold shadow-xs'
                                        : 'bg-transparent hover:bg-fg/5 border-sec/15 text-sec hover:text-fg'
                                }`}
                            >
                                <div>
                                    <span
                                        className="text-xs block"
                                        style={{ fontFamily: font.fontFamily }}
                                    >
                                        {font.name}
                                    </span>
                                    <span className="text-[10px] text-sec/70 font-sans">
                                        {font.category}
                                    </span>
                                </div>
                                <span
                                    className="text-xs text-fg/80 font-bold"
                                    style={{ fontFamily: font.fontFamily }}
                                >
                                    Aa
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Body Font */}
                <div className="space-y-2.5 p-4 rounded-2xl border border-sec/20 bg-fg/2">
                    <div className="flex items-center gap-2">
                        <AlignLeft size={15} className="text-accent" />
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-fg font-mono">
                            Body Text Font
                        </h4>
                    </div>
                    <div className="space-y-1.5">
                        {FONT_OPTIONS.filter((f) => f.id !== 'space-mono').map((font) => (
                            <button
                                key={font.id}
                                type="button"
                                onClick={() => updateTypography({ bodyFont: font.id })}
                                className={`w-full p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer flex items-center justify-between ${
                                    bodyFont === font.id
                                        ? 'bg-accent/15 border-accent text-fg font-bold shadow-xs'
                                        : 'bg-transparent hover:bg-fg/5 border-sec/15 text-sec hover:text-fg'
                                }`}
                            >
                                <div>
                                    <span
                                        className="text-xs block"
                                        style={{ fontFamily: font.fontFamily }}
                                    >
                                        {font.name}
                                    </span>
                                    <span className="text-[10px] text-sec/70 font-sans">
                                        {font.category}
                                    </span>
                                </div>
                                <span
                                    className="text-xs text-fg/80"
                                    style={{ fontFamily: font.fontFamily }}
                                >
                                    Ag
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Code Block Font */}
                <div className="space-y-2.5 p-4 rounded-2xl border border-sec/20 bg-fg/2">
                    <div className="flex items-center gap-2">
                        <Type size={15} className="text-accent" />
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-fg font-mono">
                            Code Block Font
                        </h4>
                    </div>
                    <div className="space-y-1.5">
                        {[
                            { id: 'mono', name: 'JetBrains Mono', family: 'var(--font-mono)' },
                            { id: 'space-mono', name: 'Space Mono', family: 'var(--font-space-mono)' },
                        ].map((font) => (
                            <button
                                key={font.id}
                                type="button"
                                onClick={() => updateTypography({ codeFont: font.id as any })}
                                className={`w-full p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer flex items-center justify-between ${
                                    codeFont === font.id
                                        ? 'bg-accent/15 border-accent text-fg font-bold shadow-xs'
                                        : 'bg-transparent hover:bg-fg/5 border-sec/15 text-sec hover:text-fg'
                                }`}
                            >
                                <span className="text-xs font-mono" style={{ fontFamily: font.family }}>
                                    {font.name}
                                </span>
                                <span className="text-[11px] text-sec font-mono">
                                    {'{ ... }'}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Font Weight Granular Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Body Font Weight */}
                <div className="p-4 rounded-2xl border border-sec/20 bg-fg/2 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-fg">Body Weight</span>
                        <span className="text-xs font-mono text-accent font-bold">{bodyFontWeight}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                        {[
                            { label: '300 Light', value: 300 },
                            { label: '400 Regular', value: 400 },
                            { label: '500 Medium', value: 500 },
                        ].map((w) => (
                            <button
                                key={w.value}
                                type="button"
                                onClick={() => updateTypography({ bodyFontWeight: w.value })}
                                className={`py-1.5 px-2 rounded-lg text-[11px] font-mono transition-colors cursor-pointer text-center ${
                                    bodyFontWeight === w.value
                                        ? 'bg-accent text-white dark:text-[#0C0C0C] font-bold'
                                        : 'bg-fg/5 hover:bg-fg/10 text-sec'
                                }`}
                            >
                                {w.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Heading Font Weight */}
                <div className="p-4 rounded-2xl border border-sec/20 bg-fg/2 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-fg">Heading Weight</span>
                        <span className="text-xs font-mono text-accent font-bold">{headingFontWeight}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                        {[
                            { label: '400 Light', value: 400 },
                            { label: '600 Semi', value: 600 },
                            { label: '700 Bold', value: 700 },
                        ].map((w) => (
                            <button
                                key={w.value}
                                type="button"
                                onClick={() => updateTypography({ headingFontWeight: w.value })}
                                className={`py-1.5 px-2 rounded-lg text-[11px] font-mono transition-colors cursor-pointer text-center ${
                                    headingFontWeight === w.value
                                        ? 'bg-accent text-white dark:text-[#0C0C0C] font-bold'
                                        : 'bg-fg/5 hover:bg-fg/10 text-sec'
                                }`}
                            >
                                {w.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Title (H1) Weight */}
                <div className="p-4 rounded-2xl border border-sec/20 bg-fg/2 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-fg">Title (H1) Weight</span>
                        <span className="text-xs font-mono text-accent font-bold">{titleFontWeight}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                        {[
                            { label: '600 Semi', value: 600 },
                            { label: '700 Bold', value: 700 },
                            { label: '800 Black', value: 800 },
                        ].map((w) => (
                            <button
                                key={w.value}
                                type="button"
                                onClick={() => updateTypography({ titleFontWeight: w.value })}
                                className={`py-1.5 px-2 rounded-lg text-[11px] font-mono transition-colors cursor-pointer text-center ${
                                    titleFontWeight === w.value
                                        ? 'bg-accent text-white dark:text-[#0C0C0C] font-bold'
                                        : 'bg-fg/5 hover:bg-fg/10 text-sec'
                                }`}
                            >
                                {w.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Title Case (Uppercase vs Natural) Toggle */}
            <div className="p-4 rounded-2xl border border-sec/20 bg-fg/2 space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CaseSensitive size={16} className="text-accent" />
                        <div>
                            <h4 className="text-xs font-semibold text-fg font-mono uppercase tracking-wider">
                                Article Title Letter Case
                            </h4>
                            <p className="text-[11px] text-sec">
                                Toggle between standard title case and all-caps uppercase styling.
                            </p>
                        </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-accent">
                        {titleUppercase ? 'UPPERCASE' : 'NATURAL'}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => updateTypography({ titleUppercase: false })}
                        className={`py-2 px-3 rounded-xl text-xs font-mono transition-all cursor-pointer text-center ${
                            !titleUppercase
                                ? 'bg-accent text-white dark:text-[#0C0C0C] font-bold shadow-xs'
                                : 'bg-fg/5 hover:bg-fg/10 text-sec'
                        }`}
                    >
                        Natural / Title Case
                    </button>
                    <button
                        type="button"
                        onClick={() => updateTypography({ titleUppercase: true })}
                        className={`py-2 px-3 rounded-xl text-xs font-mono transition-all cursor-pointer text-center ${
                            titleUppercase
                                ? 'bg-accent text-white dark:text-[#0C0C0C] font-bold shadow-xs'
                                : 'bg-fg/5 hover:bg-fg/10 text-sec'
                        }`}
                    >
                        ALL UPPERCASE (Awwwards Style)
                    </button>
                </div>
            </div>

            {/* Scale Sliders: Title Scale, Body Font Size, Line Spacing, Heading Scale */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {/* Title (H1) Size / Scale Factor */}
                <div className="p-4 rounded-2xl border border-sec/20 bg-fg/2 space-y-2.5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <Heading size={14} className="text-accent" />
                            <span className="text-xs font-semibold text-fg font-mono">Title Scale</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-accent">
                            {titleScale}x
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0.9"
                        max="2.2"
                        step="0.05"
                        value={titleScale}
                        onChange={(e) => updateTypography({ titleScale: parseFloat(e.target.value) })}
                        className="w-full accent-accent cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-sec font-mono">
                        <span>0.9x Standard</span>
                        <span>2.2x Giant Awwwards</span>
                    </div>
                </div>

                {/* Body Text Size */}
                <div className="p-4 rounded-2xl border border-sec/20 bg-fg/2 space-y-2.5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <ALargeSmall size={14} className="text-accent" />
                            <span className="text-xs font-semibold text-fg font-mono">Body Font Size</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-accent">
                            {bodyFontSize}px
                        </span>
                    </div>
                    <input
                        type="range"
                        min="14"
                        max="22"
                        step="0.5"
                        value={bodyFontSize}
                        onChange={(e) => updateTypography({ bodyFontSize: parseFloat(e.target.value) })}
                        className="w-full accent-accent cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-sec font-mono">
                        <span>14px Compact</span>
                        <span>22px Large</span>
                    </div>
                </div>

                {/* Line Spacing / Line Height */}
                <div className="p-4 rounded-2xl border border-sec/20 bg-fg/2 space-y-2.5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <AlignLeft size={14} className="text-accent" />
                            <span className="text-xs font-semibold text-fg font-mono">Line Spacing</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-accent">
                            {lineHeight}
                        </span>
                    </div>
                    <input
                        type="range"
                        min="1.5"
                        max="2.2"
                        step="0.05"
                        value={lineHeight}
                        onChange={(e) => updateTypography({ lineHeight: parseFloat(e.target.value) })}
                        className="w-full accent-accent cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-sec font-mono">
                        <span>1.5 Tight</span>
                        <span>2.2 Relaxed</span>
                    </div>
                </div>

                {/* Heading Scale Factor */}
                <div className="p-4 rounded-2xl border border-sec/20 bg-fg/2 space-y-2.5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <Scale size={14} className="text-accent" />
                            <span className="text-xs font-semibold text-fg font-mono">Heading Scale</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-accent">
                            {headingScale}x
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0.85"
                        max="1.4"
                        step="0.05"
                        value={headingScale}
                        onChange={(e) => updateTypography({ headingScale: parseFloat(e.target.value) })}
                        className="w-full accent-accent cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-sec font-mono">
                        <span>0.85x Subtle</span>
                        <span>1.4x Bold</span>
                    </div>
                </div>
            </div>

            {/* Vertical Spacing Sliders: Paragraph Height & Heading Top/Bottom Margins */}
            <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                    <MoveVertical size={14} className="text-accent" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-fg font-mono">
                        Vertical Block Spacing & Heading Margins
                    </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Paragraph Bottom Spacing */}
                    <div className="p-4 rounded-2xl border border-sec/20 bg-fg/2 space-y-2.5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-fg font-mono">Paragraph Spacing</span>
                            <span className="text-xs font-mono font-bold text-accent">
                                {paragraphSpacing}px
                            </span>
                        </div>
                        <input
                            type="range"
                            min="14"
                            max="44"
                            step="2"
                            value={paragraphSpacing}
                            onChange={(e) => updateTypography({ paragraphSpacing: parseFloat(e.target.value) })}
                            className="w-full accent-accent cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-sec font-mono">
                            <span>14px Compact</span>
                            <span>44px Airiness</span>
                        </div>
                    </div>

                    {/* Heading Top Margin */}
                    <div className="p-4 rounded-2xl border border-sec/20 bg-fg/2 space-y-2.5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-fg font-mono">Heading Top Space</span>
                            <span className="text-xs font-mono font-bold text-accent">
                                {headingMarginTop}px
                            </span>
                        </div>
                        <input
                            type="range"
                            min="16"
                            max="64"
                            step="4"
                            value={headingMarginTop}
                            onChange={(e) => updateTypography({ headingMarginTop: parseFloat(e.target.value) })}
                            className="w-full accent-accent cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-sec font-mono">
                            <span>16px Tight</span>
                            <span>64px Editorial</span>
                        </div>
                    </div>

                    {/* Heading Bottom Margin */}
                    <div className="p-4 rounded-2xl border border-sec/20 bg-fg/2 space-y-2.5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-fg font-mono">Heading Bottom Space</span>
                            <span className="text-xs font-mono font-bold text-accent">
                                {headingMarginBottom}px
                            </span>
                        </div>
                        <input
                            type="range"
                            min="6"
                            max="32"
                            step="2"
                            value={headingMarginBottom}
                            onChange={(e) => updateTypography({ headingMarginBottom: parseFloat(e.target.value) })}
                            className="w-full accent-accent cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-sec font-mono">
                            <span>6px Snug</span>
                            <span>32px Relaxed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
