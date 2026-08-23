'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { FontChoice } from '@/lib/reader-settings/types'
import { ReaderNav } from '@/components/settings/ReaderNav'
import { Notch, NotchItem } from '@/components/ui/notch'
import { Scrubber } from '@/components/ui/smoothui/scrubber'
import { Type, Sparkles, Binary, BookOpen } from 'lucide-react'

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

    // Title Notch items
    const titleNotchItems: NotchItem[] = [
        {
            id: 'title-font',
            label: 'Font',
            icon: <Type className="w-3.5 h-3.5" />,
            value: titleFont.titleFont,
            options: [
                { id: 'inter-tight', label: 'Inter Tight' },
                { id: 'sans', label: 'DM Sans' },
                { id: 'serif', label: 'Lora Serif' },
            ],
            onChange: (id) => updateTitleFont({ titleFont: id as FontChoice }),
        },
        {
            id: 'title-weight',
            label: 'Weight',
            value: String(titleFont.titleFontWeight),
            options: [
                { id: '600', label: '600 Semi' },
                { id: '700', label: '700 Bold' },
                { id: '800', label: '800 Black' },
            ],
            onChange: (id) => updateTitleFont({ titleFontWeight: parseInt(id, 10) }),
        },
    ]

    // Heading Notch items
    const headingNotchItems: NotchItem[] = [
        {
            id: 'heading-font',
            label: 'Font',
            icon: <Sparkles className="w-3.5 h-3.5" />,
            value: headingFont.headingFont,
            options: [
                { id: 'inter-tight', label: 'Inter Tight' },
                { id: 'sans', label: 'DM Sans' },
                { id: 'serif', label: 'Lora Serif' },
            ],
            onChange: (id) => updateHeadingFont({ headingFont: id as FontChoice }),
        },
        {
            id: 'heading-weight',
            label: 'Weight',
            value: String(headingFont.headingFontWeight),
            options: [
                { id: '400', label: '400 Regular' },
                { id: '600', label: '600 Semi' },
                { id: '700', label: '700 Bold' },
            ],
            onChange: (id) => updateHeadingFont({ headingFontWeight: parseInt(id, 10) }),
        },
    ]

    // Body Notch items
    const bodyNotchItems: NotchItem[] = [
        {
            id: 'body-font',
            label: 'Font',
            icon: <BookOpen className="w-3.5 h-3.5" />,
            value: bodyFont.bodyFont,
            options: [
                { id: 'sans', label: 'DM Sans' },
                { id: 'serif', label: 'Lora Serif' },
                { id: 'roboto', label: 'Roboto' },
            ],
            onChange: (id) => updateBodyFont({ bodyFont: id as FontChoice }),
        },
        {
            id: 'body-weight',
            label: 'Weight',
            value: String(bodyFont.bodyFontWeight || 400),
            options: [
                { id: '300', label: '300 Light' },
                { id: '400', label: '400 Regular' },
                { id: '500', label: '500 Medium' },
            ],
            onChange: (id) => updateBodyFont({ bodyFontWeight: parseInt(id, 10) }),
        },
    ]

    // Code Notch items
    const codeNotchItems: NotchItem[] = [
        {
            id: 'code-font',
            label: 'Font',
            icon: <Binary className="w-3.5 h-3.5" />,
            value: codeFont.codeFont,
            options: [
                { id: 'mono', label: 'JetBrains Mono' },
                { id: 'space-mono', label: 'Space Mono' },
            ],
            onChange: (id) => updateCodeFont({ codeFont: id as any }),
        },
        {
            id: 'code-weight',
            label: 'Weight',
            value: String(codeFont.codeFontWeight || 400),
            options: [
                { id: '400', label: '400 Regular' },
                { id: '500', label: '500 Medium' },
                { id: '700', label: '700 Bold' },
            ],
            onChange: (id) => updateCodeFont({ codeFontWeight: parseInt(id, 10) }),
        },
    ]

    return (
        <div className="relative bg-bg text-fg py-12 pl-18 pr-3 sm:pr-6">
            <ReaderNav />
            <div className="max-w-2xl mx-auto space-y-5">
                <h1 className="text-3xl font-bold tracking-tight text-fg mb-6 ml-3">
                    Typography
                </h1>

                {/* Card 1: Title (H1) Typography */}
                <div className="rounded-[28px] bg-fg/5 text-fg px-4 py-5 sm:px-7 sm:py-7 space-y-5">
                    <div>
                        <h2 className="text-base font-bold text-fg">Article Title (H1)</h2>
                        <p className="text-xs text-sec mt-0.5">Customize title styling, weight, and scale</p>
                    </div>

                    {/* Title Font & Weight Notch */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-sec block">Font & Weight</span>
                        <Notch variant="inline" items={titleNotchItems} />
                    </div>

                    {/* Title Scale Scrubber */}
                    <div className="space-y-2 pt-1">
                        <Scrubber
                            label="Title Scale"
                            min={0.9}
                            max={2.2}
                            step={0.05}
                            decimals={2}
                            unit="x"
                            value={titleFont.titleScale}
                            onValueChange={(val) => updateTitleFont({ titleScale: val })}
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
                <div className="rounded-[28px] bg-fg/5 text-fg px-4 py-5 sm:px-7 sm:py-7 space-y-5">
                    <div>
                        <h2 className="text-base font-bold text-fg">Section Headings (H2)</h2>
                        <p className="text-xs text-sec mt-0.5">Control font family, scale, and vertical spacing</p>
                    </div>

                    {/* Heading Font & Weight Notch */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-sec block">Font & Weight</span>
                        <Notch variant="inline" items={headingNotchItems} />
                    </div>

                    {/* Heading Scale Scrubber */}
                    <div className="space-y-2 pt-1">
                        <Scrubber
                            label="Heading Scale"
                            min={0.85}
                            max={1.4}
                            step={0.05}
                            decimals={2}
                            unit="x"
                            value={headingFont.headingScale}
                            onValueChange={(val) => updateHeadingFont({ headingScale: val })}
                        />
                    </div>

                    {/* Top & Bottom Margins Scrubbers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-sec/10">
                        <Scrubber
                            label="Top Space"
                            min={16}
                            max={64}
                            step={4}
                            decimals={0}
                            unit="px"
                            value={headingFont.headingMarginTop}
                            onValueChange={(val) => updateHeadingFont({ headingMarginTop: val })}
                        />

                        <Scrubber
                            label="Bottom Space"
                            min={6}
                            max={32}
                            step={2}
                            decimals={0}
                            unit="px"
                            value={headingFont.headingMarginBottom}
                            onValueChange={(val) => updateHeadingFont({ headingMarginBottom: val })}
                        />
                    </div>
                </div>

                {/* Card 3: Body Prose Typography */}
                <div className="rounded-[28px] bg-fg/5 text-fg px-4 py-5 sm:px-7 sm:py-7 space-y-5">
                    <div>
                        <h2 className="text-base font-bold text-fg">Body Prose</h2>
                        <p className="text-xs text-sec mt-0.5">Control font family, size, and comfortable line rhythm</p>
                    </div>

                    {/* Body Font & Weight Notch */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-sec block">Font & Weight</span>
                        <Notch variant="inline" items={bodyNotchItems} />
                    </div>

                    {/* Body Font Size Scrubber */}
                    <div className="space-y-3 pt-1">
                        <Scrubber
                            label="Font Size"
                            min={14}
                            max={22}
                            step={0.5}
                            decimals={1}
                            unit="px"
                            value={bodyFont.bodyFontSize}
                            onValueChange={(val) => updateBodyFont({ bodyFontSize: val })}
                        />

                        <Scrubber
                            label="Line Height"
                            min={1.5}
                            max={2.2}
                            step={0.02}
                            decimals={2}
                            value={bodyFont.lineHeight}
                            onValueChange={(val) => updateBodyFont({ lineHeight: val })}
                        />

                        <Scrubber
                            label="Paragraph Gap"
                            min={14}
                            max={44}
                            step={2}
                            decimals={0}
                            unit="px"
                            value={bodyFont.paragraphSpacing}
                            onValueChange={(val) => updateBodyFont({ paragraphSpacing: val })}
                        />
                    </div>
                </div>

                {/* Card 4: Code Block Typography */}
                <div className="rounded-[28px] bg-fg/5 text-fg px-4 py-5 sm:px-7 sm:py-7 space-y-5">
                    <div>
                        <h2 className="text-base font-bold text-fg">Code Block</h2>
                        <p className="text-xs text-sec mt-0.5">Styling for embedded code snippets</p>
                    </div>

                    {/* Code Font & Weight Notch */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-sec block">Monospace Font & Weight</span>
                        <Notch variant="inline" items={codeNotchItems} />
                    </div>

                    {/* Code Font Size Scrubber */}
                    <div className="space-y-2 pt-1">
                        <Scrubber
                            label="Code Font Size"
                            min={13}
                            max={19}
                            step={0.5}
                            decimals={1}
                            unit="px"
                            value={codeFont.codeFontSize}
                            onValueChange={(val) => updateCodeFont({ codeFontSize: val })}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
