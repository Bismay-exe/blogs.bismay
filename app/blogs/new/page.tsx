'use client'

import React, { useState, useEffect, Suspense, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import MainLayout from './components/sections/MainLayout'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LeftLayout from './components/sections/LeftLayout'
import RightLayout from './components/sections/RightLayout'
import { ProductionBlogPost } from '../../../articles/format/articleData'
import {
    saveArticleToStorage,
    getStoredArticles,
} from '@/lib/blogStorage'

const ACTIVE_SESSION_DRAFT_KEY = 'blog_editor_active_session'

const createDefaultArticle = (initialSlug: string = ''): ProductionBlogPost => ({
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `post-${Date.now()}`,
    slug: initialSlug,
    status: 'draft',
    content: {
        title: '',
        subtitle: '',
        excerpt: '',
        body: '',
        format: 'markdown',
        readingTimeMinutes: 1,
    },
    media: {},
    classification: {
        category: 'Engineering',
        tags: [],
    },
    author: {
        id: 'bismay',
    },
    navigation: {
        seriesId: '',
        seriesOrder: 1,
        relatedSlugs: [],
        redirectFrom: [],
    },
    seo: {
        metaTitle: '',
        metaDescription: '',
        canonicalUrl: '',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        ogType: 'article',
        robots: {
            index: true,
            follow: true,
        },
    },
    publishing: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    settings: {
        isFeatured: false,
    },
    system: {
        revision: 1,
    },
})

const BlogEditorContent = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const editId = searchParams.get('id')
    const editSlug = searchParams.get('slug')

    const [article, setArticle] = useState<ProductionBlogPost>(() => createDefaultArticle(editSlug || ''))
    const [isSaved, setIsSaved] = useState<boolean>(true)
    const [hasStartedEditing, setHasStartedEditing] = useState<boolean>(false)

    // Load on mount: URL edit params OR active session draft (page reload preserves in-progress edits!)
    useEffect(() => {
        try {
            if (editId || editSlug) {
                const allArticles = getStoredArticles()
                const found = allArticles.find(
                    (a) => (editId && a.id === editId) || (editSlug && a.slug === editSlug)
                )
                if (found) {
                    setArticle(found)
                    setIsSaved(true)
                    setHasStartedEditing(false)
                    return
                }
            }

            // Check if there is an active in-progress session draft (e.g. after page reload)
            const sessionDraft = sessionStorage.getItem(ACTIVE_SESSION_DRAFT_KEY)
            if (sessionDraft) {
                const parsed = JSON.parse(sessionDraft)
                if (parsed && (parsed.content?.title || parsed.content?.body || parsed.slug)) {
                    setArticle(parsed)
                    setIsSaved(false)
                    setHasStartedEditing(true)
                    return
                }
            }

            // Otherwise, initialize fresh default article
            setArticle(createDefaultArticle(editSlug || ''))
            setIsSaved(true)
            setHasStartedEditing(false)
        } catch (error) {
            console.error('Failed to load article:', error)
        }
    }, [editId, editSlug])

    // Browser beforeunload protection (warns on tab close/nav if unsaved changes exist)
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (!isSaved && hasStartedEditing) {
                e.preventDefault()
                e.returnValue = ''
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [isSaved, hasStartedEditing])

    // Browser Back Button (popstate) confirmation
    useEffect(() => {
        const handlePopState = () => {
            if (!isSaved && hasStartedEditing) {
                const confirmed = window.confirm(
                    '⚠️ You have unsaved changes!\n\nIf you leave now, your unsaved progress will be cleared and deleted.\n\nAre you sure you want to go back?'
                )
                if (!confirmed) {
                    window.history.pushState(null, '', window.location.href)
                    return
                }
            }
            sessionStorage.removeItem(ACTIVE_SESSION_DRAFT_KEY)
        }

        window.history.pushState(null, '', window.location.href)
        window.addEventListener('popstate', handlePopState)

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [isSaved, hasStartedEditing])

    const handleUpdate = (updater: (prev: ProductionBlogPost) => ProductionBlogPost) => {
        setArticle((prev) => {
            const next = updater(prev)
            const updated = {
                ...next,
                publishing: {
                    ...next.publishing,
                    updatedAt: new Date().toISOString(),
                },
                system: {
                    ...next.system,
                    revision: (next.system?.revision || 1) + 1,
                },
            }

            // Auto-save to sessionStorage so page reload preserves all work
            try {
                sessionStorage.setItem(ACTIVE_SESSION_DRAFT_KEY, JSON.stringify(updated))
            } catch (err) {
                console.error('Failed to persist session draft:', err)
            }
            return updated
        })
        setIsSaved(false)
        setHasStartedEditing(true)
    }

    const handleSave = () => {
        try {
            saveArticleToStorage(article)
            sessionStorage.removeItem(ACTIVE_SESSION_DRAFT_KEY)
            setIsSaved(true)
            setHasStartedEditing(false)
        } catch (error) {
            console.error('Failed to save article to localStorage:', error)
        }
    }

    const handleReset = () => {
        if (window.confirm('Are you sure you want to clear this form and start a fresh article? All unsaved changes will be lost.')) {
            sessionStorage.removeItem(ACTIVE_SESSION_DRAFT_KEY)
            const freshArticle = createDefaultArticle()
            setArticle(freshArticle)
            setIsSaved(true)
            setHasStartedEditing(false)
        }
    }

    const handleBackToBlogs = useCallback(() => {
        if (!isSaved && hasStartedEditing) {
            const confirmed = window.confirm(
                '⚠️ You have unsaved changes!\n\nIf you leave now, your unsaved progress will be cleared and deleted.\n\nAre you sure you want to go back to blogs?'
            )
            if (!confirmed) return
        }

        // Clear active session draft and go back
        sessionStorage.removeItem(ACTIVE_SESSION_DRAFT_KEY)
        router.push('/blogs')
    }, [isSaved, hasStartedEditing, router])

    return (
        <div className="max-w-7xl w-full h-full flex flex-col lg:flex-row gap-5 px-4 sm:px-6 lg:px-8">
            <LeftLayout
                markdown={article.content.body}
                onBack={handleBackToBlogs}
            />
            <MainLayout article={article} onUpdate={handleUpdate} isSaved={isSaved} />
            <RightLayout
                article={article}
                onUpdate={handleUpdate}
                onSave={handleSave}
                onReset={handleReset}
            />
        </div>
    )
}

const Page = () => {
    return (
        <div className="w-full min-h-screen flex flex-col items-center">
            <Navbar />
            <Suspense fallback={<div className="py-20 text-center text-sm font-mono text-sec">Loading editor...</div>}>
                <BlogEditorContent />
            </Suspense>
            <Footer />
        </div>
    )
}

export default Page
