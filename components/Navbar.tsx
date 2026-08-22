'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Search,
    Cat,
    Bird,
    Menu,
    X,
    Sparkles,
    Share2,
    Check,
    Terminal,
    Layers,
    BookOpen,
    User,
    ArrowUpRight,
    Compass,
    Sun,
    Moon,
    Sliders
} from 'lucide-react'

const navLinks = [
    { name: 'Blogs', href: '/blogs', active: true, badge: 'Active' },
    { name: 'Series', href: '#series', badge: '6' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
]

const searchItems = [
    { title: 'Reading Experience & Article Settings', category: 'Settings', href: '/settings/reader', icon: Sliders },
    { title: 'Day 3: Learning React (JSX, Props, Bundlers)', category: 'Blog Post', href: '/blogs', icon: BookOpen },
    { title: 'Day 2: JavaScript Prerequisites for React', category: 'Blog Post', href: '/blogs', icon: BookOpen },
    { title: 'Day 1: Why I Started React in 2026', category: 'Blog Post', href: '/blogs', icon: BookOpen },
    { title: 'React Learning Journal Series', category: 'Series', href: '#series', icon: Layers },
    { title: '#react #javascript #webdev', category: 'Tags', href: '/blogs', icon: Terminal },
    { title: 'About Bismay.exe & Resume', category: 'Author', href: '#about', icon: User },
]

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [visible, setVisible] = useState(true)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [copied, setCopied] = useState(false)
    const [theme, setTheme] = useState<'dark' | 'light'>('dark')
    const [mounted, setMounted] = useState(false)

    // Initialize theme from localStorage or default to dark
    useEffect(() => {
        setMounted(true)
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
        if (savedTheme) {
            setTheme(savedTheme)
            document.documentElement.classList.remove('dark', 'light')
            document.documentElement.classList.add(savedTheme)
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            const initialTheme = prefersDark ? 'dark' : 'dark' // default to dark aesthetic
            setTheme(initialTheme)
            document.documentElement.classList.remove('dark', 'light')
            document.documentElement.classList.add(initialTheme)
        }
    }, [])

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(nextTheme)
        localStorage.setItem('theme', nextTheme)
        document.documentElement.classList.remove('dark', 'light')
        document.documentElement.classList.add(nextTheme)
    }

    // Handle scroll progress, hide/show on scroll direction, and header styling
    useEffect(() => {
        let lastY = window.scrollY

        const handleScroll = () => {
            const currentY = window.scrollY
            const totalScroll = document.documentElement.scrollTop || document.body.scrollTop
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const currentProgress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0

            setScrollProgress(currentProgress)
            setScrolled(totalScroll > 20)

            // Hide when scrolling down past 80px, show when scrolling up
            if (currentY > 10) {
                if (currentY > lastY && currentY - lastY > 6) {
                    // Scrolling down
                    setVisible(false)
                } else if (lastY - currentY > 6) {
                    // Scrolling up
                    setVisible(true)
                }
            } else {
                // Near top
                setVisible(true)
            }

            lastY = currentY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Handle Cmd+K / Ctrl+K keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                setSearchOpen((prev) => !prev)
            }
            if (e.key === 'Escape') {
                setSearchOpen(false)
                setMobileMenuOpen(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const handleCopy = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const filteredSearch = searchItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const isHeaderVisible = visible || mobileMenuOpen || searchOpen

    return (
        <>
            <header
                className={`sticky top-0 z-9999 w-full h-16 bg-linear-to-b from-bg/90 via-bg/70 to-bg/0 transition-all duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full shadow-none pointer-events-none'
                    } ${scrolled
                        ? '0border-b border-fg/8 zshadow-2xl shadow-bg'
                        : '0border-b border-fg/4'
                    }`}
            >

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Brand / Logo */}
                        <div className="flex items-center gap-6">
                            <Link
                                href="/blogs"
                                className="group flex items-center gap-3 py-1 px-1.5 -ml-1.5 rounded-xl hover:bg-black/4 dark:hover:bg-white/4 transition-all duration-200"
                            >
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-sans font-bold text-[15px] tracking-tight text-fg group-hover:text-accent transition-colors">
                                            Bismay<span className="text-accent">.exe</span>
                                        </span>
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Available for work" />
                                    </div>
                                    <span className="text-[11px] font-mono text-sec tracking-wider group-hover:opacity-80 transition-colors">
                                        ~/blogs
                                    </span>
                                </div>
                            </Link>

                            {/* Nav Links (Desktop) */}
                            <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-black/8 dark:border-white/8">
                                {navLinks.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 flex items-center gap-2 ${item.active
                                            ? 'text-fg bg-black/6 dark:bg-white/8 font-semibold border border-black/8 dark:border-white/1'
                                            : 'text-sec hover:text-fg hover:bg-black/3 dark:hover:bg-white/4'
                                            }`}
                                    >
                                        <span>{item.name}</span>
                                        {item.badge && (
                                            <span
                                                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${item.active
                                                    ? 'bg-accent/20 text-accent border border-accent/30'
                                                    : 'bg-black/6 dark:bg-white/6 text-sec'
                                                    }`}
                                            >
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Search & Actions (Right) */}
                        <div className="flex items-center gap-2">
                            {/* Command / Search Trigger */}
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="group relative flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-black/3 dark:bg-white/3 hover:bg-black/6 dark:hover:bg-white/7 border border-black/8 dark:border-white/8 hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 cursor-pointer text-xs text-sec hover:text-fg"
                                title="Search posts & topics"
                            >
                                <Search size={14} className="text-sec group-hover:text-accent transition-colors" />
                                <span className="hidden sm:inline font-sans text-xs">Search blogs...</span>
                                <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-black/5 dark:bg-white/6 border border-black/8 dark:border-white/8 rounded text-sec group-hover:text-fg">
                                    <span className="text-[11px]">⌘</span>K
                                </kbd>
                            </button>

                            {/* Light / Dark Theme Toggle Button */}
                            <button
                                onClick={toggleTheme}
                                className="relative flex items-center justify-center w-8.5 h-8.5 rounded-xl bg-black/3 dark:bg-white/3 hover:bg-black/8 dark:hover:bg-white/8 border border-black/8 dark:border-white/8 hover:border-black/20 dark:hover:border-white/20 text-sec hover:text-accent transition-all duration-300 cursor-pointer overflow-hidden group"
                                title={mounted && theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                                aria-label="Toggle Theme"
                            >
                                <div className="relative w-4 h-4 flex items-center justify-center">
                                    {mounted && theme === 'dark' ? (
                                        <Sun
                                            size={15}
                                            className="transform rotate-0 transition-transform duration-300 text-amber-300 group-hover:rotate-45"
                                        />
                                    ) : (
                                        <Moon
                                            size={15}
                                            className="transform -rotate-12 transition-transform duration-300 text-indigo-600 dark:text-indigo-400 group-hover:rotate-0"
                                        />
                                    )}
                                </div>
                            </button>

                            {/* Share button */}
                            <button
                                onClick={handleCopy}
                                className="hidden sm:flex items-center justify-center w-8.5 h-8.5 rounded-xl bg-black/3 dark:bg-white/3 hover:bg-black/8 dark:hover:bg-white/8 border border-black/8 dark:border-white/8 hover:border-black/20 dark:hover:border-white/20 text-sec hover:text-accent transition-all duration-200 cursor-pointer"
                                title={copied ? 'Link Copied!' : 'Copy Page Link'}
                            >
                                {copied ? (
                                    <Check size={15} className="text-emerald-400" />
                                ) : (
                                    <Share2 size={15} />
                                )}
                            </button>

                            {/* GitHub Link */}
                            <a
                                href="https://github.com/Bismay-exe"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center w-8.5 h-8.5 rounded-xl bg-black/3 dark:bg-white/3 hover:bg-black/8 dark:hover:bg-white/8 border border-black/8 dark:border-white/8 hover:border-black/20 dark:hover:border-white/20 text-sec hover:text-fg transition-all duration-200"
                                title="GitHub Profile"
                            >
                                <Cat size={15} />
                            </a>

                            {/* Connect / Newsletter CTA */}
                            <a
                                href="#about"
                                className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-linear-to-r from-accent/20 to-purple-500/20 hover:from-accent/30 hover:to-purple-500/30 text-xs font-mono font-medium text-fg border border-accent/30 hover:border-accent/60 transition-all duration-300 shadow-sm shadow-purple-900/10 group"
                            >
                                <Sparkles size={13} className="text-accent group-hover:rotate-12 transition-transform duration-300" />
                                <span>Connect</span>
                                <ArrowUpRight size={13} className="text-sec group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-black/3 dark:bg-white/3 border border-black/8 dark:border-white/8 text-sec hover:text-fg transition-colors"
                                aria-label="Toggle Navigation Menu"
                            >
                                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-black/8 dark:border-white/8 bg-bg/95 backdrop-blur-2xl px-5 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="space-y-1">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-mono ${item.active
                                        ? 'bg-black/6 dark:bg-white/8 text-fg font-medium'
                                        : 'text-sec hover:text-fg hover:bg-black/4 dark:hover:bg-white/4'
                                        }`}
                                >
                                    <span>{item.name}</span>
                                    {item.badge && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>

                        <div className="pt-3 border-t border-black/8 dark:border-white/8 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-sec hover:text-fg flex items-center gap-1.5 text-xs font-mono"
                                    title="Toggle Theme"
                                >
                                    {mounted && theme === 'dark' ? <Sun size={15} className="text-amber-300" /> : <Moon size={15} className="text-indigo-500" />}
                                    <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
                                </button>
                                <a
                                    href="https://github.com/Bismay-exe"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-sec hover:text-fg"
                                >
                                    <Cat size={16} />
                                </a>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-sec hover:text-fg flex items-center gap-1 text-xs font-mono"
                                >
                                    {copied ? <Check size={15} className="text-emerald-400" /> : <Share2 size={15} />}
                                    <span>{copied ? 'Copied' : 'Share'}</span>
                                </button>
                            </div>

                            <a
                                href="#about"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3.5 py-1.5 rounded-lg bg-accent text-white dark:text-[#0C0C0C] font-semibold text-xs font-mono flex items-center gap-1.5"
                            >
                                <Sparkles size={13} />
                                <span>Connect</span>
                            </a>
                        </div>
                    </div>
                )}

                {/* Real-time Reading Scroll Progress Bar */}
                {/* <div className="w-full h-0.75 bg-transparent -mb-1 z-0">
                    <div
                        className="h-full bg-linear-to-r from-purple-500 via-accent to-indigo-400 transition-all duration-150 ease-out"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div> */}
            </header>

            {/* Spotlight / Command Search Dialog */}
            {searchOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setSearchOpen(false)}
                    />

                    {/* Dialog Box */}
                    <div className="relative w-full max-w-lg rounded-2xl bg-bg border border-black/12 dark:border-white/12 shadow-2xl shadow-purple-950/20 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
                        {/* Search Input Bar */}
                        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-black/8 dark:border-white/8">
                            <Search size={18} className="text-accent" />
                            <input
                                type="text"
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search blogs, series, tags, or topics..."
                                className="w-full bg-transparent text-sm text-fg placeholder:text-sec focus:outline-none font-sans"
                            />
                            <kbd
                                onClick={() => setSearchOpen(false)}
                                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/6 dark:bg-white/8 text-sec border border-black/8 dark:border-white/8 cursor-pointer hover:text-fg"
                            >
                                ESC
                            </kbd>
                        </div>

                        {/* Search Results */}
                        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                            {filteredSearch.length > 0 ? (
                                filteredSearch.map((item, idx) => {
                                    const IconComponent = item.icon
                                    return (
                                        <Link
                                            key={idx}
                                            href={item.href}
                                            onClick={() => setSearchOpen(false)}
                                            className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/6 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-black/4 dark:bg-white/4 text-sec group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                                                    <IconComponent size={16} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-fg">
                                                        {item.title}
                                                    </span>
                                                    <span className="text-[11px] font-mono text-sec">
                                                        {item.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <ArrowUpRight size={14} className="text-sec group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                        </Link>
                                    )
                                })
                            ) : (
                                <div className="py-8 text-center text-xs font-mono text-sec">
                                    No results found for "{searchQuery}"
                                </div>
                            )}
                        </div>

                        {/* Search Footer */}
                        <div className="px-4 py-2 bg-black/2 dark:bg-white/2 border-t border-black/6 dark:border-white/6 flex items-center justify-between text-[11px] font-mono text-sec">
                            <span>Navigate with ⌘K</span>
                            <span>Bismay's Developer Blog</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
