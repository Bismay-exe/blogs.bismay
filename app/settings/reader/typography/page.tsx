'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { FontChoice, CodeFontChoice } from '@/lib/reader-settings/types'
import { Notch, NotchItem } from '@/components/ui/notch'
import { Scrubber } from '@/components/ui/smoothui/scrubber'
import { Type, Sparkles, Binary, BookOpen } from 'lucide-react'
import {
    SettingsPageHeader,
    SettingsCard,
    SettingsSectionTitle,
    SettingsToggleRow,
} from '@/components/ui/settings'

// All available text fonts
const TEXT_FONT_OPTIONS = [
    { id: 'inter-tight', label: 'Inter Tight' },
    { id: 'inter', label: 'Inter' },
    { id: 'sans', label: 'DM Sans' },
    { id: 'serif', label: 'Lora Serif' },
    { id: 'roboto', label: 'Roboto' },
]

// All available font weights for text
const TEXT_WEIGHT_OPTIONS = [
    { id: '300', label: '300 Light' },
    { id: '400', label: '400 Regular' },
    { id: '500', label: '500 Medium' },
    { id: '600', label: '600 Semi' },
    { id: '700', label: '700 Bold' },
    { id: '800', label: '800 Extra Bold' },
    { id: '900', label: '900 Black' },
]

// Monospace fonts for code blocks only
const CODE_FONT_OPTIONS = [
    { id: 'mono', label: 'JetBrains Mono' },
    { id: 'space-mono', label: 'Space Mono' },
    { id: 'dm-mono', label: 'DM Mono' },
]

// Monospace font weights
const CODE_WEIGHT_OPTIONS = [
    { id: '400', label: '400 Regular' },
    { id: '500', label: '500 Medium' },
    { id: '600', label: '600 Semi' },
    { id: '700', label: '700 Bold' },
]

export default function TypographySettingsPage() {
    const { settings, updateTitleFont, updateHeadingFont, updateBodyFont, updateCodeFont } = useReaderSettings()

    const { typography } = settings
    const { titleFont, headingFont, bodyFont, codeFont } = typography

    // Title Notch items
    const titleNotchItems: NotchItem[] = [
        {
            id: 'title-font',
            label: 'Font',
            icon: <Type className="w-3.5 h-3.5" />,
            value: titleFont.titleFont || 'inter-tight',
            options: TEXT_FONT_OPTIONS,
            onChange: (id) => updateTitleFont({ titleFont: id as FontChoice }),
        },
        {
            id: 'title-weight',
            label: 'Weight',
            value: String(titleFont.titleFontWeight || 700),
            options: TEXT_WEIGHT_OPTIONS,
            onChange: (id) => updateTitleFont({ titleFontWeight: parseInt(id, 10) }),
        },
    ]

    // Heading Notch items
    const headingNotchItems: NotchItem[] = [
        {
            id: 'heading-font',
            label: 'Font',
            icon: <Sparkles className="w-3.5 h-3.5" />,
            value: headingFont.headingFont || 'inter-tight',
            options: TEXT_FONT_OPTIONS,
            onChange: (id) => updateHeadingFont({ headingFont: id as FontChoice }),
        },
        {
            id: 'heading-weight',
            label: 'Weight',
            value: String(headingFont.headingFontWeight || 600),
            options: TEXT_WEIGHT_OPTIONS,
            onChange: (id) => updateHeadingFont({ headingFontWeight: parseInt(id, 10) }),
        },
    ]

    // Body Notch items
    const bodyNotchItems: NotchItem[] = [
        {
            id: 'body-font',
            label: 'Font',
            icon: <BookOpen className="w-3.5 h-3.5" />,
            value: bodyFont.bodyFont || 'sans',
            options: TEXT_FONT_OPTIONS,
            onChange: (id) => updateBodyFont({ bodyFont: id as FontChoice }),
        },
        {
            id: 'body-weight',
            label: 'Weight',
            value: String(bodyFont.bodyFontWeight || 400),
            options: TEXT_WEIGHT_OPTIONS,
            onChange: (id) => updateBodyFont({ bodyFontWeight: parseInt(id, 10) }),
        },
    ]

    // Code Notch items
    const codeNotchItems: NotchItem[] = [
        {
            id: 'code-font',
            label: 'Font',
            icon: <Binary className="w-3.5 h-3.5" />,
            value: codeFont.codeFont || 'mono',
            options: CODE_FONT_OPTIONS,
            onChange: (id) => updateCodeFont({ codeFont: id as CodeFontChoice }),
        },
        {
            id: 'code-weight',
            label: 'Weight',
            value: String(codeFont.codeFontWeight || 400),
            options: CODE_WEIGHT_OPTIONS,
            onChange: (id) => updateCodeFont({ codeFontWeight: parseInt(id, 10) }),
        },
    ]

    return (
        <>
            <SettingsPageHeader title="Typography" />

            {/* Card 1: Title (H1) Typography */}
            <SettingsCard
                title="Article Title (H1)"
                description="Customize title styling, weight, and scale"
            >
                {/* Title Font & Weight Notch */}
                <div className="space-y-2">
                    <SettingsSectionTitle title="Font & Weight" />
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
                <SettingsToggleRow
                    variant="inline"
                    title="Uppercase Title"
                    description="Transform title letters to ALL CAPS"
                    checked={titleFont.titleUppercase}
                    onChange={(checked) => updateTitleFont({ titleUppercase: checked })}
                />
            </SettingsCard>

            {/* Card 2: Headings (H2/H3) Typography */}
            <SettingsCard
                title="Section Headings (H2)"
                description="Control font family, scale, and vertical spacing"
            >
                {/* Heading Font & Weight Notch */}
                <div className="space-y-2">
                    <SettingsSectionTitle title="Font & Weight" />
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
            </SettingsCard>

            {/* Card 3: Body Prose Typography */}
            <SettingsCard
                title="Body Prose"
                description="Control font family, size, and comfortable line rhythm"
            >
                {/* Body Font & Weight Notch */}
                <div className="space-y-2">
                    <SettingsSectionTitle title="Font & Weight" />
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
            </SettingsCard>

            {/* Card 4: Code Block Typography */}
            <SettingsCard
                title="Code Block"
                description="Styling for embedded code snippets"
            >
                {/* Code Font & Weight Notch (Monospace Only) */}
                <div className="space-y-2">
                    <SettingsSectionTitle title="Monospace Font & Weight" />
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
            </SettingsCard>
        </>
    )
}
