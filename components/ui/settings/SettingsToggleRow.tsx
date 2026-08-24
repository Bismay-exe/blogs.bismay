'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SettingsToggleRowProps {
    title: string
    description?: string
    checked: boolean
    onChange: (checked: boolean) => void
    disabled?: boolean
    variant?: 'row' | 'inline'
    badge?: string
    className?: string
}

export const SettingsToggleRow: React.FC<SettingsToggleRowProps> = ({
    title,
    description,
    checked,
    onChange,
    disabled = false,
    variant = 'row',
    badge,
    className,
}) => {
    const isInline = variant === 'inline'

    return (
        <div
            className={cn(
                "flex items-center justify-between",
                isInline
                    ? "pt-2 border-t border-sec/10"
                    : "px-4 py-5 sm:px-7 sm:py-7",
                className
            )}
        >
            <div className="space-y-0.5 pr-4">
                <div className="flex items-center gap-2">
                    <h3 className={cn(
                        "font-semibold text-fg",
                        isInline ? "text-xs" : "text-sm"
                    )}>
                        {title}
                    </h3>
                    {badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sec/20 text-sec">
                            {badge}
                        </span>
                    )}
                </div>
                {description && (
                    <p className={cn(
                        "text-sec",
                        isInline ? "text-[11px]" : "text-xs mt-0.5"
                    )}>
                        {description}
                    </p>
                )}
            </div>

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => !disabled && onChange(!checked)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                    checked ? 'bg-accent' : 'bg-sec/20'
                } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
                <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg shadow-sm ring-0 transition duration-200 ease-in-out ${
                        checked ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
            </button>
        </div>
    )
}

export default SettingsToggleRow
