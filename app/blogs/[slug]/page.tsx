import React from 'react'
import fs from 'fs'
import path from 'path'
import Main from './components/sections/MainLayout'
import RightLayout from './components/sections/RightLayout'
import LeftLayout from './components/sections/LeftLayout'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface PageProps {
    params: Promise<{ slug: string }> | { slug: string }
}

function getArticleData(slug: string) {
    const seriesDir = path.join(process.cwd(), 'articles/series/🚀 React Learning Journal')
    let markdown = ''
    let title = ''

    // 1. Match day number e.g. "day-2-of-learning-react" -> day-2-article.md
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

    // 3. Fallback: Search all .md files in directory
    if (!markdown && fs.existsSync(seriesDir)) {
        const files = fs.readdirSync(seriesDir)
        for (const file of files) {
            if (file.endsWith('.md')) {
                const nameWithoutExt = file.replace(/\.md$/, '')
                if (slug.toLowerCase().includes(nameWithoutExt.toLowerCase())) {
                    markdown = fs.readFileSync(path.join(seriesDir, file), 'utf-8')
                    break
                }
            }
        }
    }

    // 4. Default fallback if not found
    if (!markdown) {
        const fallbackPath = path.join(seriesDir, 'day-11-article.md')
        if (fs.existsSync(fallbackPath)) {
            markdown = fs.readFileSync(fallbackPath, 'utf-8')
        }
    }

    // Extract or derive title
    const titleMatch = markdown.match(/^#\s+(.+)$/m)
    if (titleMatch) {
        title = titleMatch[1].trim()
    } else if (slug.includes('day-2') || markdown.includes('Reconciliation')) {
        title = "🚀 Day 2 of Learning React: Reconciliation, Diffing Algorithm, Render Phase, Commit Phase & React Fiber"
    } else if (slug.includes('day-3') || markdown.includes('JSX')) {
        title = "🚀 Day 3 of Learning React: Understanding JSX, Components, Props, Bundlers, and What Happens After `npm run dev`"
    } else if (slug.includes('day-11') || markdown.includes('Context API')) {
        title = "🚀 Day 11 of Learning React: Context API, Prop Drilling, Providers, and useContext()"
    } else {
        title = "🚀 Learning React Series"
    }

    return { markdown, title }
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

const page = async ({ params }: PageProps) => {
    const resolvedParams = await Promise.resolve(params)
    const slug = resolvedParams.slug || 'day-11-of-learning-react'
    const { markdown, title } = getArticleData(slug)

    return (
        <div className='w-full min-h-screen flex flex-col items-center'>
            <Navbar />
            <div className='max-w-7xl w-full h-full flex flex-col lg:flex-row gap-5 px-4 sm:px-6 lg:px-8'>
                <LeftLayout markdown={markdown} />
                <Main markdown={markdown} title={title} />
                <RightLayout />
            </div>
            <Footer />
        </div>
    )
}

export default page
