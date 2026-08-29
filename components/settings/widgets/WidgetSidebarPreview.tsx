'use client'

import React, { useState } from 'react'
import { Sun, Moon, Eye, Layers } from 'lucide-react'
import { WidgetInstance } from '@/lib/widgets-settings'
import { renderWidgetComponent } from '@/app/blogs/[slug]/components/sections/RightLayout'
import { WidgetErrorBoundary } from '@/app/blogs/[slug]/components/sections/rightLayout/WidgetErrorBoundary'

interface WidgetSidebarPreviewProps {
    widgets: WidgetInstance[]
}

const SAMPLE_PREVIEW_ARTICLE = {
    title: '🚀 Day 2 of Learning React: Reconciliation & Diffing',
    slug: 'day-2-of-learning-react',
    category: 'Architecture',
    readingTimeMinutes: 12,
    date: 'Feb 2, 2026',
    tags: ['React', 'Fiber', 'Performance'],
}

export const WidgetSidebarPreview: React.FC<WidgetSidebarPreviewProps> = ({ widgets }) => {
    const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark')
    const activeWidgets = widgets.filter((w) => w.enabled)

    return (
        <div className="rounded-3xl border border-sec/20 bg-black/2 dark:bg-white/2 p-6 space-y-4 shadow-xs">
            {/* Header with Theme Toggle */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                        <Eye size={16} />
                    </div>
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-fg font-mono">
                            Live Sidebar Preview
                        </h3>
                        <p className="text-[11px] text-sec">
                            {activeWidgets.length} active card{activeWidgets.length === 1 ? '' : 's'} displayed
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setPreviewTheme(previewTheme === 'dark' ? 'light' : 'dark')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sec/20 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-mono text-sec hover:text-fg transition-colors cursor-pointer"
                    title="Toggle simulated preview theme"
                >
                    {previewTheme === 'dark' ? (
                        <>
                            <Moon size={13} className="text-purple-400" />
                            <span>Dark Preview</span>
                        </>
                    ) : (
                        <>
                            <Sun size={13} className="text-amber-500" />
                            <span>Light Preview</span>
                        </>
                    )}
                </button>
            </div>

            {/* Sidebar Viewport Container */}
            <div
                className={`rounded-2xl border border-sec/20 p-6 max-w-sm mx-auto overflow-hidden transition-colors ${
                    previewTheme === 'dark' ? 'bg-[#0A0A0C] text-[#FAFAFA]' : 'bg-[#FAF8F5] text-[#18181B]'
                }`}
            >
                {activeWidgets.length === 0 ? (
                    <div className="py-12 text-center text-xs font-mono text-sec/60 space-y-2">
                        <Layers size={24} className="mx-auto opacity-40" />
                        <p>No active widgets.</p>
                        <p className="text-[10px]">Enable or add widgets above to display them here.</p>
                    </div>
                ) : (
                    <div className="w-full space-y-10">
                        {activeWidgets.map((widget) => (
                            <WidgetErrorBoundary key={widget.id} widgetTitle={widget.title}>
                                {renderWidgetComponent(widget, SAMPLE_PREVIEW_ARTICLE)}
                            </WidgetErrorBoundary>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
