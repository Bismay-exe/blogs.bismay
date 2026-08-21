'use client'

import React from 'react'
import { User, Layers, Mail, Share2, Eye, EyeOff } from 'lucide-react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { ReaderLayoutSettings } from '@/lib/reader-settings/types'

interface WidgetMeta {
    id: keyof ReaderLayoutSettings['rightWidgets']
    label: string
    description: string
    icon: React.ElementType
}

const SIDEBAR_WIDGETS: WidgetMeta[] = [
    {
        id: 'profile',
        label: 'Author Profile Card',
        description: 'Avatar, bio summary, location, and quick contact button.',
        icon: User,
    },
    {
        id: 'series',
        label: 'Series Navigator Card',
        description: 'Browse previous and next days in multi-part tutorial series.',
        icon: Layers,
    },
    {
        id: 'subscribeForm',
        label: 'Newsletter Subscription Form',
        description: 'Email newsletter sign-up card for blog subscribers.',
        icon: Mail,
    },
    {
        id: 'socials',
        label: 'Socials & Links Grid',
        description: 'Interactive social links (GitHub, Twitter, Discord, Portfolio).',
        icon: Share2,
    },
]

export const SidebarSettings: React.FC = () => {
    const { settings, toggleRightWidget } = useReaderSettings()
    const { showRightSidebar, rightWidgets } = settings.layout

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-bold text-fg tracking-tight">Right Sidebar Widgets</h3>
                    <p className="text-xs text-sec mt-0.5">
                        Individually enable or disable cards placed inside the right sidebar column.
                    </p>
                </div>
                {!showRightSidebar && (
                    <span className="text-[11px] font-mono text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-md">
                        Sidebar Disabled in Layout
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SIDEBAR_WIDGETS.map((widget) => {
                    const isEnabled = rightWidgets[widget.id]
                    const Icon = widget.icon

                    return (
                        <div
                            key={widget.id}
                            onClick={() => toggleRightWidget(widget.id)}
                            className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 ${
                                isEnabled
                                    ? 'bg-fg/2 border-sec/25 hover:border-accent/40'
                                    : 'bg-fg/1 border-sec/10 opacity-55'
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                                        isEnabled
                                            ? 'bg-accent/15 text-accent border border-accent/20'
                                            : 'bg-fg/5 text-sec'
                                    }`}
                                >
                                    <Icon size={16} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className={`text-sm font-semibold ${isEnabled ? 'text-fg' : 'text-sec'}`}>
                                            {widget.label}
                                        </h4>
                                    </div>
                                    <p className="text-xs text-sec mt-0.5 leading-relaxed">
                                        {widget.description}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                                    isEnabled
                                        ? 'text-emerald-400 bg-emerald-500/10'
                                        : 'text-sec bg-fg/5'
                                }`}
                                title={isEnabled ? 'Enabled' : 'Disabled'}
                            >
                                {isEnabled ? <Eye size={14} /> : <EyeOff size={14} />}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
