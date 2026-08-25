import React from 'react'
import { ReaderSettingsProvider } from '@/lib/reader-settings/ReaderSettingsContext'

export const metadata = {
    title: 'Reader Settings · Bismay.exe',
    description: 'Customize how articles look, feel, and behave. Start with a preset or fine-tune the details.',
}

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-bg text-fg">
            <ReaderSettingsProvider>
                {children}
            </ReaderSettingsProvider>
        </div>
    )
}
