export type HeaderElementId = 'topbar' | 'banner' | 'author' | 'title' | 'tags'

export type ContentWidth = 'narrow' | 'default' | 'wide'

export type BannerWidth = 'contained' | 'breakout' | 'awwwards-80' | 'full-bleed'

export type TitleWidth = 'contained' | 'breakout' | 'awwwards-80' | 'full-bleed'

export type AuthorStyle = 'default' | 'overlap' | 'compact'

export type HeaderAlignment = 'left' | 'center'

export type FontChoice = 'sans' | 'inter-tight' | 'serif' | 'mono' | 'space-mono' | 'roboto'

export type ReaderThemeMode = 'system' | 'light' | 'dim' | 'dark'

export type VideoPlayerSkin = 'modern' | 'minimal'

export interface ReaderSettings {
    presets: ReaderPresetId[]
    appearance: {
        theme: ReaderThemeMode
        accentColor: string
        showReadingProgress: boolean
        reduceMotion: boolean
    }
    typography: {
        titleFont: {
            titleWidth: TitleWidth
            titleAlignment: HeaderAlignment
            titleFont: FontChoice
            titleFontWeight: number
            titleScale: number
            titleUppercase: boolean
        }
        headingFont: {
            headingFont: FontChoice
            headingFontWeight: number
            headingScale: number
            headingMarginTop: number
            headingMarginBottom: number
        }
        bodyFont: {
            bodyFont: FontChoice
            bodyFontSize: number
            lineHeight: number
            paragraphSpacing: number
            bodyFontWeight: number
        }
        codeFont: {
            codeFont: 'mono' | 'space-mono'
            codeFontSize: number
            lineHeight: number
            paragraphSpacing: number
            codeFontWeight: number
        }
        // Aliases for backwards compatibility with article renderer:
        headingFontChoice?: FontChoice
        bodyFontChoice?: FontChoice
        codeFontChoice?: FontChoice
        bodyFontSize?: number
        bodyFontWeight?: number
        headingFontWeight?: number
        titleFontWeight?: number
        titleScale?: number
        titleUppercase?: boolean
        lineHeight?: number
        paragraphSpacing?: number
        headingMarginTop?: number
        headingMarginBottom?: number
        headingScale?: number
    }
    layout: {
        contentWidth: ContentWidth
        showNavbar: boolean
        showLeftSidebar: boolean
        showTableOfContents: boolean
        showRightSidebar: boolean
        // Aliases:
        headerOrder?: HeaderElementId[]
        headerVisibility?: Record<HeaderElementId, boolean>
        bannerWidth?: BannerWidth
        titleWidth?: TitleWidth
        authorStyle?: AuthorStyle
        bannerMarginTop?: number
        bannerMarginBottom?: number
        headerAlignment?: HeaderAlignment
        rightWidgets?: {
            profile: boolean
            series: boolean
            subscribeForm: boolean
            socials: boolean
        }
    }
    articleLayout: {
        headerBuilder: {
            headerOrder: HeaderElementId[]
            headerVisibility: Record<HeaderElementId, boolean>
        }
        headerAlignment: HeaderAlignment
        bannerWidth: BannerWidth
        titleWidth: TitleWidth
        authorStyle: AuthorStyle
        bannerMarginTop: number
        bannerMarginBottom: number
    }
    articleInformation: {
        showReadingTime: boolean
        showPublishedDate: boolean
        showCategory: boolean
        showShareButtons: boolean
    }
    media: {
        videoPlayerSkin: VideoPlayerSkin
    }
    widgets: {
        profile: boolean
        series: boolean
        subscribeForm: boolean
        socialLinks: boolean
    }
}

export type ReaderPresetId =
    | 'default'
    | 'minimal'
    | 'magazine'
    | 'developer'
    | 'awwwards'
    | 'editorial'
    | 'creator'

export interface ReaderPreset {
    id: ReaderPresetId
    name: string
    tagline: string
    description: string
    iconSymbol?: string
    badge?: string
    settings: Partial<ReaderSettings>
}
