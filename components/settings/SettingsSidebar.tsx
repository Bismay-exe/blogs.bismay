'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    BookOpen,
    Sliders,
    Layers,
    Type,
    Layout,
    Eye,
    Sparkles,
    Palette,
    ArrowLeft,
    Search,
    SlidersHorizontal,
    FileText,
    Video,
    Grid,
} from 'lucide-react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

interface NavSection {
    title: string
    items: {
        label: string
        href: string
        icon: React.ElementType
        badge?: string
        badgeColor?: string
    }[]
}

export const SettingsSidebar: React.FC = () => {
    const pathname = usePathname()
    const { activePreset } = useReaderSettings()
    const [searchQuery, setSearchQuery] = useState('')

    const sections: NavSection[] = [
        {
            title: 'Reader Studio',
            items: [
                {
                    label: 'Appearance',
                    href: '/settings/reader/appearance',
                    icon: Eye,
                },
                {
                    label: 'Typography',
                    href: '/settings/reader/typography',
                    icon: Type,
                },
                {
                    label: 'Reading Layout',
                    href: '/settings/reader/layout',
                    icon: Layout,
                },
                {
                    label: 'Article Layout',
                    href: '/settings/reader/article-layout',
                    icon: Layers,
                },
                {
                    label: 'Article Info',
                    href: '/settings/reader/article-info',
                    icon: BookOpen,
                },
                {
                    label: 'Media',
                    href: '/settings/reader/media',
                    icon: Video,
                },
                {
                    label: 'Widgets',
                    href: '/settings/reader/widgets',
                    icon: SlidersHorizontal,
                },
                {
                    label: 'Presets',
                    href: '/settings/reader/presets',
                    icon: Sparkles,
                    badge: activePreset === 'custom' ? 'Custom' : activePreset.toUpperCase(),
                    badgeColor: 'bg-accent/20 text-accent',
                },
            ],
        },
        {
            title: 'Content & Management',
            items: [
                {
                    label: 'Post Management',
                    href: '/admin/posts',
                    icon: FileText,
                    badge: 'Admin',
                    badgeColor: 'bg-emerald-500/15 text-emerald-400',
                },
                {
                    label: 'Overview & Hub',
                    href: '/settings',
                    icon: Sliders,
                },
            ],
        },
    ]

    const filteredSections = sections
        .map((sec) => ({
            ...sec,
            items: sec.items.filter((item) =>
                item.label.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        }))
        .filter((sec) => sec.items.length > 0)

    return (
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
            {/* Back to main link */}
            <Link
                href="/blogs"
                className="group inline-flex items-center gap-2 text-xs font-mono text-sec hover:text-fg transition-colors px-1"
            >
                <div className="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/5 border border-sec/15 flex items-center justify-center group-hover:border-accent/40 group-hover:text-accent transition-all">
                    <ArrowLeft size={12} />
                </div>
                <span>Back to Blog Hub</span>
            </Link>

            {/* Search Input Box */}
            <div className="relative">
                <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-sec/60 pointer-events-none"
                />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search settings..."
                    className="w-full pl-8.5 pr-4 py-2 text-xs font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-sec/15 placeholder:text-sec/50 text-fg focus:outline-none focus:border-accent/50 transition-all"
                />
            </div>

            {/* Categorized Navigation Tree */}
            <nav className="space-y-5">
                {filteredSections.map((sec) => (
                    <div key={sec.title} className="space-y-1.5">
                        <div className="px-2 text-[10px] font-mono uppercase tracking-wider text-sec/70 font-semibold">
                            {sec.title}
                        </div>

                        <div className="space-y-0.5">
                            {sec.items.map((item) => {
                                const isCurrentPath = pathname === item.href
                                const Icon = item.icon

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer ${
                                            isCurrentPath
                                                ? 'bg-accent/15 text-fg font-bold shadow-xs border border-accent/30'
                                                : 'text-sec hover:text-fg hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <Icon
                                                size={15}
                                                className={`shrink-0 transition-colors ${
                                                    isCurrentPath
                                                        ? 'text-accent'
                                                        : 'text-sec group-hover:text-fg'
                                                }`}
                                            />
                                            <span className="truncate">{item.label}</span>
                                        </div>

                                        {item.badge && (
                                            <span
                                                className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold uppercase shrink-0 ${
                                                    item.badgeColor || 'bg-black/10 dark:bg-white/10 text-sec'
                                                }`}
                                            >
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    )
}
