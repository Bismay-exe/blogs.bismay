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
import { ReaderNav } from '@/components/settings/ReaderNav'

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
        isLoaded,
    } = useReaderSettings()

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="w-8 h-8 rounded-full border-2 border-sec/30 border-t-fg animate-spin" />
            </div>
        )
    }

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
        <div className="relative bg-bg text-fg py-12 pl-18 pr-3 sm:pr-6">
            <ReaderNav />
            <div className="max-w-2xl mx-auto space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-fg mb-6">
                    Article Layout & Header
                </h1>

                {/* Card 1: Header Builder (Reorder & Visibility) */}
                <div className="rounded-[28px] bg-fg/5 text-fg p-6 sm:p-7 space-y-4">
                    <div>
                        <h2 className="text-base font-bold text-fg">Header Order & Visibility</h2>
                        <p className="text-xs text-sec mt-0.5">Reorder elements and toggle their presence</p>
                    </div>

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
                </div>

                {/* Card 2: Header Alignment & Author Style */}
                <div className="rounded-[28px] bg-fg/5 text-fg p-6 sm:p-7 space-y-5">
                    <div>
                        <h2 className="text-base font-bold text-fg">Alignment & Author Style</h2>
                        <p className="text-xs text-sec mt-0.5">Control header positioning and avatar layout</p>
                    </div>

                    {/* Header Alignment */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-sec block">Header Alignment</span>
                        <div className="grid grid-cols-2 gap-2">
                            {(['left', 'center'] as HeaderAlignment[]).map((align) => (
                                <button
                                    key={align}
                                    type="button"
                                    onClick={() => updateArticleLayout({ headerAlignment: align })}
                                    className={`py-2 px-3 rounded-xl text-xs font-medium border capitalize transition-all cursor-pointer ${
                                        headerAlignment === align
                                            ? 'border-fg bg-fg text-bg shadow-xs'
                                            : 'border-sec/15 bg-bg text-fg hover:border-sec/30'
                                    }`}
                                >
                                    {align}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Author Style */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-sec block">Author Presentation</span>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { id: 'default', label: 'Default' },
                                { id: 'overlap', label: 'Hero Overlap' },
                                { id: 'compact', label: 'Compact' },
                            ].map((as) => (
                                <button
                                    key={as.id}
                                    type="button"
                                    onClick={() => updateArticleLayout({ authorStyle: as.id as AuthorStyle })}
                                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                                        authorStyle === as.id
                                            ? 'border-fg bg-fg text-bg shadow-xs'
                                            : 'border-sec/15 bg-bg text-fg hover:border-sec/30'
                                    }`}
                                >
                                    {as.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Card 3: Banner & Title Breakout Widths */}
                <div className="rounded-[28px] bg-fg/5 text-fg p-6 sm:p-7 space-y-5">
                    <div>
                        <h2 className="text-base font-bold text-fg">Hero & Title Breakout Width</h2>
                        <p className="text-xs text-sec mt-0.5">Control breakout sizing and full bleed presentation</p>
                    </div>

                    {/* Banner Width */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-sec block">Hero Banner Width</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                                { id: 'contained', label: 'Contained' },
                                { id: 'breakout', label: 'Wide' },
                                { id: 'awwwards-80', label: '85% Viewport' },
                                { id: 'full-bleed', label: 'Full Bleed' },
                            ].map((bw) => (
                                <button
                                    key={bw.id}
                                    type="button"
                                    onClick={() => updateArticleLayout({ bannerWidth: bw.id as BannerWidth })}
                                    className={`py-2 px-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                                        bannerWidth === bw.id
                                            ? 'border-fg bg-fg text-bg shadow-xs'
                                            : 'border-sec/15 bg-bg text-fg hover:border-sec/30'
                                    }`}
                                >
                                    {bw.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Title Width */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold text-sec block">Title (H1) Width</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                                { id: 'contained', label: 'Contained' },
                                { id: 'breakout', label: 'Wide' },
                                { id: 'awwwards-80', label: '80% Viewport' },
                                { id: 'full-bleed', label: 'Full Bleed' },
                            ].map((tw) => (
                                <button
                                    key={tw.id}
                                    type="button"
                                    onClick={() => updateArticleLayout({ titleWidth: tw.id as TitleWidth })}
                                    className={`py-2 px-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                                        titleWidth === tw.id
                                            ? 'border-fg bg-fg text-bg shadow-xs'
                                            : 'border-sec/15 bg-bg text-fg hover:border-sec/30'
                                    }`}
                                >
                                    {tw.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Banner Margins */}
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-sec/10">
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs text-sec font-medium">
                                <span>Hero Top Space</span>
                                <span className="font-bold text-fg">{bannerMarginTop}px</span>
                            </div>
                            <input
                                type="range"
                                min="8"
                                max="56"
                                step="4"
                                value={bannerMarginTop}
                                onChange={(e) => updateArticleLayout({ bannerMarginTop: parseFloat(e.target.value) })}
                                className="w-full accent-fg cursor-pointer"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs text-sec font-medium">
                                <span>Hero Bottom Space</span>
                                <span className="font-bold text-fg">{bannerMarginBottom}px</span>
                            </div>
                            <input
                                type="range"
                                min="8"
                                max="64"
                                step="4"
                                value={bannerMarginBottom}
                                onChange={(e) => updateArticleLayout({ bannerMarginBottom: parseFloat(e.target.value) })}
                                className="w-full accent-fg cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
