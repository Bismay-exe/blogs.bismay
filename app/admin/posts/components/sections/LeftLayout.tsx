'use client'

import React, { useMemo } from 'react'
import { ArrowLeftIcon, Sparkles } from 'lucide-react'
import Link from 'next/link'

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/\\/g, '')
        .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
}

interface LeftLayoutProps {
    markdown?: string
    onBack?: (e: React.MouseEvent) => void
}

const LeftLayout: React.FC<LeftLayoutProps> = ({ markdown = '', onBack }) => {
    const headings = useMemo(() => {
        if (!markdown) return []

        const lines = markdown.split('\n')
        const rawHeadings: { text: string; slug: string; level: number; length: number }[] = []
        let minLength = Infinity
        let maxLength = 0

        for (const line of lines) {
            const trimmed = line.trim()
            if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
                const level = trimmed.startsWith('## ') ? 2 : 3
                const rawText = trimmed.replace(/^#{2,3}\s+/, '').trim()
                const slug = slugify(rawText)
                const length = rawText.length
                if (length < minLength) minLength = length
                if (length > maxLength) maxLength = length
                rawHeadings.push({ text: rawText, slug, level, length })
            }
        }

        if (rawHeadings.length === 0) return []

        return rawHeadings.map((h) => {
            const ratio = maxLength === minLength ? 0.5 : (h.length - minLength) / (maxLength - minLength)
            const widthPercent = Math.round(30 + ratio * 60)
            return {
                text: h.text,
                slug: h.slug,
                level: h.level,
                widthPercent,
            }
        })
    }, [markdown])

    // Group headings into parent H2 sections with nested H3 children
    const groupedHeadings = useMemo(() => {
        const groups: {
            parent: { text: string; slug: string; level: number; widthPercent: number }
            children: { text: string; slug: string; level: number; widthPercent: number }[]
        }[] = []

        for (const h of headings) {
            if (h.level === 2) {
                groups.push({ parent: h, children: [] })
            } else if (h.level === 3) {
                if (groups.length > 0) {
                    groups[groups.length - 1].children.push(h)
                } else {
                    groups.push({ parent: h, children: [] })
                }
            }
        }

        return groups
    }, [headings])

    return (
        <div className="sticky top-0 max-w-56 w-full h-screen hidden xl:flex flex-col gap-5 justify-center bg-transparent group">
            {/* Back to blogs link */}
            <div className="absolute top-0 pt-5 cursor-pointer translate-x-8 w-fit">
                {onBack ? (
                    <button
                        type="button"
                        onClick={onBack}
                        className="project flex items-center gap-2 w-fit hover:text-accent transition-colors cursor-pointer bg-transparent border-0 text-inherit p-0 font-inherit text-sm text-sec"
                    >
                        <ArrowLeftIcon size={20} className="list-line" /> back to posts
                    </button>
                ) : (
                    <Link href="/admin/posts" className="project flex items-center gap-2 w-fit hover:text-accent transition-colors">
                        <ArrowLeftIcon size={20} className="list-line" /> back to posts
                    </Link>
                )}
            </div>

            {/* Live Skeleton minimap bars */}
            <div className="absolute w-[80%] space-y-2.5 group-hover:opacity-0 transition-all duration-300 ease-in-out pointer-events-none">
                {headings.length > 0 ? (
                    headings.map((h, idx) => (
                        <div
                            key={idx}
                            style={{ width: `${h.widthPercent}%` }}
                            className={`h-0.5 rounded-full transition-all duration-300 ${
                                h.level === 2 ? 'bg-sec/70' : 'bg-sec/40 ml-2.5'
                            }`}
                        />
                    ))
                ) : (
                    <div className="space-y-2.5 opacity-40">
                        <div className="h-0.5 w-[50%] bg-sec/40 rounded-full" />
                        <div className="h-0.5 w-[80%] bg-sec/40 rounded-full" />
                        <div className="h-0.5 w-[60%] bg-sec/40 rounded-full" />
                        <div className="h-0.5 w-[40%] bg-sec/40 rounded-full" />
                    </div>
                )}
            </div>

            {/* Interactive Real-Time Table of Contents */}
            <h1 className="group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out text-sm font-bold tracking-tight text-fg flex items-center gap-2">
                <span>On this page</span>
                <Sparkles size={13} className="text-accent" />
            </h1>

            <div className="group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out w-full space-y-1 text-xs sm:text-sm text-sec max-h-[70vh] overflow-y-auto pr-2">
                {groupedHeadings.length > 0 ? (
                    groupedHeadings.map((group, gIdx) => (
                        <div key={gIdx} className="space-y-0.5">
                            {/* Main H2 Heading */}
                            <span
                                className="list block leading-tight truncate hover:text-fg transition-colors"
                                title={group.parent.text}
                            >
                                {group.parent.text}
                            </span>

                            {/* Subheadings Tree (like Series section) */}
                            {group.children.length > 0 && (
                                <div className="project-list my-0.5">
                                    <div className="line"></div>
                                    {group.children.map((child, cIdx) => (
                                        <div
                                            key={cIdx}
                                            className="flex items-center gap-2 project w-fit group/sub hover:text-accent transition-colors text-xs text-sec"
                                        >
                                            <div className="project-line"></div>
                                            <span className="truncate max-w-[145px] block" title={child.text}>{child.text}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-xs text-sec/60 italic font-mono">
                        Add ## headings in markdown to see live outline here.
                    </p>
                )}
            </div>
        </div>
    )
}

export default LeftLayout
