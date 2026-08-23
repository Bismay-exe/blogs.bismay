'use client'

import React from 'react'

interface ToggleSwitchProps {
    checked: boolean
    onChange: (checked: boolean) => void
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg'
    className?: string
    id?: string
    ariaLabel?: string
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    checked,
    onChange,
    disabled = false,
    size = 'md',
    className = '',
    id,
    ariaLabel,
}) => {
    const sizeConfig = {
        sm: {
            container: 'w-8 h-4.5 p-0.5',
            thumb: 'w-3.5 h-3.5',
            translate: 'translate-x-3.5',
        },
        md: {
            container: 'w-11 h-6 p-0.5',
            thumb: 'w-5 h-5',
            translate: 'translate-x-5',
        },
        lg: {
            container: 'w-13 h-7 p-0.5',
            thumb: 'w-6 h-6',
            translate: 'translate-x-6',
        },
    }[size]

    return (
        <button
            type="button"
            role="switch"
            id={id}
            aria-checked={checked}
            aria-label={ariaLabel}
            disabled={disabled}
            onClick={() => !disabled && onChange(!checked)}
            className={`relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-250 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-40 ${
                sizeConfig.container
            } ${
                checked
                    ? 'bg-emerald-500 shadow-sm shadow-emerald-500/25 dark:bg-emerald-500'
                    : 'bg-zinc-300 dark:bg-zinc-700/80 hover:bg-zinc-400/80 dark:hover:bg-zinc-600/80'
            } ${className}`}
        >
            <span
                className={`pointer-events-none inline-block transform rounded-full bg-white shadow-md ring-0 transition-transform duration-250 ease-in-out ${
                    sizeConfig.thumb
                } ${checked ? sizeConfig.translate : 'translate-x-0'}`}
            />
        </button>
    )
}
