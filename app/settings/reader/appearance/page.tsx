'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { ReaderNav } from '@/components/settings/ReaderNav'
import { ThemePreviewSVG } from '@/components/settings/svgs/ThemePreviewSVG'

const ACCENT_COLORS = [
    { name: 'Coral Red', value: '#ff6b6b' },
    { name: 'Sky Blue', value: '#4d96ff' },
    { name: 'Lavender Purple', value: '#9b51e0' },
    { name: 'Amber Gold', value: '#ffd93d' },
    { name: 'Lime Green', value: '#6bcb77' },
]

export default function AppearanceSettingsPage() {
    const { settings, updateAppearance, isLoaded } = useReaderSettings()

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="w-8 h-8 rounded-full border-2 border-sec/30 border-t-fg animate-spin" />
            </div>
        )
    }

    const { appearance } = settings
    const activeTheme = appearance.theme || 'system'
    const activeAccent = appearance.accentColor || '#9b51e0'

    return (
        <div className="relative bg-bg text-fg py-12 pl-18 pr-3 sm:pr-6">
            <ReaderNav />
            <div className="max-w-2xl mx-auto space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-fg mb-6">
                    Appearance
                </h1>

                {/* Card 1: Theme Visual Wireframe Selector with ThemePreviewSVG */}
                <div className="rounded-[28px] bg-fg/5 p-6 sm:p-7 space-y-4">
                    <div>
                        <h2 className="text-base font-bold text-fg">Theme</h2>
                        <p className="text-xs text-sec mt-0.5">Customize your UI color mode</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {/* Dark Card */}
                        <button
                            type="button"
                            onClick={() => updateAppearance({ theme: 'dark' })}
                            className={`group relative rounded-2xl overflow-hidden text-left cursor-pointer transition-all duration-200 ${
                                activeTheme === 'dark'
                                    ? 'ring-2 ring-fg shadow-lg shadow-fg/10'
                                    : 'border border-sec/20 opacity-75 hover:opacity-100'
                            }`}
                        >
                            <ThemePreviewSVG mode="dark" className="w-full h-auto" />
                            <div className="p-2.5 bg-fg/5 border-t border-sec/10 flex items-center justify-between">
                                <span className="text-xs font-semibold text-fg">Dark</span>
                                <span className="text-[10px] font-mono text-sec">#141414</span>
                            </div>
                        </button>

                        {/* Light Card */}
                        <button
                            type="button"
                            onClick={() => updateAppearance({ theme: 'light' })}
                            className={`group relative rounded-2xl overflow-hidden text-left cursor-pointer transition-all duration-200 ${
                                activeTheme === 'light'
                                    ? 'ring-2 ring-fg shadow-lg shadow-fg/10'
                                    : 'border border-sec/20 opacity-75 hover:opacity-100'
                            }`}
                        >
                            <ThemePreviewSVG mode="light" className="w-full h-auto" />
                            <div className="p-2.5 bg-fg/5 border-t border-sec/10 flex items-center justify-between">
                                <span className="text-xs font-semibold text-fg">Light</span>
                                <span className="text-[10px] font-mono text-sec">Clean</span>
                            </div>
                        </button>

                        {/* System Card */}
                        <button
                            type="button"
                            onClick={() => updateAppearance({ theme: 'system' })}
                            className={`group relative rounded-2xl overflow-hidden text-left cursor-pointer transition-all duration-200 ${
                                activeTheme === 'system'
                                    ? 'ring-2 ring-fg shadow-lg shadow-fg/10'
                                    : 'border border-sec/20 opacity-75 hover:opacity-100'
                            }`}
                        >
                            <ThemePreviewSVG mode="system" className="w-full h-auto" />
                            <div className="p-2.5 bg-fg/5 border-t border-sec/10 flex items-center justify-between">
                                <span className="text-xs font-semibold text-fg">System</span>
                                <span className="text-[10px] font-mono text-sec">Auto</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Card 2: Theme / Accent Color Circles */}
                <div className="rounded-[28px] bg-fg/5 p-6 sm:p-7 space-y-4">
                    <div>
                        <h2 className="text-base font-bold text-fg">Accent Color</h2>
                        <p className="text-xs text-sec mt-0.5">A small touch of personality</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {ACCENT_COLORS.map((color) => {
                            const isSelected = activeAccent.toLowerCase() === color.value.toLowerCase()
                            return (
                                <button
                                    key={color.value}
                                    type="button"
                                    onClick={() => updateAppearance({ accentColor: color.value })}
                                    className={`w-9 h-9 rounded-full transition-transform cursor-pointer ${
                                        isSelected ? 'scale-115 ring-3 ring-fg/30 shadow-md' : 'hover:scale-105 opacity-80 hover:opacity-100'
                                    }`}
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                />
                            )
                        })}
                    </div>
                </div>

                {/* Card 3: Grouped Switch Rows */}
                <div className="rounded-[28px] bg-fg/5 divide-y divide-sec/10 overflow-hidden">
                    {/* Row 1: Reading Progress */}
                    <div className="flex items-center justify-between p-6 sm:p-7">
                        <div>
                            <h3 className="text-sm font-semibold text-fg">Reading progress</h3>
                            <p className="text-xs text-sec mt-0.5">Show your progress while scrolling.</p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={appearance.showReadingProgress}
                            onClick={() => updateAppearance({ showReadingProgress: !appearance.showReadingProgress })}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                                appearance.showReadingProgress ? 'bg-accent' : 'bg-sec/20'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    appearance.showReadingProgress ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Row 2: Reduce Motion */}
                    <div className="flex items-center justify-between p-6 sm:p-7">
                        <div>
                            <h3 className="text-sm font-semibold text-fg">Reduce motion</h3>
                            <p className="text-xs text-sec mt-0.5">Minimize animations and transitions.</p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={appearance.reduceMotion}
                            onClick={() => updateAppearance({ reduceMotion: !appearance.reduceMotion })}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                                appearance.reduceMotion ? 'bg-accent' : 'bg-sec/20'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    appearance.reduceMotion ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
