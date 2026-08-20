import React from 'react'
import { ArrowUpRight } from 'lucide-react'

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/\\/g, '')
        .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
}

export function parseInlineMarkdown(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = []
    // Clean up escaped periods/symbols in markdown like 1\.
    const cleanText = text.replace(/\\([.\-*_`~#\[\]()])/g, '$1')

    const regex =
        /(!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*\*([^*]+)\*\*\*|___([^_]+)___|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|_([^_]+)_|~~([^~]+)~~|<kbd>([^<]+)<\/kbd>|`([^`]+)`)/g

    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(cleanText)) !== null) {
        if (match.index > lastIndex) {
            parts.push(cleanText.slice(lastIndex, match.index))
        }

        const [
            full,
            ,
            imgAlt,
            imgSrc,
            linkText,
            linkUrl,
            boldItalic1,
            boldItalic2,
            bold1,
            bold2,
            italic1,
            italic2,
            strikethrough,
            kbdText,
            codeText,
        ] = match

        if (imgAlt !== undefined && imgSrc) {
            parts.push(
                <img
                    key={match.index}
                    src={imgSrc}
                    alt={imgAlt || 'Image'}
                    className="rounded-2xl border border-sec/20 max-w-full h-auto my-4"
                    loading="lazy"
                />
            )
        } else if (linkText && linkUrl) {
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
        } else if (boldItalic1 || boldItalic2) {
            parts.push(
                <strong key={match.index} className="font-bold text-fg">
                    <em className="italic">{boldItalic1 || boldItalic2}</em>
                </strong>
            )
        } else if (bold1 || bold2) {
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
        } else if (italic1 || italic2) {
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
        } else if (strikethrough) {
            parts.push(
                <del key={match.index} className="line-through text-sec">
                    {strikethrough}
                </del>
            )
        } else if (kbdText) {
            parts.push(
                <kbd
                    key={match.index}
                    className="px-2 py-0.5 mx-0.5 rounded-md bg-fg/10 border-b-2 border-sec/30 text-xs font-mono font-bold text-fg shadow-sm inline-block leading-tight select-all"
                >
                    {kbdText}
                </kbd>
            )
        } else if (codeText) {
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
