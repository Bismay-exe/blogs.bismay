'use client'

import React from 'react'
import { Check } from 'lucide-react'

interface VisualChoiceCardProps {
    title: string
    description?: string
    badge?: string
    isSelected: boolean
    onClick: () => void
    previewNode?: React.ReactNode
    icon?: React.ElementType
    className?: string
}

export const VisualChoiceCard: React.FC<VisualChoiceCardProps> = ({
    title,
    description,
    badge,
    isSelected,
    onClick,
    previewNode,
    icon: Icon,
    className = '',
}) => {
    return (
        <div
            onClick={onClick}
            className={`group relative p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${isSelected
                    ? 'bg-accent/10 border-accent/70 shadow-sm shadow-accent/15 ring-1 ring-accent/30'
                    : 'bg-black/2 dark:bg-white/2 hover:bg-black/5 dark:hover:bg-white/5 border-sec/15 hover:border-sec/35'
                } ${className}`}
        >
            {/* Optional Top Miniature Preview Wireframe */}
            {previewNode && (
                <div className="mb-3 w-full h-16 rounded-xl bg-black/5 dark:bg-white/5 border border-sec/10 flex items-center justify-center overflow-hidden p-2">
                    {previewNode}
                </div>
            )}

            <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                        {Icon && (
                            <Icon
                                size={15}
                                className={isSelected ? 'text-accent' : 'text-sec group-hover:text-fg'}
                            />
                        )}
                        <h4
                            className={`text-xs font-bold truncate transition-colors ${isSelected ? 'text-fg' : 'text-sec group-hover:text-fg'
                                }`}
                        >
                            {title}
                        </h4>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                        {badge && (
                            <span
                                className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${isSelected
                                        ? 'bg-accent/25 text-accent'
                                        : 'bg-black/5 dark:bg-white/5 text-sec'
                                    }`}
                            >
                                {badge}
                            </span>
                        )}
                        <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${isSelected
                                    ? 'bg-accent text-white dark:text-[#0C0C0C] scale-100'
                                    : 'border border-sec/30 opacity-0 group-hover:opacity-40 scale-75'
                                }`}
                        >
                            {isSelected && <Check size={10} strokeWidth={3.5} />}
                        </div>
                    </div>
                </div>

                {description && (
                    <p className="text-[11px] text-sec/80 line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}
