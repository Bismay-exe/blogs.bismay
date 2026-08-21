import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ReaderSettingsProvider } from '@/lib/reader-settings/ReaderSettingsContext'

export const metadata = {
    title: 'Reading Experience Settings · Bismay.exe',
    description: 'Customize layout order, sidebar widgets, typography, and distraction-free mode for articles.',
}

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReaderSettingsProvider>
            <div className="min-h-screen flex flex-col bg-bg text-fg">
                <Navbar />
                <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    {children}
                </main>
                <Footer />
            </div>
        </ReaderSettingsProvider>
    )
}
