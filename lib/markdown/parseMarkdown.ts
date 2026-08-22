import { MarkdownBlock, CalloutType, TaskItem } from './types'
import { slugify } from './parseInline'

export function extractYouTubeId(url: string): string | null {
    if (!url) return null
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/i
    const match = url.match(regExp)
    if (match && match[1]) {
        return match[1]
    }
    if (/^[\w-]{11}$/.test(url.trim())) {
        return url.trim()
    }
    return null
}

export function isVideoUrl(url: string): boolean {
    if (!url) return false
    if (extractYouTubeId(url)) return true
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

export function parseMarkdown(content: string = ''): MarkdownBlock[] {
    if (!content || !content.trim()) {
        return []
    }

    const lines = content.split('\n')
    const blocks: MarkdownBlock[] = []
    let i = 0

    while (i < lines.length) {
        const line = lines[i]
        const trimmed = line.trim()

        if (!trimmed) {
            i++
            continue
        }

        // 1. Media Block: Image, Video, or YouTube (![alt](src)) with optional caption on next line
        const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/)
        if (imgMatch) {
            const [, alt, src] = imgMatch
            let caption: string | undefined = undefined

            // Check if next line is a caption like *caption*
            if (i + 1 < lines.length && /^(\*|_).+(\*|_)$/.test(lines[i + 1].trim())) {
                caption = lines[i + 1].trim().replace(/^[\*_]+|[\*_]+$/g, '')
                i++ // consume caption line
            }

            const ytId = extractYouTubeId(src)
            if (ytId) {
                blocks.push({
                    type: 'youtube',
                    videoId: ytId,
                    url: src,
                })
            } else if (isVideoUrl(src)) {
                blocks.push({
                    type: 'video',
                    src,
                    alt: alt || 'Article video',
                    caption,
                })
            } else {
                blocks.push({
                    type: 'image',
                    src,
                    alt: alt || 'Article image',
                    caption,
                })
            }
            i++
            continue
        }

        // 2. Code Block (```language:filename ... ```)
        if (trimmed.startsWith('```')) {
            const header = trimmed.replace('```', '').trim()
            let language = header
            let filename: string | undefined = undefined

            if (header.includes(':')) {
                const parts = header.split(':')
                language = parts[0].trim()
                filename = parts[1].trim()
            }

            const codeLines: string[] = []
            i++
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
                codeLines.push(lines[i])
                i++
            }
            i++ // skip closing ```
            const code = codeLines.join('\n')

            blocks.push({
                type: 'code',
                language: language || 'plaintext',
                code,
                filename,
            })
            continue
        }

        // 3. Markdown Tables (| ... |)
        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
            const tableLines: string[] = []
            while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
                tableLines.push(lines[i].trim())
                i++
            }

            if (tableLines.length >= 2) {
                const parseRow = (rowStr: string) => {
                    const inner = rowStr.replace(/^\|/, '').replace(/\|$/, '')
                    return inner.split('|').map((c) => c.trim())
                }

                const headers = parseRow(tableLines[0])
                const isSeparator = /^\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(tableLines[1])
                const bodyRowLines = isSeparator ? tableLines.slice(2) : tableLines.slice(1)
                const rows = bodyRowLines.map((rowStr) => parseRow(rowStr))

                blocks.push({
                    type: 'table',
                    headers,
                    rows,
                })
                continue
            }
        }

        // 4. YouTube & Video Embeds ({% youtube url %})
        const ytEmbedMatch = trimmed.match(/^{%\s*(?:youtube|video)\s+(https?:\/\/[^\s%]+)\s*%}/i)
        if (ytEmbedMatch) {
            const url = ytEmbedMatch[1]
            const videoId = extractYouTubeId(url)
            if (videoId) {
                blocks.push({
                    type: 'youtube',
                    videoId,
                    url,
                })
                i++
                continue
            }
        }

        // 5. Generic Embeds ({% embed url %})
        if (trimmed.startsWith('{% embed') && trimmed.endsWith('%}')) {
            const urlMatch = trimmed.match(/https?:\/\/[^\s%]+/)
            const url = urlMatch ? urlMatch[0] : ''

            if (url) {
                const videoId = extractYouTubeId(url)
                if (videoId) {
                    blocks.push({
                        type: 'youtube',
                        videoId,
                        url,
                    })
                } else {
                    blocks.push({
                        type: 'embed',
                        url,
                    })
                }
            }
            i++
            continue
        }

        // 6. Horizontal Rules (---, ***, ___)
        if (/^(\-{3,}|\*{3,}|\_{3,}|(\*\s*){3,}|(\-\s*){3,})$/.test(trimmed)) {
            blocks.push({
                type: 'divider',
            })
            i++
            continue
        }

        // 7. Headings (#, ##, ###, ####, #####, ######)
        const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/)
        if (headingMatch) {
            const level = headingMatch[1].length as 1 | 2 | 3 | 4 | 5 | 6
            const text = headingMatch[2]
            const id = slugify(text)
            blocks.push({
                type: 'heading',
                level,
                content: text,
                id,
            })
            i++
            continue
        }

        // 8. Callouts / Admonitions (> [!NOTE], > [!TIP], > [!WARNING], > [!CAUTION], > [!DANGER], > [!IMPORTANT])
        const calloutMatch = trimmed.match(/^>\s*\[!(NOTE|TIP|WARNING|CAUTION|DANGER|IMPORTANT)\]\s*(.*)$/i)
        if (calloutMatch) {
            const calloutType = calloutMatch[1].toLowerCase() as CalloutType
            const title = calloutMatch[2] ? calloutMatch[2].trim() : undefined
            const calloutLines: string[] = []

            i++
            while (i < lines.length && lines[i].trim().startsWith('>')) {
                const inner = lines[i].trim().replace(/^>\s?/, '')
                calloutLines.push(inner)
                i++
            }

            blocks.push({
                type: 'callout',
                calloutType,
                title,
                content: calloutLines.join('\n'),
            })
            continue
        }

        // 9. Large Editorial Pullquote (>> ...)
        if (trimmed.startsWith('>>')) {
            const quoteLines: string[] = []
            while (i < lines.length && lines[i].trim().startsWith('>>')) {
                quoteLines.push(lines[i].trim().replace(/^>>\s?/, ''))
                i++
            }
            const fullQuote = quoteLines.join(' ')
            blocks.push({
                type: 'pullquote',
                content: fullQuote,
            })
            continue
        }

        // 10. Standard Blockquotes (> ...)
        if (trimmed.startsWith('> ') || trimmed.startsWith('>')) {
            const quoteLines: string[] = []
            while (i < lines.length && (lines[i].trim().startsWith('>') || lines[i].trim() === '')) {
                if (lines[i].trim().length === 0) {
                    if (i + 1 < lines.length && lines[i + 1].trim().startsWith('>')) {
                        quoteLines.push('')
                        i++
                        continue
                    } else {
                        break
                    }
                }
                quoteLines.push(lines[i].trim().replace(/^>\s?/, ''))
                i++
            }

            blocks.push({
                type: 'quote',
                content: quoteLines.join('\n'),
            })
            continue
        }

        // 11. AI Disclosure (<sub>...</sub> or [//]: # (ai-disclosure))
        if (trimmed.startsWith('<sub>') || trimmed.includes('AI Disclosure')) {
            blocks.push({
                type: 'ai-disclosure',
            })
            i++
            continue
        }

        // 12. Interactive Task Checklists (- [ ] or - [x] or * [ ] or * [x])
        if (/^[\*\-]\s+\[([ xX])\]\s+/.test(trimmed)) {
            const taskItems: TaskItem[] = []

            while (i < lines.length && /^[\*\-]\s+\[([ xX])\]\s+/.test(lines[i].trim())) {
                const itemMatch = lines[i].trim().match(/^[\*\-]\s+\[([ xX])\]\s+(.*)$/)
                if (itemMatch) {
                    taskItems.push({
                        checked: itemMatch[1].toLowerCase() === 'x',
                        text: itemMatch[2],
                    })
                }
                i++
            }

            blocks.push({
                type: 'tasklist',
                items: taskItems,
            })
            continue
        }

        // 13. Regular Lists (* or - or numbered like 1., 2.)
        if (/^[\*\-]\s+/.test(trimmed) || /^\d+[\.\)]\s+/.test(trimmed)) {
            const isOrdered = /^\d+[\.\)]\s+/.test(trimmed)
            const listItems: string[] = []

            while (
                i < lines.length &&
                (lines[i].trim().length === 0 ||
                    /^[\*\-]\s+/.test(lines[i].trim()) ||
                    /^\d+[\.\)]\s+/.test(lines[i].trim()))
            ) {
                const curTrimmed = lines[i].trim()
                if (curTrimmed.length > 0) {
                    listItems.push(curTrimmed.replace(/^([\*\-]\s+|\d+[\.\)]\s+)/, ''))
                }
                i++
            }

            blocks.push({
                type: 'list',
                ordered: isOrdered,
                items: listItems,
            })
            continue
        }

        // 14. Standard Paragraph
        blocks.push({
            type: 'paragraph',
            content: trimmed,
        })
        i++
    }

    return blocks
}
