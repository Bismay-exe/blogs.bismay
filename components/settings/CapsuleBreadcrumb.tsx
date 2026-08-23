'use client'

import React from 'react'
import Link from 'next/link'
import { Sparkles, Sliders, ArrowRight } from 'lucide-react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

interface CapsuleBreadcrumbProps {
    currentPage?: string
    subtitle?: string
    actionNode?: React.ReactNode
}

export const CapsuleBreadcrumb: React.FC<CapsuleBreadcrumbProps> = ({
    currentPage = 'Reader Studio',
    subtitle,
    actionNode,
}) => {
    const { activePreset, applyPreset } = useReaderSettings()

    const presetColors: Record<string, { bg: string; text: string; label: string }> = {
        default: { bg: 'bg-indigo-500/20 border-indigo-500/30', text: 'text-indigo-400', label: 'Default' },
        creator: { bg: 'bg-amber-500/20 border-amber-500/30', text: 'text-amber-400', label: 'Creator' },
        awwwards: { bg: 'bg-rose-500/20 border-rose-500/30', text: 'text-rose-400', label: 'Awwwards' },
        minimal: { bg: 'bg-emerald-500/20 border-emerald-500/30', text: 'text-emerald-400', label: 'Minimal' },
        magazine: { bg: 'bg-sky-500/20 border-sky-500/30', text: 'text-sky-400', label: 'Magazine' },
        developer: { bg: 'bg-purple-500/20 border-purple-500/30', text: 'text-purple-400', label: 'Developer' },
        'distraction-free': { bg: 'bg-teal-500/20 border-teal-500/30', text: 'text-teal-400', label: 'Focus' },
        custom: { bg: 'bg-accent/25 border-accent/40', text: 'text-accent', label: 'Custom' },
    }

    const currentPresetInfo = presetColors[activePreset] || presetColors.custom

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sec/15">
            {/* Pinterest Ref 2: Capsule Pill Ribbon */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono">
                {/* Root Pill */}
                <Link
                    href="/settings"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-sec hover:text-fg border border-sec/15 transition-colors"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-sec/60" />
                    <span>settings</span>
                </Link>

                <span className="text-sec/40">/</span>

                {/* Section Pill */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 text-fg font-bold border border-sec/15">
                    <span>{currentPage}</span>
                </div>

                <span className="text-sec/40">—</span>

                {/* Active Preset Pill with Vibrant Badge */}
                <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${currentPresetInfo.bg} ${currentPresetInfo.text} font-bold shadow-xs`}
                >
                    <Sparkles size={11} />
                    <span>{currentPresetInfo.label}</span>
                </div>
            </div>

            {/* Right Action Node */}
            {actionNode && <div className="flex items-center gap-2">{actionNode}</div>}
        </div>
    )
}
