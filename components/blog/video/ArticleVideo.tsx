'use client'

import React from 'react'
import '@videojs/react/video/skin.css'
import '@videojs/react/video/minimal-skin.css'
import { VideoPlayer, VideoSkin, MinimalVideoSkin, Video } from '@videojs/react/video'
import { parseInlineMarkdown } from '../../../lib/markdown/parseInline'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { VideoPlayerSkin } from '@/lib/reader-settings/types'
import { cn } from '@/lib/utils'
import YoutubeVideo, { isYouTubeUrl } from './YoutubeVideo'

export interface ArticleVideoProps {
    src: string
    alt?: string
    caption?: string
    poster?: string
    className?: string
    skin?: VideoPlayerSkin
}

export function isVideoUrl(url: string): boolean {
    if (!url) return false
    if (isYouTubeUrl(url)) return true
    const cleanUrl = url.split('?')[0].split('#')[0].toLowerCase()
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.ogv', '.mov', '.m4v', '.m3u8', '.mpd']
    return (
        videoExtensions.some((ext) => cleanUrl.endsWith(ext)) ||
        url.includes('/video/') ||
        url.includes('.mp4?') ||
        url.includes('.webm?') ||
        url.includes('stream.mux.com')
    )
}

const ArticleVideo: React.FC<ArticleVideoProps> = ({
    src,
    alt,
    caption,
    poster,
    className,
    skin: propSkin,
}) => {
    if (!src) return null

    // If it's a YouTube link, delegate to Next.js YouTubeEmbed
    if (isYouTubeUrl(src)) {
        return <YoutubeVideo url={src} alt={alt} caption={caption} className={className} />
    }

    // Determine skin from props or global reader media settings
    let readerSkin: VideoPlayerSkin = 'modern'
    try {
        const { settings } = useReaderSettings()
        if (settings?.media?.videoPlayerSkin) {
            readerSkin = settings.media.videoPlayerSkin
        } else if ((settings as any)?.appearance?.videoPlayerSkin) {
            readerSkin = (settings as any).appearance.videoPlayerSkin
        }
    } catch {
        // Fallback if rendered outside ReaderSettingsProvider
    }

    const activeSkin = propSkin || readerSkin
    const SkinComponent = activeSkin === 'minimal' ? MinimalVideoSkin : VideoSkin

    return (
        <figure className={cn('my-6 space-y-2 group w-full', className)}>
            <div className="overflow-hidden w-full h-full">
                <VideoPlayer>
                    <SkinComponent className="w-full h-full [--media-border-radius:1rem]">
                        <Video
                            src={src}
                            poster={poster}
                            playsInline
                            preload="metadata"
                            aria-label={alt || 'Article video'}
                            className="w-full h-full object-contain"
                        />
                    </SkinComponent>
                </VideoPlayer>
            </div>
            {caption && (
                <figcaption className="text-center text-xs sm:text-sm text-sec italic">
                    {parseInlineMarkdown(caption)}
                </figcaption>
            )}
        </figure>
    )
}

export default ArticleVideo
