'use client'

import React from 'react'
import { parseInlineMarkdown } from '../../../lib/markdown/parseInline'
import { LightboxImage } from './ImageLightbox'
import ArticleVideo, { isVideoUrl } from '../video/ArticleVideo'

interface ArticleImageProps {
    src: string
    alt: string
    caption?: string
    onImageClick: (image: LightboxImage) => void
}

const ArticleImage: React.FC<ArticleImageProps> = ({ src, alt, caption, onImageClick }) => {
    if (isVideoUrl(src)) {
        return <ArticleVideo src={src} alt={alt} caption={caption} />
    }
    return (
        <figure className="my-6 space-y-2 group">
            <div
                onClick={() => onImageClick({ src, alt: alt || 'Article image', caption })}
                className="overflow-hidden rounded-2xl border border-sec/20 bg-fg/5 cursor-zoom-in relative"
                title="Click to view full screen"
            >
                <img
                    src={src}
                    alt={alt || 'Article image'}
                    className="w-full h-auto object-cover max-w-375 group-hover:scale-[1.015] transition-transform duration-300"
                    loading="lazy"
                />
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white/80 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center gap-1.5 shadow-md">
                    <span>Zoom</span>
                </div>
            </div>
            {caption && (
                <figcaption className="text-center text-xs sm:text-sm text-sec italic">
                    {parseInlineMarkdown(caption)}
                </figcaption>
            )}
        </figure>
    )
}

export default ArticleImage
