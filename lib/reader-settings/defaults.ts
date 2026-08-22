import { ReaderSettings } from './types'

export const DEFAULT_READER_SETTINGS: ReaderSettings = {
    layout: {
        showNavbar: true,
        showLeftSidebar: true,
        showRightSidebar: true,
        contentWidth: 'default',
        bannerWidth: 'contained',
        titleWidth: 'contained',
        authorStyle: 'default',
        bannerMarginTop: 24,
        bannerMarginBottom: 32,
        headerAlignment: 'left',
        headerOrder: ['topbar', 'banner', 'author', 'title', 'tags'],
        headerVisibility: {
            topbar: true,
            banner: true,
            author: true,
            title: true,
            tags: true,
        },
        rightWidgets: {
            profile: true,
            series: true,
            subscribeForm: true,
            socials: true,
        },
    },
    typography: {
        headingFont: 'sans',
        bodyFont: 'sans',
        codeFont: 'mono',
        bodyFontSize: 16.5,
        bodyFontWeight: 400,
        headingFontWeight: 700,
        titleFontWeight: 700,
        titleScale: 1.0,
        titleUppercase: false,
        lineHeight: 1.8,
        paragraphSpacing: 24,
        headingMarginTop: 32,
        headingMarginBottom: 12,
        letterSpacing: 0,
        headingScale: 1.0,
    },
    appearance: {
        showReadingProgress: true,
        showTableOfContents: true,
        showShareButtons: true,
        showReadingTime: true,
        showPublishedDate: true,
        showCategory: true,
        videoPlayerSkin: 'modern',
    },
}

export function getFontFamily(choice: string): string {
    switch (choice) {
        case 'inter-tight':
            return 'var(--font-inter-tight), var(--font-sans), system-ui, sans-serif'
        case 'serif':
            return 'var(--font-serif), Georgia, Cambria, "Times New Roman", Times, serif'
        case 'mono':
            return 'var(--font-mono), "JetBrains Mono", Menlo, Monaco, Consolas, monospace'
        case 'space-mono':
            return 'var(--font-space-mono), "Space Mono", monospace'
        case 'sans':
        default:
            return 'var(--font-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }
}
