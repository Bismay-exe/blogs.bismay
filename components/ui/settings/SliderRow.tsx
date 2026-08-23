'use client'

import React from 'react'
import { Scrubber } from '@/components/ui/smoothui/scrubber'

interface SliderRowProps {
    label: string
    value: number
    min: number
    max: number
    step?: number
    unit?: string
    minLabel?: string
    maxLabel?: string
    icon?: React.ElementType
    onChange: (value: number) => void
    formatValue?: (val: number) => string
    className?: string
    description?: string
    decimals?: number
}

export const SliderRow: React.FC<SliderRowProps> = ({
    label,
    value,
    min,
    max,
    step = 1,
    unit = '',
    onChange,
    formatValue,
    className = '',
    description,
    decimals,
}) => {
    const calcDecimals = decimals !== undefined
        ? decimals
        : step < 1 ? (step.toString().split('.')[1]?.length || 2) : 0

    return (
        <div className={`space-y-1.5 ${className}`}>
            {description && (
                <p className="text-[11px] text-sec px-1">{description}</p>
            )}
            <Scrubber
                label={label}
                value={value}
                min={min}
                max={max}
                step={step}
                unit={unit}
                decimals={calcDecimals}
                formatValue={formatValue}
                onValueChange={onChange}
            />
        </div>
    )
}

export default SliderRow
