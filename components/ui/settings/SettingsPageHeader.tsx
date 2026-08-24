'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SettingsPageHeaderProps {
    title: string
    description?: string
    action?: React.ReactNode
    className?: string
}

export const SettingsPageHeader: React.FC<SettingsPageHeaderProps> = ({
    title,
    description,
    action,
    className,
}) => {
    return (
        <div className={cn("flex items-center justify-between mb-6", className)}>
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-fg">
                    {title}
                </h1>
                {description && (
                    <p className="text-xs text-sec mt-1">{description}</p>
                )}
            </div>
            {action && <div>{action}</div>}
        </div>
    )
}

export default SettingsPageHeader
