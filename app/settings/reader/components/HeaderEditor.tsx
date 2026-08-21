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
} from 'lucide-react'
import { HeaderElementId } from '@/lib/reader-settings/types'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

interface ElementMeta {
    label: string
    description: string
    icon: React.ElementType
}

const ELEMENT_METADATA: Record<HeaderElementId, ElementMeta> = {
    topbar: {
        label: 'Top Metadata Bar',
        description: 'Category badge, publication date, and estimated reading time.',
        icon: Clock,
    },
    banner: {
        label: 'Hero Banner Image',
        description: 'Featured article cover picture with responsive aspect ratio.',
        icon: Image,
    },
    author: {
        label: 'Author Info & Avatar',
        description: 'Author identity, profile picture, and bio preview line.',
        icon: User,
    },
    title: {
        label: 'Article Title (H1)',
        description: 'Main article heading with customizable typography scale.',
        icon: Heading,
    },
    tags: {
        label: 'Topic Tags List',
        description: 'Interactive topic pills e.g. #React #JavaScript #WebDev.',
        icon: Tag,
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

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-bold text-fg tracking-tight">Header Zone Elements</h3>
                    <p className="text-xs text-sec mt-0.5">
                        Customize the visual hierarchy of the header. Reorder elements and toggle their visibility.
                    </p>
                </div>
                <span className="text-[11px] font-mono text-sec bg-fg/5 px-2 py-0.5 rounded-md border border-sec/15">
                    {headerOrder.filter((id) => headerVisibility[id]).length} of {headerOrder.length} visible
                </span>
            </div>

            <div className="space-y-2">
                {headerOrder.map((id, index) => {
                    const meta = ELEMENT_METADATA[id]
                    const isVisible = headerVisibility[id]
                    const Icon = meta.icon
                    const isFirst = index === 0
                    const isLast = index === headerOrder.length - 1

                    return (
                        <div
                            key={id}
                            className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 ${
                                isVisible
                                    ? 'bg-fg/2 border-sec/20 hover:border-sec/35'
                                    : 'bg-fg/1 border-sec/10 opacity-60'
                            }`}
                        >
                            {/* Left: Position index, Icon & Label */}
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="flex items-center gap-1 text-sec/40">
                                    <GripVertical size={16} />
                                    <span className="font-mono text-xs font-semibold w-4">
                                        {index + 1}
                                    </span>
                                </div>

                                <div
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                        isVisible
                                            ? 'bg-accent/15 text-accent border border-accent/20'
                                            : 'bg-fg/5 text-sec'
                                    }`}
                                >
                                    <Icon size={16} />
                                </div>

                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm font-semibold truncate ${isVisible ? 'text-fg' : 'text-sec line-through'}`}>
                                            {meta.label}
                                        </span>
                                        {!isVisible && (
                                            <span className="text-[10px] font-mono text-sec/70 bg-fg/5 px-1.5 py-0.2 rounded">
                                                Hidden
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-sec truncate mt-0.5">
                                        {meta.description}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Reorder & Visibility Actions */}
                            <div className="flex items-center gap-1.5 shrink-0 ml-3">
                                <button
                                    type="button"
                                    onClick={() => moveElement(index, 'up')}
                                    disabled={isFirst}
                                    className="p-1.5 rounded-lg border border-sec/20 bg-fg/2 hover:bg-fg/8 text-sec hover:text-fg disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                                    title="Move Up"
                                >
                                    <ChevronUp size={15} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => moveElement(index, 'down')}
                                    disabled={isLast}
                                    className="p-1.5 rounded-lg border border-sec/20 bg-fg/2 hover:bg-fg/8 text-sec hover:text-fg disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                                    title="Move Down"
                                >
                                    <ChevronDown size={15} />
                                </button>

                                <div className="h-4 w-px bg-sec/20 mx-1" />

                                <button
                                    type="button"
                                    onClick={() => toggleHeaderVisibility(id)}
                                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                                        isVisible
                                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                                            : 'bg-fg/5 border-sec/20 text-sec hover:text-fg hover:bg-fg/10'
                                    }`}
                                    title={isVisible ? 'Hide from Header' : 'Show in Header'}
                                >
                                    {isVisible ? (
                                        <>
                                            <Eye size={13} />
                                            <span className="hidden sm:inline">Visible</span>
                                        </>
                                    ) : (
                                        <>
                                            <EyeOff size={13} />
                                            <span className="hidden sm:inline">Hidden</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
