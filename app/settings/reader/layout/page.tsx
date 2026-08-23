'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { ContentWidth } from '@/lib/reader-settings/types'
import { ReaderNav } from '@/components/settings/ReaderNav'

export default function LayoutSettingsPage() {
    const { settings, updateLayout, isLoaded } = useReaderSettings()

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="w-8 h-8 rounded-full border-2 border-sec/30 border-t-fg animate-spin" />
            </div>
        )
    }

    const { layout } = settings

    return (
        <div className="relative bg-bg text-fg py-12 pl-18 pr-3 sm:pr-6">
            <ReaderNav />
            <div className="max-w-2xl mx-auto space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-fg mb-6">
                    Reading Layout
                </h1>

                {/* Card 1: Content Width */}
                <div className="rounded-[28px] bg-fg/5 text-fg p-6 sm:p-7 space-y-4">
                    <div>
                        <h2 className="text-base font-bold text-fg">Content Width</h2>
                        <p className="text-xs text-sec mt-0.5">Control the reading column width for articles</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                        {[
                            { id: 'narrow', label: 'Narrow', width: '560px' },
                            { id: 'default', label: 'Default', width: '680px' },
                            { id: 'wide', label: 'Wide', width: '860px' },
                        ].map((w) => {
                            const isSelected = layout.contentWidth === w.id
                            return (
                                <button
                                    key={w.id}
                                    type="button"
                                    onClick={() => updateLayout({ contentWidth: w.id as ContentWidth })}
                                    className={`p-3.5 rounded-2xl border text-center cursor-pointer transition-all ${
                                        isSelected
                                            ? 'border-fg bg-fg text-bg shadow-lg shadow-fg/10'
                                            : 'border-sec/15 bg-bg text-fg hover:border-sec/30 hover:shadow-lg shadow-fg/10'
                                    }`}
                                >
                                    <strong className="block text-xs font-bold">{w.label}</strong>
                                    <span className={`text-[11px] block mt-0.5 ${isSelected ? 'text-bg/80' : 'text-sec'}`}>
                                        {w.width}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Card 2: Grouped Layout Toggles */}
                <div className="rounded-[28px] bg-fg/5 text-fg divide-y divide-sec/10 overflow-hidden">
                    {/* Row 1: Navbar */}
                    <div className="flex items-center justify-between p-6 sm:p-7">
                        <div>
                            <h3 className="text-sm font-semibold text-fg">Navbar</h3>
                            <p className="text-xs text-sec mt-0.5">Show the top navigation header.</p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={layout.showNavbar}
                            onClick={() => updateLayout({ showNavbar: !layout.showNavbar })}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                                layout.showNavbar ? 'bg-accent' : 'bg-sec/20'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    layout.showNavbar ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Row 2: Left Sidebar */}
                    <div className="flex items-center justify-between p-6 sm:p-7">
                        <div>
                            <h3 className="text-sm font-semibold text-fg">Left sidebar</h3>
                            <p className="text-xs text-sec mt-0.5">Show the left rail container.</p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={layout.showLeftSidebar}
                            onClick={() => updateLayout({ showLeftSidebar: !layout.showLeftSidebar })}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                                layout.showLeftSidebar ? 'bg-accent' : 'bg-sec/20'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    layout.showLeftSidebar ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Row 3: Table of Contents */}
                    <div className="flex items-center justify-between p-6 sm:p-7">
                        <div>
                            <h3 className="text-sm font-semibold text-fg">Table of contents</h3>
                            <p className="text-xs text-sec mt-0.5">Keep the article heading minimap rail available.</p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={layout.showTableOfContents}
                            onClick={() => updateLayout({ showTableOfContents: !layout.showTableOfContents })}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                                layout.showTableOfContents ? 'bg-accent' : 'bg-sec/20'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    layout.showTableOfContents ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Row 4: Right Sidebar */}
                    <div className="flex items-center justify-between p-6 sm:p-7">
                        <div>
                            <h3 className="text-sm font-semibold text-fg">Right sidebar</h3>
                            <p className="text-xs text-sec mt-0.5">Show supporting article widgets and cards.</p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={layout.showRightSidebar}
                            onClick={() => updateLayout({ showRightSidebar: !layout.showRightSidebar })}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                                layout.showRightSidebar ? 'bg-accent' : 'bg-sec/20'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    layout.showRightSidebar ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
