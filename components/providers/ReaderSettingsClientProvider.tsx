'use client'

import React from 'react'
import { ReaderSettingsProvider } from '@/lib/reader-settings/ReaderSettingsContext'

export function ReaderSettingsClientProvider({ children }: { children: React.ReactNode }) {
    return <ReaderSettingsProvider>{children}</ReaderSettingsProvider>
}

export default ReaderSettingsClientProvider
