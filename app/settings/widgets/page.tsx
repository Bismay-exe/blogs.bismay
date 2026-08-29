'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
    Plus,
    Sparkles,
    User,
    ListTree,
    Mail,
    Share2,
    MessageSquare,
    Code2,
    FileText,
    ArrowRight,
    SlidersHorizontal,
    Check,
    RotateCcw,
    Layers,
    Trash2,
    Eye,
    EyeOff,
} from 'lucide-react'
import { useWidgetsSettings, WidgetInstance, WidgetType } from '@/lib/widgets-settings'
import { AddWidgetModal } from '@/components/settings/widgets/AddWidgetModal'

const WIDGET_META: Record<
    WidgetType,
    {
        title: string
        description: string
        badge: string
        icon: React.ReactNode
        colorClass: string
        previewType: string
    }
> = {
    profile: {
        title: 'Author Profile',
        description: 'Avatar, author bio, occupation byline, education, and social identity.',
        badge: 'Built-in',
        icon: <User size={22} className="text-blue-400" />,
        colorClass: 'from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/30',
        previewType: 'profile',
    },
    series: {
        title: 'Series Navigation',
        description: 'Interactive chapter progression list and learning journal roadmap.',
        badge: 'Built-in',
        icon: <ListTree size={22} className="text-emerald-400" />,
        colorClass: 'from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/30',
        previewType: 'series',
    },
    subscribeForm: {
        title: 'Subscribe Newsletter',
        description: '1-click email newsletter signup box with hand-drawn aesthetic.',
        badge: 'Built-in',
        icon: <Mail size={22} className="text-amber-400" />,
        colorClass: 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/30',
        previewType: 'subscribe',
    },
    socialLinks: {
        title: 'Social Networks',
        description: 'Grid of icon links to GitHub, X/Twitter, LinkedIn, Discord, and more.',
        badge: 'Built-in',
        icon: <Share2 size={22} className="text-purple-400" />,
        colorClass: 'from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/30',
        previewType: 'socials',
    },
    commentForm: {
        title: 'Leave a Comment',
        description: 'Interactive visitor comment form with name, email and message input.',
        badge: 'Built-in',
        icon: <MessageSquare size={22} className="text-pink-400" />,
        colorClass: 'from-pink-500/10 via-pink-500/5 to-transparent border-pink-500/30',
        previewType: 'comment',
    },
    customHtml: {
        title: 'Custom HTML / CSS / JS',
        description: 'Embed custom code, third-party widgets, banners, or dynamic snippets.',
        badge: 'Custom Code',
        icon: <Code2 size={22} className="text-accent" />,
        colorClass: 'from-accent/15 via-accent/5 to-transparent border-accent/30',
        previewType: 'code',
    },
    customMarkdown: {
        title: 'Custom Markdown Card',
        description: 'Rich text callout or sponsor message rendered directly via Markdown.',
        badge: 'Markdown',
        icon: <FileText size={22} className="text-orange-400" />,
        colorClass: 'from-orange-500/10 via-orange-500/5 to-transparent border-orange-500/30',
        previewType: 'markdown',
    },
}

export default function WidgetsHubPage() {
    const {
        items,
        toggleWidgetActive,
        addWidget,
        deleteWidget,
        resetWidgets,
    } = useWidgetsSettings()

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [resetNotice, setResetNotice] = useState(false)
    const activeCount = items.filter((w) => w.enabled).length
    const customWidgets = items.filter((w) => !w.isBuiltIn)
    const builtInWidgets = items.filter((w) => w.isBuiltIn)

    const handleReset = () => {
        resetWidgets()
        setResetNotice(true)
        setTimeout(() => setResetNotice(false), 2000)
    }

    return (
        <div className="space-y-8">
            {/* Header Title & Intro */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-accent uppercase font-bold tracking-wider">
                            Sidebar Customization Studio
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight mt-1">
                        Widgets Management Hub
                    </h1>
                    <p className="text-xs sm:text-sm text-sec mt-1">
                        Configure built-in cards, design custom code snippets, and manage sidebar extensions.
                    </p>
                </div>

                {/* Top Actions */}
                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-sec/20 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-sec hover:text-fg text-xs font-mono transition-all cursor-pointer"
                        title="Restore all default widgets"
                    >
                        <RotateCcw size={13} className={resetNotice ? 'animate-spin' : ''} />
                        <span>{resetNotice ? 'Reset Done!' : 'Reset All'}</span>
                    </button>

                    <Link
                        href="/settings/reader/widgets"
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-sec/20 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-mono text-fg transition-colors"
                        title="Reorder display sequence"
                    >
                        <SlidersHorizontal size={13} />
                        <span>Reorder Sidebar</span>
                    </Link>

                    <button
                        type="button"
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-white dark:text-[#0C0C0C] text-xs font-mono font-bold shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        <Plus size={14} />
                        <span>Add New Widget</span>
                    </button>
                </div>
            </div>

            {/* Quick Status Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-black/3 dark:bg-white/3 border border-sec/10">
                    <span className="text-[10px] font-mono text-sec uppercase block">Active on Sidebar</span>
                    <p className="text-base font-bold text-fg mt-0.5">{activeCount} / {items.length} Enabled</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/3 dark:bg-white/3 border border-sec/10">
                    <span className="text-[10px] font-mono text-sec uppercase block">Built-in Library</span>
                    <p className="text-base font-bold text-fg mt-0.5">{builtInWidgets.length} Core Cards</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/3 dark:bg-white/3 border border-sec/10">
                    <span className="text-[10px] font-mono text-sec uppercase block">Custom Snippets</span>
                    <p className="text-base font-bold text-fg mt-0.5">{customWidgets.length} Custom Added</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/3 dark:bg-white/3 border border-sec/10">
                    <span className="text-[10px] font-mono text-sec uppercase block">Dynamic Tokens</span>
                    <p className="text-base font-bold text-accent mt-0.5">Supported</p>
                </div>
            </div>

            {/* Section 1: Built-in Native Widgets (Distinct Separate Cards) */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-fg font-mono">
                            Built-in Interactive Cards
                        </h2>
                        <p className="text-xs text-sec mt-0.5">
                            First-class React components with custom settings and state handling.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {builtInWidgets.map((widget) => {
                        const meta = WIDGET_META[widget.type] || {
                            title: widget.title,
                            description: 'Interactive sidebar widget.',
                            badge: 'Built-in',
                            icon: <Sparkles size={20} />,
                            colorClass: 'from-sec/10 to-transparent border-sec/20',
                        }

                        return (
                            <div
                                key={widget.id}
                                className={`group relative rounded-3xl border p-5 flex flex-col justify-between space-y-4 bg-linear-to-b ${meta.colorClass} shadow-xs hover:border-accent/40 transition-all duration-200`}
                            >
                                {/* Top Row: Icon + Badge + Active Toggle */}
                                <div className="flex items-start justify-between">
                                    <div className="w-11 h-11 rounded-2xl bg-black/10 dark:bg-white/10 flex items-center justify-center border border-sec/15">
                                        {meta.icon}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-sec font-bold border border-sec/10">
                                            {meta.badge}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => toggleWidgetActive(widget.id)}
                                            className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                                                widget.enabled
                                                    ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400'
                                                    : 'border-sec/20 bg-sec/10 text-sec/50 hover:text-fg'
                                            }`}
                                            title={widget.enabled ? 'Click to deactivate' : 'Click to activate'}
                                        >
                                            {widget.enabled ? <Eye size={14} /> : <EyeOff size={14} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Middle: Title & Description */}
                                <div className="space-y-1.5 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-bold text-fg group-hover:text-accent transition-colors">
                                            {widget.title}
                                        </h3>
                                        <div
                                            className={`w-1.5 h-1.5 rounded-full ${
                                                widget.enabled ? 'bg-emerald-400' : 'bg-sec/30'
                                            }`}
                                        />
                                    </div>
                                    <p className="text-xs text-sec leading-relaxed">
                                        {meta.description}
                                    </p>
                                </div>

                                {/* Bottom Action: Configure Page Link */}
                                <div className="pt-3 border-t border-sec/10 flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-sec">
                                        Status: <strong className={widget.enabled ? 'text-emerald-400' : 'text-sec'}>{widget.enabled ? 'Active' : 'Disabled'}</strong>
                                    </span>

                                    <Link
                                        href={`/settings/widgets/${widget.id}`}
                                        className="flex items-center gap-1.5 text-xs font-mono font-bold text-accent hover:underline"
                                    >
                                        <span>Configure</span>
                                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Section 2: Custom Code & Markdown Widgets */}
            <div className="space-y-4 pt-4 border-t border-sec/10">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-fg font-mono">
                            Custom Snippets & Extensions
                        </h2>
                        <p className="text-xs text-sec mt-0.5">
                            Embed custom HTML/CSS/JS, third-party iframes, sponsor cards, and markdown callouts.
                        </p>
                    </div>

                    <Link
                        href="/settings/widgets/new"
                        className="flex items-center gap-1 text-xs font-mono font-bold text-accent hover:underline"
                    >
                        <Plus size={13} />
                        <span>New Custom Widget</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {customWidgets.map((widget) => {
                        const isHtml = widget.type === 'customHtml'
                        return (
                            <div
                                key={widget.id}
                                className="group relative rounded-3xl border border-sec/20 p-5 flex flex-col justify-between space-y-4 bg-black/2 dark:bg-white/2 hover:border-accent/40 transition-all duration-200 shadow-xs"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="w-11 h-11 rounded-2xl bg-accent/15 text-accent flex items-center justify-center border border-accent/25">
                                        {isHtml ? <Code2 size={20} /> : <FileText size={20} />}
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-accent/15 text-accent font-bold">
                                            {isHtml ? 'Custom HTML' : 'Markdown'}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => toggleWidgetActive(widget.id)}
                                            className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                                                widget.enabled
                                                    ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400'
                                                    : 'border-sec/20 bg-sec/10 text-sec/50 hover:text-fg'
                                            }`}
                                            title={widget.enabled ? 'Click to deactivate' : 'Click to activate'}
                                        >
                                            {widget.enabled ? <Eye size={14} /> : <EyeOff size={14} />}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => deleteWidget(widget.id)}
                                            className="p-1.5 rounded-xl hover:bg-rose-500/15 text-sec hover:text-rose-500 transition-colors cursor-pointer"
                                            title="Delete widget"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1.5 flex-1">
                                    <h3 className="text-sm font-bold text-fg group-hover:text-accent transition-colors">
                                        {widget.title}
                                    </h3>
                                    <p className="text-xs text-sec line-clamp-2 leading-relaxed">
                                        {widget.config?.customTitle
                                            ? `Header: "${widget.config.customTitle}"`
                                            : isHtml
                                            ? 'Custom HTML/CSS/JS snippet'
                                            : 'Markdown formatted callout'}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-sec/10 flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-sec">
                                        ID: <code className="text-fg">{widget.id}</code>
                                    </span>

                                    <Link
                                        href={`/settings/widgets/${widget.id}`}
                                        className="flex items-center gap-1.5 text-xs font-mono font-bold text-accent hover:underline"
                                    >
                                        <span>Edit Code</span>
                                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        )
                    })}

                    {/* Add New Custom Widget Card */}
                    <Link
                        href="/settings/widgets/new"
                        className="rounded-3xl border-2 border-dashed border-sec/25 hover:border-accent/50 bg-black/2 dark:bg-white/2 hover:bg-accent/5 p-6 flex flex-col items-center justify-center text-center space-y-3 transition-all duration-200 group min-h-[190px] cursor-pointer"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Plus size={24} />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-fg group-hover:text-accent transition-colors block">
                                Create New Widget
                            </span>
                            <span className="text-[11px] text-sec block mt-0.5">
                                Write custom HTML, CSS, JS, or Markdown
                            </span>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Modal */}
            <AddWidgetModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={(newWidget) => {
                    addWidget(newWidget)
                }}
                existingIds={items.map((w) => w.id)}
            />
        </div>
    )
}
