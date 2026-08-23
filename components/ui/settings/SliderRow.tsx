'use client'

import React from 'react'

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
}

export const SliderRow: React.FC<SliderRowProps> = ({
    label,
    value,
    min,
    max,
    step = 1,
    unit = '',
    minLabel,
    maxLabel,
    icon: Icon,
    onChange,
    formatValue,
    className = '',
    description,
}) => {
    const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
    const displayValue = formatValue ? formatValue(value) : `${value}${unit}`

    return (
        <div
            className={`p-4 rounded-2xl border border-sec/15 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all space-y-3 ${className}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {Icon && (
                        <div className="w-6 h-6 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                            <Icon size={13} />
                        </div>
                    )}
                    <div>
                        <span className="text-xs font-semibold text-fg tracking-tight">{label}</span>
                        {description && (
                            <p className="text-[11px] text-sec/80 line-clamp-1">{description}</p>
                        )}
                    </div>
                </div>

                <div className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/25 text-accent font-mono text-xs font-bold shadow-xs">
                    {displayValue}
                </div>
            </div>

            {/* Slider with visual track */}
            <div className="relative py-1 flex items-center">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent focus:outline-none"
                    style={{
                        background: `linear-gradient(to right, var(--color-accent, #C4B6ED) 0%, var(--color-accent, #C4B6ED) ${percentage}%, rgba(128,128,128,0.2) ${percentage}%, rgba(128,128,128,0.2) 100%)`,
                    }}
                />
            </div>

            {(minLabel || maxLabel) && (
                <div className="flex justify-between items-center text-[10px] text-sec font-mono">
                    <span>{minLabel || `${min}${unit}`}</span>
                    <span>{maxLabel || `${max}${unit}`}</span>
                </div>
            )}
        </div>
    )
}
