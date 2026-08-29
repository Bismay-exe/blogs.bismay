import { ReaderSettings } from './types'
import { DEFAULT_WIDGET_ITEMS } from '@/lib/widgets-settings/defaults'

export { DEFAULT_WIDGET_ITEMS } from '@/lib/widgets-settings/defaults'

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
        commentForm: false,
        items: DEFAULT_WIDGET_ITEMS,
    },
}

export function getFontFamily(choice?: string): string {
    switch (choice) {
        case 'inter-tight':
            return 'var(--font-inter-tight), "Inter Tight", sans-serif'
        case 'inter':
            return 'var(--font-sans), "Inter", sans-serif'
        case 'serif':
            return 'var(--font-serif), Lora, Georgia, serif'
        case 'roboto':
            return 'var(--font-roboto), Roboto, sans-serif'
        case 'sans':
            return 'var(--font-dm-sans), "DM Sans", system-ui, sans-serif'
        case 'mono':
            return 'var(--font-mono), "JetBrains Mono", monospace'
        case 'space-mono':
            return 'var(--font-space-mono), "Space Mono", monospace'
        case 'dm-mono':
            return 'var(--font-dm-mono), "DM Mono", monospace'
        default:
            return 'var(--font-sans), "Inter", system-ui, sans-serif'
    }
}
