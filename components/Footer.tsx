'use client'

import React from 'react'
import Link from 'next/link'
import {
    Cat,
    Bird,
    CatIcon,
} from 'lucide-react'
import FooterReveal from '@/components/pixel-perfect/footer-reveal'

interface FooterProps {
    className?: string
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <FooterReveal className={className}>
            <footer className="w-full bg-fg text-sec py-16 sm:py-24 px-6 sm:px-12 lg:px-16">
                <div className="max-w-7xl mx-auto space-y-16">
                    {/* Brand Title (Sesame aesthetic) */}
                    <div>
                        <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.2em] uppercase text-sec font-light">
                            Bismay
                        </h2>
                    </div>

                    {/* Navigation Columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-16 text-sm text-sec">
                        {/* Column 1 */}
                        <div className="flex flex-col space-y-3.5">
                            <Link href="/" className="hover:text-bg transition-colors duration-150">
                                Home
                            </Link>
                            <Link href="/blogs" className="hover:text-bg transition-colors duration-150">
                                Blog
                            </Link>
                            <Link href="/about" className="hover:text-bg transition-colors duration-150">
                                About
                            </Link>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col space-y-3.5">
                            <Link href="/#series" className="hover:text-bg transition-colors duration-150">
                                Series
                            </Link>
                            <Link href="/settings/reader" className="hover:text-bg transition-colors duration-150">
                                Reader Settings
                            </Link>
                            <Link href="mailto:contact@bismay.dev" className="hover:text-bg transition-colors duration-150">
                                Contact me
                            </Link>
                        </div>

                        {/* Column 3: Socials */}
                        <div className="flex flex-col space-y-3.5">
                            <a
                                href="https://github.com/Bismay-exe"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 hover:text-bg transition-colors duration-150"
                            >
                                <Cat className="h-4 w-4" />
                                <span>GitHub</span>
                            </a>
                            <a
                                href="https://x.com/Bismay_exe"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 hover:text-bg transition-colors duration-150"
                            >
                                <Bird className="h-4 w-4" />
                                <span>X</span>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 hover:text-bg transition-colors duration-150"
                            >
                                <CatIcon className="h-4 w-4" />
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>

                    {/* Bottom Copyright & Legal Row */}
                    <div className="pt-8 border-t border-sec flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-sec">
                        <p>Copyright © {new Date().getFullYear()} Bismay. All rights reserved.</p>
                        <div className="flex flex-wrap items-center gap-6">
                            <Link href="/rss.xml" className="hover:text-sec transition-colors">
                                RSS Feed
                            </Link>
                            <Link href="/sitemap.xml" className="hover:text-sec transition-colors">
                                Sitemap
                            </Link>
                            <Link href="/settings/reader/typography" className="hover:text-sec transition-colors">
                                Typography Lab
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </FooterReveal>
    )
}

export default Footer
