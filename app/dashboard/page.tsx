'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
    getStoredArticles,
    deleteArticleFromStorage,
    ArticleWithStorageMeta,
} from '@/lib/blogStorage'
import {
    Plus,
    Search,
    FileText,
    CheckCircle2,
    Clock,
    Calendar,
    Edit3,
    ExternalLink,
    Trash2,
    Download,
    Layers,
    Sparkles,
    LayoutGrid,
    List,
    FolderGit2,
    ArrowRight,
    Tag,
    BookOpen,
    HardDrive,
    RefreshCw,
} from 'lucide-react'

type StatusFilter = 'all' | 'published' | 'draft' | 'scheduled' | 'saved'

const BlogsDashboard = () => {
    const [articles, setArticles] = useState<ArticleWithStorageMeta[]>([])
    const [mounted, setMounted] = useState(false)
    const [activeFilter, setActiveFilter] = useState<StatusFilter>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

    const refreshArticles = () => {
        const list = getStoredArticles()
        setArticles(list)
    }

    useEffect(() => {
        setMounted(true)
        refreshArticles()
    }, [])

    // Calculate stats
    const stats = useMemo(() => {
        const total = articles.length
        const published = articles.filter((a) => a.status === 'published').length
        const draft = articles.filter((a) => a.status === 'draft').length
        const scheduled = articles.filter((a) => a.status === 'scheduled').length
        const localSaved = articles.filter((a) => a.storageSource === 'local_saved' || a.storageSource === 'active_draft').length

        return { total, published, draft, scheduled, localSaved }
    }, [articles])

    // Categories list
    const categories = useMemo(() => {
        const set = new Set<string>()
        set.add('All')
        articles.forEach((a) => {
            if (a.classification?.category) {
                set.add(a.classification.category)
            }
        })
        return Array.from(set)
    }, [articles])

    // Filtered articles
    const filteredArticles = useMemo(() => {
        return articles.filter((article) => {
            // Status tab filter
            if (activeFilter === 'published' && article.status !== 'published') return false
            if (activeFilter === 'draft' && article.status !== 'draft') return false
            if (activeFilter === 'scheduled' && article.status !== 'scheduled') return false
            if (
                activeFilter === 'saved' &&
                article.storageSource !== 'local_saved' &&
                article.storageSource !== 'active_draft'
            )
                return false

            // Category filter
            if (
                selectedCategory !== 'All' &&
                article.classification?.category !== selectedCategory
            )
                return false

            // Search query filter
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase()
                const matchTitle = article.content?.title?.toLowerCase().includes(query)
                const matchSubtitle = article.content?.subtitle?.toLowerCase().includes(query)
                const matchExcerpt = article.content?.excerpt?.toLowerCase().includes(query)
                const matchSlug = article.slug?.toLowerCase().includes(query)
                const matchTags = article.classification?.tags?.some((t) =>
                    t.toLowerCase().includes(query)
                )
                const matchSeries = article.navigation?.seriesId?.toLowerCase().includes(query)

                return (
                    matchTitle ||
                    matchSubtitle ||
                    matchExcerpt ||
                    matchSlug ||
                    matchTags ||
                    matchSeries
                )
            }

            return true
        })
    }, [articles, activeFilter, selectedCategory, searchQuery])

    const handleDelete = (id: string, slug?: string, title?: string) => {
        const confirmName = title || slug || 'this draft'
        if (window.confirm(`Are you sure you want to delete "${confirmName}" from your local storage?`)) {
            deleteArticleFromStorage(id, slug)
            refreshArticles()
        }
    }

    const handleExportJson = (article: ArticleWithStorageMeta) => {
        const jsonStr = JSON.stringify(article, null, 2)
        const blob = new Blob([jsonStr], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${article.slug || 'article'}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return 'Not set'
        try {
            const date = new Date(dateStr)
            if (isNaN(date.getTime())) return dateStr
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            })
        } catch {
            return dateStr
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-bg text-fg">
            <Navbar />

            <main className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 flex-1">
                {/* Hero / Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[var(--acc)]/15 text-[var(--acc)] border border-[var(--acc)]/30 font-medium">
                                Content Management
                            </span>
                            <span className="text-xs font-mono text-[var(--sec)] flex items-center gap-1">
                                <Sparkles size={12} className="text-[var(--acc)]" />
                                All Articles & Drafts
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            Blog Workspace
                        </h1>
                        <p className="text-sm text-[var(--sec)] max-w-2xl">
                            Track all published articles, review scheduled drops, and continue writing your browser-saved drafts.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                        <button
                            onClick={refreshArticles}
                            title="Refresh list from storage"
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-[var(--sec)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                        >
                            <RefreshCw size={14} />
                            <span>Sync</span>
                        </button>

                        <Link
                            href="/blogs/new"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--acc)] hover:opacity-90 text-black font-bold text-sm transition-all shadow-md shadow-[var(--acc)]/20 cursor-pointer"
                        >
                            <Plus size={16} />
                            <span>New Article</span>
                        </Link>
                    </div>
                </div>

                {/* Stats Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                    {/* All */}
                    <button
                        type="button"
                        onClick={() => setActiveFilter('all')}
                        className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                            activeFilter === 'all'
                                ? 'bg-[var(--acc)]/10 border-[var(--acc)]/50 ring-1 ring-[var(--acc)]/40 shadow-sm'
                                : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/[0.06] dark:border-white/[0.06] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                        }`}
                    >
                        <div className="flex items-center justify-between text-xs text-[var(--sec)] font-mono">
                            <span>Total Posts</span>
                            <BookOpen size={15} className="text-[var(--acc)]" />
                        </div>
                        <div className="mt-2 text-2xl font-bold font-mono">
                            {mounted ? stats.total : '—'}
                        </div>
                    </button>

                    {/* Published */}
                    <button
                        type="button"
                        onClick={() => setActiveFilter('published')}
                        className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                            activeFilter === 'published'
                                ? 'bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/40 shadow-sm'
                                : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/[0.06] dark:border-white/[0.06] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                        }`}
                    >
                        <div className="flex items-center justify-between text-xs text-[var(--sec)] font-mono">
                            <span>Published</span>
                            <CheckCircle2 size={15} className="text-emerald-400" />
                        </div>
                        <div className="mt-2 text-2xl font-bold font-mono text-emerald-500 dark:text-emerald-400">
                            {mounted ? stats.published : '—'}
                        </div>
                    </button>

                    {/* Drafts */}
                    <button
                        type="button"
                        onClick={() => setActiveFilter('draft')}
                        className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                            activeFilter === 'draft'
                                ? 'bg-amber-500/10 border-amber-500/50 ring-1 ring-amber-500/40 shadow-sm'
                                : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/[0.06] dark:border-white/[0.06] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                        }`}
                    >
                        <div className="flex items-center justify-between text-xs text-[var(--sec)] font-mono">
                            <span>Drafts</span>
                            <FileText size={15} className="text-amber-400" />
                        </div>
                        <div className="mt-2 text-2xl font-bold font-mono text-amber-500 dark:text-amber-400">
                            {mounted ? stats.draft : '—'}
                        </div>
                    </button>

                    {/* Scheduled */}
                    <button
                        type="button"
                        onClick={() => setActiveFilter('scheduled')}
                        className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                            activeFilter === 'scheduled'
                                ? 'bg-indigo-500/10 border-indigo-500/50 ring-1 ring-indigo-500/40 shadow-sm'
                                : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/[0.06] dark:border-white/[0.06] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                        }`}
                    >
                        <div className="flex items-center justify-between text-xs text-[var(--sec)] font-mono">
                            <span>Scheduled</span>
                            <Clock size={15} className="text-indigo-400" />
                        </div>
                        <div className="mt-2 text-2xl font-bold font-mono text-indigo-500 dark:text-indigo-400">
                            {mounted ? stats.scheduled : '—'}
                        </div>
                    </button>

                    {/* Saved in Browser */}
                    <button
                        type="button"
                        onClick={() => setActiveFilter('saved')}
                        className={`text-left p-4 rounded-2xl border col-span-2 sm:col-span-1 transition-all cursor-pointer ${
                            activeFilter === 'saved'
                                ? 'bg-cyan-500/10 border-cyan-500/50 ring-1 ring-cyan-500/40 shadow-sm'
                                : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/[0.06] dark:border-white/[0.06] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                        }`}
                    >
                        <div className="flex items-center justify-between text-xs text-[var(--sec)] font-mono">
                            <span>Browser Saved</span>
                            <HardDrive size={15} className="text-cyan-400" />
                        </div>
                        <div className="mt-2 text-2xl font-bold font-mono text-cyan-500 dark:text-cyan-400">
                            {mounted ? stats.localSaved : '—'}
                        </div>
                    </button>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06]">
                    {/* Status Tabs */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                        {(
                            [
                                { id: 'all', label: 'All', count: stats.total },
                                { id: 'published', label: 'Published', count: stats.published },
                                { id: 'draft', label: 'Drafts', count: stats.draft },
                                { id: 'scheduled', label: 'Scheduled', count: stats.scheduled },
                                { id: 'saved', label: 'Local Saved', count: stats.localSaved },
                            ] as const
                        ).map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveFilter(tab.id)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                                    activeFilter === tab.id
                                        ? 'bg-[var(--foreground)] text-[var(--background)] font-bold shadow-sm'
                                        : 'text-[var(--sec)] hover:text-[var(--foreground)] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span
                                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                                        activeFilter === tab.id
                                            ? 'bg-[var(--background)]/25 text-[var(--background)]'
                                            : 'bg-black/[0.06] dark:bg-white/[0.08] text-[var(--sec)]'
                                    }`}
                                >
                                    {mounted ? tab.count : 0}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Search & Category & View Toggle */}
                    <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
                        {/* Search Input */}
                        <div className="relative flex-1 sm:w-64">
                            <Search
                                size={14}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sec)] pointer-events-none"
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by title, tag, slug..."
                                className="w-full pl-8.5 pr-3 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[var(--foreground)] placeholder:text-[var(--sec)]/70 focus:outline-none focus:border-[var(--acc)] transition-all font-sans"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[var(--sec)] hover:text-[var(--foreground)]"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Category Dropdown */}
                        {categories.length > 1 && (
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-2.5 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-[var(--foreground)] focus:outline-none focus:border-[var(--acc)] cursor-pointer"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat} className="bg-[var(--background)] text-[var(--foreground)]">
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        )}

                        {/* View Switch */}
                        <div className="flex items-center border border-black/[0.08] dark:border-white/[0.08] rounded-xl p-0.5 bg-black/[0.03] dark:bg-white/[0.03]">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                    viewMode === 'grid'
                                        ? 'bg-[var(--foreground)] text-[var(--background)]'
                                        : 'text-[var(--sec)] hover:text-[var(--foreground)]'
                                }`}
                                title="Grid View"
                            >
                                <LayoutGrid size={14} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                    viewMode === 'list'
                                        ? 'bg-[var(--foreground)] text-[var(--background)]'
                                        : 'text-[var(--sec)] hover:text-[var(--foreground)]'
                                }`}
                                title="List View"
                            >
                                <List size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Articles List / Grid Display */}
                {filteredArticles.length > 0 ? (
                    viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredArticles.map((article) => {
                                const isDraft = article.status === 'draft'
                                const isScheduled = article.status === 'scheduled'
                                const isPublished = article.status === 'published'
                                const isLocal =
                                    article.storageSource === 'local_saved' ||
                                    article.storageSource === 'active_draft'

                                return (
                                    <div
                                        key={article.id || article.slug}
                                        className="group relative flex flex-col justify-between rounded-3xl border border-black/[0.08] dark:border-white/[0.08] hover:border-[var(--acc)]/40 bg-black/[0.015] dark:bg-white/[0.02] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] p-5 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-purple-950/5"
                                    >
                                        <div className="space-y-4">
                                            {/* Status & Storage badges header */}
                                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                                {/* Main Status Badge */}
                                                <div className="flex items-center gap-1.5">
                                                    {isPublished && (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                            Published
                                                        </span>
                                                    )}
                                                    {isDraft && (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                                            Draft
                                                        </span>
                                                    )}
                                                    {isScheduled && (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                                                            <Clock size={11} />
                                                            Scheduled
                                                        </span>
                                                    )}

                                                    {/* Local Storage Tag */}
                                                    {isLocal && (
                                                        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20" title="Saved locally in browser storage">
                                                            <HardDrive size={10} />
                                                            {article.storageSource === 'active_draft' ? 'Editor Draft' : 'Saved'}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Series / Category */}
                                                <span className="text-[11px] font-mono text-[var(--sec)] truncate max-w-[140px]">
                                                    {article.classification?.category || 'General'}
                                                </span>
                                            </div>

                                            {/* Series Banner if present */}
                                            {article.navigation?.seriesId && (
                                                <div className="flex items-center gap-1 text-[11px] font-mono text-[var(--acc)] bg-[var(--acc)]/10 px-2.5 py-1 rounded-lg w-fit">
                                                    <Layers size={12} />
                                                    <span className="truncate max-w-[200px]">
                                                        {article.navigation.seriesId}
                                                    </span>
                                                    {article.navigation.seriesOrder !== undefined && (
                                                        <span className="opacity-80">#{article.navigation.seriesOrder}</span>
                                                    )}
                                                </div>
                                            )}

                                            {/* Banner Image */}
                                            {(article.media?.bannerImage?.url || article.seo?.ogImage) && (
                                                <div className="w-full h-44 rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.03] relative group-hover:border-[var(--acc)]/40 transition-colors">
                                                    <img
                                                        src={article.media?.bannerImage?.url || article.seo?.ogImage}
                                                        alt={article.media?.bannerImage?.alt || article.content?.title || 'Article banner'}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                    />
                                                </div>
                                            )}

                                            {/* Title & Excerpt */}
                                            <div>
                                                <h3 className="font-bold text-base sm:text-lg tracking-tight group-hover:text-[var(--acc)] transition-colors line-clamp-2">
                                                    {article.content?.title || 'Untitled Blog Post'}
                                                </h3>
                                                {article.content?.subtitle && (
                                                    <p className="text-xs text-[var(--sec)] line-clamp-1 mt-1 font-medium">
                                                        {article.content.subtitle}
                                                    </p>
                                                )}
                                                <p className="text-xs text-[var(--sec)]/80 line-clamp-3 mt-2 leading-relaxed">
                                                    {article.content?.excerpt ||
                                                        article.content?.body?.slice(0, 140) ||
                                                        'No excerpt or body preview provided yet.'}
                                                </p>
                                            </div>

                                            {/* Tags */}
                                            {article.classification?.tags && article.classification.tags.length > 0 && (
                                                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                                                    {article.classification.tags.slice(0, 3).map((tag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.05] text-[var(--sec)] border border-black/[0.04] dark:border-white/[0.06]"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                    {article.classification.tags.length > 3 && (
                                                        <span className="text-[10px] font-mono text-[var(--sec)]/60">
                                                            +{article.classification.tags.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Footer Meta & Actions */}
                                        <div className="pt-4 mt-4 border-t border-black/[0.06] dark:border-white/[0.06] space-y-3">
                                            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--sec)]">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    {formatDate(article.publishing?.updatedAt || article.publishing?.createdAt)}
                                                </span>
                                                <span>
                                                    {article.content?.readingTimeMinutes || 1} min read
                                                </span>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center justify-between gap-2 pt-1">
                                                <div className="flex items-center gap-1.5">
                                                    {/* Edit in /blogs/new */}
                                                    <Link
                                                        href={`/blogs/new?id=${encodeURIComponent(article.id)}${article.slug ? `&slug=${encodeURIComponent(article.slug)}` : ''}`}
                                                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 text-xs font-mono font-semibold transition-opacity"
                                                        title="Open in Editor"
                                                    >
                                                        <Edit3 size={12} />
                                                        <span>Edit</span>
                                                    </Link>

                                                    {/* View Live Article (if slug exists) */}
                                                    {article.slug && (
                                                        <Link
                                                            href={`/blogs/${article.slug}`}
                                                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-xs font-mono text-[var(--foreground)] transition-colors"
                                                            title="View Live Blog Post"
                                                        >
                                                            <ExternalLink size={12} />
                                                            <span>View</span>
                                                        </Link>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    {/* Export JSON */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleExportJson(article)}
                                                        className="p-1.5 rounded-lg text-[var(--sec)] hover:text-[var(--foreground)] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
                                                        title="Export as article.json"
                                                    >
                                                        <Download size={13} />
                                                    </button>

                                                    {/* Delete if local */}
                                                    {isLocal && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    article.id,
                                                                    article.slug,
                                                                    article.content?.title
                                                                )
                                                            }
                                                            className="p-1.5 rounded-lg text-[var(--sec)] hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                                            title="Delete Draft"
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        /* List View */
                        <div className="space-y-3">
                            {filteredArticles.map((article) => {
                                const isDraft = article.status === 'draft'
                                const isScheduled = article.status === 'scheduled'
                                const isPublished = article.status === 'published'
                                const isLocal =
                                    article.storageSource === 'local_saved' ||
                                    article.storageSource === 'active_draft'

                                return (
                                    <div
                                        key={article.id || article.slug}
                                        className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] hover:border-[var(--acc)]/40 bg-black/[0.015] dark:bg-white/[0.02] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-all"
                                    >
                                        {/* {(article.media?.bannerImage?.url || article.seo?.ogImage) && (
                                                <div className="w- h-24 rounded-xl overflow-hidden border border-sec/30 bg-bg/3 relative group-hover:border-acc/40 transition-colors">
                                                    <img
                                                        src={article.media?.bannerImage?.url || article.seo?.ogImage}
                                                        alt={article.media?.bannerImage?.alt || article.content?.title || 'Article banner'}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                    />
                                                </div>
                                            )} */}

                                        <div className="space-y-1.5 flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {isPublished && (
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                                                        Published
                                                    </span>
                                                )}
                                                {isDraft && (
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                                        Draft
                                                    </span>
                                                )}
                                                {isScheduled && (
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                                                        Scheduled
                                                    </span>
                                                )}
                                                {isLocal && (
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                                                        Local Draft
                                                    </span>
                                                )}

                                                <span className="text-xs font-mono text-[var(--sec)]">
                                                    {article.classification?.category || 'General'}
                                                </span>

                                                {article.navigation?.seriesId && (
                                                    <span className="text-[11px] font-mono text-[var(--acc)]">
                                                        • {article.navigation.seriesId}
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="font-bold text-base tracking-tight group-hover:text-[var(--acc)] transition-colors truncate">
                                                {article.content?.title || 'Untitled Blog Post'}
                                            </h3>

                                            <p className="text-xs text-[var(--sec)] line-clamp-1">
                                                {article.content?.excerpt || article.content?.body?.slice(0, 120)}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4 justify-between md:justify-end">
                                            <div className="text-right text-xs font-mono text-[var(--sec)] hidden sm:block">
                                                <div>{formatDate(article.publishing?.updatedAt || article.publishing?.createdAt)}</div>
                                                <div className="text-[11px] opacity-75">{article.content?.readingTimeMinutes || 1} min read</div>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <Link
                                                    href={`/blogs/new?id=${encodeURIComponent(article.id)}${article.slug ? `&slug=${encodeURIComponent(article.slug)}` : ''}`}
                                                    className="p-2 rounded-xl bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 text-xs font-mono font-semibold"
                                                    title="Edit in Editor"
                                                >
                                                    <Edit3 size={13} />
                                                </Link>

                                                {article.slug && (
                                                    <Link
                                                        href={`/blogs/${article.slug}`}
                                                        className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-[var(--foreground)] text-xs font-mono"
                                                        title="View Article"
                                                    >
                                                        <ExternalLink size={13} />
                                                    </Link>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() => handleExportJson(article)}
                                                    className="p-2 rounded-xl text-[var(--sec)] hover:text-[var(--foreground)] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] cursor-pointer"
                                                    title="Export JSON"
                                                >
                                                    <Download size={13} />
                                                </button>

                                                {isLocal && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                article.id,
                                                                article.slug,
                                                                article.content?.title
                                                            )
                                                        }
                                                        className="p-2 rounded-xl text-[var(--sec)] hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                                                        title="Delete Draft"
                                                    >
                                                        <Trash2 size={13} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                ) : (
                    /* Empty State */
                    <div className="py-16 text-center rounded-3xl border border-dashed border-black/[0.1] dark:border-white/[0.1] bg-black/[0.01] dark:bg-white/[0.01] space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--acc)]/10 text-[var(--acc)] flex items-center justify-center mx-auto">
                            <FolderGit2 size={24} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-base font-bold text-[var(--foreground)]">
                                No articles found
                            </h3>
                            <p className="text-xs text-[var(--sec)] max-w-sm mx-auto">
                                {searchQuery || activeFilter !== 'all' || selectedCategory !== 'All'
                                    ? 'Try changing your search keywords or switching filter tabs.'
                                    : 'Start writing your first article and save it to your drafts.'}
                            </p>
                        </div>
                        <div className="pt-2">
                            <Link
                                href="/blogs/new"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--acc)] text-black font-bold text-xs"
                            >
                                <Plus size={14} />
                                <span>Create New Blog Post</span>
                            </Link>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}

export default BlogsDashboard
