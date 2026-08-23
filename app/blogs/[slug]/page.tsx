import React from 'react'
import fs from 'fs'
import path from 'path'
import ArticleViewClient from './components/ArticleViewClient'

interface PageProps {
    params: Promise<{ slug: string }> | { slug: string }
}

interface ServerArticleData {
    markdown: string
    title: string
    category?: string
    date?: string
    readingTimeMinutes?: number
    bannerUrl?: string
    tags?: string[]
}

function getServerArticleData(slug: string): ServerArticleData | null {
    const seriesDir = path.join(process.cwd(), 'articles/series/🚀 React Learning Journal')
    let markdown = ''
    let title = ''
    let date = 'Published'
    let category = 'React & Frontend'
    let readingTimeMinutes = 5
    let bannerUrl = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop'
    let tags: string[] = ['React', 'JavaScript', 'WebDev']

    // 1. Match day number e.g. "day-2-of-learning-react" or "day-2" -> day-2-article.md
    const dayMatch = slug.match(/day-(\d+)/i)
    if (dayMatch) {
        const dayNumber = dayMatch[1]
        const specificFile = path.join(seriesDir, `day-${dayNumber}-article.md`)
        if (fs.existsSync(specificFile)) {
            markdown = fs.readFileSync(specificFile, 'utf-8')
        }
    }

    // 2. Direct filename match e.g. "day-2-article" -> day-2-article.md
    if (!markdown) {
        const directFile = path.join(seriesDir, `${slug}.md`)
        if (fs.existsSync(directFile)) {
            markdown = fs.readFileSync(directFile, 'utf-8')
        }
    }

    // 3. Fallback search by filename in directory
    if (!markdown && fs.existsSync(seriesDir)) {
        const files = fs.readdirSync(seriesDir)
        for (const file of files) {
            if (file.endsWith('.md')) {
                const nameWithoutExt = file.replace(/\.md$/, '')
                if (slug.toLowerCase() === nameWithoutExt.toLowerCase()) {
                    markdown = fs.readFileSync(path.join(seriesDir, file), 'utf-8')
                    break
                }
            }
        }
    }

    // If no matching file found, return null so client/localStorage can be checked
    if (!markdown) {
        return null
    }

    // Extract title from markdown if present
    const titleMatch = markdown.match(/^#\s+(.+)$/m)
    if (titleMatch) {
        title = titleMatch[1].trim()
    }

    // Match metadata by specific day slug
    if (slug.includes('day-2') || slug.includes('reconciliation')) {
        title = title || '🚀 Day 2 of Learning React: Reconciliation, Diffing Algorithm, Render Phase, Commit Phase & React Fiber'
        category = 'Architecture'
        readingTimeMinutes = 12
        date = 'Feb 2, 2026'
        tags = ['React Fiber', 'Reconciliation', 'Diffing', 'Performance']
        bannerUrl = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop'
    } else if (slug.includes('day-3') || slug.includes('jsx')) {
        title = title || '🚀 Day 3 of Learning React: Understanding JSX, Components, Props, Bundlers, and What Happens After `npm run dev`'
        category = 'React & Frontend'
        readingTimeMinutes = 7
        date = 'Feb 3, 2026'
        tags = ['React', 'JSX', 'Components', 'Bundlers', 'Vite']
        bannerUrl = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop'
    } else if (slug.includes('day-11') || slug.includes('context-api')) {
        title = title || '🚀 Day 11 of Learning React: Context API, Prop Drilling, Providers, and useContext()'
        category = 'React & Frontend'
        readingTimeMinutes = 8
        date = 'Feb 11, 2026'
        tags = ['React', 'Context API', 'State Management', 'Hooks']
        bannerUrl = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop'
    } else if (!title) {
        title = '🚀 Learning React Series'
    }

    // If markdown has a direct image link at top, use it as cover if available
    const imgMatch = markdown.match(/!\[.*?\]\((https?:\/\/[^\s\)]+)\)/)
    if (imgMatch && imgMatch[1]) {
        bannerUrl = imgMatch[1]
    }

    return {
        markdown,
        title,
        category,
        date,
        readingTimeMinutes,
        bannerUrl,
        tags,
    }
}

export async function generateStaticParams() {
    return [
        { slug: 'day-1-of-learning-react' },
        { slug: 'day-2-of-learning-react' },
        { slug: 'day-3-of-learning-react' },
        { slug: 'day-4-of-learning-react' },
        { slug: 'day-5-of-learning-react' },
        { slug: 'day-6-of-learning-react' },
        { slug: 'day-11-of-learning-react' },
    ]
}

const Page = async ({ params }: PageProps) => {
    const resolvedParams = await Promise.resolve(params)
    const slug = resolvedParams.slug || ''
    const serverArticle = slug ? getServerArticleData(slug) : null

    return <ArticleViewClient slug={slug} initialServerArticle={serverArticle} />
}

export default Page
