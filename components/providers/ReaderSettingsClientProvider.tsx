'use client'

import React from 'react'
import { ReaderSettingsProvider } from '@/lib/reader-settings/ReaderSettingsContext'
import { WidgetsSettingsProvider } from '@/lib/widgets-settings/WidgetsSettingsContext'

export function ReaderSettingsClientProvider({ children }: { children: React.ReactNode }) {
    return (
        <ReaderSettingsProvider>
            <WidgetsSettingsProvider>
                {children}
            </WidgetsSettingsProvider>
        </ReaderSettingsProvider>
    )
}

export default ReaderSettingsClientProvider
