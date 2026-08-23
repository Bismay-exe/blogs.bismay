'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { VideoPlayerSkin } from '@/lib/reader-settings/types'
import { ReaderNav } from '@/components/settings/ReaderNav'
import modern from "@/assets/modern-player.png";
import minimal from "@/assets/minimal-player.png";
import Image from 'next/image'

export default function MediaSettingsPage() {
    const { settings, updateMedia, isLoaded } = useReaderSettings()

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="w-8 h-8 rounded-full border-2 border-sec/30 border-t-fg animate-spin" />
            </div>
        )
    }

    const { media } = settings

    return (
        <div className="relative bg-bg text-fg py-12 pl-18 pr-3 sm:pr-6">
            <ReaderNav />
            <div className="max-w-2xl mx-auto space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-fg mb-6">
                    Media & Video Player
                </h1>

                {/* Card 1: Video Player Skin */}
                <div className="rounded-[28px] bg-fg/5 text-fg px-4 py-5 sm:px-7 sm:py-7 space-y-4">
                    <div>
                        <h2 className="text-base font-bold text-fg">Video Player Skin</h2>
                        <p className="text-xs text-sec mt-0.5">Select embedded video controls interface</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { id: 'modern', label: 'Modern Controls', desc: 'Floating glass overlay controls with scrub minimap' },
                            { id: 'minimal', label: 'Minimal Clean', desc: 'Compact essential play/pause controls bar' },
                        ].map((skin) => {
                            const isSelected = media.videoPlayerSkin === skin.id
                            return (
                                <button
                                    key={skin.id}
                                    type="button"
                                    onClick={() => updateMedia({ videoPlayerSkin: skin.id as VideoPlayerSkin })}
                                    className={`p-1 sm:p-1.5 bg-fg/5 rounded-2xl sm:rounded-3xl border text-left cursor-pointer transition-all duration-300
                                        ${isSelected
                                            ? 'ring-1 ring-fg shadow-lg shadow-fg/10'
                                            : 'border border-sec/20 opacity-75 hover:opacity-100'
                                        }`}
                                >
                                    <img src={`/assets/${skin.id}-player.png`} alt='' className='object-contain border border-fg/5 rounded-2xl sm:rounded-3xl shadow-xl w-full' />
                                    {/* <strong className="block text-xs font-bold">{skin.label}</strong>
                                    <span className={`text-[11px] block mt-1 leading-relaxed `}>
                                        {skin.desc}
                                    </span> */}
                                    <div className="p-2.5 border-sec/10 flex flex-col items-start justify-between">
                                        <span className="text-xs font-semibold text-fg">{skin.label}</span>
                                        <span className="text-[10px] font-mono text-sec line-clamp-2 min-h-8">{skin.desc}</span>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
