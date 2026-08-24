'use client'

import React from 'react'
import {
    ChevronUp,
    ChevronDown,
    Eye,
    EyeOff,
} from 'lucide-react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import {
    HeaderElementId,
    HeaderAlignment,
    BannerWidth,
    TitleWidth,
    AuthorStyle,
} from '@/lib/reader-settings/types'
import { BannerWidthPreviewSVG } from '@/components/settings/svgs/BannerWidthPreviewSVG'
import { HeaderAlignmentSVG } from '@/components/settings/svgs/HeaderAlignmentSVG'
import { TitleWidthPreviewSVG } from '@/components/settings/svgs/TitleWidthPreviewSVG'
import { AuthorStylePreviewSVG } from '@/components/settings/svgs/AuthorStylePreviewSVG'
import { Scrubber } from '@/components/ui/smoothui/scrubber'
import {
    SettingsPageHeader,
    SettingsCard,
    SettingsSectionTitle,
    SettingsVisualCard,
} from '@/components/ui/settings'

const ELEMENT_LABELS: Record<HeaderElementId, string> = {
    topbar: 'Metadata / Category & Date',
    banner: 'Hero Cover Banner',
    author: 'Author Profile Byline',
    title: 'Article Title (H1)',
    tags: 'Topic Tags Ribbon',
}

export default function ArticleLayoutSettingsPage() {
    const {
        settings,
        updateArticleLayout,
        reorderHeader,
        toggleHeaderVisibility,
    } = useReaderSettings()

    const { articleLayout } = settings
    const { headerBuilder, headerAlignment, bannerWidth, titleWidth, authorStyle, bannerMarginTop, bannerMarginBottom } = articleLayout

    const moveElement = (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1
        if (targetIndex < 0 || targetIndex >= headerBuilder.headerOrder.length) return

        const newOrder = [...headerBuilder.headerOrder]
        const temp = newOrder[index]
        newOrder[index] = newOrder[targetIndex]
        newOrder[targetIndex] = temp

        reorderHeader(newOrder)
    }

    return (
        <>
            <SettingsPageHeader title="Article Layout & Header" />

            {/* Card 1: Header Builder (Reorder & Visibility) */}
            <SettingsCard
                title="Header Order & Visibility"
                description="Reorder elements and toggle their presence"
            >
                <div className="space-y-2">
                    {headerBuilder.headerOrder.map((id, index) => {
                        const isVisible = headerBuilder.headerVisibility[id]
                        const isFirst = index === 0
                        const isLast = index === headerBuilder.headerOrder.length - 1

                        return (
                            <div
                                key={id}
                                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
                                    isVisible
                                        ? 'border-sec/15 bg-bg shadow-sm'
                                        : 'border-sec/10 bg-sec/5 opacity-60'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-xs text-sec font-bold">
                                        0{index + 1}
                                    </span>
                                    <span className={`text-xs font-semibold ${isVisible ? 'text-fg' : 'text-sec line-through'}`}>
                                        {ELEMENT_LABELS[id]}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        disabled={isFirst}
                                        onClick={() => moveElement(index, 'up')}
                                        className="p-1.5 rounded-lg hover:bg-sec/15 disabled:opacity-20 text-sec hover:text-fg cursor-pointer transition-colors"
                                        title="Move up"
                                    >
                                        <ChevronUp size={15} />
                                    </button>
                                    <button
                                        type="button"
                                        disabled={isLast}
                                        onClick={() => moveElement(index, 'down')}
                                        className="p-1.5 rounded-lg hover:bg-sec/15 disabled:opacity-20 text-sec hover:text-fg cursor-pointer transition-colors"
                                        title="Move down"
                                    >
                                        <ChevronDown size={15} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => toggleHeaderVisibility(id)}
                                        className="p-1.5 rounded-lg hover:bg-sec/15 ml-1 text-sec hover:text-fg cursor-pointer transition-colors"
                                        title={isVisible ? 'Hide' : 'Show'}
                                    >
                                        {isVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </SettingsCard>

            {/* Card 2: Header Alignment & Author Style */}
            <SettingsCard
                title="Alignment & Author Style"
                description="Control header positioning and avatar layout"
            >
                {/* Header Alignment */}
                <div className="space-y-2.5">
                    <SettingsSectionTitle title="Header Alignment" />
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { id: 'left', label: 'Left Aligned', sub: 'Standard' },
                            { id: 'center', label: 'Centered', sub: 'Editorial' },
                        ].map((item) => (
                            <SettingsVisualCard
                                key={item.id}
                                label={item.label}
                                sub={item.sub}
                                isSelected={headerAlignment === item.id}
                                onClick={() => updateArticleLayout({ headerAlignment: item.id as HeaderAlignment })}
                                previewNode={<HeaderAlignmentSVG alignment={item.id as HeaderAlignment} className="w-full h-auto" />}
                            />
                        ))}
                    </div>
                </div>

                {/* Author Style */}
                <div className="space-y-2.5">
                    <SettingsSectionTitle title="Author Presentation" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                            { id: 'default', label: 'Default', sub: 'Standard Byline' },
                            { id: 'overlap', label: 'Hero Overlap', sub: 'Floating Badge' },
                            { id: 'compact', label: 'Compact', sub: 'Minimal Inline' },
                        ].map((as) => (
                            <SettingsVisualCard
                                key={as.id}
                                label={as.label}
                                sub={as.sub}
                                isSelected={authorStyle === as.id}
                                onClick={() => updateArticleLayout({ authorStyle: as.id as AuthorStyle })}
                                previewNode={<AuthorStylePreviewSVG styleMode={as.id as AuthorStyle} className="w-full h-auto" />}
                            />
                        ))}
                    </div>
                </div>
            </SettingsCard>

            {/* Card 3: Banner & Title Breakout Widths */}
            <SettingsCard
                title="Hero & Title Breakout Width"
                description="Control breakout sizing and full bleed presentation"
            >
                {/* Banner Width */}
                <div className="space-y-2.5">
                    <SettingsSectionTitle title="Hero Banner Width" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { id: 'contained', label: 'Contained', sub: 'Column' },
                            { id: 'breakout', label: 'Wide', sub: 'Breakout' },
                            { id: 'awwwards-80', label: '85% Viewport', sub: 'Immersive' },
                            { id: 'full-bleed', label: 'Full Bleed', sub: 'Edge-to-Edge' },
                        ].map((bw) => (
                            <SettingsVisualCard
                                key={bw.id}
                                label={bw.label}
                                sub={bw.sub}
                                isSelected={bannerWidth === bw.id}
                                onClick={() => updateArticleLayout({ bannerWidth: bw.id as BannerWidth })}
                                previewNode={<BannerWidthPreviewSVG widthMode={bw.id as BannerWidth} className="w-full h-auto" />}
                            />
                        ))}
                    </div>
                </div>

                {/* Title Width */}
                <div className="space-y-2.5">
                    <SettingsSectionTitle title="Title (H1) Width" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { id: 'contained', label: 'Contained', sub: 'Column' },
                            { id: 'breakout', label: 'Wide', sub: 'Breakout' },
                            { id: 'awwwards-80', label: '80% Viewport', sub: 'Immersive' },
                            { id: 'full-bleed', label: 'Full Bleed', sub: 'Edge-to-Edge' },
                        ].map((tw) => (
                            <SettingsVisualCard
                                key={tw.id}
                                label={tw.label}
                                sub={tw.sub}
                                isSelected={titleWidth === tw.id}
                                onClick={() => updateArticleLayout({ titleWidth: tw.id as TitleWidth })}
                                previewNode={<TitleWidthPreviewSVG widthMode={tw.id as TitleWidth} className="w-full h-auto" />}
                            />
                        ))}
                    </div>
                </div>

                {/* Banner Margins */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-sec/10">
                    <Scrubber
                        label="Hero Top Space"
                        min={8}
                        max={56}
                        step={4}
                        decimals={0}
                        unit="px"
                        value={bannerMarginTop}
                        onValueChange={(val) => updateArticleLayout({ bannerMarginTop: val })}
                    />

                    <Scrubber
                        label="Hero Bottom Space"
                        min={8}
                        max={64}
                        step={4}
                        decimals={0}
                        unit="px"
                        value={bannerMarginBottom}
                        onValueChange={(val) => updateArticleLayout({ bannerMarginBottom: val })}
                    />
                </div>
            </SettingsCard>
        </>
    )
}
