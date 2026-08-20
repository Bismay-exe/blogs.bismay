'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { ArrowLeftIcon, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ArrowIcon } from '@/components/ui/shared/ArrowIcon'

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
}

const LeftLayout: React.FC<LeftLayoutProps> = ({ markdown = '' }) => {
    const [activeSlug, setActiveSlug] = useState<string>('')

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

    // Scroll spy: Track active heading on scroll
    useEffect(() => {
        if (headings.length === 0) return

        const handleScrollSpy = () => {
            const headingElements = headings
                .map((h) => ({
                    slug: h.slug,
                    el: document.getElementById(h.slug),
                }))
                .filter((item): item is { slug: string; el: HTMLElement } => item.el !== null)

            const scrollPosition = window.scrollY + 120

            for (let i = headingElements.length - 1; i >= 0; i--) {
                const { slug, el } = headingElements[i]
                if (el.offsetTop <= scrollPosition) {
                    setActiveSlug(slug)
                    return
                }
            }

            if (headingElements.length > 0 && window.scrollY < 200) {
                setActiveSlug(headingElements[0].slug)
            }
        }

        window.addEventListener('scroll', handleScrollSpy, { passive: true })
        handleScrollSpy()
        return () => window.removeEventListener('scroll', handleScrollSpy)
    }, [headings])

    // Smooth sleek scroll on title press
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
        e.preventDefault()
        const target = document.getElementById(slug)
        if (target) {
            const navbarOffset = 90
            const elementPosition = target.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - navbarOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            })

            setActiveSlug(slug)
            window.history.pushState(null, '', `#${slug}`)
        }
    }

    return (
        <div className="sticky top-10 max-w-56 w-full h-[calc(100vh-64px)] hidden xl:flex flex-col gap-5 justify-center bg-transparent group z-10">
            {/* Back to blogs link */}
            <div className="absolute top-0 pt-5 cursor-pointer translate-x-8 w-fit">
                <Link href="/blogs" className="project group/icon flex items-center gap-2 w-fit hover:text-accent transition-colors">
                    <ArrowIcon className="list-line rotate-180" /> back to blogs
                </Link>
            </div>

            {/* Skeleton / Topic length minimap bars (Visible when not hovering) */}
            <div className="absolute w-[80%] space-y-2.5 group-hover:opacity-0 transition-all duration-300 ease-in-out pointer-events-none">
                {headings.map((h, idx) => {
                    const isActive = activeSlug === h.slug
                    return (
                        <div
                            key={idx}
                            style={{ width: `${h.widthPercent}%` }}
                            className={`h-0.5 rounded-full transition-all duration-300 ${h.level === 2 ? '' : 'ml-2.5'} ${
                                isActive
                                    ? 'bg-accent scale-y-125'
                                    : 'bg-sec/70'
                            }`}
                        />
                    )
                })}
            </div>

            {/* Interactive Table of Contents (Reveals smoothly on hover) */}
            <h1 className="group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out text-sm font-bold tracking-tight text-fg flex items-center gap-2">
                <span>On this page</span>
                <Sparkles size={13} className="text-accent" />
            </h1>

            <div className="group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out w-full space-y-1 text-xs sm:text-sm text-sec max-h-[70vh] overflow-y-auto pr-2">
                {groupedHeadings.map((group, gIdx) => {
                    const isParentActive = activeSlug === group.parent.slug

                    return (
                        <div key={gIdx} className="space-y-0.5">
                            {/* Main H2 Heading */}
                            <a
                                href={`#${group.parent.slug}`}
                                onClick={(e) => handleScroll(e, group.parent.slug)}
                                className={`list block transition-all duration-200 leading-tight truncate cursor-pointer ${
                                    isParentActive
                                        ? 'text-accent font-semibold translate-x-1'
                                        : 'hover:text-fg hover:translate-x-0.5'
                                }`}
                                title={group.parent.text}
                            >
                                {group.parent.text}
                            </a>

                            {/* Subheadings Tree (like Series section) */}
                            {group.children.length > 0 && (
                                <div className="project-list pl-6! my-0.5">
                                    <div className="line translate-y-1"></div>
                                    {group.children.map((child, cIdx) => {
                                        const isChildActive = activeSlug === child.slug
                                        return (
                                            <a
                                                key={cIdx}
                                                href={`#${child.slug}`}
                                                onClick={(e) => handleScroll(e, child.slug)}
                                                className={`flex items-center px-[0.8rem]! gap-1.5 project w-fit group/sub hover:text-accent transition-colors text-xs text-sec ${
                                                    isChildActive ? 'text-accent font-semibold' : ''
                                                }`}
                                                title={child.text}
                                            >
                                                <div className="project-line w-5! translate-x-5! group-hover/sub:translate-x-3! transition-transform duration-300 ease-in-out"></div>
                                                <span className="truncate max-w-36 block">{child.text}</span>
                                            </a>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LeftLayout
