'use client'

import React from 'react'
import TopBar from './mainLayout/TopBar'
import BannerEditor from './mainLayout/BannerEditor'
import Author from './mainLayout/Author'
import TitleEditor from './mainLayout/TitleEditor'
import TagsEditor from './mainLayout/TagsEditor'
import ContentEditor from './mainLayout/ContentEditor'
import { ProductionBlogPost } from '@/articles/format/articleData'

interface MainLayoutProps {
    article: ProductionBlogPost
    onUpdate: (updater: (prev: ProductionBlogPost) => ProductionBlogPost) => void
    isSaved: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ article, onUpdate, isSaved }) => {
    // Calculate word count & reading time
    const wordCount = article.content.body.trim()
        ? article.content.body.trim().split(/\s+/).length
        : 0
    const readingTime = Math.max(1, Math.ceil(wordCount / 200))

    const handleBannerChange = (url: string, alt: string, width?: number, height?: number) => {
        onUpdate((prev) => ({
            ...prev,
            media: {
                ...prev.media,
                bannerImage: url
                    ? {
                          url,
                          alt,
                          ...(width ? { width } : {}),
                          ...(height ? { height } : {}),
                      }
                    : undefined,
            },
            seo: {
                ...prev.seo,
                ogImage: url || prev.seo.ogImage,
            },
        }))
    }

    const handleAuthorChange = (id: string) => {
        onUpdate((prev) => ({
            ...prev,
            author: {
                ...prev.author,
                id,
            },
        }))
    }

    const handleFormatChange = (format: 'markdown' | 'mdx' | 'html') => {
        onUpdate((prev) => ({
            ...prev,
            content: {
                ...prev.content,
                format,
            },
        }))
    }

    const handleTitleChange = (title: string) => {
        onUpdate((prev) => {
            // Auto generate slug if slug hasn't been manually set or matches old title
            const autoSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-')

            return {
                ...prev,
                slug: autoSlug || prev.slug,
                content: {
                    ...prev.content,
                    title,
                },
                seo: {
                    ...prev.seo,
                    metaTitle: prev.seo.metaTitle || title,
                    ogTitle: prev.seo.ogTitle || title,
                },
            }
        })
    }

    const handleSubtitleChange = (subtitle: string) => {
        onUpdate((prev) => ({
            ...prev,
            content: {
                ...prev.content,
                subtitle,
            },
        }))
    }

    const handleTagsChange = (tags: string[]) => {
        onUpdate((prev) => ({
            ...prev,
            classification: {
                ...prev.classification,
                tags,
            },
        }))
    }

    const handleContentChange = (body: string) => {
        onUpdate((prev) => {
            const words = body.trim() ? body.trim().split(/\s+/).length : 0
            const readingTimeMinutes = Math.max(1, Math.ceil(words / 200))

            // Auto extract excerpt if excerpt is empty
            const firstParagraph = body
                .split('\n\n')
                .map((p) => p.replace(/^#+\s+|^\*+|\*+$|^>+/g, '').trim())
                .find((p) => p.length > 20) || ''

            const excerpt = prev.content.excerpt || firstParagraph.slice(0, 160)

            return {
                ...prev,
                content: {
                    ...prev.content,
                    body,
                    readingTimeMinutes,
                    excerpt: prev.content.excerpt ? prev.content.excerpt : excerpt,
                },
                seo: {
                    ...prev.seo,
                    metaDescription: prev.seo.metaDescription ? prev.seo.metaDescription : excerpt,
                    ogDescription: prev.seo.ogDescription ? prev.seo.ogDescription : excerpt,
                },
            }
        })
    }

    return (
        <div className="w-full space-y-6 pt-6.5 pb-12">
            <TopBar
                wordCount={wordCount}
                readingTime={readingTime}
                status={article.status}
                isSaved={isSaved}
                format={article.content.format || 'markdown'}
                onFormatChange={handleFormatChange}
            />

            <BannerEditor
                bannerUrl={article.media.bannerImage?.url}
                bannerAlt={article.media.bannerImage?.alt}
                bannerWidth={article.media.bannerImage?.width}
                bannerHeight={article.media.bannerImage?.height}
                onBannerChange={handleBannerChange}
            />

            <Author
                authorId={article.author?.id || 'bismay'}
                onAuthorIdChange={handleAuthorChange}
            />

            <TitleEditor
                title={article.content.title}
                subtitle={article.content.subtitle}
                onTitleChange={handleTitleChange}
                onSubtitleChange={handleSubtitleChange}
            />

            <TagsEditor
                tags={article.classification.tags}
                onTagsChange={handleTagsChange}
            />

            <ContentEditor
                content={article.content.body}
                onContentChange={handleContentChange}
            />
        </div>
    )
}

export default MainLayout
