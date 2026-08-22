'use client'

import React, { useState, useMemo } from 'react'
import { parseMarkdown } from '../../../lib/markdown/parseMarkdown'
import { MarkdownBlock } from '../../../lib/markdown/types'
import CodeBlock from '../code/CodeBlock'
import ArticleImage from '../image/ArticleImage'
import ArticleVideo from '../video/ArticleVideo'
import ImageLightbox, { LightboxImage } from '../image/ImageLightbox'
import EmbedBlock from '../embeds/EmbedBlock'
import {
    HeadingBlockComponent,
    ParagraphBlockComponent,
    QuoteBlockComponent,
    PullquoteBlockComponent,
    TableBlockComponent,
    ListBlockComponent,
    TaskListBlockComponent,
    CalloutBlockComponent,
    YouTubeBlockComponent,
    DividerBlockComponent,
    AiDisclosureBlockComponent,
} from './ArticleBlocks'

export interface ArticleBodyProps {
    content?: string
}

const ArticleBody: React.FC<ArticleBodyProps> = ({ content = '' }) => {
    const [activeImage, setActiveImage] = useState<LightboxImage | null>(null)

    // Memoize parsed AST blocks for blazing fast typing & live previews
    const blocks: MarkdownBlock[] = useMemo(() => parseMarkdown(content), [content])

    if (!content.trim()) {
        return null
    }

    return (
        <>
            <article
                style={{
                    fontFamily: 'var(--reader-body-font, var(--font-sans))',
                    fontSize: 'var(--reader-body-font-size, 16.5px)',
                    lineHeight: 'var(--reader-line-height, 1.8)',
                }}
                className="w-full max-w-full min-w-0 text-fg/90 space-y-6 pt-4 antialiased break-words"
            >
                {blocks.map((block, idx) => {
                    switch (block.type) {
                        case 'heading':
                            return <HeadingBlockComponent key={idx} {...block} />
                        case 'paragraph':
                            return <ParagraphBlockComponent key={idx} {...block} />
                        case 'code':
                            return <CodeBlock key={idx} {...block} />
                        case 'image':
                            return (
                                <ArticleImage
                                    key={idx}
                                    src={block.src}
                                    alt={block.alt}
                                    caption={block.caption}
                                    onImageClick={setActiveImage}
                                />
                            )
                        case 'video':
                            return (
                                <ArticleVideo
                                    key={idx}
                                    src={block.src}
                                    alt={block.alt}
                                    caption={block.caption}
                                    poster={block.poster}
                                />
                            )
                        case 'callout':
                            return <CalloutBlockComponent key={idx} {...block} />
                        case 'tasklist':
                            return <TaskListBlockComponent key={idx} {...block} />
                        case 'youtube':
                            return <YouTubeBlockComponent key={idx} {...block} />
                        case 'quote':
                            return <QuoteBlockComponent key={idx} {...block} />
                        case 'pullquote':
                            return <PullquoteBlockComponent key={idx} {...block} />
                        case 'table':
                            return <TableBlockComponent key={idx} {...block} />
                        case 'list':
                            return <ListBlockComponent key={idx} {...block} />
                        case 'embed':
                            return <EmbedBlock key={idx} url={block.url} />
                        case 'divider':
                            return <DividerBlockComponent key={idx} />
                        case 'ai-disclosure':
                            return <AiDisclosureBlockComponent key={idx} />
                        default:
                            return null
                    }
                })}
            </article>

            {/* Fullscreen Image Lightbox Modal */}
            <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} />
        </>
    )
}

export default ArticleBody
