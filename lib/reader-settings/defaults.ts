import { ReaderSettings } from './types'

export const DEFAULT_READER_SETTINGS: ReaderSettings = {
    presets: ['default', 'minimal', 'magazine', 'developer', 'awwwards', 'editorial'],
    appearance: {
        theme: 'system',
        accentColor: '#ff5c35',
        showReadingProgress: true,
        reduceMotion: false,
    },
    typography: {
        titleFont: {
            titleWidth: 'contained',
            titleAlignment: 'left',
            titleFont: 'inter-tight',
            titleFontWeight: 700,
            titleScale: 1,
            titleUppercase: false,
        },
        headingFont: {
            headingFont: 'inter-tight',
            headingFontWeight: 600,
            headingScale: 1,
            headingMarginTop: 32,
            headingMarginBottom: 12,
        },
        bodyFont: {
            bodyFont: 'sans',
            bodyFontSize: 17,
            lineHeight: 1.77,
            paragraphSpacing: 26,
            bodyFontWeight: 400,
        },
        codeFont: {
            codeFont: 'mono',
            codeFontSize: 16.5,
            lineHeight: 1.8,
            paragraphSpacing: 24,
            codeFontWeight: 400,
        },
    },
    layout: {
        contentWidth: 'default',
        showNavbar: true,
        showLeftSidebar: true,
        showTableOfContents: true,
        showRightSidebar: true,
    },
    articleLayout: {
        headerBuilder: {
            headerOrder: ['topbar', 'banner', 'author', 'title', 'tags'],
            headerVisibility: {
                topbar: true,
                banner: true,
                author: true,
                title: true,
                tags: true,
            },
        },
        headerAlignment: 'left',
        bannerWidth: 'contained',
        titleWidth: 'contained',
        authorStyle: 'default',
        bannerMarginTop: 24,
        bannerMarginBottom: 32,
    },
    articleInformation: {
        showReadingTime: true,
        showPublishedDate: true,
        showCategory: true,
        showShareButtons: true,
    },
    media: {
        videoPlayerSkin: 'modern',
    },
    widgets: {
        profile: true,
        series: true,
        subscribeForm: true,
        socialLinks: true,
    },
}

export function getFontFamily(choice?: string): string {
    switch (choice) {
        case 'inter-tight':
            return '"Inter Tight", var(--font-inter-tight), sans-serif'
        case 'serif':
            return 'Lora, var(--font-serif), Georgia, serif'
        case 'mono':
            return '"JetBrains Mono", var(--font-mono), monospace'
        case 'space-mono':
            return '"Space Mono", var(--font-space-mono), monospace'
        case 'roboto':
            return '"Roboto", sans-serif'
        case 'sans':
        default:
            return '"DM Sans", var(--font-sans), system-ui, -apple-system, sans-serif'
    }
}
