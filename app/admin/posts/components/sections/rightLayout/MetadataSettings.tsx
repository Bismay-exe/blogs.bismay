'use client'

import React, { useState, useEffect } from 'react'
import { FolderKanban, Layers, AlignLeft, Plus, Check, Link2, CornerDownRight, X } from 'lucide-react'
import { getStoredArticles } from '@/lib/blogStorage'

interface MetadataSettingsProps {
    category: string
    excerpt: string
    seriesId?: string
    seriesOrder?: number
    relatedSlugs?: string[]
    redirectFrom?: string[]
    onCategoryChange: (category: string) => void
    onExcerptChange: (excerpt: string) => void
    onSeriesIdChange: (seriesId: string) => void
    onSeriesOrderChange: (seriesOrder: number) => void
    onRelatedSlugsChange: (relatedSlugs: string[]) => void
    onRedirectFromChange: (redirectFrom: string[]) => void
}

const DEFAULT_CATEGORIES = [
    'React & Frontend',
    'Development',
    'JavaScript',
    'Engineering',
    'Architecture',
    'Foundations',
    'Design System',
    'DevOps',
    'Tutorials',
]

const DEFAULT_SERIES: string[] = []

const MetadataSettings: React.FC<MetadataSettingsProps> = ({
    category,
    excerpt,
    seriesId = '',
    seriesOrder = 1,
    relatedSlugs = [],
    redirectFrom = [],
    onCategoryChange,
    onExcerptChange,
    onSeriesIdChange,
    onSeriesOrderChange,
    onRelatedSlugsChange,
    onRedirectFromChange,
}) => {
    const [isCustomCategory, setIsCustomCategory] = useState<boolean>(false)
    const [isCustomSeries, setIsCustomSeries] = useState<boolean>(false)
    const [discoveredCategories, setDiscoveredCategories] = useState<string[]>(DEFAULT_CATEGORIES)
    const [discoveredSeries, setDiscoveredSeries] = useState<string[]>(DEFAULT_SERIES)
    const [availableSlugs, setAvailableSlugs] = useState<string[]>([])
    const [relatedInput, setRelatedInput] = useState('')
    const [redirectInput, setRedirectInput] = useState('')

    // Load existing categories, series and slugs dynamically from stored & published articles
    useEffect(() => {
        try {
            const articles = getStoredArticles()
            const catSet = new Set<string>(DEFAULT_CATEGORIES)
            const seriesSet = new Set<string>(DEFAULT_SERIES)
            const slugList: string[] = []

            articles.forEach((a) => {
                if (a.classification?.category) {
                    catSet.add(a.classification.category)
                }
                if (a.navigation?.seriesId && a.navigation.seriesId.trim()) {
                    seriesSet.add(a.navigation.seriesId.trim())
                }
                if (a.slug && a.slug.trim()) {
                    slugList.push(a.slug.trim())
                }
            })

            if (category && !catSet.has(category)) {
                catSet.add(category)
            }
            if (seriesId && seriesId.trim() && !seriesSet.has(seriesId.trim())) {
                seriesSet.add(seriesId.trim())
            }

            setDiscoveredCategories(Array.from(catSet))
            setDiscoveredSeries(Array.from(seriesSet))
            setAvailableSlugs(slugList)
        } catch (e) {
            console.error('Error discovering categories/series/slugs:', e)
        }
    }, [category, seriesId])

    const handleCategorySelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value
        if (val === '__CREATE_NEW__') {
            setIsCustomCategory(true)
            onCategoryChange('')
        } else {
            setIsCustomCategory(false)
            onCategoryChange(val)
        }
    }

    const handleSeriesSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value
        if (val === '__CREATE_NEW__') {
            setIsCustomSeries(true)
            onSeriesIdChange('')
        } else if (val === '__NONE__') {
            setIsCustomSeries(false)
            onSeriesIdChange('')
        } else {
            setIsCustomSeries(false)
            onSeriesIdChange(val)
        }
    }

    const handleAddRelatedSlug = (slugToAdd: string) => {
        const clean = slugToAdd.trim().toLowerCase().replace(/[^a-z0-9-]/g, '')
        if (clean && !relatedSlugs.includes(clean)) {
            onRelatedSlugsChange([...relatedSlugs, clean])
        }
        setRelatedInput('')
    }

    const handleRemoveRelatedSlug = (slugToRemove: string) => {
        onRelatedSlugsChange(relatedSlugs.filter((s) => s !== slugToRemove))
    }

    const handleAddRedirect = (pathToAdd: string) => {
        let clean = pathToAdd.trim()
        if (clean && !clean.startsWith('/')) {
            clean = '/' + clean
        }
        if (clean && !redirectFrom.includes(clean)) {
            onRedirectFromChange([...redirectFrom, clean])
        }
        setRedirectInput('')
    }

    const handleRemoveRedirect = (pathToRemove: string) => {
        onRedirectFromChange(redirectFrom.filter((p) => p !== pathToRemove))
    }

    const hasSeries = Boolean(isCustomSeries || (seriesId && seriesId.trim().length > 0))

    return (
        <div className="p-5 rounded-3xl border border-sec/20 bg-fg/2 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sec flex items-center gap-1.5">
                <FolderKanban size={14} className="text-accent" />
                Classification & Navigation
            </h3>

            {/* Category Section */}
            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                    <label className="text-[11px] font-mono text-sec">Category</label>
                    <button
                        type="button"
                        onClick={() => setIsCustomCategory(!isCustomCategory)}
                        className="text-[10px] font-mono text-accent hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                        {isCustomCategory ? (
                            <span>Pick existing</span>
                        ) : (
                            <>
                                <Plus size={10} />
                                <span>New category</span>
                            </>
                        )}
                    </button>
                </div>

                {isCustomCategory ? (
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            autoFocus
                            value={category}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            placeholder="Type new category name..."
                            className="w-full pl-3 pr-8 py-2 rounded-xl bg-fg/5 border border-accent/40 text-xs font-mono text-fg placeholder:text-sec/40 outline-none focus:border-accent"
                        />
                        <button
                            type="button"
                            onClick={() => setIsCustomCategory(false)}
                            className="absolute right-2.5 text-sec hover:text-fg"
                            title="Done"
                        >
                            <Check size={14} className="text-accent" />
                        </button>
                    </div>
                ) : (
                    <select
                        value={category || (discoveredCategories[0] || 'Development')}
                        onChange={handleCategorySelectChange}
                        className="w-full px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs font-mono text-fg outline-none focus:border-accent cursor-pointer"
                    >
                        {discoveredCategories.map((c) => (
                            <option key={c} value={c} className="bg-bg text-fg">
                                {c}
                            </option>
                        ))}
                        <option value="__CREATE_NEW__" className="bg-bg text-accent font-semibold">
                            + Create New Category...
                        </option>
                    </select>
                )}
            </div>

            {/* Series Section */}
            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                    <label className="text-[11px] font-mono text-sec flex items-center gap-1">
                        <Layers size={11} /> Series (Optional)
                    </label>
                    <button
                        type="button"
                        onClick={() => setIsCustomSeries(!isCustomSeries)}
                        className="text-[10px] font-mono text-accent hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                        {isCustomSeries ? (
                            <span>Pick existing</span>
                        ) : (
                            <>
                                <Plus size={10} />
                                <span>New series</span>
                            </>
                        )}
                    </button>
                </div>

                <div className={hasSeries ? 'grid grid-cols-3 gap-2' : 'space-y-1'}>
                    <div className={hasSeries ? 'col-span-2' : 'w-full'}>
                        {isCustomSeries ? (
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    autoFocus
                                    value={seriesId}
                                    onChange={(e) => onSeriesIdChange(e.target.value)}
                                    placeholder="e.g. 🚀 Next.js Masterclass"
                                    className="w-full pl-3 pr-8 py-2 rounded-xl bg-fg/5 border border-accent/40 text-xs text-fg placeholder:text-sec/40 outline-none focus:border-accent"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsCustomSeries(false)}
                                    className="absolute right-2.5 text-sec hover:text-fg"
                                    title="Done"
                                >
                                    <Check size={14} className="text-accent" />
                                </button>
                            </div>
                        ) : (
                            <select
                                value={seriesId || '__NONE__'}
                                onChange={handleSeriesSelectChange}
                                className="w-full px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs font-mono text-fg outline-none focus:border-accent cursor-pointer"
                            >
                                <option value="__NONE__" className="bg-bg text-sec">
                                    None (No Series — Standalone Post)
                                </option>
                                {discoveredSeries.map((s) => (
                                    <option key={s} value={s} className="bg-bg text-fg">
                                        {s}
                                    </option>
                                ))}
                                <option value="__CREATE_NEW__" className="bg-bg text-accent font-semibold">
                                    + Create New Series...
                                </option>
                            </select>
                        )}
                    </div>

                    {hasSeries && (
                        <div>
                            <input
                                type="number"
                                value={seriesOrder || 1}
                                onChange={(e) => onSeriesOrderChange(parseInt(e.target.value) || 1)}
                                min={1}
                                placeholder="Day #"
                                title="Series Order / Day #"
                                className="w-full px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs text-fg font-mono outline-none focus:border-accent text-center"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Related Article Slugs */}
            <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-mono text-sec flex items-center gap-1">
                    <Link2 size={11} /> Related Post Slugs
                </label>
                <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-fg/5 border border-sec/20 min-h-[38px] text-xs font-mono">
                    {relatedSlugs.map((slug) => (
                        <span
                            key={slug}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-fg/10 text-fg text-[11px] group"
                        >
                            <span>{slug}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveRelatedSlug(slug)}
                                className="text-sec hover:text-rose-400 transition-colors cursor-pointer"
                            >
                                <X size={11} />
                            </button>
                        </span>
                    ))}
                    <input
                        type="text"
                        value={relatedInput}
                        onChange={(e) => setRelatedInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ',') {
                                e.preventDefault()
                                handleAddRelatedSlug(relatedInput)
                            }
                        }}
                        placeholder={relatedSlugs.length === 0 ? 'Type slug & press Enter...' : 'Add slug...'}
                        className="flex-1 min-w-[120px] bg-transparent outline-none text-xs text-fg placeholder:text-sec/40 px-1 py-0.5"
                    />
                </div>
                {/* Suggestions from existing posts */}
                {availableSlugs.filter((s) => !relatedSlugs.includes(s)).length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap text-[10px] text-sec font-mono">
                        <span>Suggested:</span>
                        {availableSlugs
                            .filter((s) => !relatedSlugs.includes(s))
                            .slice(0, 3)
                            .map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => handleAddRelatedSlug(s)}
                                    className="px-1.5 py-0.5 rounded bg-fg/5 hover:bg-fg/10 text-sec hover:text-fg cursor-pointer border border-sec/15"
                                >
                                    +{s}
                                </button>
                            ))}
                    </div>
                )}
            </div>

            {/* Redirect From URL Aliases */}
            <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-mono text-sec flex items-center gap-1">
                    <CornerDownRight size={11} /> Redirect From (Aliases)
                </label>
                <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-fg/5 border border-sec/20 min-h-[38px] text-xs font-mono">
                    {redirectFrom.map((path) => (
                        <span
                            key={path}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-fg/10 text-fg text-[11px] group"
                        >
                            <span>{path}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveRedirect(path)}
                                className="text-sec hover:text-rose-400 transition-colors cursor-pointer"
                            >
                                <X size={11} />
                            </button>
                        </span>
                    ))}
                    <input
                        type="text"
                        value={redirectInput}
                        onChange={(e) => setRedirectInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ',') {
                                e.preventDefault()
                                handleAddRedirect(redirectInput)
                            }
                        }}
                        placeholder={redirectFrom.length === 0 ? 'e.g. /old-path & press Enter' : 'Add redirect path...'}
                        className="flex-1 min-w-[140px] bg-transparent outline-none text-xs text-fg placeholder:text-sec/40 px-1 py-0.5"
                    />
                </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-1 pt-1">
                <label className="text-[11px] font-mono text-sec flex items-center gap-1">
                    <AlignLeft size={11} /> Article Excerpt / Summary
                </label>
                <textarea
                    value={excerpt}
                    onChange={(e) => onExcerptChange(e.target.value)}
                    placeholder="Short description for blog cards and search engines..."
                    rows={3}
                    className="w-full h-32 px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs text-fg placeholder:text-sec/40 outline-none focus:border-accent resize-none leading-relaxed"
                />
            </div>
        </div>
    )
}

export default MetadataSettings
