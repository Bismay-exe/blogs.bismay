'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Tooltip } from '../animate-ui/components/animate/tooltip'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '../animate-ui/primitives/animate/tooltip'
import { Icon } from '@iconify-icon/react'
import { ArrowIcon } from '../ui/shared/ArrowIcon'

const TABS = [
    { href: '/settings/reader/presets', label: 'Presets', icon: 'ic:baseline-style' },
    { href: '/settings/reader/appearance', label: 'Appearance', icon: 'reicon:designtools-filled' },
    { href: '/settings/reader/typography', label: 'Typography', icon: 'tabler:text-size' },
    { href: '/settings/reader/layout', label: 'Reading Layout', icon: 'gridicons:layout' },
    { href: '/settings/reader/article-layout', label: 'Article Layout', icon: 'ph:article-ny-times-bold' },
    { href: '/settings/reader/article-info', label: 'Article Info', icon: 'fluent:card-ui-info-16-filled' },
    { href: '/settings/reader/media', label: 'Media', icon: 'fluent:movies-and-tv-24-filled' },
    { href: '/settings/reader/widgets', label: 'Widgets', icon: 'bxs:widget' },
]

export const ReaderNav: React.FC = () => {
    const pathname = usePathname()

    return (
        <div className="fixed left-0 top-0 h-screen flex flex-col justify-between pl-3 md:pl-6 pb-6 pt-22">
            <div className="flex items-center justify-between">
                <Link href="/settings" className="projectz group/icon h-13 w-13 flex justify-center items-center rounded-2xl text-2xl font-medium whitespace-nowrap transition-all duration-150 bg-sec/15 text-sec hover:text-fg hover:bg-sec/25">
                    <ArrowIcon className="list-line rotate-180 translate-x-17" />
                </Link>
            </div>

            {/* Scrollable sub-navigation pill ribbon */}
            <TooltipProvider
                openDelay={0}
                closeDelay={0}
                transition={{ type: "spring", stiffness: 300, damping: 35 }}
            >
                <div className="flex flex-col justify-center items-start gap-2 overflow-x-auto py-4 no-scrollbar">
                    {TABS.map((tab) => {
                        const isActive = pathname === tab.href || (pathname === '/settings/reader' && tab.href === '/settings/reader/presets')
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
                                        className={`h-13 w-13 flex justify-center items-center rounded-2xl text-2xl font-medium whitespace-nowrap transition-all duration-150 ${isActive
                                            ? 'bg-fg text-bg font-semibold shadow-sm'
                                            : 'bg-sec/15 text-sec hover:text-fg hover:bg-sec/25'
                                            }`}
                                    >
                                        <Icon icon={tab.icon} />
                                        <span className="ml-4 hidden">{tab.label}</span>
                                    </Link>
                                </TooltipTrigger>

                                <TooltipContent
                                    layout='position'
                                    className='bg-fg text-bg px-3 py-1.5 rounded-xl left-arrow'>
                                    {tab.label}
                                </TooltipContent>
                            </Tooltip>

                        )
                    })}
                </div>
            </TooltipProvider>

            <div className="h-14 w-14 rounded-2xl bg-sec/15 flex justify-center items-center">
                B
            </div>
        </div>
    )
}
