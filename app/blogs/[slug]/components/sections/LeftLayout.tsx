'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { ArrowLeftIcon } from 'lucide-react'

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/\\/g, '')
        .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
}

interface HeadingItem {
    text: string
    slug: string
    level: number
    widthPercent: number
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
        <div className="sticky top-0 max-w-56 w-full h-screen hidden xl:flex flex-col gap-5 justify-center bg-transparent group">
            {/* Back to blogs link */}
            <div className="absolute top-0 pt-5 cursor-pointer translate-x-8 w-fit">
                <a href="/blogs" className="project flex items-center gap-2 w-fit hover:text-accent transition-colors">
                    <ArrowLeftIcon size={20} className="list-line" /> back to blogs
                </a>
            </div>

            {/* Skeleton / Topic length minimap bars (Visible when not hovering) */}
            <div className="absolute w-[80%] space-y-2.5 group-hover:opacity-0 transition-all duration-300 ease-in-out pointer-events-none">
                {headings.map((h, idx) => {
                    const isActive = activeSlug === h.slug
                    return (
                        <div
                            key={idx}
                            style={{ width: `${h.widthPercent}%` }}
                            className={`h-0.5 rounded-full transition-all duration-300 ${
                                isActive
                                    ? 'bg-accent scale-y-125'
                                    : h.level === 2
                                    ? 'bg-sec/70'
                                    : 'bg-sec/40 ml-2.5'
                            }`}
                        />
                    )
                })}
            </div>

            {/* Interactive Table of Contents (Reveals smoothly on hover) */}
            <h1 className="group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out text-sm font-bold tracking-tight text-fg flex items-center gap-2">
                <span>On this page</span>
            </h1>

            <div className="group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out w-full space-y-2 text-xs sm:text-sm text-sec max-h-[70vh] overflow-y-auto pr-2">
                {headings.map((h, idx) => {
                    const isActive = activeSlug === h.slug
                    return (
                        <a
                            key={idx}
                            href={`#${h.slug}`}
                            onClick={(e) => handleScroll(e, h.slug)}
                            className={`list block transition-all duration-200 leading-snug truncate cursor-pointer ${
                                h.level === 3 ? 'pl-3' : ''
                            } ${
                                isActive
                                    ? 'text-accent font-semibold translate-x-1'
                                    : 'hover:text-fg hover:translate-x-0.5'
                            }`}
                            title={h.text}
                        >
                            {h.text}
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

export default LeftLayout
