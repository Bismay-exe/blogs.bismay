'use client'

import React, { useState } from 'react'
import {
    Copy,
    Check,
    ArrowUpRight,
    X,
} from 'lucide-react'
import { Icon } from '@iconify-icon/react'
import Embed from './Embed'

interface CodeBlockProps {
    code: string
    language?: string
    filename?: string
}

function highlightCodeLine(line: string, language: string = 'javascript'): React.ReactNode {
    // 1. Comments (// ...) -> Muted grey
    const commentIndex = line.indexOf('//')
    if (commentIndex !== -1) {
        const beforeComment = line.slice(0, commentIndex)
        const comment = line.slice(commentIndex)
        return (
            <>
                {beforeComment ? highlightTokens(beforeComment, language) : null}
                <span className="text-zinc-500 italic">{comment}</span>
            </>
        )
    }

    return highlightTokens(line, language)
}

function highlightTokens(code: string, language: string): React.ReactNode[] {
    const tokens: React.ReactNode[] = []

    // Token regex matching:
    // 1. Strings ("...", '...', `...`)
    // 2. React methods & function names (React.createElement, createElement, createContext, useContext, useState, useEffect, etc.)
    // 3. Keywords (function, return, const, let, var, import, export, default, from, etc.)
    // 4. JSX tags & component names (<MyShop.Provider, </MyShop.Provider>, <App />, etc.)
    // 5. Object / prop keys before colon or equals (value=, className=, key:, onClick:)
    // 6. Identifiers (MyShop, children, cartItems, isCartOpen, etc.)
    // 7. Booleans, Null, Numbers
    // 8. Punctuation / Brackets
    const regex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|<\/?[\w$]+(?:\.[\w$]+)*|\/?>|\b(?:React\.createElement|createElement|createContext|useContext|useState|useEffect|useRef|useMemo|useCallback|console\.log|console)\b|\b(?:function|return|const|let|var|import|export|default|from|if|else|while|for|switch|case|new|typeof|async|await|npm|run|dev|build)\b|\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*[:=])|\b(?:true|false|null|undefined)\b|\b\d+\b|\b[a-zA-Z_$][a-zA-Z0-9_$]*\b|[()\[\]{},;:.=+*\-\/<>])/g

    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(code)) !== null) {
        if (match.index > lastIndex) {
            tokens.push(<span key={`text-${lastIndex}`} className="text-zinc-200">{code.slice(lastIndex, match.index)}</span>)
        }

        const text = match[0]

        if (text.startsWith('"') || text.startsWith("'") || text.startsWith('`')) {
            // Strings -> Golden yellow (#FDE047)
            tokens.push(<span key={match.index} className="text-[#FDE047]">{text}</span>)
        } else if (/^(function|return|const|let|var|import|export|default|from|if|else|while|for|switch|case|new|typeof|async|await)$/.test(text)) {
            // Keywords -> Lavender / Purple (#C4B6ED)
            tokens.push(<span key={match.index} className="text-[#C4B6ED] font-semibold">{text}</span>)
        } else if (text === 'npm' || text === 'run' || text === 'dev' || text === 'build') {
            tokens.push(<span key={match.index} className="text-[#86EFAC] font-semibold">{text}</span>)
        } else if (
            text.includes('createElement') ||
            text === 'createContext' ||
            text === 'useContext' ||
            text === 'useState' ||
            text === 'useEffect' ||
            text === 'React.createElement'
        ) {
            // React API / hooks -> Lime green (#A3E635)
            tokens.push(<span key={match.index} className="text-[#A3E635] font-medium">{text}</span>)
        } else if (text.startsWith('<') || text.startsWith('</') || text === '>' || text === '/>') {
            // JSX tags & components -> Cyan / Sky (#38BDF8)
            tokens.push(<span key={match.index} className="text-[#38BDF8] font-medium">{text}</span>)
        } else if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(text) && /^\s*[:=]/.test(code.slice(match.index + text.length))) {
            // Object property or JSX prop key (value=, className:, key:, onClick:) -> Coral / Rose (#FB7185)
            tokens.push(<span key={match.index} className="text-[#FB7185] font-medium">{text}</span>)
        } else if (/^(true|false|null|undefined)$/.test(text)) {
            tokens.push(<span key={match.index} className="text-[#FB923C] font-semibold">{text}</span>)
        } else if (/^\d+$/.test(text)) {
            tokens.push(<span key={match.index} className="text-[#FB923C]">{text}</span>)
        } else if (text === '(' || text === ')' || text === '{' || text === '}' || text === '[' || text === ']' || text === ',' || text === ';' || text === '.') {
            tokens.push(<span key={match.index} className="text-zinc-400">{text}</span>)
        } else if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(text)) {
            // Identifiers / variables (MyShop, children, isCartOpen, cartItems) -> Bright light zinc (#E4E4E7)
            tokens.push(<span key={match.index} className="text-zinc-200">{text}</span>)
        } else {
            tokens.push(<span key={match.index} className="text-zinc-200">{text}</span>)
        }

        lastIndex = match.index + text.length
    }

    if (lastIndex < code.length) {
        tokens.push(<span key={`text-${lastIndex}`} className="text-zinc-200">{code.slice(lastIndex)}</span>)
    }

    return tokens.length > 0 ? tokens : [<span key="raw" className="text-zinc-200">{code}</span>]
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript', filename }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const lines = code.split('\n')
    const isPlaintext = language === 'text' || language === 'plaintext'

    return (
        <div className="my-6 rounded-2xl overflow-hidden border border-white/10 bg-[#0E0E10] shadow-md shadow-black/20 group">
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#16161A] border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-400">
                    <div className="flex gap-1.5 mr-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    {filename ? (
                        <span className="text-zinc-200 font-medium">{filename}</span>
                    ) : (
                        <span className="uppercase text-[11px] font-semibold text-zinc-400">{language || 'TEXT'}</span>
                    )}
                </div>

                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-100 text-xs transition-all duration-200 cursor-pointer"
                    title="Copy"
                >
                    {copied ? (
                        <>
                            <Check size={13} className="text-emerald-400" />
                            <span className="text-emerald-400 font-mono text-[11px]">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={13} />
                            <span className="font-mono text-[11px]">Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code Content with Syntax Highlighting */}
            <pre className="p-4 overflow-x-auto text-[13.5px] leading-relaxed font-mono text-zinc-200 selection:bg-accent/30 bg-[#0E0E10]">
                <code>
                    {lines.map((line, idx) => (
                        <div key={idx} className="table-row">
                            <span className="table-cell whitespace-pre">
                                {isPlaintext ? (
                                    <span className="text-zinc-200">{line}</span>
                                ) : (
                                    highlightCodeLine(line, language)
                                )}
                            </span>
                        </div>
                    ))}
                </code>
            </pre>
        </div>
    )
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/\\/g, '')
        .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
}

function parseInlineMarkdown(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = []
    // Clean up escaped periods in markdown like 1\.
    const cleanText = text.replace(/\\([.\-*_`~#\[\]()])/g, '$1')

    const regex = /(!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|_([^_]+)_|`([^`]+)`)/g

    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(cleanText)) !== null) {
        if (match.index > lastIndex) {
            parts.push(cleanText.slice(lastIndex, match.index))
        }

        const [full, , imgAlt, imgSrc, linkText, linkUrl, boldText, italicText1, italicText2, codeText] = match

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
            let innerContent: React.ReactNode = linkText
            if (linkText.startsWith('**') && linkText.endsWith('**') && linkText.length > 4) {
                innerContent = <strong className="font-bold">{linkText.slice(2, -2)}</strong>
            } else if (
                ((linkText.startsWith('*') && linkText.endsWith('*')) ||
                    (linkText.startsWith('_') && linkText.endsWith('_'))) &&
                linkText.length > 2
            ) {
                innerContent = <em className="italic">{linkText.slice(1, -1)}</em>
            }

            parts.push(
                <a
                    key={match.index}
                    href={linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity inline-flex items-center gap-0.5"
                >
                    {innerContent} <ArrowUpRight size={13} className="inline" />
                </a>
            )
        } else if (boldText) {
            parts.push(<strong key={match.index} className="font-bold text-fg">{boldText}</strong>)
        } else if (italicText1 || italicText2) {
            parts.push(<em key={match.index} className="italic">{italicText1 || italicText2}</em>)
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

interface BodyProps {
    content?: string
}

const Body: React.FC<BodyProps> = ({ content = '' }) => {
    const [activeImage, setActiveImage] = useState<{ src: string; alt: string; caption?: string } | null>(null)

    // Handle Escape key and lock background scroll when image is zoomed
    React.useEffect(() => {
        if (activeImage) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveImage(null)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            document.body.style.overflow = 'unset'
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [activeImage])

    if (!content) {
        return null
    }

    // Parse Markdown into structured blocks
    const lines = content.split('\n')
    const blocks: React.ReactNode[] = []
    let i = 0

    while (i < lines.length) {
        const line = lines[i]
        const trimmed = line.trim()

        if (!trimmed) {
            i++
            continue
        }

        // 1. Image Block (![alt](src))
        const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/)
        if (imgMatch) {
            const [, alt, src] = imgMatch
            let caption = ''

            // Check if next line is a caption like *caption*
            if (i + 1 < lines.length && /^(\*|_).+(\*|_)$/.test(lines[i + 1].trim())) {
                caption = lines[i + 1].trim().replace(/^[\*_]+|[\*_]+$/g, '')
                i++ // consume caption line
            }

            blocks.push(
                <figure key={`img-${i}`} className="my-6 space-y-2 group">
                    <div
                        onClick={() => setActiveImage({ src, alt: alt || 'Article image', caption })}
                        className="overflow-hidden rounded-2xl border border-sec/20 bg-fg/5 cursor-zoom-in relative"
                        title="Click to view full screen"
                    >
                        <img
                            src={src}
                            alt={alt || 'Article image'}
                            className="w-full h-auto object-cover max-h-[500px] group-hover:scale-[1.015] transition-transform duration-300"
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
            i++
            continue
        }

        // 2. Code Block (```)
        if (trimmed.startsWith('```')) {
            const language = trimmed.replace('```', '').trim()
            const codeLines: string[] = []
            i++
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
                codeLines.push(lines[i])
                i++
            }
            i++ // skip closing ```
            const code = codeLines.join('\n')
            blocks.push(<CodeBlock key={`code-${i}`} code={code} language={language} />)
            continue
        }

        // 2. Markdown Tables (| ... |)
        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
            const tableLines: string[] = []
            while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
                tableLines.push(lines[i].trim())
                i++
            }

            if (tableLines.length >= 2) {
                // Split rows into cells
                const parseRow = (rowStr: string) => {
                    // Remove leading & trailing pipe, then split by pipe
                    const inner = rowStr.replace(/^\|/, '').replace(/\|$/, '')
                    return inner.split('|').map((c) => c.trim())
                }

                const headerCells = parseRow(tableLines[0])
                // Check if second line is a separator row (| --- | --- |)
                const isSeparator = /^\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(tableLines[1])
                const bodyRowLines = isSeparator ? tableLines.slice(2) : tableLines.slice(1)

                blocks.push(
                    <div key={`table-${i}`} className="my-6 overflow-x-auto rounded-2xl border border-sec/30 bg-fg/1">
                        <table className="w-full text-left text-sm font-sans border-collapse">
                            <thead>
                                <tr className="border-b border-sec/20 bg-fg/5">
                                    {headerCells.map((cell, cIdx) => (
                                        <th key={cIdx} className="px-4 py-3 font-bold text-fg border-r last:border-r-0 border-sec/15">
                                            {parseInlineMarkdown(cell)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sec/15">
                                {bodyRowLines.map((rowStr, rIdx) => {
                                    const cells = parseRow(rowStr)
                                    return (
                                        <tr key={rIdx} className="hover:bg-fg/5 transition-colors">
                                            {cells.map((cell, cIdx) => (
                                                <td key={cIdx} className="px-4 py-3 text-fg/90 border-r last:border-r-0 border-sec/15">
                                                    {parseInlineMarkdown(cell)}
                                                </td>
                                            ))}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )
                continue
            }
        }

        // 3. Embeds ({% embed url %})
        if (trimmed.startsWith('{% embed') && trimmed.endsWith('%}')) {
            const urlMatch = trimmed.match(/https?:\/\/[^\s%]+/)
            const url = urlMatch ? urlMatch[0] : ''

            if (url) {
                blocks.push(<Embed key={`embed-${i}`} url={url} />)
            }
            i++
            continue
        }

        // 4. Horizontal Rules (---, * * *, ***, ___)
        if (/^(\-{3,}|\*{3,}|\_{3,}|(\*\s*){3,}|(\-\s*){3,})$/.test(trimmed)) {
            blocks.push(<div key={`hr-${i}`} className="h-px w-full bg-sec/20 my-8" />)
            i++
            continue
        }

        // 5. Headings (#, ##, ###)
        if (trimmed.startsWith('# ')) {
            const text = trimmed.replace('# ', '')
            blocks.push(
                <h1 key={`h1-${i}`} className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-fg pt-2">
                    {parseInlineMarkdown(text)}
                </h1>
            )
            i++
            continue
        }

        if (trimmed.startsWith('### ')) {
            const text = trimmed.replace('### ', '')
            const slug = slugify(text)
            blocks.push(
                <h3 key={`h3-${i}`} id={slug} className="scroll-mt-24 text-lg sm:text-xl font-bold tracking-tight text-fg pt-2">
                    {parseInlineMarkdown(text)}
                </h3>
            )
            i++
            continue
        }

        if (trimmed.startsWith('## ')) {
            const text = trimmed.replace('## ', '')
            const slug = slugify(text)
            blocks.push(
                <h2 key={`h2-${i}`} id={slug} className="scroll-mt-24 text-2xl sm:text-3xl font-bold tracking-tight text-fg pt-2">
                    {parseInlineMarkdown(text)}
                </h2>
            )
            i++
            continue
        }

        // 6. Blockquotes (> ...)
        if (trimmed.startsWith('> ')) {
            const quoteText = trimmed.replace(/^>\s*/, '')
            blocks.push(
                <blockquote key={`quote-${i}`} className="my-4 p-4 sm:p-5 rounded-r-2xl border-l-4 border-accent bg-accent/5 italic text-fg font-medium">
                    {parseInlineMarkdown(quoteText)}
                </blockquote>
            )
            i++
            continue
        }

        // 7. AI Disclosure (<sub>...</sub>)
        if (trimmed.startsWith('<sub>') || trimmed.includes('AI Disclosure')) {
            const cleanText = trimmed.replace(/<\/?sub>/g, '')
            blocks.push(
                <div key={`sub-${i}`} className="p-4 rounded-xl bg-fg/[0.03] border border-sec/20 text-xs text-sec font-mono leading-relaxed my-6">
                    {parseInlineMarkdown(cleanText)}
                </div>
            )
            i++
            continue
        }

        // 8. Lists (* or - or numbered like 1., 2.)
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

            if (isOrdered) {
                blocks.push(
                    <ol key={`ol-${i}`} className="space-y-3 pl-2 my-4 list-decimal list-inside text-fg/90">
                        {listItems.map((item, idx) => (
                            <li key={idx} className="leading-relaxed">
                                <span>{parseInlineMarkdown(item)}</span>
                            </li>
                        ))}
                    </ol>
                )
            } else {
                blocks.push(
                    <ul key={`ul-${i}`} className="space-y-3 pl-2 my-4">
                        {listItems.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                                <span className="leading-relaxed">{parseInlineMarkdown(item)}</span>
                            </li>
                        ))}
                    </ul>
                )
            }
            continue
        }

        // 9. Standard Paragraph (including regular lines starting with 💬 or other emojis)
        blocks.push(
            <p key={`p-${i}`} className="leading-[1.8] text-fg/90">
                {parseInlineMarkdown(trimmed)}
            </p>
        )
        i++
    }

    return (
        <>
            <article className="w-full text-fg/90 space-y-6 pt-4 text-[16.5px] sm:text-[17px] leading-[1.8] font-sans antialiased">
                {blocks}
            </article>

            {/* Fullscreen Image Lightbox Modal */}
            {activeImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
                    onClick={() => setActiveImage(null)}
                >
                    {/* Close button */}
                    <button
                        onClick={() => setActiveImage(null)}
                        className="absolute top-5 right-5 z-50 flex items-center gap-2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-200 cursor-pointer shadow-lg group"
                        title="Close (ESC)"
                    >
                        <X size={20} className="group-hover:rotate-90 transition-transform duration-200" />
                        <span className="text-xs font-mono pr-1 hidden sm:inline">ESC</span>
                    </button>

                    {/* Image Container */}
                    <div
                        className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center space-y-3 cursor-zoom-out"
                        onClick={() => setActiveImage(null)}
                    >
                        <img
                            src={activeImage.src}
                            alt={activeImage.alt}
                            className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl border border-white/15 shadow-2xl animate-in zoom-in-95 duration-200"
                        />
                        {activeImage.caption && (
                            <p className="text-center text-sm font-mono text-zinc-300 max-w-2xl px-4 py-1.5 rounded-xl bg-black/0 zbackdrop-blur-sm zborder border-white/10">
                                {activeImage.caption}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Body
