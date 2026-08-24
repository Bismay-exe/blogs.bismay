'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { VideoPlayerSkin } from '@/lib/reader-settings/types'
import {
    SettingsPageHeader,
    SettingsCard,
} from '@/components/ui/settings'

export default function MediaSettingsPage() {
    const { settings, updateMedia } = useReaderSettings()
    const { media } = settings

    return (
        <>
            <SettingsPageHeader title="Media & Video Player" />

            {/* Card 1: Video Player Skin */}
            <SettingsCard
                title="Video Player Skin"
                description="Select embedded video controls interface"
            >
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
                                className={`p-1 sm:p-1.5 bg-fg/5 rounded-2xl sm:rounded-3xl border text-left cursor-pointer transition-all duration-300 ${
                                    isSelected
                                        ? 'ring-1 ring-fg shadow-lg shadow-fg/10'
                                        : 'border border-sec/20 opacity-75 hover:opacity-100'
                                }`}
                            >
                                <img
                                    src={`/assets/${skin.id}-player.png`}
                                    alt={skin.label}
                                    className="object-contain border border-fg/5 rounded-2xl sm:rounded-3xl shadow-xl w-full"
                                />
                                <div className="p-2.5 border-sec/10 flex flex-col items-start justify-between">
                                    <span className="text-xs font-semibold text-fg">{skin.label}</span>
                                    <span className="text-[10px] font-mono text-sec line-clamp-2 min-h-8">{skin.desc}</span>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </SettingsCard>
        </>
    )
}
