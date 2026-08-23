'use client'

import React from 'react'

export interface SegmentOption<T extends string | number> {
    value: T
    label: string
    icon?: React.ElementType
    badge?: string
}

interface SegmentedControlProps<T extends string | number> {
    options: SegmentOption<T>[]
    value: T
    onChange: (value: T) => void
    size?: 'sm' | 'md'
    className?: string
}

export function SegmentedControl<T extends string | number>({
    options,
    value,
    onChange,
    size = 'md',
    className = '',
}: SegmentedControlProps<T>) {
    const isSmall = size === 'sm'

    return (
        <div
            className={`inline-flex p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-sec/15 backdrop-blur-xs ${className}`}
        >
            {options.map((opt) => {
                const isSelected = value === opt.value
                const Icon = opt.icon

                return (
                    <button
                        key={String(opt.value)}
                        type="button"
                        onClick={() => onChange(opt.value)}
                        className={`relative flex items-center justify-center gap-1.5 rounded-xl font-mono transition-all duration-200 cursor-pointer select-none ${
                            isSmall ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs'
                        } ${
                            isSelected
                                ? 'bg-white dark:bg-zinc-800 text-fg font-bold shadow-sm shadow-black/10 ring-1 ring-black/5 dark:ring-white/10'
                                : 'text-sec hover:text-fg hover:bg-black/5 dark:hover:bg-white/5 font-medium'
                        }`}
                    >
                        {Icon && (
                            <Icon
                                size={isSmall ? 12 : 14}
                                className={isSelected ? 'text-accent' : 'text-sec'}
                            />
                        )}
                        <span>{opt.label}</span>
                        {opt.badge && (
                            <span
                                className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                                    isSelected
                                        ? 'bg-accent/20 text-accent'
                                        : 'bg-black/10 dark:bg-white/10 text-sec'
                                }`}
                            >
                                {opt.badge}
                            </span>
                        )}
                    </button>
                )
            })}
        </div>
    )
}
