'use client'

import React from 'react'
import { User, Layers, Mail, Share2, SlidersHorizontal, AlertCircle } from 'lucide-react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { ReaderLayoutSettings } from '@/lib/reader-settings/types'
import { ToggleSwitch } from '@/components/ui/settings/ToggleSwitch'

interface WidgetMeta {
    id: keyof ReaderLayoutSettings['rightWidgets']
    label: string
    description: string
    icon: React.ElementType
    badge: string
}

const SIDEBAR_WIDGETS: WidgetMeta[] = [
    {
        id: 'profile',
        label: 'Author Profile Card',
        description: 'Avatar, bio summary, location, and quick contact action button.',
        icon: User,
        badge: 'Identity',
    },
    {
        id: 'series',
        label: 'Series Navigator Card',
        description: 'Browse previous and next days in multi-part tutorial series.',
        icon: Layers,
        badge: 'Navigation',
    },
    {
        id: 'subscribeForm',
        label: 'Newsletter Subscription Form',
        description: 'Email newsletter sign-up card for blog readers & updates.',
        icon: Mail,
        badge: 'Audience',
    },
    {
        id: 'socials',
        label: 'Socials & Links Grid',
        description: 'Interactive social links (GitHub, Twitter, Discord, Portfolio).',
        icon: Share2,
        badge: 'Connect',
    },
]

export const SidebarSettings: React.FC = () => {
    const { settings, toggleRightWidget } = useReaderSettings()
    const { showRightSidebar, rightWidgets } = settings.layout

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center border border-accent/25">
                        <SlidersHorizontal size={16} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-fg tracking-tight">
                            Right Sidebar Widget Cards
                        </h3>
                        <p className="text-xs text-sec mt-0.5">
                            Individually enable or disable cards placed inside the right sidebar rail.
                        </p>
                    </div>
                </div>

                {!showRightSidebar && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-400 bg-amber-400/10 border border-amber-400/25 px-2.5 py-1 rounded-full">
                        <AlertCircle size={12} />
                        Sidebar disabled in Layout Shell
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
                            className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 select-none ${
                                isEnabled
                                    ? 'bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] border-sec/25 hover:border-accent/40'
                                    : 'bg-black/[0.01] dark:bg-white/[0.01] border-sec/10 opacity-55'
                            }`}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                        isEnabled
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
                                                isEnabled ? 'text-fg' : 'text-sec'
                                            }`}
                                        >
                                            {widget.label}
                                        </h4>
                                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-black/5 dark:bg-white/5 text-sec/80">
                                            {widget.badge}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-sec/80 truncate mt-0.5">
                                        {widget.description}
                                    </p>
                                </div>
                            </div>

                            <ToggleSwitch
                                checked={isEnabled}
                                onChange={() => toggleRightWidget(widget.id)}
                                size="sm"
                                ariaLabel={`Toggle ${widget.label}`}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
