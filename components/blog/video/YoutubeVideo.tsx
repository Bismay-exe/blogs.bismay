'use client'

import React from 'react'
import { YouTubeEmbed } from '@next/third-parties/google'
import { parseInlineMarkdown } from '../../../lib/markdown/parseInline'
import { cn } from '@/lib/utils'

export interface YoutubeVideoProps {
    videoId?: string
    url?: string
    alt?: string
    caption?: string
    params?: string
    className?: string
}

export function extractYouTubeId(url: string): string | null {
    if (!url) return null
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/i
    const match = url.match(regExp)
    if (match && match[1]) {
        return match[1]
    }
    // Also handle raw 11-char ID
    if (/^[\w-]{11}$/.test(url.trim())) {
        return url.trim()
    }
    return null
}

export function isYouTubeUrl(url: string): boolean {
    return Boolean(extractYouTubeId(url))
}

const YoutubeVideo: React.FC<YoutubeVideoProps> = ({
    videoId,
    url,
    alt,
    caption,
    params = 'controls=1&rel=0',
    className,
}) => {
    const finalVideoId = videoId || (url ? extractYouTubeId(url) : null)

    if (!finalVideoId) return null

    return (
        <figure className={cn('my-6 space-y-2 group w-full', className)}>
            <div className="overflow-hidden rounded-2xl border border-sec/30 bg-black/60 shadow-lg shadow-black/20 relative aspect-video w-full **:data-ntpc:w-full! **:data-ntpc:h-full! [&_lite-youtube]:w-full! [&_lite-youtube]:max-w-full! [&_lite-youtube]:h-full! [&_lite-youtube]:aspect-video! [&_lite-youtube]:bg-cover! [&_iframe]:w-full! [&_iframe]:h-full!">
                <YouTubeEmbed
                    videoid={finalVideoId}
                    playlabel={alt || 'Play YouTube Video'}
                    params={params}
                    style="width: 100%; max-width: 100%; height: 100%; aspect-ratio: 16/9; background-size: cover; border-radius: 1rem;"
                />
            </div>
            {caption && (
                <figcaption className="text-center text-xs sm:text-sm text-sec italic">
                    {parseInlineMarkdown(caption)}
                </figcaption>
            )}
        </figure>
    )
}

export default YoutubeVideo
