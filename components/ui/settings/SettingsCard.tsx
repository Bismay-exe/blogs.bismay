'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SettingsCardProps {
    title?: string
    description?: string
    headerAction?: React.ReactNode
    variant?: 'default' | 'divided'
    className?: string
    children: React.ReactNode
}

export const SettingsCard: React.FC<SettingsCardProps> = ({
    title,
    description,
    headerAction,
    variant = 'default',
    className,
    children,
}) => {
    const hasHeader = Boolean(title || description || headerAction)

    if (variant === 'divided') {
        return (
            <div className={cn("rounded-[28px] bg-fg/5 text-fg divide-y divide-sec/10 overflow-hidden", className)}>
                {hasHeader && (
                    <div className="px-4 py-4 sm:px-7 sm:py-5 flex items-center justify-between">
                        <div>
                            {title && <h2 className="text-base font-bold text-fg">{title}</h2>}
                            {description && <p className="text-xs text-sec mt-0.5">{description}</p>}
                        </div>
                        {headerAction}
                    </div>
                )}
                {children}
            </div>
        )
    }

    return (
        <div className={cn("rounded-[28px] bg-fg/5 text-fg px-4 py-5 sm:px-7 sm:py-7 space-y-4", className)}>
            {hasHeader && (
                <div className="flex items-start justify-between">
                    <div>
                        {title && <h2 className="text-base font-bold text-fg">{title}</h2>}
                        {description && <p className="text-xs text-sec mt-0.5">{description}</p>}
                    </div>
                    {headerAction}
                </div>
            )}
            {children}
        </div>
    )
}

export default SettingsCard
