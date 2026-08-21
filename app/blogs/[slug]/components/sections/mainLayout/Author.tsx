'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

const Author = () => {
    const { settings } = useReaderSettings()
    const { headerAlignment, authorStyle = 'default' } = settings.layout
    const isCenter = headerAlignment === 'center'

    if (authorStyle === 'overlap') {
        return (
            <div
                className={`relative z-20 flex flex-col gap-2 transition-all duration-300 ${
                    isCenter
                        ? 'items-center text-center -mt-10 sm:-mt-12 mx-auto'
                        : 'items-start text-left -mt-10 sm:-mt-14 ml-3 sm:ml-6'
                }`}
            >
                {/* Floating Avatar with thick background ring */}
                <div className="relative group cursor-pointer">
                    <img
                        className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl sm:rounded-3xl object-cover ring-8 ring-bg"
                        src="https://bismay.hashnode.dev/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fuploads%2Flogos%2F6a399a8c39e4220fe8771f37%2F3ac7e594-8df0-4a00-a515-53906b12a6f5.png&w=640&q=75"
                        alt="Bismay"
                    />
                </div>

                {/* Subtitle / Kicker Byline */}
                <div className="space-y-0.5 pt-1">
                    <p className="text-xs sm:text-sm text-sec font-mono">
                        An article by <a href="/about" className="font-bold text-fg hover:text-accent transition-colors">Bismay.exe</a>
                    </p>
                    <p className="text-[11px] text-sec/70 font-mono">Software Engineer & Creator</p>
                </div>
            </div>
        )
    }

    if (authorStyle === 'compact') {
        return (
            <div className={`flex gap-2 items-center text-xs font-mono text-sec ${isCenter ? 'justify-center mx-auto' : 'justify-start'}`}>
                <img
                    className="w-6 h-6 rounded-full object-cover border border-sec/20"
                    src="https://bismay.hashnode.dev/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fuploads%2Flogos%2F6a399a8c39e4220fe8771f37%2F3ac7e594-8df0-4a00-a515-53906b12a6f5.png&w=640&q=75"
                    alt="Bismay"
                />
                <span>By <a href="/about" className="font-bold text-fg hover:text-accent transition-colors">Bismay.exe</a></span>
            </div>
        )
    }

    // Default inline
    return (
        <div className={`flex gap-3.5 items-center ${isCenter ? 'justify-center mx-auto' : 'justify-start'}`}>
            <img
                className="aspect-square h-12 w-12 rounded-xl object-cover border border-sec/15"
                src="https://bismay.hashnode.dev/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fuploads%2Flogos%2F6a399a8c39e4220fe8771f37%2F3ac7e594-8df0-4a00-a515-53906b12a6f5.png&w=640&q=75"
                alt="Bismay"
            />
            <div className="flex flex-col justify-center text-sec text-xs text-left">
                <h4 className="text-sm font-semibold text-fg">
                    by <a href="/about" className="font-bold hover:text-accent transition-colors">Bismay.exe</a>
                </h4>
                <span className="text-[11px] text-sec/80 font-mono">building in public</span>
            </div>
        </div>
    )
}

export default Author
