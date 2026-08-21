'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

const Author = () => {
    const { settings } = useReaderSettings()
    const { headerAlignment } = settings.layout
    const isCenter = headerAlignment === 'center'

    return (
        <div className={`flex gap-3.5 items-center ${isCenter ? 'justify-center mx-auto' : 'justify-start'}`}>
            <img
                className="aspect-square h-12 w-12 rounded-xl object-cover border border-sec/15 shadow-xs"
                src="https://bismay.hashnode.dev/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fuploads%2Flogos%2F6a399a8c39e4220fe8771f37%2F3ac7e594-8df0-4a00-a515-53906b12a6f5.png&w=640&q=75"
                alt="Bismay"
            />
            <div className={`flex flex-col justify-center text-sec text-xs ${isCenter ? 'text-left' : 'text-left'}`}>
                <h4 className="text-sm font-semibold text-fg">
                    by <a href="/about" className="font-bold hover:text-accent transition-colors">Bismay.exe</a>
                </h4>
                <span className="text-[11px] text-sec/80 font-mono">building in public</span>
            </div>
        </div>
    )
}

export default Author
