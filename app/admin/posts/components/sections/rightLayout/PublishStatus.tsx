'use client'

import React from 'react'
import { Sparkles, Star } from 'lucide-react'
import { WheelDateTimePicker } from '@/components/ui/shared/WheelDateTimePicker'
import { Switch } from '@/components/ui/shared/Switch'

interface PublishStatusProps {
    status: 'draft' | 'published' | 'scheduled'
    slug: string
    isFeatured: boolean
    publishedAt?: string
    scheduledAt?: string
    onStatusChange: (status: 'draft' | 'published' | 'scheduled') => void
    onSlugChange: (slug: string) => void
    onFeaturedChange: (isFeatured: boolean) => void
    onPublishedAtChange: (publishedAt: string) => void
    onScheduledAtChange: (scheduledAt: string) => void
}

const PublishStatus: React.FC<PublishStatusProps> = ({
    status,
    slug,
    isFeatured,
    publishedAt = '',
    scheduledAt = '',
    onStatusChange,
    onSlugChange,
    onFeaturedChange,
    onPublishedAtChange,
    onScheduledAtChange,
}) => {
    const handleStatusSelect = (st: 'draft' | 'published' | 'scheduled') => {
        onStatusChange(st)
        if (st === 'published' && !publishedAt) {
            onPublishedAtChange(new Date().toISOString())
        } else if (st === 'scheduled' && !scheduledAt) {
            // Default scheduled to tomorrow at 9:00 AM
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(9, 0, 0, 0)
            onScheduledAtChange(tomorrow.toISOString())
        }
    }

    return (
        <div className="p-5 rounded-3xl border border-sec/20 bg-fg/2 space-y-4">
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
                        onClick={() => handleStatusSelect(st)}
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

            {/* Kinetic Wheel Date & Time Picker for Scheduled Status */}
            {status === 'scheduled' && (
                <div className="space-y-2 animate-in fade-in duration-200">
                    <WheelDateTimePicker
                        mode="scheduled"
                        label="Scheduled Release Time"
                        value={scheduledAt}
                        onChange={onScheduledAtChange}
                    />
                    <p className="text-[10px] font-mono text-sec/60 px-1">
                        Article will remain in queue and auto-publish at the designated timestamp.
                    </p>
                </div>
            )}

            {/* Kinetic Wheel Date & Time Picker for Published Status (Admin Customizable) */}
            {status === 'published' && (
                <div className="space-y-2 animate-in fade-in duration-200">
                    <WheelDateTimePicker
                        mode="published"
                        label="Published Date & Time"
                        value={publishedAt || new Date().toISOString()}
                        onChange={onPublishedAtChange}
                    />
                    <p className="text-[10px] font-mono text-sec/60 px-1">
                        Customizable publication timestamp shown across reader views and archives.
                    </p>
                </div>
            )}

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

            {/* Featured Post Toggle using Animated Switch */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-fg/5 border border-sec/15">
                <div className="flex items-center gap-2 text-xs font-medium text-fg">
                    <Star size={15} className={isFeatured ? 'text-amber-400 fill-amber-400' : 'text-sec'} />
                    <span>Featured Article</span>
                </div>
                <Switch
                    checked={isFeatured}
                    onCheckedChange={onFeaturedChange}
                    ariaLabel="Toggle featured article"
                    className="scale-90 origin-right"
                />
            </div>
        </div>
    )
}

export default PublishStatus
