'use client'

import React from 'react'
import { Sparkles, Star } from 'lucide-react'

interface PublishStatusProps {
    status: 'draft' | 'published' | 'scheduled'
    slug: string
    isFeatured: boolean
    onStatusChange: (status: 'draft' | 'published' | 'scheduled') => void
    onSlugChange: (slug: string) => void
    onFeaturedChange: (isFeatured: boolean) => void
}

const PublishStatus: React.FC<PublishStatusProps> = ({
    status,
    slug,
    isFeatured,
    onStatusChange,
    onSlugChange,
    onFeaturedChange,
}) => {
    return (
        <div className="p-5 rounded-3xl border border-sec/20 bg-fg/[0.02] space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sec flex items-center gap-1.5">
                <Sparkles size={14} className="text-accent" />
                Publishing Status
            </h3>

            {/* Status Segmented Switcher */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-fg/5 border border-sec/15 text-xs font-mono font-semibold">
                {(['draft', 'published', 'scheduled'] as const).map((st) => (
                    <button
                        key={st}
                        type="button"
                        onClick={() => onStatusChange(st)}
                        className={`py-1.5 rounded-xl capitalize transition-all cursor-pointer ${
                            status === st
                                ? 'bg-accent text-black shadow-sm font-bold'
                                : 'text-sec hover:text-fg'
                        }`}
                    >
                        {st}
                    </button>
                ))}
            </div>

            {/* URL Slug */}
            <div className="space-y-1">
                <label className="text-[11px] font-mono text-sec">Article URL Slug</label>
                <div className="flex items-center px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs font-mono text-fg focus-within:border-accent/60">
                    <span className="text-sec/60 select-none">/blogs/</span>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => onSlugChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                        placeholder="day-12-of-learning-react"
                        className="flex-1 bg-transparent outline-none text-fg placeholder:text-sec/40"
                    />
                </div>
            </div>

            {/* Featured Post Toggle */}
            <label className="flex items-center justify-between p-3 rounded-2xl bg-fg/5 border border-sec/15 cursor-pointer group hover:bg-fg/10 transition-colors">
                <div className="flex items-center gap-2 text-xs font-medium text-fg">
                    <Star size={15} className={isFeatured ? 'text-amber-400 fill-amber-400' : 'text-sec'} />
                    <span>Featured Article</span>
                </div>
                <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => onFeaturedChange(e.target.checked)}
                    className="w-4 h-4 rounded accent-accent cursor-pointer"
                />
            </label>
        </div>
    )
}

export default PublishStatus
