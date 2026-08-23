'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { ReaderNav } from '@/components/settings/ReaderNav'

export default function WidgetsSettingsPage() {
    const { settings, toggleWidget, isLoaded } = useReaderSettings()

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="w-8 h-8 rounded-full border-2 border-sec/30 border-t-fg animate-spin" />
            </div>
        )
    }

    const { widgets } = settings

    return (
        <div className="relative bg-bg text-fg py-12 pl-18 pr-3 sm:pr-6">
            <ReaderNav />
            <div className="max-w-2xl mx-auto space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-fg mb-6">
                    Sidebar Widgets
                </h1>

                {/* Card: Grouped Widgets Switches */}
                <div className="rounded-[28px] bg-fg/5 text-fg divide-y divide-sec/10 overflow-hidden">
                    {/* Row 1: Profile */}
                    <div className="flex items-center justify-between p-6 sm:p-7">
                        <div>
                            <h3 className="text-sm font-semibold text-fg">Author profile</h3>
                            <p className="text-xs text-sec mt-0.5">Show author bio and avatar in the sidebar.</p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={widgets.profile}
                            onClick={() => toggleWidget('profile')}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                                widgets.profile ? 'bg-accent' : 'bg-sec/20'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    widgets.profile ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Row 2: Series */}
                    <div className="flex items-center justify-between p-6 sm:p-7">
                        <div>
                            <h3 className="text-sm font-semibold text-fg">Series navigation</h3>
                            <p className="text-xs text-sec mt-0.5">Show tutorial chapters and series roadmap card.</p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={widgets.series}
                            onClick={() => toggleWidget('series')}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                                widgets.series ? 'bg-accent' : 'bg-sec/20'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    widgets.series ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Row 3: Subscribe Form */}
                    <div className="flex items-center justify-between p-6 sm:p-7">
                        <div>
                            <h3 className="text-sm font-semibold text-fg">Subscribe newsletter</h3>
                            <p className="text-xs text-sec mt-0.5">Show the 1-click email newsletter form.</p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={widgets.subscribeForm}
                            onClick={() => toggleWidget('subscribeForm')}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                                widgets.subscribeForm ? 'bg-accent' : 'bg-sec/20'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    widgets.subscribeForm ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Row 4: Social Links */}
                    <div className="flex items-center justify-between p-6 sm:p-7">
                        <div>
                            <h3 className="text-sm font-semibold text-fg">Social links</h3>
                            <p className="text-xs text-sec mt-0.5">Show links to GitHub, X/Twitter, and LinkedIn.</p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={widgets.socialLinks}
                            onClick={() => toggleWidget('socialLinks')}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                                widgets.socialLinks ? 'bg-accent' : 'bg-sec/20'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    widgets.socialLinks ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
