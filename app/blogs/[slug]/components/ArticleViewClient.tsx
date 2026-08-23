'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LeftLayout from './sections/LeftLayout'
import Main, { HeaderZone } from './sections/MainLayout'
import Body from './sections/mainLayout/Body'
import RightLayout from './sections/RightLayout'
import { getStoredArticles } from '@/lib/blogStorage'
import {
    ArrowLeft,
    Sliders,
    Sparkles,
} from 'lucide-react'
import Card404 from '@/components/ui/404page/404card'
import { ArrowIcon } from '@/components/ui/shared/ArrowIcon'
import { ProgressiveBlur } from '@/components/ui/shared/ProgressiveBlur'
import { ReaderSettingsProvider, useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { getFontFamily } from '@/lib/reader-settings/defaults'

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

const ArticleViewInner: React.FC<ArticleViewClientProps> = ({
    slug,
    initialServerArticle,
}) => {
    const [article, setArticle] = useState<ArticleData | null>(initialServerArticle)
    const [loading, setLoading] = useState<boolean>(!initialServerArticle)
    const [scrollProgress, setScrollProgress] = useState(0)
    const { settings } = useReaderSettings()
    const { layout, typography, appearance } = settings

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

    // Scroll progress tracker for top reading progress indicator
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop || document.body.scrollTop
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const currentProgress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0
            setScrollProgress(currentProgress)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (loading) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center bg-bg">
                {layout.showNavbar && <Navbar />}
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
                            <ArrowIcon className="rotate-180" />
                            <span className="list">Back to Blog Hub</span>
                        </Link>
                    </div>
                </main>
            </div>
        )
    }

    const cssVariables = {
        ['--reader-heading-font' as any]: getFontFamily(typography.headingFont?.headingFont || typography.headingFontChoice),
        ['--reader-body-font' as any]: getFontFamily(typography.bodyFont?.bodyFont || typography.bodyFontChoice),
        ['--reader-code-font' as any]: getFontFamily(typography.codeFont?.codeFont || typography.codeFontChoice),
        ['--reader-body-font-size' as any]: `${typography.bodyFont?.bodyFontSize || typography.bodyFontSize || 17}px`,
        ['--reader-body-font-weight' as any]: `${typography.bodyFont?.bodyFontWeight || typography.bodyFontWeight || 400}`,
        ['--reader-heading-font-weight' as any]: `${typography.headingFont?.headingFontWeight || typography.headingFontWeight || 600}`,
        ['--reader-title-font-weight' as any]: `${typography.titleFont?.titleFontWeight || typography.titleFontWeight || 700}`,
        ['--reader-title-scale' as any]: `${typography.titleFont?.titleScale || typography.titleScale || 1.0}`,
        ['--reader-line-height' as any]: `${typography.bodyFont?.lineHeight || typography.lineHeight || 1.77}`,
        ['--reader-heading-scale' as any]: `${typography.headingFont?.headingScale || typography.headingScale || 1.0}`,
        ['--reader-paragraph-spacing' as any]: `${typography.bodyFont?.paragraphSpacing || typography.paragraphSpacing || 26}px`,
        ['--reader-heading-margin-top' as any]: `${typography.headingFont?.headingMarginTop || typography.headingMarginTop || 32}px`,
        ['--reader-heading-margin-bottom' as any]: `${typography.headingFont?.headingMarginBottom || typography.headingMarginBottom || 12}px`,
    }

    const maxWidthClass =
        layout.contentWidth === 'narrow'
            ? 'max-w-2xl'
            : layout.contentWidth === 'wide'
            ? 'max-w-5xl'
            : 'max-w-3xl'

    const bannerWidthChoice = settings.articleLayout?.bannerWidth || layout.bannerWidth
    const titleWidthChoice = settings.articleLayout?.titleWidth || layout.titleWidth

    const isBreakoutBanner =
        bannerWidthChoice === 'breakout' ||
        bannerWidthChoice === 'awwwards-80' ||
        bannerWidthChoice === 'full-bleed' ||
        titleWidthChoice === 'breakout' ||
        titleWidthChoice === 'awwwards-80' ||
        titleWidthChoice === 'full-bleed'

    const showLeftSidebar = (layout?.showLeftSidebar ?? true) && (layout?.showTableOfContents ?? true)

    return (
        <div
            style={cssVariables}
            className="relative w-full min-h-screen flex flex-col items-center bg-bg text-fg z-0"
        >
            {/* Top Reading Progress Bar (Fixed at very top) */}
            {appearance.showReadingProgress && (
                <div className="fixed top-0 left-0 right-0 h-1 z-[10000] bg-transparent pointer-events-none">
                    <div
                        className="h-full bg-linear-to-r from-purple-500 via-accent to-indigo-400 transition-all duration-150 ease-out"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>
            )}

            {/* Conditionally Render Top Navbar */}
            {layout.showNavbar ? (
                <Navbar />
            ) : (
                /* Distraction-Free Header Bar with Quick Exit */
                <div className="sticky top-0 z-50 w-full px-4 py-3 flex items-center justify-between bg-bg/80 backdrop-blur-md border-b border-sec/10">
                    <Link
                        href="/blogs"
                        className="flex items-center gap-1.5 text-xs font-mono text-sec hover:text-fg transition-colors"
                    >
                        <ArrowLeft size={14} />
                        <span>Exit Focus Mode</span>
                    </Link>

                    <Link
                        href="/settings/reader"
                        className="flex items-center gap-1 text-[11px] font-mono text-sec hover:text-accent transition-colors"
                        title="Customize Reading Experience"
                    >
                        <Sliders size={13} />
                        <span className="hidden sm:inline">Reader Settings</span>
                    </Link>
                </div>
            )}

            {/* Layout Rendering: Breakout Banner Layout vs Contained Layout */}
            {isBreakoutBanner ? (
                <div className="w-full flex flex-col items-center">
                    {/* Header Zone: Full container width across the top without sidebar constraint */}
                    <header className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${layout.showNavbar ? 'pt-8 sm:pt-12' : 'pt-6'}`}>
                        <HeaderZone
                            title={article.title}
                            bannerUrl={article.bannerUrl}
                            tags={article.tags}
                            category={article.category}
                            date={article.date}
                            readingTimeMinutes={article.readingTimeMinutes}
                        />
                    </header>

                    {/* Content & Sidebars Zone: Centered with sidebars starting at Body Text */}
                    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 pt-4 pb-16">
                        {showLeftSidebar && (
                            <LeftLayout markdown={article.markdown} />
                        )}
                        <div className={`w-full ${maxWidthClass} mx-auto min-w-0 flex-1 transition-all duration-300`}>
                            <Body content={article.markdown} />
                        </div>
                        {layout.showRightSidebar && <RightLayout />}
                    </div>
                </div>
            ) : (
                /* Contained Layout: Standard 3-column top alignment */
                <div className={`w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 pb-16 ${layout.showNavbar ? 'pt-8 sm:pt-12' : 'pt-6'}`}>
                    {showLeftSidebar && (
                        <LeftLayout markdown={article.markdown} />
                    )}
                    <Main
                        markdown={article.markdown}
                        title={article.title}
                        bannerUrl={article.bannerUrl}
                        tags={article.tags}
                        category={article.category}
                        date={article.date}
                        readingTimeMinutes={article.readingTimeMinutes}
                    />
                    {layout.showRightSidebar && <RightLayout />}
                </div>
            )}

            <ProgressiveBlur position="top" backgroundColor="var(--background)" />
            <ProgressiveBlur position="bottom" backgroundColor="var(--background)" />
            <Footer />
        </div>
    )
}

const ArticleViewClient: React.FC<ArticleViewClientProps> = (props) => {
    return (
        <ReaderSettingsProvider>
            <ArticleViewInner {...props} />
        </ReaderSettingsProvider>
    )
}

export default ArticleViewClient
