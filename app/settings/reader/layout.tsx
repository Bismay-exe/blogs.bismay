'use client'

import React from 'react'
import { ReaderNav } from '@/components/settings/ReaderNav'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

export default function ReaderSettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isLoaded } = useReaderSettings()

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="w-8 h-8 rounded-full border-2 border-sec/30 border-t-fg animate-spin" />
            </div>
        )
    }

    return (
        <div className="relative bg-bg text-fg py-12 pl-18 pr-3 sm:pr-6">
            <ReaderNav />
            <div className="max-w-2xl mx-auto space-y-4">
                {children}
            </div>
        </div>
    )
}
