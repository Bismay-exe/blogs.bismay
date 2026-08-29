'use client'

import React from 'react'
import { WidgetsNav } from '@/components/settings/WidgetsNav'
import { useWidgetsSettings } from '@/lib/widgets-settings'

export default function WidgetsSettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isLoaded } = useWidgetsSettings()

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="w-8 h-8 rounded-full border-2 border-sec/30 border-t-fg animate-spin" />
            </div>
        )
    }

    return (
        <div className="relative bg-bg text-fg min-h-screen py-12 pl-18 pr-3 sm:pr-6">
            <WidgetsNav />
            <div className="max-w-5xl mx-auto space-y-6">
                {children}
            </div>
        </div>
    )
}
