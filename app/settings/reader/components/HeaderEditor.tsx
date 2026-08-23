'use client'

import React from 'react'
import {
    GripVertical,
    ChevronUp,
    ChevronDown,
    Eye,
    EyeOff,
    Heading,
    Image,
    User,
    Tag,
    Clock,
    Layers,
    ArrowUp,
    ArrowDown,
} from 'lucide-react'
import { HeaderElementId } from '@/lib/reader-settings/types'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { ToggleSwitch } from '@/components/ui/settings/ToggleSwitch'

interface ElementMeta {
    label: string
    description: string
    icon: React.ElementType
    previewHint: string
}

const ELEMENT_METADATA: Record<HeaderElementId, ElementMeta> = {
    topbar: {
        label: 'Top Metadata Bar',
        description: 'Category badge, publication date, and estimated reading time.',
        icon: Clock,
        previewHint: '🏷️ Category · 📅 Date · ⏱️ 8 min read',
    },
    banner: {
        label: 'Hero Banner Image',
        description: 'Featured article cover picture with breakout width controls.',
        icon: Image,
        previewHint: '🖼️ Breakout / Awwwards / Contained Cover',
    },
    author: {
        label: 'Author Info & Avatar',
        description: 'Author identity, profile picture, and bio preview line.',
        icon: User,
        previewHint: '👤 Avatar + Bismay.exe + Byline',
    },
    title: {
        label: 'Article Title (H1)',
        description: 'Main article heading with customizable typography scale and letter case.',
        icon: Heading,
        previewHint: '🚀 Day 11: Context API, Prop Drilling...',
    },
    tags: {
        label: 'Topic Tags List',
        description: 'Interactive topic pills e.g. #React #JavaScript #WebDev.',
        icon: Tag,
        previewHint: '#React #Architecture #NextJS',
    },
}

export const HeaderEditor: React.FC = () => {
    const { settings, reorderHeader, toggleHeaderVisibility } = useReaderSettings()
    const { headerOrder, headerVisibility } = settings.layout

    const moveElement = (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1
        if (targetIndex < 0 || targetIndex >= headerOrder.length) return

        const newOrder = [...headerOrder]
        const temp = newOrder[index]
        newOrder[index] = newOrder[targetIndex]
        newOrder[targetIndex] = temp

        reorderHeader(newOrder)
    }

    const visibleCount = headerOrder.filter((id) => headerVisibility[id]).length

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center border border-accent/25">
                        <Layers size={16} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-fg tracking-tight">
                            Header Visual Hierarchy
                        </h3>
                        <p className="text-xs text-sec mt-0.5">
                            Drag or shift the rendering order of header elements and toggle visibility.
                        </p>
                    </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-sec bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-full border border-sec/15">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {visibleCount} of {headerOrder.length} visible
                </span>
            </div>

            {/* List of Header Blocks */}
            <div className="space-y-2.5">
                {headerOrder.map((id, index) => {
                    const meta = ELEMENT_METADATA[id]
                    const isVisible = headerVisibility[id]
                    const Icon = meta.icon
                    const isFirst = index === 0
                    const isLast = index === headerOrder.length - 1

                    return (
                        <div
                            key={id}
                            className={`p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 select-none ${
                                isVisible
                                    ? 'bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] border-sec/20 hover:border-sec/40'
                                    : 'bg-black/[0.01] dark:bg-white/[0.01] border-sec/10 opacity-55'
                            }`}
                        >
                            {/* Left: Position index, Icon & Label */}
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="flex items-center gap-1 text-sec/40 shrink-0">
                                    <GripVertical size={16} className="cursor-grab" />
                                    <span className="font-mono text-xs font-bold w-4 text-center text-sec/70">
                                        0{index + 1}
                                    </span>
                                </div>

                                <div
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                        isVisible
                                            ? 'bg-accent/15 text-accent border border-accent/25'
                                            : 'bg-black/5 dark:bg-white/5 text-sec'
                                    }`}
                                >
                                    <Icon size={16} />
                                </div>

                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4
                                            className={`text-xs font-bold truncate ${
                                                isVisible ? 'text-fg' : 'text-sec line-through'
                                            }`}
                                        >
                                            {meta.label}
                                        </h4>
                                        <span className="text-[10px] font-mono text-sec/70 hidden md:inline">
                                            ({meta.previewHint})
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-sec/80 truncate mt-0.5">
                                        {meta.description}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Voicu Apostol style Direction Arrows + Switch */}
                            <div className="flex items-center gap-2 shrink-0">
                                <div className="inline-flex p-0.5 rounded-xl bg-black/5 dark:bg-white/5 border border-sec/15">
                                    <button
                                        type="button"
                                        onClick={() => moveElement(index, 'up')}
                                        disabled={isFirst}
                                        className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-sec hover:text-fg disabled:opacity-20 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
                                        title="Move Up"
                                    >
                                        <ArrowUp size={13} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => moveElement(index, 'down')}
                                        disabled={isLast}
                                        className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-sec hover:text-fg disabled:opacity-20 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
                                        title="Move Down"
                                    >
                                        <ArrowDown size={13} />
                                    </button>
                                </div>

                                <div className="h-4 w-px bg-sec/20 mx-0.5" />

                                <ToggleSwitch
                                    checked={isVisible}
                                    onChange={() => toggleHeaderVisibility(id)}
                                    size="sm"
                                    ariaLabel={`Toggle ${meta.label} visibility`}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
