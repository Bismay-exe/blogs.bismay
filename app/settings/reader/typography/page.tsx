'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { FontChoice } from '@/lib/reader-settings/types'
import { ReaderNav } from '@/components/settings/ReaderNav'

export default function TypographySettingsPage() {
    const { settings, updateTitleFont, updateHeadingFont, updateBodyFont, updateCodeFont, isLoaded } = useReaderSettings()

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="w-8 h-8 rounded-full border-2 border-sec/30 border-t-fg animate-spin" />
            </div>
        )
    }

    const { typography } = settings
    const { titleFont, headingFont, bodyFont, codeFont } = typography

    return (
        <div className="relative bg-bg text-fg py-12 pl-18 pr-3 sm:pr-6">
            <ReaderNav />
            <div className="max-w-2xl mx-auto space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-fg mb-6">
                    Typography
                </h1>

                {/* Card 1: Title (H1) Typography */}
                <div className="rounded-[28px] bg-fg/5 text-fg p-6 sm:p-7 space-y-5">
                    <div>
                        <h2 className="text-base font-bold text-fg">Article Title (H1)</h2>
                        <p className="text-xs text-sec mt-0.5">Customize title styling, weight, and scale</p>
                    </div>

                    {/* Title Font Picker */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-sec block">Title Font</span>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { id: 'inter-tight', label: 'Inter Tight' },
                                { id: 'sans', label: 'DM Sans' },
                                { id: 'serif', label: 'Lora Serif' },
                            ].map((f) => (
                                <button
                                    key={f.id}
                                    type="button"
                                    onClick={() => updateTitleFont({ titleFont: f.id as FontChoice })}
                                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                                        titleFont.titleFont === f.id
                                            ? 'border-fg bg-fg text-bg shadow-xs'
                                            : 'border-sec/15 bg-bg text-fg hover:border-sec/30'
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Title Weight */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-sec block">Title Weight</span>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { label: '600 Semi', value: 600 },
                                { label: '700 Bold', value: 700 },
                                { label: '800 Black', value: 800 },
                            ].map((w) => (
                                <button
                                    key={w.value}
                                    type="button"
                                    onClick={() => updateTitleFont({ titleFontWeight: w.value })}
                                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                                        titleFont.titleFontWeight === w.value
                                            ? 'border-fg bg-fg text-bg shadow-xs'
                                            : 'border-sec/15 bg-bg text-fg hover:border-sec/30'
                                    }`}
                                >
                                    {w.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Title Scale Slider */}
                    <div className="space-y-2 pt-1">
                        <div className="flex justify-between text-xs font-medium text-sec">
                            <span>Title Scale</span>
                            <span className="font-bold text-fg">{titleFont.titleScale}x</span>
                        </div>
                        <input
                            type="range"
                            min="0.9"
                            max="2.2"
                            step="0.05"
                            value={titleFont.titleScale}
                            onChange={(e) => updateTitleFont({ titleScale: parseFloat(e.target.value) })}
                            className="w-full accent-fg cursor-pointer"
                        />
                    </div>

                    {/* Title Uppercase Switch */}
                    <div className="flex items-center justify-between pt-2 border-t border-sec/10">
                        <div>
                            <span className="text-xs font-semibold text-fg block">Uppercase Title</span>
                            <span className="text-[11px] text-sec">Transform title letters to ALL CAPS</span>
                        </div>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={titleFont.titleUppercase}
                            onClick={() => updateTitleFont({ titleUppercase: !titleFont.titleUppercase })}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                                titleFont.titleUppercase ? 'bg-accent' : 'bg-sec/20'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    titleFont.titleUppercase ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Card 2: Headings (H2/H3) Typography */}
                <div className="rounded-[28px] bg-fg/5 text-fg p-6 sm:p-7 space-y-5">
                    <div>
                        <h2 className="text-base font-bold text-fg">Section Headings (H2)</h2>
                        <p className="text-xs text-sec mt-0.5">Control font family, scale, and vertical spacing</p>
                    </div>

                    {/* Heading Font Picker */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-sec block">Heading Font</span>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { id: 'inter-tight', label: 'Inter Tight' },
                                { id: 'sans', label: 'DM Sans' },
                                { id: 'serif', label: 'Lora Serif' },
                            ].map((f) => (
                                <button
                                    key={f.id}
                                    type="button"
                                    onClick={() => updateHeadingFont({ headingFont: f.id as FontChoice })}
                                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                                        headingFont.headingFont === f.id
                                            ? 'border-fg bg-fg text-bg shadow-xs'
                                            : 'border-sec/15 bg-bg text-fg hover:border-sec/30'
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Heading Weight */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-sec block">Heading Weight</span>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { label: '400 Light', value: 400 },
                                { label: '600 Semi', value: 600 },
                                { label: '700 Bold', value: 700 },
                            ].map((w) => (
                                <button
                                    key={w.value}
                                    type="button"
                                    onClick={() => updateHeadingFont({ headingFontWeight: w.value })}
                                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                                        headingFont.headingFontWeight === w.value
                                            ? 'border-fg bg-fg text-bg shadow-xs'
                                            : 'border-sec/15 bg-bg text-fg hover:border-sec/30'
                                    }`}
                                >
                                    {w.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Heading Scale Slider */}
                    <div className="space-y-2 pt-1">
                        <div className="flex justify-between text-xs font-medium text-sec">
                            <span>Heading Scale</span>
                            <span className="font-bold text-fg">{headingFont.headingScale}x</span>
                        </div>
                        <input
                            type="range"
                            min="0.85"
                            max="1.4"
                            step="0.05"
                            value={headingFont.headingScale}
                            onChange={(e) => updateHeadingFont({ headingScale: parseFloat(e.target.value) })}
                            className="w-full accent-fg cursor-pointer"
                        />
                    </div>

                    {/* Top & Bottom Margins */}
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-sec/10">
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs text-sec font-medium">
                                <span>Top Space</span>
                                <span className="font-bold text-fg">{headingFont.headingMarginTop}px</span>
                            </div>
                            <input
                                type="range"
                                min="16"
                                max="64"
                                step="4"
                                value={headingFont.headingMarginTop}
                                onChange={(e) => updateHeadingFont({ headingMarginTop: parseFloat(e.target.value) })}
                                className="w-full accent-fg cursor-pointer"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs text-sec font-medium">
                                <span>Bottom Space</span>
                                <span className="font-bold text-fg">{headingFont.headingMarginBottom}px</span>
                            </div>
                            <input
                                type="range"
                                min="6"
                                max="32"
                                step="2"
                                value={headingFont.headingMarginBottom}
                                onChange={(e) => updateHeadingFont({ headingMarginBottom: parseFloat(e.target.value) })}
                                className="w-full accent-fg cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* Card 3: Body Prose Typography */}
                <div className="rounded-[28px] bg-fg/5 text-fg p-6 sm:p-7 space-y-5">
                    <div>
                        <h2 className="text-base font-bold text-fg">Body Prose</h2>
                        <p className="text-xs text-sec mt-0.5">Control font family, size, and comfortable line rhythm</p>
                    </div>

                    {/* Body Font Picker */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-sec block">Body Font</span>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { id: 'sans', label: 'DM Sans' },
                                { id: 'serif', label: 'Lora Serif' },
                                { id: 'roboto', label: 'Roboto' },
                            ].map((f) => (
                                <button
                                    key={f.id}
                                    type="button"
                                    onClick={() => updateBodyFont({ bodyFont: f.id as FontChoice })}
                                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                                        bodyFont.bodyFont === f.id
                                            ? 'border-fg bg-fg text-bg shadow-xs'
                                            : 'border-sec/15 bg-bg text-fg hover:border-sec/30'
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Body Font Size Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-sec">
                            <span>Font Size</span>
                            <span className="font-bold text-fg">{bodyFont.bodyFontSize}px</span>
                        </div>
                        <input
                            type="range"
                            min="14"
                            max="22"
                            step="0.5"
                            value={bodyFont.bodyFontSize}
                            onChange={(e) => updateBodyFont({ bodyFontSize: parseFloat(e.target.value) })}
                            className="w-full accent-fg cursor-pointer"
                        />
                    </div>

                    {/* Line Height Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-sec">
                            <span>Line Height</span>
                            <span className="font-bold text-fg">{bodyFont.lineHeight}</span>
                        </div>
                        <input
                            type="range"
                            min="1.5"
                            max="2.2"
                            step="0.02"
                            value={bodyFont.lineHeight}
                            onChange={(e) => updateBodyFont({ lineHeight: parseFloat(e.target.value) })}
                            className="w-full accent-fg cursor-pointer"
                        />
                    </div>

                    {/* Paragraph Spacing Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-sec">
                            <span>Paragraph Gap</span>
                            <span className="font-bold text-fg">{bodyFont.paragraphSpacing}px</span>
                        </div>
                        <input
                            type="range"
                            min="14"
                            max="44"
                            step="2"
                            value={bodyFont.paragraphSpacing}
                            onChange={(e) => updateBodyFont({ paragraphSpacing: parseFloat(e.target.value) })}
                            className="w-full accent-fg cursor-pointer"
                        />
                    </div>
                </div>

                {/* Card 4: Code Block Typography */}
                <div className="rounded-[28px] bg-fg/5 text-fg p-6 sm:p-7 space-y-5">
                    <div>
                        <h2 className="text-base font-bold text-fg">Code Block</h2>
                        <p className="text-xs text-sec mt-0.5">Styling for embedded code snippets</p>
                    </div>

                    {/* Code Font Choice */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-sec block">Monospace Font</span>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { id: 'mono', label: 'JetBrains Mono' },
                                { id: 'space-mono', label: 'Space Mono' },
                            ].map((cf) => (
                                <button
                                    key={cf.id}
                                    type="button"
                                    onClick={() => updateCodeFont({ codeFont: cf.id as any })}
                                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                                        codeFont.codeFont === cf.id
                                            ? 'border-fg bg-fg text-bg shadow-xs'
                                            : 'border-sec/15 bg-bg text-fg hover:border-sec/30'
                                    }`}
                                >
                                    {cf.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Code Font Size */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-sec">
                            <span>Code Font Size</span>
                            <span className="font-bold text-fg">{codeFont.codeFontSize}px</span>
                        </div>
                        <input
                            type="range"
                            min="13"
                            max="19"
                            step="0.5"
                            value={codeFont.codeFontSize}
                            onChange={(e) => updateCodeFont({ codeFontSize: parseFloat(e.target.value) })}
                            className="w-full accent-fg cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
