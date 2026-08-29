import React from 'react'
import { ReaderSettingsProvider } from '@/lib/reader-settings/ReaderSettingsContext'
import { WidgetsSettingsProvider } from '@/lib/widgets-settings/WidgetsSettingsContext'

export const metadata = {
    title: 'Studio Settings · Bismay.exe',
    description: 'Customize how articles look, feel, and behave, and manage sidebar widgets.',
}

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-bg text-fg">
            <ReaderSettingsProvider>
                <WidgetsSettingsProvider>
                    {children}
                </WidgetsSettingsProvider>
            </ReaderSettingsProvider>
        </div>
    )
}

