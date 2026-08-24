'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SettingsOptionCardProps {
    title: string
    description?: string
    badge?: string
    icon?: React.ReactNode
    isSelected: boolean
    onClick: () => void
    className?: string
    align?: 'center' | 'left'
}

export const SettingsOptionCard: React.FC<SettingsOptionCardProps> = ({
    title,
    description,
    badge,
    icon,
    isSelected,
    onClick,
    className,
    align = 'left',
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition-all",
                align === 'center' ? "text-center" : "text-left",
                isSelected
                    ? "border-fg bg-fg text-bg shadow-lg shadow-fg/10"
                    : "border-sec/15 bg-bg text-fg hover:border-sec/30 hover:shadow-lg shadow-fg/10",
                className
            )}
        >
            {(icon || badge) && (
                <div className="flex items-center justify-between mb-1.5">
                    {icon && <span className="font-mono text-base">{icon}</span>}
                    {badge && (
                        <span
                            className={cn(
                                "text-[10px] font-mono px-2 py-0.5 rounded-full",
                                isSelected ? "bg-sec text-fg" : "bg-sec/30 text-sec"
                            )}
                        >
                            {badge}
                        </span>
                    )}
                </div>
            )}
            <strong className="block text-xs sm:text-sm font-bold">{title}</strong>
            {description && (
                <p
                    className={cn(
                        "text-xs mt-1 leading-tight",
                        isSelected ? "text-bg/80" : "text-sec"
                    )}
                >
                    {description}
                </p>
            )}
        </button>
    )
}

export default SettingsOptionCard
