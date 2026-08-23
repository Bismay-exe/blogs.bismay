import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import ArticleVideo, { isVideoUrl } from '../../components/blog/video/ArticleVideo'
import { Highlighter, AnnotationAction } from '../../components/ui/highlighter'

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/\\/g, '')
        .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
}

function parseAnnotationProps(rawString?: string): {
    action: AnnotationAction
    color?: string
    strokeWidth?: number
    animationDuration?: number
    iterations?: number
} {
    let action: AnnotationAction = 'highlight'
    let color: string | undefined = undefined
    let strokeWidth: number | undefined = undefined
    let animationDuration: number | undefined = undefined
    let iterations: number | undefined = undefined

    if (!rawString) return { action }

    // 1. Check for explicit action="xyz" or action='xyz'
    const actionMatch = rawString.match(
        /action=["']?(highlight|underline|box|circle|strike-through|crossed-off|bracket)["']?/i
    )
    if (actionMatch) {
        action = actionMatch[1].toLowerCase() as AnnotationAction
    } else {
        // Check for shorthand action word (e.g. {circle} or [underline])
        const knownActions: AnnotationAction[] = [
            'highlight',
            'underline',
            'box',
            'circle',
            'strike-through',
            'crossed-off',
            'bracket',
        ]
        for (const act of knownActions) {
            const actRegex = new RegExp(`\\b${act}\\b`, 'i')
            if (actRegex.test(rawString)) {
                action = act
                break
            }
        }
    }

    // 2. Check for color="xyz" or hex code #xxx
    const colorMatch = rawString.match(/color=["']([^"']+)["']/i)
    if (colorMatch) {
        color = colorMatch[1]
    } else {
        const hexMatch = rawString.match(/#([0-9a-fA-F]{3,8})\b/)
        if (hexMatch) {
            color = hexMatch[0]
        }
    }

    // 3. Optional numeric configs
    const strokeMatch = rawString.match(/strokeWidth=["']?(\d+(?:\.\d+)?)["']?/i)
    if (strokeMatch) {
        strokeWidth = parseFloat(strokeMatch[1])
    }

    const durationMatch = rawString.match(/animationDuration=["']?(\d+)["']?/i)
    if (durationMatch) {
        animationDuration = parseInt(durationMatch[1], 10)
    }

    const iterationsMatch = rawString.match(/iterations=["']?(\d+)["']?/i)
    if (iterationsMatch) {
        iterations = parseInt(iterationsMatch[1], 10)
    }

    return { action, color, strokeWidth, animationDuration, iterations }
}

export function parseInlineMarkdown(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = []
    // Clean up escaped periods/symbols in markdown like 1\.
    const cleanText = text.replace(/\\([.\-*_`~#\[\]()])/g, '$1')

    const regex =
        /(<mark(?:\s+[^>]*)?>[\s\S]*?<\/mark>|<highlight(?:\s+[^>]*)?>[\s\S]*?<\/highlight>|==(?:\[([^\]]+)\]\s*)?([^=]+)==(?:\{([^}]+)\})?|!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*\*([^*]+)\*\*\*|___([^_]+)___|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|_([^_]+)_|~~([^~]+)~~|<kbd>([^<]+)<\/kbd>|`([^`]+)`)/g

    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(cleanText)) !== null) {
        if (match.index > lastIndex) {
            parts.push(cleanText.slice(lastIndex, match.index))
        }

        const full = match[0]
        const markPrefix = match[2]
        const markContent = match[3]
        const markSuffix = match[4]
        const imgAlt = match[5]
        const imgSrc = match[6]
        const linkText = match[7]
        const linkUrl = match[8]
        const boldItalic1 = match[9]
        const boldItalic2 = match[10]
        const bold1 = match[11]
        const bold2 = match[12]
        const italic1 = match[13]
        const italic2 = match[14]
        const strikethrough = match[15]
        const kbdText = match[16]
        const codeText = match[17]

        // A. HTML Tag Highlighters: <mark ...>...</mark> or <highlight ...>...</highlight>
        if (full.startsWith('<mark') || full.startsWith('<highlight')) {
            const tagMatch = full.match(/^<(mark|highlight)([\s\S]*?)>([\s\S]*?)<\/\1>$/i)
            if (tagMatch) {
                const [, , rawAttrs, innerText] = tagMatch
                const props = parseAnnotationProps(rawAttrs)
                parts.push(
                    <Highlighter key={match.index} {...props}>
                        {parseInlineMarkdown(innerText)}
                    </Highlighter>
                )
            } else {
                parts.push(full)
            }
        }
        // B. Markdown Highlighter: ==text== or ==[circle] text== or ==text=={action="underline" color="#4d96ff"}
        else if (markContent !== undefined) {
            const rawQualifiers = [markPrefix, markSuffix].filter(Boolean).join(' ')
            const props = parseAnnotationProps(rawQualifiers)
            parts.push(
                <Highlighter key={match.index} {...props}>
                    {parseInlineMarkdown(markContent)}
                </Highlighter>
            )
        }
        // C. Image / Video / YouTube Media
        else if (imgAlt !== undefined && imgSrc) {
            if (isVideoUrl(imgSrc)) {
                parts.push(
                    <ArticleVideo
                        key={match.index}
                        src={imgSrc}
                        alt={imgAlt || 'Article video'}
                    />
                )
            } else {
                parts.push(
                    <img
                        key={match.index}
                        src={imgSrc}
                        alt={imgAlt || 'Image'}
                        className="rounded-2xl border border-sec/20 max-w-full h-auto my-4"
                        loading="lazy"
                    />
                )
            }
        }
        // D. Links
        else if (linkText && linkUrl) {
            parts.push(
                <a
                    key={match.index}
                    href={linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity inline-flex items-center gap-0.5"
                >
                    {parseInlineMarkdown(linkText)} <ArrowUpRight size={13} className="inline" />
                </a>
            )
        }
        // E. Bold Italic
        else if (boldItalic1 || boldItalic2) {
            parts.push(
                <strong key={match.index} className="font-bold text-fg">
                    <em className="italic">{boldItalic1 || boldItalic2}</em>
                </strong>
            )
        }
        // F. Bold
        else if (bold1 || bold2) {
            const inner = bold1 || bold2
            if ((inner.startsWith('_') && inner.endsWith('_')) || (inner.startsWith('*') && inner.endsWith('*'))) {
                parts.push(
                    <strong key={match.index} className="font-bold text-fg">
                        <em className="italic">{inner.slice(1, -1)}</em>
                    </strong>
                )
            } else {
                parts.push(<strong key={match.index} className="font-bold text-fg">{inner}</strong>)
            }
        }
        // G. Italic
        else if (italic1 || italic2) {
            const inner = italic1 || italic2
            if (inner.startsWith('**') && inner.endsWith('**') && inner.length > 4) {
                parts.push(
                    <strong key={match.index} className="font-bold text-fg">
                        <em className="italic">{inner.slice(2, -2)}</em>
                    </strong>
                )
            } else {
                parts.push(<em key={match.index} className="italic">{inner}</em>)
            }
        }
        // H. Strikethrough
        else if (strikethrough) {
            parts.push(
                <del key={match.index} className="line-through text-sec">
                    {strikethrough}
                </del>
            )
        }
        // I. Keyboard Keys <kbd>
        else if (kbdText) {
            parts.push(
                <kbd
                    key={match.index}
                    className="px-2 py-0.5 mx-0.5 rounded-md bg-fg/10 border-b-2 border-sec/30 text-xs font-mono font-bold text-fg shadow-sm inline-block leading-tight select-all"
                >
                    {kbdText}
                </kbd>
            )
        }
        // J. Inline Code
        else if (codeText) {
            parts.push(
                <code key={match.index} className="px-1.5 py-0.5 rounded bg-fg/10 text-accent font-mono text-sm not-italic">
                    {codeText}
                </code>
            )
        }

        lastIndex = match.index + full.length
    }

    if (lastIndex < cleanText.length) {
        parts.push(cleanText.slice(lastIndex))
    }

    return parts.length > 0 ? parts : [cleanText]
}
