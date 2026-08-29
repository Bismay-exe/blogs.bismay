'use client'

import React from 'react'
import {
    User,
    ListTree,
    Mail,
    Share2,
    MessageSquare,
    Code2,
    FileText,
    Sparkles,
    X,
    Plus,
} from 'lucide-react'
import { WidgetInstance, WidgetType } from '@/lib/widgets-settings'

interface AddWidgetModalProps {
    isOpen: boolean
    onClose: () => void
    onAdd: (widget: WidgetInstance) => void
    existingIds: string[]
}

interface WidgetTemplate {
    type: WidgetType
    title: string
    description: string
    icon: React.ReactNode
    category: 'built-in' | 'custom'
    defaultConfig?: Record<string, any>
}

const TEMPLATES: WidgetTemplate[] = [
    // Built-in Widgets
    {
        type: 'profile',
        title: 'Author Profile',
        description: 'Showcase author avatar, bio, occupation, and social identity.',
        icon: <User size={20} className="text-blue-400" />,
        category: 'built-in',
    },
    {
        type: 'series',
        title: 'Series Navigation',
        description: 'Interactive chapter list and learning journal roadmap.',
        icon: <ListTree size={20} className="text-emerald-400" />,
        category: 'built-in',
    },
    {
        type: 'subscribeForm',
        title: 'Subscribe Newsletter',
        description: '1-click email newsletter signup box with hand-drawn aesthetic.',
        icon: <Mail size={20} className="text-amber-400" />,
        category: 'built-in',
    },
    {
        type: 'socialLinks',
        title: 'Social Networks',
        description: 'Grid of icon links to GitHub, X/Twitter, LinkedIn, Discord & more.',
        icon: <Share2 size={20} className="text-purple-400" />,
        category: 'built-in',
    },
    {
        type: 'commentForm',
        title: 'Leave a Comment',
        description: 'Interactive visitor comment form with name, email and message.',
        icon: <MessageSquare size={20} className="text-pink-400" />,
        category: 'built-in',
    },
    // Custom Widgets
    {
        type: 'customHtml',
        title: 'Custom HTML / CSS / JS',
        description: 'Embed custom code, third-party widgets, ads, or dynamic snippets.',
        icon: <Code2 size={20} className="text-accent" />,
        category: 'custom',
        defaultConfig: {
            customTitle: 'Special Announcement',
            html: `<div class="p-4 rounded-2xl bg-accent/10 border border-accent/30 text-fg space-y-2">
  <div class="flex items-center gap-2 font-bold text-sm text-accent">
    <span>✨</span>
    <span>Stay Updated</span>
  </div>
  <p class="text-xs text-sec">
    Reading <strong class="text-fg">{{title}}</strong>? Follow for upcoming tutorials and full-stack deep dives!
  </p>
</div>`,
            css: `/* Custom CSS here */`,
            js: `// Custom JS here`,
        },
    },
    {
        type: 'customMarkdown',
        title: 'Custom Markdown Card',
        description: 'Rich text callout or sponsor message rendered directly via Markdown.',
        icon: <FileText size={20} className="text-orange-400" />,
        category: 'custom',
        defaultConfig: {
            customTitle: 'Curator Note',
            markdown: `> **Quick Note:**\n> Thanks for reading **{{title}}**! If you find this helpful, feel free to share it with your team.`,
        },
    },
]

export const AddWidgetModal: React.FC<AddWidgetModalProps> = ({
    isOpen,
    onClose,
    onAdd,
    existingIds,
}) => {
    if (!isOpen) return null

    const handleSelectTemplate = (template: WidgetTemplate) => {
        const uniqueId =
            template.category === 'built-in' && !existingIds.includes(template.type)
                ? template.type
                : `${template.type}-${Date.now().toString(36)}`

        const newWidget: WidgetInstance = {
            id: uniqueId,
            type: template.type,
            title: template.title,
            enabled: true,
            isBuiltIn: template.category === 'built-in',
            config: template.defaultConfig || {},
        }

        onAdd(newWidget)
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-bg border border-sec/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                {/* Modal Header */}
                <div className="p-6 border-b border-sec/10 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-accent" />
                            <h2 className="text-lg font-bold text-fg">Add Sidebar Widget</h2>
                        </div>
                        <p className="text-xs text-sec mt-0.5">
                            Choose from built-in interactive cards or create a custom code block.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-sec/15 text-sec hover:text-fg transition-colors cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto space-y-6">
                    {/* Custom Widgets Section */}
                    <div className="space-y-3">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent">
                            Custom Creation
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {TEMPLATES.filter((t) => t.category === 'custom').map((tpl) => (
                                <button
                                    key={tpl.type}
                                    type="button"
                                    onClick={() => handleSelectTemplate(tpl)}
                                    className="p-4 rounded-2xl border border-sec/15 bg-black/3 dark:bg-white/3 hover:bg-black/6 dark:hover:bg-white/6 hover:border-accent/50 transition-all text-left group flex flex-col justify-between space-y-3 cursor-pointer shadow-xs"
                                >
                                    <div className="space-y-2">
                                        <div className="w-9 h-9 rounded-xl bg-sec/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                                            {tpl.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold text-fg group-hover:text-accent transition-colors">
                                                {tpl.title}
                                            </h3>
                                            <p className="text-[11px] text-sec mt-1 leading-snug">
                                                {tpl.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-accent pt-1">
                                        <Plus size={13} />
                                        <span>Create Widget</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Built-in Widgets Section */}
                    <div className="space-y-3">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sec">
                            Built-in Library Presets
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {TEMPLATES.filter((t) => t.category === 'built-in').map((tpl) => {
                                const alreadyExists = existingIds.includes(tpl.type)
                                return (
                                    <button
                                        key={tpl.type}
                                        type="button"
                                        onClick={() => handleSelectTemplate(tpl)}
                                        className="p-4 rounded-2xl border border-sec/15 bg-black/3 dark:bg-white/3 hover:bg-black/6 dark:hover:bg-white/6 hover:border-sec/40 transition-all text-left group flex flex-col justify-between space-y-3 cursor-pointer shadow-xs"
                                    >
                                        <div className="space-y-2">
                                            <div className="w-9 h-9 rounded-xl bg-sec/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                                                {tpl.icon}
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-xs font-bold text-fg group-hover:text-accent transition-colors">
                                                        {tpl.title}
                                                    </h3>
                                                    {alreadyExists && (
                                                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sec/15 text-sec">
                                                            In List
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[11px] text-sec mt-1 leading-snug">
                                                    {tpl.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-[11px] font-mono text-sec group-hover:text-fg pt-1">
                                            <Plus size={13} />
                                            <span>Add to Sidebar</span>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-sec/10 bg-black/2 dark:bg-white/2 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-xs font-mono text-sec hover:text-fg hover:bg-sec/10 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
