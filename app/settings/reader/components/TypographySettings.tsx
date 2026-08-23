'use client'

import React from 'react'
import {
    Type,
    ALargeSmall,
    AlignLeft,
    Hash,
    Scale,
    MoveVertical,
    Heading,
    CaseSensitive,
    Check,
} from 'lucide-react'
import { FontChoice } from '@/lib/reader-settings/types'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { SliderRow } from '@/components/ui/settings/SliderRow'
import { SegmentedControl } from '@/components/ui/settings/SegmentedControl'

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
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center border border-accent/25">
                    <Type size={16} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-fg tracking-tight">
                        Typography Studio
                    </h3>
                    <p className="text-xs text-sec mt-0.5">
                        Fine-tune font families, weights, reading sizes, paragraph rhythm, and heading margins.
                    </p>
                </div>
            </div>

            {/* 1. Font Family Selectors */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Heading Font */}
                <div className="space-y-2 p-4 rounded-2xl border border-sec/20 bg-black/[0.02] dark:bg-white/[0.02]">
                    <div className="flex items-center gap-2 mb-1">
                        <Hash size={15} className="text-accent" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-fg font-mono">
                            Heading Font
                        </h4>
                    </div>

                    <div className="space-y-1.5">
                        {FONT_OPTIONS.map((font) => {
                            const isSelected = headingFont === font.id
                            return (
                                <button
                                    key={font.id}
                                    type="button"
                                    onClick={() => updateTypography({ headingFont: font.id })}
                                    className={`w-full p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer flex items-center justify-between ${
                                        isSelected
                                            ? 'bg-accent/15 border-accent text-fg font-bold shadow-xs'
                                            : 'bg-transparent hover:bg-black/5 dark:hover:bg-white/5 border-sec/15 text-sec hover:text-fg'
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
                            )
                        })}
                    </div>
                </div>

                {/* Body Text Font */}
                <div className="space-y-2 p-4 rounded-2xl border border-sec/20 bg-black/[0.02] dark:bg-white/[0.02]">
                    <div className="flex items-center gap-2 mb-1">
                        <AlignLeft size={15} className="text-accent" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-fg font-mono">
                            Body Text Font
                        </h4>
                    </div>

                    <div className="space-y-1.5">
                        {FONT_OPTIONS.filter((f) => f.id !== 'space-mono').map((font) => {
                            const isSelected = bodyFont === font.id
                            return (
                                <button
                                    key={font.id}
                                    type="button"
                                    onClick={() => updateTypography({ bodyFont: font.id })}
                                    className={`w-full p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer flex items-center justify-between ${
                                        isSelected
                                            ? 'bg-accent/15 border-accent text-fg font-bold shadow-xs'
                                            : 'bg-transparent hover:bg-black/5 dark:hover:bg-white/5 border-sec/15 text-sec hover:text-fg'
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
                            )
                        })}
                    </div>
                </div>

                {/* Code Block Font */}
                <div className="space-y-2 p-4 rounded-2xl border border-sec/20 bg-black/[0.02] dark:bg-white/[0.02]">
                    <div className="flex items-center gap-2 mb-1">
                        <Type size={15} className="text-accent" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-fg font-mono">
                            Code Block Font
                        </h4>
                    </div>

                    <div className="space-y-1.5">
                        {[
                            { id: 'mono', name: 'JetBrains Mono', family: 'var(--font-mono)' },
                            { id: 'space-mono', name: 'Space Mono', family: 'var(--font-space-mono)' },
                        ].map((font) => {
                            const isSelected = codeFont === font.id
                            return (
                                <button
                                    key={font.id}
                                    type="button"
                                    onClick={() => updateTypography({ codeFont: font.id as any })}
                                    className={`w-full p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer flex items-center justify-between ${
                                        isSelected
                                            ? 'bg-accent/15 border-accent text-fg font-bold shadow-xs'
                                            : 'bg-transparent hover:bg-black/5 dark:hover:bg-white/5 border-sec/15 text-sec hover:text-fg'
                                    }`}
                                >
                                    <span
                                        className="text-xs font-mono"
                                        style={{ fontFamily: font.family }}
                                    >
                                        {font.name}
                                    </span>
                                    <span className="text-[11px] text-sec font-mono">
                                        {'{ ... }'}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* 2. Granular Font Weights (Segmented Controls) */}
            <div className="space-y-2.5 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sec/70 font-semibold px-1">
                    Font Weight Tuning
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Body Font Weight */}
                    <div className="p-4 rounded-2xl border border-sec/15 bg-black/[0.02] dark:bg-white/[0.02] space-y-2.5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-semibold text-fg">Body Weight</span>
                            <span className="text-xs font-mono text-accent font-bold">
                                {bodyFontWeight}
                            </span>
                        </div>
                        <SegmentedControl
                            options={[
                                { label: '300 Light', value: 300 },
                                { label: '400 Regular', value: 400 },
                                { label: '500 Med', value: 500 },
                            ]}
                            value={bodyFontWeight}
                            onChange={(val) => updateTypography({ bodyFontWeight: val })}
                            size="sm"
                            className="w-full justify-between"
                        />
                    </div>

                    {/* Heading Font Weight */}
                    <div className="p-4 rounded-2xl border border-sec/15 bg-black/[0.02] dark:bg-white/[0.02] space-y-2.5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-semibold text-fg">Heading Weight</span>
                            <span className="text-xs font-mono text-accent font-bold">
                                {headingFontWeight}
                            </span>
                        </div>
                        <SegmentedControl
                            options={[
                                { label: '400 Light', value: 400 },
                                { label: '600 Semi', value: 600 },
                                { label: '700 Bold', value: 700 },
                            ]}
                            value={headingFontWeight}
                            onChange={(val) => updateTypography({ headingFontWeight: val })}
                            size="sm"
                            className="w-full justify-between"
                        />
                    </div>

                    {/* Title (H1) Weight */}
                    <div className="p-4 rounded-2xl border border-sec/15 bg-black/[0.02] dark:bg-white/[0.02] space-y-2.5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-semibold text-fg">Title (H1) Weight</span>
                            <span className="text-xs font-mono text-accent font-bold">
                                {titleFontWeight}
                            </span>
                        </div>
                        <SegmentedControl
                            options={[
                                { label: '600 Semi', value: 600 },
                                { label: '700 Bold', value: 700 },
                                { label: '800 Black', value: 800 },
                            ]}
                            value={titleFontWeight}
                            onChange={(val) => updateTypography({ titleFontWeight: val })}
                            size="sm"
                            className="w-full justify-between"
                        />
                    </div>
                </div>
            </div>

            {/* 3. Title Letter Case (Natural vs ALL UPPERCASE Awwwards) */}
            <div className="p-4 rounded-2xl border border-sec/20 bg-black/[0.02] dark:bg-white/[0.02] space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CaseSensitive size={16} className="text-accent" />
                        <div>
                            <h4 className="text-xs font-bold text-fg font-mono uppercase tracking-wider">
                                Article Title Letter Case
                            </h4>
                            <p className="text-[11px] text-sec/80">
                                Toggle between natural capitalization and all-caps uppercase styling.
                            </p>
                        </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-accent px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/25">
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
                                : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-sec'
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
                                : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-sec'
                        }`}
                    >
                        ALL UPPERCASE (Awwwards Style)
                    </button>
                </div>
            </div>

            {/* 4. Scale Sliders (Voicu Apostol SliderRows) */}
            <div className="space-y-2.5 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sec/70 font-semibold px-1">
                    Sizes, Line Height & Spacing
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <SliderRow
                        label="Title Scale"
                        value={titleScale}
                        min={0.9}
                        max={2.2}
                        step={0.05}
                        unit="x"
                        minLabel="0.9x Standard"
                        maxLabel="2.2x Giant"
                        icon={Heading}
                        onChange={(val) => updateTypography({ titleScale: val })}
                    />

                    <SliderRow
                        label="Body Font Size"
                        value={bodyFontSize}
                        min={14}
                        max={22}
                        step={0.5}
                        unit="px"
                        minLabel="14px Compact"
                        maxLabel="22px Large"
                        icon={ALargeSmall}
                        onChange={(val) => updateTypography({ bodyFontSize: val })}
                    />

                    <SliderRow
                        label="Line Spacing"
                        value={lineHeight}
                        min={1.5}
                        max={2.2}
                        step={0.05}
                        minLabel="1.5 Tight"
                        maxLabel="2.2 Relaxed"
                        icon={AlignLeft}
                        onChange={(val) => updateTypography({ lineHeight: val })}
                    />

                    <SliderRow
                        label="Heading Scale"
                        value={headingScale}
                        min={0.85}
                        max={1.4}
                        step={0.05}
                        unit="x"
                        minLabel="0.85x Subtle"
                        maxLabel="1.4x Bold"
                        icon={Scale}
                        onChange={(val) => updateTypography({ headingScale: val })}
                    />
                </div>
            </div>

            {/* 5. Paragraph Spacing & Heading Top/Bottom Margins */}
            <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2">
                    <MoveVertical size={14} className="text-accent" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sec/70 font-semibold">
                        Vertical Rhythm & Margins
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <SliderRow
                        label="Paragraph Spacing"
                        value={paragraphSpacing}
                        min={14}
                        max={44}
                        step={2}
                        unit="px"
                        minLabel="14px Compact"
                        maxLabel="44px Airiness"
                        onChange={(val) => updateTypography({ paragraphSpacing: val })}
                    />

                    <SliderRow
                        label="Heading Top Space"
                        value={headingMarginTop}
                        min={16}
                        max={64}
                        step={4}
                        unit="px"
                        minLabel="16px Tight"
                        maxLabel="64px Editorial"
                        onChange={(val) => updateTypography({ headingMarginTop: val })}
                    />

                    <SliderRow
                        label="Heading Bottom Space"
                        value={headingMarginBottom}
                        min={6}
                        max={32}
                        step={2}
                        unit="px"
                        minLabel="6px Snug"
                        maxLabel="32px Relaxed"
                        onChange={(val) => updateTypography({ headingMarginBottom: val })}
                    />
                </div>
            </div>
        </div>
    )
}
