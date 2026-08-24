'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SettingsSectionTitleProps {
    title: string
    description?: string
    className?: string
}

export const SettingsSectionTitle: React.FC<SettingsSectionTitleProps> = ({
    title,
    description,
    className,
}) => {
    return (
        <div className={cn("space-y-0.5", className)}>
            <span className="text-xs font-semibold text-sec block">{title}</span>
            {description && <span className="text-[11px] text-sec block">{description}</span>}
        </div>
    )
}

export default SettingsSectionTitle
