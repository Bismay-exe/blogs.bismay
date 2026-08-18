'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LeftLayout from './sections/LeftLayout'
import Main from './sections/MainLayout'
import RightLayout from './sections/RightLayout'
import { getStoredArticles } from '@/lib/blogStorage'
import {
    ArrowLeft,
    FileQuestion,
    Plus,
    Sparkles,
    BookOpen,
    ArrowRight,
    Edit3,
} from 'lucide-react'

interface ArticleData {
    markdown: string
    title: string
    category?: string
    date?: string
    readingTimeMinutes?: number
    bannerUrl?: string
    tags?: string[]
    id?: string
    slug?: string
}

interface ArticleViewClientProps {
    slug: string
    initialServerArticle: ArticleData | null
}

const ArticleViewClient: React.FC<ArticleViewClientProps> = ({
    slug,
    initialServerArticle,
}) => {
    const [article, setArticle] = useState<ArticleData | null>(initialServerArticle)
    const [loading, setLoading] = useState<boolean>(!initialServerArticle)

    useEffect(() => {
        if (initialServerArticle) {
            setArticle(initialServerArticle)
            setLoading(false)
            return
        }

        // If not found on server, check client-side localStorage
        try {
            const allSaved = getStoredArticles()
            const found = allSaved.find(
                (a) => a.slug === slug || a.id === slug || a.slug?.toLowerCase() === slug.toLowerCase()
            )

            if (found) {
                const words = found.content?.body?.trim()
                    ? found.content.body.trim().split(/\s+/).length
                    : 0
                const calculatedTime = Math.max(1, Math.ceil(words / 200))

                setArticle({
                    markdown: found.content?.body || '',
                    title: found.content?.title || 'Untitled Article',
                    category: found.classification?.category || 'Engineering',
                    date: found.publishing?.updatedAt
                        ? new Date(found.publishing.updatedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })
                        : 'Draft',
                    readingTimeMinutes: found.content?.readingTimeMinutes || calculatedTime,
                    bannerUrl: found.media?.bannerImage?.url,
                    tags: found.classification?.tags,
                    id: found.id,
                    slug: found.slug,
                })
            } else {
                setArticle(null)
            }
        } catch (error) {
            console.error('Error loading article from localStorage:', error)
            setArticle(null)
        } finally {
            setLoading(false)
        }
    }, [slug, initialServerArticle])

    if (loading) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center bg-[var(--background)]">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center py-32 space-y-3">
                    <div className="w-8 h-8 rounded-full border-2 border-[var(--acc)] border-t-transparent animate-spin" />
                    <span className="text-xs font-mono text-[var(--sec)]">Loading article...</span>
                </div>
                <Footer />
            </div>
        )
    }

    // 404 Not Found View
    if (!article) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center bg-[var(--background)] text-[var(--foreground)]">
                <Navbar />

                <main className="max-w-4xl w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex-1 flex flex-col items-center justify-center text-center space-y-8">
                    {/* Glowing 404 Badge */}
                    <div className="relative">
                        <div className="w-24 h-24 rounded-3xl bg-[var(--acc)]/10 border border-[var(--acc)]/30 flex items-center justify-center text-[var(--acc)] shadow-2xl shadow-[var(--acc)]/20">
                            <FileQuestion size={44} />
                        </div>
                        <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-[var(--acc)] text-black font-mono font-bold text-[11px]">
                            404
                        </span>
                    </div>

                    <div className="space-y-3 max-w-lg">
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            Article Not Found
                        </h1>
                        <p className="text-sm text-[var(--sec)] leading-relaxed">
                            We couldn&apos;t find any published article or saved draft matching{' '}
                            <code className="px-1.5 py-0.5 rounded bg-black/[0.05] dark:bg-white/[0.08] font-mono text-[var(--foreground)] text-xs">
                                /blogs/{slug}
                            </code>
                            .
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 flex-wrap justify-center pt-2">
                        <Link
                            href="/blogs"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/[0.05] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-xs font-mono font-medium border border-black/[0.08] dark:border-white/[0.08] transition-colors"
                        >
                            <ArrowLeft size={14} />
                            <span>Back to Blog Hub</span>
                        </Link>

                        <Link
                            href={`/blogs/new?slug=${encodeURIComponent(slug)}`}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--acc)] hover:opacity-90 text-black font-bold text-xs font-mono transition-all shadow-md shadow-[var(--acc)]/20"
                        >
                            <Plus size={14} />
                            <span>Create Article With This Slug</span>
                        </Link>
                    </div>

                    {/* Popular Reads Suggestions */}
                    <div className="w-full max-w-lg pt-12 border-t border-black/[0.08] dark:border-white/[0.08] text-left space-y-3">
                        <span className="text-xs font-mono text-[var(--sec)] flex items-center gap-1.5">
                            <Sparkles size={12} className="text-[var(--acc)]" />
                            Popular Published Articles
                        </span>

                        <div className="space-y-2">
                            {[
                                {
                                    slug: 'day-11-of-learning-react',
                                    title: '🚀 Day 11: Context API & Prop Drilling',
                                    read: '8 min read',
                                },
                                {
                                    slug: 'day-3-of-learning-react',
                                    title: '🚀 Day 3: JSX, Components, and Bundlers',
                                    read: '7 min read',
                                },
                                {
                                    slug: 'day-2-of-learning-react',
                                    title: '🚀 Day 2: React Fiber & Reconciliation',
                                    read: '12 min read',
                                },
                            ].map((item) => (
                                <Link
                                    key={item.slug}
                                    href={`/blogs/${item.slug}`}
                                    className="group flex items-center justify-between p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.06] transition-colors"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <BookOpen size={15} className="text-[var(--acc)]" />
                                        <span className="text-xs font-medium text-[var(--foreground)] group-hover:text-[var(--acc)] transition-colors">
                                            {item.title}
                                        </span>
                                    </div>
                                    <span className="text-[11px] font-mono text-[var(--sec)]">
                                        {item.read}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-[var(--background)] text-[var(--foreground)]">
            <Navbar />
            <div className="max-w-7xl w-full h-full flex flex-col lg:flex-row gap-5 px-4 sm:px-6 lg:px-8">
                <LeftLayout markdown={article.markdown} />
                <Main
                    markdown={article.markdown}
                    title={article.title}
                    bannerUrl={article.bannerUrl}
                    tags={article.tags}
                    category={article.category}
                    date={article.date}
                    readingTimeMinutes={article.readingTimeMinutes}
                />
                <RightLayout />
            </div>
            <Footer />
        </div>
    )
}

export default ArticleViewClient
