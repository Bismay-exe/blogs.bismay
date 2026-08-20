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
import Card404 from '@/components/ui/404page/404card'
import { ArrowIcon } from '@/components/ui/shared/ArrowIcon'
import { ProgressiveBlur } from '@/components/ui/shared/ProgressiveBlur'

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
            <div className="w-full min-h-screen flex flex-col items-center bg-bg">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center py-32 space-y-3">
                    <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                    <span className="text-xs font-mono text-sec">Loading article...</span>
                </div>
                <Footer />
            </div>
        )
    }

    // 404 Not Found View
    if (!article) {
        return (
            <div className="w-full h-screen flex flex-col items-center bg-bg text-fg">
                <Navbar />

                <main className="h-[calc(100vh-64px)] max-w-4xl w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex-1 flex flex-col items-center justify-center text-center space-y-8">

                    {/* 404 Animation Card */}
                    <Card404 />

                    <div className="space-y-3 max-w-lg">
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            Article Not Found
                        </h1>
                        <p className="text-sm text-sec leading-relaxed px-8">
                            We couldn&apos;t find any published article or <br /> saved draft matching{' '}
                            <code className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/8 font-mono text-fg text-xs">
                                /blogs/{slug}
                            </code>
                            .
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 flex-wrap justify-center pt-2">
                        <Link
                            href="/blogs"
                            className="group/icon flex items-center gap-2 pl-5 py-2.5 rounded-xl text-xs font-mono font-medium transition-colors"
                        >
                            {/* <ArrowLeft size={14} /> */}
                            <ArrowIcon className='rotate-180' />
                            <span className='list'>Back to Blog Hub</span>
                        </Link>
                    </div>
                </main>

                {/* <Footer /> */}
            </div>
        )
    }

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center bg-bg text-fg z-0">
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
            <ProgressiveBlur position="top" backgroundColor="var(--background)" />
            <ProgressiveBlur position="bottom" backgroundColor="var(--background)" />
            <Footer />
        </div>
    )
}

export default ArticleViewClient
