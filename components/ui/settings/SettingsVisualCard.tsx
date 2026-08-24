'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SettingsVisualCardProps {
    label: string
    sub?: string
    isSelected: boolean
    onClick: () => void
    previewNode?: React.ReactNode
    className?: string
}

export const SettingsVisualCard: React.FC<SettingsVisualCardProps> = ({
    label,
    sub,
    isSelected,
    onClick,
    previewNode,
    className,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "group relative rounded-2xl overflow-hidden text-left border cursor-pointer transition-all duration-200",
                isSelected
                    ? "ring-2 ring-fg border-fg shadow-lg shadow-fg/10"
                    : "border-sec/20 opacity-75 hover:opacity-100",
                className
            )}
        >
            {previewNode}
            <div className="p-2.5 bg-fg/5 border-t border-sec/10 flex flex-col items-start justify-between">
                <span className="text-xs font-semibold text-fg">{label}</span>
                {sub && <span className="text-[10px] font-mono text-sec">{sub}</span>}
            </div>
        </button>
    )
}

export default SettingsVisualCard
