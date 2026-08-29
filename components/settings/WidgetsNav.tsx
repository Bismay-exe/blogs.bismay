'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Tooltip } from '../animate-ui/components/animate/tooltip'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '../animate-ui/primitives/animate/tooltip'
import { Icon } from '@iconify-icon/react'
import { ArrowIcon } from '../ui/shared/ArrowIcon'
import { useWidgetsSettings } from '@/lib/widgets-settings'

const CORE_TABS = [
    { href: '/settings/widgets', label: 'All Widgets Hub', icon: 'fluent:grid-24-filled' },
    { href: '/settings/widgets/profile', label: 'Author Profile', icon: 'fluent:person-24-filled' },
    { href: '/settings/widgets/series', label: 'Series Navigation', icon: 'fluent:book-number-24-filled' },
    { href: '/settings/widgets/subscribeForm', label: 'Subscribe Box', icon: 'fluent:mail-24-filled' },
    { href: '/settings/widgets/socialLinks', label: 'Social Links', icon: 'fluent:share-24-filled' },
    { href: '/settings/widgets/commentForm', label: 'Comment Form', icon: 'fluent:chat-24-filled' },
    { href: '/settings/widgets/new', label: 'Add Custom Widget', icon: 'fluent:add-circle-24-filled' },
]

export const WidgetsNav: React.FC = () => {
    const pathname = usePathname()
    const { items } = useWidgetsSettings()
    const customWidgets = items.filter((w) => !w.isBuiltIn)

    return (
        <aside aria-label="Widgets Navigation" className="fixed left-0 top-0 h-screen flex flex-col justify-between pl-3 md:pl-6 pb-6 pt-6 z-40">
            <div className="flex items-center justify-between">
                <Link
                    href="/settings"
                    aria-label="Back to Settings"
                    className="projectz group/icon h-13 w-13 flex justify-center items-center rounded-2xl text-2xl font-medium whitespace-nowrap transition-all duration-150 bg-sec/15 text-sec hover:text-fg hover:bg-sec/25"
                >
                    <ArrowIcon className="list-line rotate-180 translate-x-14.5 md:translate-x-17.5" />
                </Link>
            </div>

            {/* Scrollable sub-navigation pill ribbon */}
            <TooltipProvider
                openDelay={0}
                closeDelay={0}
                transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            >
                <div className="flex flex-col justify-center items-start gap-2 overflow-y-auto py-2 no-scrollbar max-h-[calc(100vh-160px)]">
                    {CORE_TABS.map((tab) => {
                        const isActive = pathname === tab.href
                        return (
                            <Tooltip
                                key={tab.href}
                                side="right"
                                sideOffset={12}
                                align="center"
                                alignOffset={0}
                            >
                                <TooltipTrigger>
                                    <Link
                                        href={tab.href}
                                        aria-label={tab.label}
                                        className={`h-13 w-13 flex justify-center items-center rounded-2xl text-2xl font-medium whitespace-nowrap transition-all duration-150 ${
                                            isActive
                                                ? 'bg-fg text-bg font-semibold shadow-sm'
                                                : 'bg-sec/15 text-sec hover:text-fg hover:bg-sec/25'
                                        }`}
                                    >
                                        <Icon icon={tab.icon} />
                                        <span className="ml-4 hidden">{tab.label}</span>
                                    </Link>
                                </TooltipTrigger>

                                <TooltipContent
                                    layout="position"
                                    className="bg-fg text-bg px-3 py-1.5 rounded-xl left-arrow text-xs font-mono"
                                >
                                    {tab.label}
                                </TooltipContent>
                            </Tooltip>
                        )
                    })}

                    {/* Custom Widgets Dynamic Links */}
                    {customWidgets.map((cw) => {
                        const href = `/settings/widgets/${cw.id}`
                        const isActive = pathname === href
                        const icon = cw.type === 'customMarkdown' ? 'fluent:document-text-24-filled' : 'fluent:code-24-filled'
                        return (
                            <Tooltip
                                key={cw.id}
                                side="right"
                                sideOffset={12}
                                align="center"
                                alignOffset={0}
                            >
                                <TooltipTrigger>
                                    <Link
                                        href={href}
                                        aria-label={cw.title}
                                        className={`h-13 w-13 flex justify-center items-center rounded-2xl text-2xl font-medium whitespace-nowrap transition-all duration-150 ${
                                            isActive
                                                ? 'bg-accent text-white dark:text-[#0C0C0C] font-semibold shadow-sm'
                                                : 'bg-sec/15 text-sec hover:text-fg hover:bg-sec/25'
                                        }`}
                                    >
                                        <Icon icon={icon} />
                                        <span className="ml-4 hidden">{cw.title}</span>
                                    </Link>
                                </TooltipTrigger>

                                <TooltipContent
                                    layout="position"
                                    className="bg-fg text-bg px-3 py-1.5 rounded-xl left-arrow text-xs font-mono"
                                >
                                    {cw.title} (Custom)
                                </TooltipContent>
                            </Tooltip>
                        )
                    })}

                    {/* Quick Link to Reader Reordering */}
                    <div className="w-full pt-2 border-t border-sec/10">
                        <Tooltip
                            side="right"
                            sideOffset={12}
                            align="center"
                            alignOffset={0}
                        >
                            <TooltipTrigger>
                                <Link
                                    href="/settings/reader/widgets"
                                    aria-label="Reorder Sidebar Layout"
                                    className="h-13 w-13 flex justify-center items-center rounded-2xl text-2xl font-medium whitespace-nowrap transition-all duration-150 bg-accent/15 text-accent hover:bg-accent/25"
                                >
                                    <Icon icon="fluent:arrow-sort-24-filled" />
                                    <span className="ml-4 hidden">Reorder Sidebar</span>
                                </Link>
                            </TooltipTrigger>

                            <TooltipContent
                                layout="position"
                                className="bg-fg text-bg px-3 py-1.5 rounded-xl left-arrow text-xs font-mono"
                            >
                                Reorder Sidebar Layout
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </TooltipProvider>

            <div className="h-14 w-14 rounded-2xl bg-accent/15 text-accent font-bold font-mono text-lg flex justify-center items-center border border-accent/25">
                W
            </div>
        </aside>
    )
}
