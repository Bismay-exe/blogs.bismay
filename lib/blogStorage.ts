import { ProductionBlogPost } from '@/articles/format/articleData'

export const LOCAL_STORAGE_KEY = 'blog_draft_article'
export const LOCAL_STORAGE_SAVED_POSTS = 'saved_blog_posts'

export const PUBLISHED_ARTICLES: ProductionBlogPost[] = [
    {
        id: 'react-series-day-11',
        slug: 'day-11-of-learning-react',
        status: 'published',
        content: {
            title: '🚀 Day 11: Context API, Prop Drilling, Providers, and useContext()',
            subtitle: 'Solving the prop drilling nightmare in modern React applications',
            excerpt: 'Deep dive into React Context API: why prop drilling happens, when to use Context, creating Providers, and mastering the useContext() hook.',
            body: '# Day 11: Context API...',
            format: 'markdown',
            readingTimeMinutes: 8,
        },
        media: {
            bannerImage: {
                url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop',
                alt: 'React Context API Banner',
            },
        },
        classification: {
            category: 'React & Frontend',
            tags: ['React', 'Context API', 'State Management', 'Hooks', 'JavaScript'],
        },
        author: {
            id: 'bismay',
        },
        navigation: {
            seriesId: '🚀 React Learning Journal',
            seriesOrder: 11,
            relatedSlugs: ['day-3-of-learning-react', 'day-2-of-learning-react'],
        },
        seo: {
            metaTitle: 'Day 11: Context API & State Management in React',
            metaDescription: 'Learn how to solve prop drilling with React Context API and useContext.',
            canonicalUrl: 'https://blogs.bismay.dev/blogs/day-11-of-learning-react',
            ogImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop',
            ogType: 'article',
            robots: { index: true, follow: true },
        },
        publishing: {
            createdAt: '2026-02-11T10:00:00Z',
            publishedAt: '2026-02-11T14:30:00Z',
            updatedAt: '2026-02-11T14:30:00Z',
        },
        settings: {
            isFeatured: true,
        },
        system: {
            revision: 3,
        },
    },
    {
        id: 'react-series-day-3',
        slug: 'day-3-of-learning-react',
        status: 'published',
        content: {
            title: '🚀 Day 3: Understanding JSX, Components, Props, Bundlers & npm run dev',
            subtitle: 'What actually happens after npm run dev and behind JSX compilation',
            excerpt: 'How JSX transforms into React elements, how props pass data, role of bundlers (Vite/Webpack), and the complete build pipeline.',
            body: '# Day 3: JSX and Props...',
            format: 'markdown',
            readingTimeMinutes: 7,
        },
        media: {
            bannerImage: {
                url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
                alt: 'Code and JSX',
            },
        },
        classification: {
            category: 'React & Frontend',
            tags: ['React', 'JSX', 'Components', 'Bundlers', 'Vite'],
        },
        author: {
            id: 'bismay',
        },
        navigation: {
            seriesId: '🚀 React Learning Journal',
            seriesOrder: 3,
            relatedSlugs: ['day-2-of-learning-react', 'day-11-of-learning-react'],
        },
        seo: {
            metaTitle: 'Day 3: Understanding JSX, Components, and Props',
            metaDescription: 'A clear guide to JSX, components, props, and build systems in React.',
            canonicalUrl: 'https://blogs.bismay.dev/blogs/day-3-of-learning-react',
            ogImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
            ogType: 'article',
            robots: { index: true, follow: true },
        },
        publishing: {
            createdAt: '2026-02-03T09:00:00Z',
            publishedAt: '2026-02-03T16:00:00Z',
            updatedAt: '2026-02-03T16:00:00Z',
        },
        settings: {
            isFeatured: false,
        },
        system: {
            revision: 2,
        },
    },
    {
        id: 'react-series-day-2',
        slug: 'day-2-of-learning-react',
        status: 'published',
        content: {
            title: '🚀 Day 2: Reconciliation, Diffing Algorithm, Render Phase & React Fiber',
            subtitle: 'How React actually knows what changed and optimizes UI updates',
            excerpt: 'A deep look into React Fiber tree architecture, work loops, diffing heuristic algorithm, render vs commit phases.',
            body: '# Day 2: Reconciliation...',
            format: 'markdown',
            readingTimeMinutes: 12,
        },
        media: {
            bannerImage: {
                url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
                alt: 'Computer screen with fiber tree architecture',
            },
        },
        classification: {
            category: 'Architecture',
            tags: ['React Fiber', 'Reconciliation', 'Diffing', 'Performance', 'DOM'],
        },
        author: {
            id: 'bismay',
        },
        navigation: {
            seriesId: '🚀 React Learning Journal',
            seriesOrder: 2,
            relatedSlugs: ['day-3-of-learning-react'],
        },
        seo: {
            metaTitle: 'Day 2: Reconciliation, Diffing, and React Fiber Architecture',
            metaDescription: 'Understand how React Fiber and the diffing algorithm work behind the scenes.',
            canonicalUrl: 'https://blogs.bismay.dev/blogs/day-2-of-learning-react',
            ogImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
            ogType: 'article',
            robots: { index: true, follow: true },
        },
        publishing: {
            createdAt: '2026-02-02T11:00:00Z',
            publishedAt: '2026-02-02T18:00:00Z',
            updatedAt: '2026-02-02T18:00:00Z',
        },
        settings: {
            isFeatured: true,
        },
        system: {
            revision: 5,
        },
    },
    {
        id: 'react-series-day-1',
        slug: 'day-1-of-learning-react',
        status: 'published',
        content: {
            title: '🚀 Day 1: Why I Started Learning React in 2026 (DOM vs Virtual DOM)',
            subtitle: 'Why React exists, Real DOM bottlenecks, and declarative UI',
            excerpt: 'Why React was created, the cost of direct DOM operations, and how Virtual DOM transforms development.',
            body: '# Day 1: Why React in 2026...',
            format: 'markdown',
            readingTimeMinutes: 5,
        },
        media: {
            bannerImage: {
                url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
                alt: 'Day 1 Banner',
            },
        },
        classification: {
            category: 'Foundations',
            tags: ['React', 'Virtual DOM', 'WebDev', 'JavaScript'],
        },
        author: {
            id: 'bismay',
        },
        navigation: {
            seriesId: '🚀 React Learning Journal',
            seriesOrder: 1,
            relatedSlugs: ['day-2-of-learning-react'],
        },
        seo: {
            metaTitle: 'Day 1: Why React Exists & Virtual DOM',
            metaDescription: 'Getting started with React, Virtual DOM, and modern frontend foundations.',
            canonicalUrl: 'https://blogs.bismay.dev/blogs/day-1-of-learning-react',
            ogImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
            ogType: 'article',
            robots: { index: true, follow: true },
        },
        publishing: {
            createdAt: '2026-02-01T08:00:00Z',
            publishedAt: '2026-02-01T12:00:00Z',
            updatedAt: '2026-02-01T12:00:00Z',
        },
        settings: {
            isFeatured: false,
        },
        system: {
            revision: 1,
        },
    },
]

export interface ArticleWithStorageMeta extends ProductionBlogPost {
    storageSource?: 'published' | 'local_saved' | 'active_draft'
}

export function getStoredArticles(): ArticleWithStorageMeta[] {
    if (typeof window === 'undefined') {
        return PUBLISHED_ARTICLES.map((a) => ({ ...a, storageSource: 'published' }))
    }

    const result: ArticleWithStorageMeta[] = []
    const seenIds = new Set<string>()

    // 1. Check active draft
    try {
        const activeDraftStr = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (activeDraftStr) {
            const activeDraft: ProductionBlogPost = JSON.parse(activeDraftStr)
            if (activeDraft && (activeDraft.content?.title || activeDraft.content?.body || activeDraft.slug)) {
                result.push({
                    ...activeDraft,
                    storageSource: 'active_draft',
                })
                seenIds.add(activeDraft.id)
                if (activeDraft.slug) seenIds.add(activeDraft.slug)
            }
        }
    } catch (e) {
        console.error('Error reading active draft:', e)
    }

    // 2. Check saved posts list in localStorage
    try {
        const savedPostsStr = localStorage.getItem(LOCAL_STORAGE_SAVED_POSTS)
        if (savedPostsStr) {
            const savedPosts: ProductionBlogPost[] = JSON.parse(savedPostsStr)
            if (Array.isArray(savedPosts)) {
                savedPosts.forEach((post) => {
                    if (!seenIds.has(post.id) && (!post.slug || !seenIds.has(post.slug))) {
                        result.push({
                            ...post,
                            storageSource: 'local_saved',
                        })
                        seenIds.add(post.id)
                        if (post.slug) seenIds.add(post.slug)
                    }
                })
            }
        }
    } catch (e) {
        console.error('Error reading saved posts:', e)
    }

    // 3. Add published articles
    PUBLISHED_ARTICLES.forEach((post) => {
        if (!seenIds.has(post.id) && !seenIds.has(post.slug)) {
            result.push({
                ...post,
                storageSource: 'published',
            })
            seenIds.add(post.id)
            seenIds.add(post.slug)
        }
    })

    return result
}

export function saveArticleToStorage(article: ProductionBlogPost) {
    if (typeof window === 'undefined') return

    // Save as current active draft
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(article))

    // Also update saved list
    try {
        const savedPostsStr = localStorage.getItem(LOCAL_STORAGE_SAVED_POSTS)
        let list: ProductionBlogPost[] = savedPostsStr ? JSON.parse(savedPostsStr) : []
        if (!Array.isArray(list)) list = []

        const index = list.findIndex((item) => item.id === article.id || (item.slug && item.slug === article.slug))
        if (index >= 0) {
            list[index] = article
        } else {
            list.unshift(article)
        }

        localStorage.setItem(LOCAL_STORAGE_SAVED_POSTS, JSON.stringify(list))
    } catch (e) {
        console.error('Error saving to saved_blog_posts:', e)
    }
}

export function deleteArticleFromStorage(id: string, slug?: string) {
    if (typeof window === 'undefined') return

    try {
        // Check if it's the active draft
        const activeDraftStr = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (activeDraftStr) {
            const activeDraft: ProductionBlogPost = JSON.parse(activeDraftStr)
            if (activeDraft.id === id || (slug && activeDraft.slug === slug)) {
                localStorage.removeItem(LOCAL_STORAGE_KEY)
            }
        }

        // Remove from list
        const savedPostsStr = localStorage.getItem(LOCAL_STORAGE_SAVED_POSTS)
        if (savedPostsStr) {
            let list: ProductionBlogPost[] = JSON.parse(savedPostsStr)
            if (Array.isArray(list)) {
                list = list.filter((item) => item.id !== id && (!slug || item.slug !== slug))
                localStorage.setItem(LOCAL_STORAGE_SAVED_POSTS, JSON.stringify(list))
            }
        }
    } catch (e) {
        console.error('Error deleting article:', e)
    }
}
