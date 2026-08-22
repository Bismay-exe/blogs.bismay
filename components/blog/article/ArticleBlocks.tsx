import React from 'react'
import {
    Info,
    Lightbulb,
    AlertTriangle,
    ShieldAlert,
    Flame,
    Sparkles,
    Check,
} from 'lucide-react'
import { parseInlineMarkdown } from '../../../lib/markdown/parseInline'
import YoutubeVideo from '../video/YoutubeVideo'
import {
    HeadingBlock,
    ParagraphBlock,
    QuoteBlock,
    PullquoteBlock,
    TableBlock,
    ListBlock,
    TaskListBlock,
    CalloutBlock,
    YouTubeBlock,
} from '../../../lib/markdown/types'

export const HeadingBlockComponent: React.FC<HeadingBlock> = ({ level, content, id }) => {
    const inlineContent = parseInlineMarkdown(content)

    if (level === 1) {
        return (
            <h1
                id={id}
                style={{
                    fontFamily: 'var(--reader-heading-font, var(--font-sans))',
                    fontWeight: 'var(--reader-heading-font-weight, 700)',
                    fontSize: 'calc(2.25rem * var(--reader-heading-scale, 1))',
                    marginTop: 'var(--reader-heading-margin-top, 32px)',
                    marginBottom: 'var(--reader-heading-margin-bottom, 12px)',
                }}
                className="scroll-mt-24 font-extrabold tracking-tight text-fg leading-tight"
            >
                {inlineContent}
            </h1>
        )
    }

    if (level === 2) {
        return (
            <h2
                id={id}
                style={{
                    fontFamily: 'var(--reader-heading-font, var(--font-sans))',
                    fontWeight: 'var(--reader-heading-font-weight, 700)',
                    fontSize: 'calc(1.875rem * var(--reader-heading-scale, 1))',
                    marginTop: 'var(--reader-heading-margin-top, 32px)',
                    marginBottom: 'var(--reader-heading-margin-bottom, 12px)',
                }}
                className="scroll-mt-24 font-bold tracking-tight text-fg leading-tight"
            >
                {inlineContent}
            </h2>
        )
    }

    if (level === 3) {
        return (
            <h3
                id={id}
                style={{
                    fontFamily: 'var(--reader-heading-font, var(--font-sans))',
                    fontWeight: 'var(--reader-heading-font-weight, 700)',
                    fontSize: 'calc(1.5rem * var(--reader-heading-scale, 1))',
                    marginTop: 'calc(var(--reader-heading-margin-top, 32px) * 0.85)',
                    marginBottom: 'calc(var(--reader-heading-margin-bottom, 12px) * 0.85)',
                }}
                className="scroll-mt-24 font-bold tracking-tight text-fg leading-snug"
            >
                {inlineContent}
            </h3>
        )
    }

    if (level === 4) {
        return (
            <h4
                id={id}
                style={{
                    fontFamily: 'var(--reader-heading-font, var(--font-sans))',
                    fontWeight: 'var(--reader-heading-font-weight, 700)',
                    fontSize: 'calc(1.25rem * var(--reader-heading-scale, 1))',
                    marginTop: 'calc(var(--reader-heading-margin-top, 32px) * 0.75)',
                    marginBottom: 'calc(var(--reader-heading-margin-bottom, 12px) * 0.75)',
                }}
                className="scroll-mt-24 font-semibold tracking-tight text-fg leading-snug"
            >
                {inlineContent}
            </h4>
        )
    }

    if (level === 5) {
        return (
            <h5
                id={id}
                style={{
                    fontFamily: 'var(--reader-heading-font, var(--font-sans))',
                    fontWeight: 'var(--reader-heading-font-weight, 700)',
                    fontSize: 'calc(1.125rem * var(--reader-heading-scale, 1))',
                    marginTop: 'calc(var(--reader-heading-margin-top, 32px) * 0.65)',
                    marginBottom: 'calc(var(--reader-heading-margin-bottom, 12px) * 0.65)',
                }}
                className="scroll-mt-24 font-semibold tracking-tight text-fg leading-snug"
            >
                {inlineContent}
            </h5>
        )
    }

    return (
        <h6
            id={id}
            style={{
                fontFamily: 'var(--reader-heading-font, var(--font-sans))',
                fontWeight: 'var(--reader-heading-font-weight, 700)',
                fontSize: 'calc(1rem * var(--reader-heading-scale, 1))',
                marginTop: 'calc(var(--reader-heading-margin-top, 32px) * 0.5)',
                marginBottom: 'calc(var(--reader-heading-margin-bottom, 12px) * 0.5)',
            }}
            className="scroll-mt-24 font-semibold tracking-tight text-fg/80 leading-snug"
        >
            {inlineContent}
        </h6>
    )
}

export const ParagraphBlockComponent: React.FC<ParagraphBlock> = ({ content }) => {
    return (
        <p
            style={{
                fontFamily: 'var(--reader-body-font, var(--font-sans))',
                fontWeight: 'var(--reader-body-font-weight, 400)',
                fontSize: 'var(--reader-body-font-size, 16.5px)',
                lineHeight: 'var(--reader-line-height, 1.8)',
                marginBottom: 'var(--reader-paragraph-spacing, 24px)',
            }}
            className="text-fg/90"
        >
            {parseInlineMarkdown(content)}
        </p>
    )
}

export const QuoteBlockComponent: React.FC<QuoteBlock> = ({ content }) => {
    return (
        <blockquote
            style={{
                fontFamily: 'var(--reader-body-font, var(--font-sans))',
                fontWeight: 'var(--reader-body-font-weight, 400)',
                fontSize: 'var(--reader-body-font-size, 16.5px)',
                lineHeight: 'var(--reader-line-height, 1.8)',
            }}
            className="my-4 p-4 sm:p-5 rounded-l-xs rounded-r-md border-l-4 border-accent bg-accent/5 italic text-fg font-medium"
        >
            {content.split('\n').map((line, idx) => (
                <p key={idx} className={idx > 0 ? 'mt-2' : ''}>
                    {parseInlineMarkdown(line)}
                </p>
            ))}
        </blockquote>
    )
}

export const PullquoteBlockComponent: React.FC<PullquoteBlock> = ({ content }) => {
    return (
        <div className="my-12 sm:my-16 py-4 flex justify-center w-full">
            <div className="relative max-w-lg sm:max-w-xl mx-auto text-center px-10 sm:px-18">
                {/* Top-Left Quote 66 */}
                <span
                    className="absolute -top-5 sm:-top-6 left-0 sm:left-8 text-4xl sm:text-5xl md:text-7xl font-serif font-black text-fg select-none leading-none pointer-events-none"
                    aria-hidden="true"
                >
                    “
                </span>

                {/* Centered Text */}
                <p className="text-xl md:text-2xl font-normal tracking-tight text-fg leading-tight sm:leading-snug">
                    {parseInlineMarkdown(content)}
                </p>

                {/* Bottom-Right Quote 99 */}
                <span
                    className="absolute -bottom-5 sm:-bottom-14 right-0 sm:right-8 text-4xl sm:text-5xl md:text-7xl font-serif font-black text-fg select-none leading-none pointer-events-none"
                    aria-hidden="true"
                >
                    ”
                </span>
            </div>
        </div>
    )
}

export const CalloutBlockComponent: React.FC<CalloutBlock> = ({ calloutType, title, content }) => {
    const config = {
        note: {
            icon: Info,
            title: 'Note',
            borderLeft: 'border-l-sky-400',
            borderBox: 'border-sky-500/25',
            bgColor: 'bg-sky-500/10',
            textColor: 'text-sky-400',
        },
        tip: {
            icon: Lightbulb,
            title: 'Tip',
            borderLeft: 'border-l-emerald-400',
            borderBox: 'border-emerald-500/25',
            bgColor: 'bg-emerald-500/10',
            textColor: 'text-emerald-400',
        },
        warning: {
            icon: AlertTriangle,
            title: 'Warning',
            borderLeft: 'border-l-amber-400',
            borderBox: 'border-amber-500/25',
            bgColor: 'bg-amber-500/10',
            textColor: 'text-amber-400',
        },
        caution: {
            icon: ShieldAlert,
            title: 'Caution',
            borderLeft: 'border-l-rose-400',
            borderBox: 'border-rose-500/25',
            bgColor: 'bg-rose-500/10',
            textColor: 'text-rose-400',
        },
        danger: {
            icon: Flame,
            title: 'Danger',
            borderLeft: 'border-l-red-500',
            borderBox: 'border-red-500/25',
            bgColor: 'bg-red-500/10',
            textColor: 'text-red-400',
        },
        important: {
            icon: Sparkles,
            title: 'Important',
            borderLeft: 'border-l-purple-400',
            borderBox: 'border-purple-500/25',
            bgColor: 'bg-purple-500/10',
            textColor: 'text-purple-400',
        },
    }[calloutType] || {
        icon: Info,
        title: 'Note',
        borderLeft: 'border-l-sky-400',
        borderBox: 'border-sky-500/25',
        bgColor: 'bg-sky-500/10',
        textColor: 'text-sky-400',
    }

    const IconComponent = config.icon
    const displayTitle = title || config.title

    return (
        <div
            className={`my-6 rounded-md border ${config.borderBox} border-l-4 ${config.borderLeft} ${config.bgColor} p-4 sm:p-5 shadow-sm backdrop-blur-sm`}
        >
            <div className="flex items-center gap-2 font-semibold text-sm mb-2">
                <IconComponent size={18} className={config.textColor} />
                <span className={`${config.textColor} uppercase tracking-wider text-xs font-mono font-bold`}>
                    {displayTitle}
                </span>
            </div>
            <div className="text-fg/90 text-[15px] sm:text-base leading-relaxed space-y-2 pl-0.5">
                {content.split('\n').map((paragraph, pIdx) => (
                    <p key={pIdx}>{parseInlineMarkdown(paragraph)}</p>
                ))}
            </div>
        </div>
    )
}

export const TaskListBlockComponent: React.FC<TaskListBlock> = ({ items }) => {
    return (
        <div className="space-y-2.5 my-5 pl-1">
            {items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                    <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors border ${
                            item.checked
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                : 'border-sec/40 bg-fg/5'
                        }`}
                    >
                        {item.checked && <Check size={13} className="stroke-[2.5]" />}
                    </div>
                    <span className={`leading-relaxed text-[16px] ${item.checked ? 'line-through text-sec/70' : 'text-fg/90'}`}>
                        {parseInlineMarkdown(item.text)}
                    </span>
                </div>
            ))}
        </div>
    )
}

export const YouTubeBlockComponent: React.FC<YouTubeBlock> = ({ videoId, url }) => {
    return <YoutubeVideo videoId={videoId} url={url} />
}

export const TableBlockComponent: React.FC<TableBlock> = ({ headers, rows }) => {
    return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-sec/30 bg-fg/1">
            <table className="w-full text-left text-sm font-sans border-collapse">
                <thead>
                    <tr className="border-b border-sec/20 bg-fg/5">
                        {headers.map((cell, cIdx) => (
                            <th key={cIdx} className="px-4 py-3 font-bold text-fg border-r last:border-r-0 border-sec/15">
                                {parseInlineMarkdown(cell)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-sec/15">
                    {rows.map((rowCells, rIdx) => (
                        <tr key={rIdx} className="hover:bg-fg/5 transition-colors">
                            {rowCells.map((cell, cIdx) => (
                                <td key={cIdx} className="px-4 py-3 text-fg/90 border-r last:border-r-0 border-sec/15">
                                    {parseInlineMarkdown(cell)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export const ListBlockComponent: React.FC<ListBlock> = ({ ordered, items }) => {
    const listStyle = {
        fontFamily: 'var(--reader-body-font, var(--font-sans))',
        fontSize: 'var(--reader-body-font-size, 16.5px)',
        lineHeight: 'var(--reader-line-height, 1.8)',
    }

    if (ordered) {
        return (
            <ol style={listStyle} className="space-y-3 pl-2 my-4 list-decimal list-inside text-fg/90">
                {items.map((item, idx) => (
                    <li key={idx}>
                        <span>{parseInlineMarkdown(item)}</span>
                    </li>
                ))}
            </ol>
        )
    }

    return (
        <ul style={listStyle} className="space-y-3 pl-2 my-4">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                    <span>{parseInlineMarkdown(item)}</span>
                </li>
            ))}
        </ul>
    )
}

export const DividerBlockComponent: React.FC = () => {
    return <div className="h-px w-full bg-sec/20 my-8" />
}

export const AiDisclosureBlockComponent: React.FC = () => {
    return (
        <div className="p-4 rounded-xl bg-fg/3 border border-sec/20 text-xs text-sec font-mono leading-relaxed my-6">
            🤖 This article was created with AI assistance and reviewed by human editorial.
        </div>
    )
}
