'use client'

import Navbar from '@/components/Navbar'
import PresetsSettingsPage from './presets/page'
import Footer from '@/components/Footer'

export default function ReaderSettingsIndexPage() {
    return (
        <div className="min-h-screen flex flex-col bg-bg text-fg">
            <Navbar />
            <PresetsSettingsPage />
            <Footer />
        </div>
    )
}
