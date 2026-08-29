'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
    ChevronUp,
    ChevronDown,
    Eye,
    EyeOff,
    RotateCcw,
    SlidersHorizontal,
    ExternalLink,
    User,
    ListTree,
    Mail,
    Share2,
    MessageSquare,
    Code2,
    FileText,
    Sparkles,
} from 'lucide-react'
import { useWidgetsSettings, WidgetType } from '@/lib/widgets-settings'
import { SettingsPageHeader, SettingsCard } from '@/components/ui/settings'
import { WidgetSidebarPreview } from '@/components/settings/widgets/WidgetSidebarPreview'

const WIDGET_ICONS: Record<WidgetType, React.ReactNode> = {
    profile: <User size={15} className="text-blue-400" />,
    series: <ListTree size={15} className="text-emerald-400" />,
    subscribeForm: <Mail size={15} className="text-amber-400" />,
    socialLinks: <Share2 size={15} className="text-purple-400" />,
    commentForm: <MessageSquare size={15} className="text-pink-400" />,
    customHtml: <Code2 size={15} className="text-accent" />,
    customMarkdown: <FileText size={15} className="text-orange-400" />,
}

export default function ReaderWidgetsReorderPage() {
    const {
        items,
        reorderWidgets,
        toggleWidgetActive,
        resetWidgets,
    } = useWidgetsSettings()

    const [resetNotice, setResetNotice] = useState(false)

    const moveWidget = (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1
        if (targetIndex < 0 || targetIndex >= items.length) return

        const newOrder = [...items]
        const temp = newOrder[index]
        newOrder[index] = newOrder[targetIndex]
        newOrder[targetIndex] = temp

        reorderWidgets(newOrder)
    }

    const handleReset = () => {
        resetWidgets()
        setResetNotice(true)
        setTimeout(() => setResetNotice(false), 2000)
    }

    return (
        <>
            {/* Header with Title & Action Links */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <SettingsPageHeader title="Sidebar Widgets Order" />

                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sec/20 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-sec hover:text-fg text-xs font-mono transition-all cursor-pointer"
                        title="Restore default widget sequence"
                    >
                        <RotateCcw size={12} className={resetNotice ? 'animate-spin' : ''} />
                        <span>{resetNotice ? 'Reset Done!' : 'Reset'}</span>
                    </button>

                    <Link
                        href="/settings/widgets"
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent text-white dark:text-[#0C0C0C] text-xs font-mono font-bold shadow-xs hover:opacity-90 transition-opacity"
                    >
                        <span>Widgets Studio</span>
                        <ExternalLink size={12} />
                    </Link>
                </div>
            </div>

            {/* Reorder Card */}
            <SettingsCard
                title="Sidebar Hierarchy & Visibility"
                description="Move cards up or down to adjust sidebar reading flow, or toggle visibility."
            >
                <div className="space-y-2">
                    {items.map((widget, index) => {
                        const isFirst = index === 0
                        const isLast = index === items.length - 1
                        const icon = WIDGET_ICONS[widget.type] || <Sparkles size={15} />

                        return (
                            <div
                                key={widget.id}
                                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all duration-200 ${
                                    widget.enabled
                                        ? 'border-sec/20 bg-bg shadow-xs'
                                        : 'border-sec/10 bg-sec/5 opacity-55'
                                }`}
                            >
                                {/* Left: Index Number + Icon + Title */}
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="font-mono text-xs text-sec/70 font-bold shrink-0">
                                        0{index + 1}
                                    </span>

                                    <div className="w-7 h-7 rounded-lg bg-sec/10 flex items-center justify-center shrink-0">
                                        {icon}
                                    </div>

                                    <div className="min-w-0">
                                        <span
                                            className={`text-xs font-bold truncate block ${
                                                widget.enabled ? 'text-fg' : 'text-sec line-through'
                                            }`}
                                        >
                                            {widget.title}
                                        </span>
                                    </div>
                                </div>

                                {/* Right: Move Up, Move Down, Toggle, Configure Link */}
                                <div className="flex items-center gap-1 shrink-0">
                                    {/* Move Up */}
                                    <button
                                        type="button"
                                        disabled={isFirst}
                                        onClick={() => moveWidget(index, 'up')}
                                        className="p-1.5 rounded-lg hover:bg-sec/15 disabled:opacity-20 text-sec hover:text-fg cursor-pointer transition-colors"
                                        title="Move up"
                                    >
                                        <ChevronUp size={15} />
                                    </button>

                                    {/* Move Down */}
                                    <button
                                        type="button"
                                        disabled={isLast}
                                        onClick={() => moveWidget(index, 'down')}
                                        className="p-1.5 rounded-lg hover:bg-sec/15 disabled:opacity-20 text-sec hover:text-fg cursor-pointer transition-colors"
                                        title="Move down"
                                    >
                                        <ChevronDown size={15} />
                                    </button>

                                    {/* Active / Inactive Toggle */}
                                    <button
                                        type="button"
                                        onClick={() => toggleWidgetActive(widget.id)}
                                        className={`p-1.5 rounded-lg hover:bg-sec/15 cursor-pointer transition-colors ${
                                            widget.enabled ? 'text-accent' : 'text-sec/60'
                                        }`}
                                        title={widget.enabled ? 'Disable widget' : 'Enable widget'}
                                    >
                                        {widget.enabled ? <Eye size={15} /> : <EyeOff size={15} />}
                                    </button>

                                    {/* Direct Configure Link to /settings/widgets/[id] */}
                                    <Link
                                        href={`/settings/widgets/${widget.id}`}
                                        className="p-1.5 rounded-lg hover:bg-sec/15 text-sec hover:text-accent transition-colors ml-0.5"
                                        title="Configure widget in studio"
                                    >
                                        <ExternalLink size={14} />
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </SettingsCard>

            {/* Live Sidebar Preview */}
            <WidgetSidebarPreview widgets={items} />
        </>
    )
}
