import { ReaderPreset } from './types'
import { DEFAULT_READER_SETTINGS } from './defaults'

export const READER_PRESETS: ReaderPreset[] = [
    {
        id: 'default',
        name: 'Default',
        tagline: 'Balanced reading experience',
        description: 'Standard multi-column layout with table of contents, author profile, and sidebar widgets.',
        iconSymbol: '◫',
        badge: 'Standard',
        settings: {
            ...DEFAULT_READER_SETTINGS,
            appearance: {
                theme: 'system',
                accentColor: '#ff5c35',
                showReadingProgress: true,
                reduceMotion: false,
            },
        },
    },
    {
        id: 'minimal',
        name: 'Minimal',
        tagline: 'Simple and distraction-free',
        description: 'Stripped-down layout focusing purely on title, author, and prose without sidebar distractions.',
        iconSymbol: '○',
        badge: 'Clean',
        settings: {
            ...DEFAULT_READER_SETTINGS,
            appearance: {
                theme: 'light',
                accentColor: '#ff5c35',
                showReadingProgress: true,
                reduceMotion: false,
            },
            layout: {
                contentWidth: 'narrow',
                showNavbar: true,
                showLeftSidebar: false,
                showTableOfContents: false,
                showRightSidebar: false,
            },
            articleLayout: {
                ...DEFAULT_READER_SETTINGS.articleLayout,
                authorStyle: 'compact',
            },
        },
    },
    {
        id: 'magazine',
        name: 'Magazine',
        tagline: 'Serif editorial reading',
        description: 'Visual-first presentation with prominent hero banner, Lora serif body typography, and rich widgets.',
        iconSymbol: 'Aa',
        badge: 'Serif',
        settings: {
            ...DEFAULT_READER_SETTINGS,
            appearance: {
                theme: 'light',
                accentColor: '#9b51e0',
                showReadingProgress: true,
                reduceMotion: false,
            },
            typography: {
                ...DEFAULT_READER_SETTINGS.typography,
                headingFont: {
                    ...DEFAULT_READER_SETTINGS.typography.headingFont,
                    headingFont: 'serif',
                },
                bodyFont: {
                    ...DEFAULT_READER_SETTINGS.typography.bodyFont,
                    bodyFont: 'serif',
                    bodyFontSize: 17.5,
                    lineHeight: 1.85,
                },
            },
            articleLayout: {
                ...DEFAULT_READER_SETTINGS.articleLayout,
                bannerWidth: 'breakout',
                titleWidth: 'breakout',
            },
        },
    },
    {
        id: 'developer',
        name: 'Developer',
        tagline: 'Technical and code-focused',
        description: 'Dark mode optimized for technical articles with full TOC rail, monospace accents, and expanded canvas.',
        iconSymbol: '</>',
        badge: 'Code',
        settings: {
            ...DEFAULT_READER_SETTINGS,
            appearance: {
                theme: 'dark',
                accentColor: '#6bcb77',
                showReadingProgress: true,
                reduceMotion: false,
            },
            typography: {
                ...DEFAULT_READER_SETTINGS.typography,
                headingFont: {
                    ...DEFAULT_READER_SETTINGS.typography.headingFont,
                    headingFont: 'space-mono',
                },
                bodyFont: {
                    ...DEFAULT_READER_SETTINGS.typography.bodyFont,
                    bodyFont: 'sans',
                    bodyFontSize: 16.5,
                },
                codeFont: {
                    ...DEFAULT_READER_SETTINGS.typography.codeFont,
                    codeFont: 'mono',
                    codeFontSize: 16,
                },
            },
            layout: {
                contentWidth: 'wide',
                showNavbar: true,
                showLeftSidebar: true,
                showTableOfContents: true,
                showRightSidebar: true,
            },
        },
    },
    {
        id: 'awwwards',
        name: 'Awwwards Editorial',
        tagline: 'Bold visual storytelling',
        description: 'Award-winning editorial aesthetic featuring centered title & metadata, giant title scale, and 85% viewport hero banner.',
        iconSymbol: '▰',
        badge: 'Bold',
        settings: {
            ...DEFAULT_READER_SETTINGS,
            appearance: {
                theme: 'light',
                accentColor: '#ff6b6b',
                showReadingProgress: true,
                reduceMotion: false,
            },
            typography: {
                ...DEFAULT_READER_SETTINGS.typography,
                titleFont: {
                    titleWidth: 'awwwards-80',
                    titleAlignment: 'center',
                    titleFont: 'inter-tight',
                    titleFontWeight: 800,
                    titleScale: 1.65,
                    titleUppercase: true,
                },
                headingFont: {
                    headingFont: 'inter-tight',
                    headingFontWeight: 400,
                    headingScale: 1.15,
                    headingMarginTop: 48,
                    headingMarginBottom: 16,
                },
                bodyFont: {
                    bodyFont: 'sans',
                    bodyFontSize: 17.5,
                    lineHeight: 1.85,
                    paragraphSpacing: 28,
                    bodyFontWeight: 300,
                },
            },
            layout: {
                contentWidth: 'wide',
                showNavbar: true,
                showLeftSidebar: false,
                showTableOfContents: false,
                showRightSidebar: false,
            },
            articleLayout: {
                ...DEFAULT_READER_SETTINGS.articleLayout,
                headerAlignment: 'center',
                bannerWidth: 'awwwards-80',
                titleWidth: 'awwwards-80',
                bannerMarginTop: 36,
                bannerMarginBottom: 48,
            },
        },
    },
    {
        id: 'editorial',
        name: 'Editorial',
        tagline: 'Magazine-grade editorial prose',
        description: 'Refined long-form journalism layout with rich serif typography and spacious paragraph margins.',
        iconSymbol: '✦',
        badge: 'Journal',
        settings: {
            ...DEFAULT_READER_SETTINGS,
            appearance: {
                theme: 'light',
                accentColor: '#ff5c35',
                showReadingProgress: true,
                reduceMotion: false,
            },
            typography: {
                ...DEFAULT_READER_SETTINGS.typography,
                titleFont: {
                    ...DEFAULT_READER_SETTINGS.typography.titleFont,
                    titleFont: 'serif',
                    titleScale: 1.2,
                },
                bodyFont: {
                    ...DEFAULT_READER_SETTINGS.typography.bodyFont,
                    bodyFont: 'serif',
                    bodyFontSize: 18,
                    lineHeight: 1.9,
                    paragraphSpacing: 28,
                },
            },
        },
    },
]
