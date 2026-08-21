'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
    getStoredArticles,
    saveArticleToStorage,
    deleteArticleFromStorage,
    ArticleWithStorageMeta,
} from '@/lib/blogStorage'
import PublishStatus from './components/sections/rightLayout/PublishStatus'
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
    X,
} from 'lucide-react'

type StatusFilter = 'all' | 'published' | 'draft' | 'scheduled' | 'saved'

const BlogsDashboard = () => {
    const [articles, setArticles] = useState<ArticleWithStorageMeta[]>([])
    const [mounted, setMounted] = useState(false)
    const [activeFilter, setActiveFilter] = useState<StatusFilter>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [editingDateArticle, setEditingDateArticle] = useState<ArticleWithStorageMeta | null>(null)

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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-black/8 dark:border-white/8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent/15 text-accent border border-accent/30 font-medium">
                                Content Management
                            </span>
                            <span className="text-xs font-mono text-sec flex items-center gap-1">
                                <Sparkles size={12} className="text-accent" />
                                All Articles & Drafts
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            Blog Workspace
                        </h1>
                        <p className="text-sm text-sec max-w-2xl">
                            Track all published articles, review scheduled drops, and continue writing your browser-saved drafts.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                        <button
                            onClick={refreshArticles}
                            title="Refresh list from storage"
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/4 dark:bg-white/5 hover:bg-black/8 dark:hover:bg-white/1 border border-black/8 dark:border-white/8 text-xs font-mono text-sec hover:text-fg transition-colors cursor-pointer"
                        >
                            <RefreshCw size={14} />
                            <span>Sync</span>
                        </button>

                        <Link
                            href="/admin/posts/new"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:opacity-90 text-black font-bold text-sm transition-all shadow-md shadow-accent/20 cursor-pointer"
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
                        className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${activeFilter === 'all'
                            ? 'bg-accent/10 border-accent/50 ring-1 ring-accent/40 shadow-sm'
                            : 'bg-black/2 dark:bg-white/2 border-black/6 dark:border-white/6 hover:bg-black/4 dark:hover:bg-white/4'
                            }`}
                    >
                        <div className="flex items-center justify-between text-xs text-sec font-mono">
                            <span>Total Posts</span>
                            <BookOpen size={15} className="text-accent" />
                        </div>
                        <div className="mt-2 text-2xl font-bold font-mono">
                            {mounted ? stats.total : '—'}
                        </div>
                    </button>

                    {/* Published */}
                    <button
                        type="button"
                        onClick={() => setActiveFilter('published')}
                        className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${activeFilter === 'published'
                            ? 'bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/40 shadow-sm'
                            : 'bg-black/2 dark:bg-white/2 border-black/6 dark:border-white/6 hover:bg-black/4 dark:hover:bg-white/4'
                            }`}
                    >
                        <div className="flex items-center justify-between text-xs text-sec font-mono">
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
                        className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${activeFilter === 'draft'
                            ? 'bg-amber-500/10 border-amber-500/50 ring-1 ring-amber-500/40 shadow-sm'
                            : 'bg-black/2 dark:bg-white/2 border-black/6 dark:border-white/6 hover:bg-black/4 dark:hover:bg-white/4'
                            }`}
                    >
                        <div className="flex items-center justify-between text-xs text-sec font-mono">
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
                        className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${activeFilter === 'scheduled'
                            ? 'bg-indigo-500/10 border-indigo-500/50 ring-1 ring-indigo-500/40 shadow-sm'
                            : 'bg-black/2 dark:bg-white/2 border-black/6 dark:border-white/6 hover:bg-black/4 dark:hover:bg-white/4'
                            }`}
                    >
                        <div className="flex items-center justify-between text-xs text-sec font-mono">
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
                        className={`text-left p-4 rounded-2xl border col-span-2 sm:col-span-1 transition-all cursor-pointer ${activeFilter === 'saved'
                            ? 'bg-cyan-500/10 border-cyan-500/50 ring-1 ring-cyan-500/40 shadow-sm'
                            : 'bg-black/2 dark:bg-white/2 border-black/6 dark:border-white/6 hover:bg-black/4 dark:hover:bg-white/4'
                            }`}
                    >
                        <div className="flex items-center justify-between text-xs text-sec font-mono">
                            <span>Browser Saved</span>
                            <HardDrive size={15} className="text-cyan-400" />
                        </div>
                        <div className="mt-2 text-2xl font-bold font-mono text-cyan-500 dark:text-cyan-400">
                            {mounted ? stats.localSaved : '—'}
                        </div>
                    </button>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-black/2 dark:bg-white/2 border border-black/6 dark:border-white/6">
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
                                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${activeFilter === tab.id
                                    ? 'bg-fg text-bg font-bold shadow-sm'
                                    : 'text-sec hover:text-fg hover:bg-black/4 dark:hover:bg-white/4'
                                    }`}
                            >
                                <span>{tab.label}</span>
                                <span
                                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${activeFilter === tab.id
                                        ? 'bg-bg/25 text-bg'
                                        : 'bg-black/6 dark:bg-white/8 text-sec'
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
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-sec pointer-events-none"
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by title, tag, slug..."
                                className="w-full pl-8.5 pr-3 py-1.5 rounded-xl bg-black/4 dark:bg-white/4 border border-black/8 dark:border-white/8 text-xs text-fg placeholder:text-sec/70 focus:outline-none focus:border-accent transition-all font-sans"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-sec hover:text-fg"
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
                                className="px-2.5 py-1.5 rounded-xl bg-black/4 dark:bg-white/4 border border-black/8 dark:border-white/8 text-xs font-mono text-fg focus:outline-none focus:border-accent cursor-pointer"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat} className="bg-bg text-fg">
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        )}

                        {/* View Switch */}
                        <div className="flex items-center border border-black/8 dark:border-white/8 rounded-xl p-0.5 bg-black/3 dark:bg-white/3">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'grid'
                                    ? 'bg-fg text-bg'
                                    : 'text-sec hover:text-fg'
                                    }`}
                                title="Grid View"
                            >
                                <LayoutGrid size={14} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === 'list'
                                    ? 'bg-fg text-bg'
                                    : 'text-sec hover:text-fg'
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
                                        className="group relative flex flex-col justify-between rounded-3xl border border-black/8 dark:border-white/8 hover:border-accent/40 bg-black/1.5 dark:bg-white/2 hover:bg-black/3 dark:hover:bg-white/3 p-5 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-purple-950/5"
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
                                                <span className="text-[11px] font-mono text-sec truncate max-w-35">
                                                    {article.classification?.category || 'General'}
                                                </span>
                                            </div>

                                            {/* Series Banner if present */}
                                            {article.navigation?.seriesId && (
                                                <div className="flex items-center gap-1 text-[11px] font-mono text-accent bg-accent/10 px-2.5 py-1 rounded-lg w-fit">
                                                    <Layers size={12} />
                                                    <span className="truncate max-w-50">
                                                        {article.navigation.seriesId}
                                                    </span>
                                                    {article.navigation.seriesOrder !== undefined && (
                                                        <span className="opacity-80">#{article.navigation.seriesOrder}</span>
                                                    )}
                                                </div>
                                            )}

                                            {/* Banner Image */}
                                            {(article.media?.bannerImage?.url || article.seo?.ogImage) && (
                                                <div className="w-full h-44 rounded-2xl overflow-hidden border border-black/8 dark:border-white/8 bg-black/3 dark:bg-white/3 relative group-hover:border-accent/40 transition-colors">
                                                    <img
                                                        src={article.media?.bannerImage?.url || article.seo?.ogImage}
                                                        alt={article.media?.bannerImage?.alt || article.content?.title || 'Article banner'}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                    />
                                                </div>
                                            )}

                                            {/* Title & Excerpt */}
                                            <div>
                                                <h3 className="font-bold text-base sm:text-lg tracking-tight group-hover:text-accent transition-colors line-clamp-2">
                                                    {article.content?.title || 'Untitled Blog Post'}
                                                </h3>
                                                {article.content?.subtitle && (
                                                    <p className="text-xs text-sec line-clamp-1 mt-1 font-medium">
                                                        {article.content.subtitle}
                                                    </p>
                                                )}
                                                <p className="text-xs text-sec/80 line-clamp-3 mt-2 leading-relaxed">
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
                                                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/4 dark:bg-white/5 text-sec border border-black/4 dark:border-white/6"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                    {article.classification.tags.length > 3 && (
                                                        <span className="text-[10px] font-mono text-sec/60">
                                                            +{article.classification.tags.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Footer Meta & Actions */}
                                        <div className="pt-4 mt-4 border-t border-black/6 dark:border-white/6 space-y-3">
                                            <div className="flex items-center justify-between text-[11px] font-mono text-sec">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingDateArticle(article)}
                                                    className="flex items-center gap-1 hover:text-accent transition-colors cursor-pointer group/date text-left"
                                                    title="Change Publication / Scheduled Date & Time"
                                                >
                                                    <Calendar size={12} className="text-accent group-hover/date:scale-110 transition-transform" />
                                                    <span className="underline decoration-dotted underline-offset-2">
                                                        {formatDate(article.publishing?.publishedAt || article.publishing?.scheduledAt || article.publishing?.createdAt)}
                                                    </span>
                                                </button>
                                                <span>
                                                    {article.content?.readingTimeMinutes || 1} min read
                                                </span>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center justify-between gap-2 pt-1">
                                                <div className="flex items-center gap-1.5">
                                                    {/* Edit in /admin/posts/[id] */}
                                                    <Link
                                                        href={`/admin/posts/${encodeURIComponent(article.id)}`}
                                                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-fg text-bg hover:opacity-90 text-xs font-mono font-semibold transition-opacity"
                                                        title="Open in Full Editor"
                                                    >
                                                        <Edit3 size={12} />
                                                        <span>Edit</span>
                                                    </Link>

                                                    {/* Quick Change Date & Status */}
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditingDateArticle(article)}
                                                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-black/4 dark:bg-white/5 hover:bg-accent/15 hover:text-accent text-xs font-mono text-sec transition-colors cursor-pointer"
                                                        title="Quick Edit Date & Publish Status"
                                                    >
                                                        <Calendar size={12} />
                                                        <span className="hidden sm:inline">Date</span>
                                                    </button>

                                                    {/* View Live Article (if slug exists) */}
                                                    {article.slug && (
                                                        <Link
                                                            href={`/blogs/${article.slug}`}
                                                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-black/4 dark:bg-white/5 hover:bg-black/8 dark:hover:bg-white/1 text-xs font-mono text-fg transition-colors"
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
                                                        className="p-1.5 rounded-lg text-sec hover:text-fg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
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
                                                            className="p-1.5 rounded-lg text-sec hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
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
                                        className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-black/8 dark:border-white/8 hover:border-accent/40 bg-black/1.5 dark:bg-white/2 hover:bg-black/3 dark:hover:bg-white/3 transition-all"
                                    >
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

                                                <span className="text-xs font-mono text-sec">
                                                    {article.classification?.category || 'General'}
                                                </span>

                                                {article.navigation?.seriesId && (
                                                    <span className="text-[11px] font-mono text-accent">
                                                        • {article.navigation.seriesId}
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="font-bold text-base tracking-tight group-hover:text-accent transition-colors truncate">
                                                {article.content?.title || 'Untitled Blog Post'}
                                            </h3>

                                            <p className="text-xs text-sec line-clamp-1">
                                                {article.content?.excerpt || article.content?.body?.slice(0, 120)}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4 justify-between md:justify-end">
                                            <button
                                                type="button"
                                                onClick={() => setEditingDateArticle(article)}
                                                className="text-right text-xs font-mono text-sec hidden sm:block hover:text-accent transition-colors cursor-pointer group/date"
                                                title="Change Publication Date"
                                            >
                                                <div className="underline decoration-dotted underline-offset-2">
                                                    {formatDate(article.publishing?.publishedAt || article.publishing?.scheduledAt || article.publishing?.createdAt)}
                                                </div>
                                                <div className="text-[11px] opacity-75">{article.content?.readingTimeMinutes || 1} min read</div>
                                            </button>

                                            <div className="flex items-center gap-1.5">
                                                <Link
                                                    href={`/admin/posts/${encodeURIComponent(article.id)}`}
                                                    className="p-2 rounded-xl bg-fg text-bg hover:opacity-90 text-xs font-mono font-semibold"
                                                    title="Edit in Full Editor"
                                                >
                                                    <Edit3 size={13} />
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() => setEditingDateArticle(article)}
                                                    className="p-2 rounded-xl bg-black/4 dark:bg-white/5 hover:bg-accent/15 hover:text-accent text-sec text-xs font-mono transition-colors cursor-pointer"
                                                    title="Quick Edit Date & Status"
                                                >
                                                    <Calendar size={13} />
                                                </button>

                                                {article.slug && (
                                                    <Link
                                                        href={`/blogs/${article.slug}`}
                                                        className="p-2 rounded-xl bg-black/4 dark:bg-white/5 hover:bg-black/8 dark:hover:bg-white/1 text-fg text-xs font-mono"
                                                        title="View Article"
                                                    >
                                                        <ExternalLink size={13} />
                                                    </Link>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() => handleExportJson(article)}
                                                    className="p-2 rounded-xl text-sec hover:text-fg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
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
                                                        className="p-2 rounded-xl text-sec hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
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
                    <div className="py-16 text-center rounded-3xl border border-dashed border-black/1 dark:border-white/1 bg-black/1 dark:bg-white/1 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto">
                            <FolderGit2 size={24} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-base font-bold text-fg">
                                No articles found
                            </h3>
                            <p className="text-xs text-sec max-w-sm mx-auto">
                                {searchQuery || activeFilter !== 'all' || selectedCategory !== 'All'
                                    ? 'Try changing your search keywords or switching filter tabs.'
                                    : 'Start writing your first article and save it to your drafts.'}
                            </p>
                        </div>
                        <div className="pt-2">
                            <Link
                                href="/admin/posts/new"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-black font-bold text-xs"
                            >
                                <Plus size={14} />
                                <span>Create New Blog Post</span>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Quick Publish / Date Editor Modal with WheelDateTimePicker */}
                {editingDateArticle && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="w-full max-w-lg bg-bg border border-sec/30 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between pb-3 border-b border-sec/15">
                                <div>
                                    <h3 className="text-sm font-bold font-mono text-fg flex items-center gap-2">
                                        <Sparkles size={16} className="text-accent" />
                                        Change Publication Date & Status
                                    </h3>
                                    <p className="text-xs text-sec truncate max-w-sm mt-0.5">
                                        {editingDateArticle.content?.title || editingDateArticle.slug || 'Untitled Article'}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setEditingDateArticle(null)}
                                    className="p-2 rounded-xl text-sec hover:text-fg hover:bg-fg/5 transition-colors cursor-pointer"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <PublishStatus
                                status={editingDateArticle.status}
                                slug={editingDateArticle.slug}
                                isFeatured={editingDateArticle.settings?.isFeatured ?? false}
                                publishedAt={editingDateArticle.publishing?.publishedAt}
                                scheduledAt={editingDateArticle.publishing?.scheduledAt}
                                onStatusChange={(status) =>
                                    setEditingDateArticle((prev) =>
                                        prev
                                            ? {
                                                  ...prev,
                                                  status,
                                                  publishing: {
                                                      ...prev.publishing,
                                                      ...(status === 'published' && !prev.publishing?.publishedAt
                                                          ? { publishedAt: new Date().toISOString() }
                                                          : {}),
                                                  },
                                              }
                                            : null
                                    )
                                }
                                onSlugChange={(slug) =>
                                    setEditingDateArticle((prev) => (prev ? { ...prev, slug } : null))
                                }
                                onFeaturedChange={(isFeatured) =>
                                    setEditingDateArticle((prev) =>
                                        prev ? { ...prev, settings: { ...prev.settings, isFeatured } } : null
                                    )
                                }
                                onPublishedAtChange={(publishedAt) =>
                                    setEditingDateArticle((prev) =>
                                        prev
                                            ? {
                                                  ...prev,
                                                  publishing: { ...prev.publishing, publishedAt },
                                              }
                                            : null
                                    )
                                }
                                onScheduledAtChange={(scheduledAt) =>
                                    setEditingDateArticle((prev) =>
                                        prev
                                            ? {
                                                  ...prev,
                                                  publishing: { ...prev.publishing, scheduledAt },
                                              }
                                            : null
                                    )
                                }
                            />

                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-sec/15">
                                <button
                                    type="button"
                                    onClick={() => setEditingDateArticle(null)}
                                    className="px-4 py-2 rounded-xl border border-sec/20 text-xs font-mono text-sec hover:text-fg hover:bg-fg/5 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (editingDateArticle) {
                                            saveArticleToStorage(editingDateArticle)
                                            refreshArticles()
                                            setEditingDateArticle(null)
                                        }
                                    }}
                                    className="px-5 py-2 rounded-xl bg-accent text-black font-bold text-xs font-mono transition-all hover:opacity-90 shadow-md shadow-accent/20 cursor-pointer"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}

export default BlogsDashboard

