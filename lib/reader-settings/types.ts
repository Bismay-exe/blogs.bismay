export type HeaderElementId = 'topbar' | 'banner' | 'author' | 'title' | 'tags'

export type ContentWidth = 'narrow' | 'default' | 'wide'

export type BannerWidth = 'contained' | 'breakout' | 'awwwards-80' | 'full-bleed'

export type TitleWidth = 'contained' | 'breakout' | 'awwwards-80' | 'full-bleed'

export type HeaderAlignment = 'left' | 'center'

export type FontChoice = 'sans' | 'inter-tight' | 'serif' | 'mono' | 'space-mono'

export interface ReaderLayoutSettings {
    showNavbar: boolean
    showLeftSidebar: boolean
    showRightSidebar: boolean
    contentWidth: ContentWidth
    bannerWidth: BannerWidth
    titleWidth: TitleWidth
    bannerMarginTop: number // in px, e.g. 24
    bannerMarginBottom: number // in px, e.g. 32
    headerAlignment: HeaderAlignment
    headerOrder: HeaderElementId[]
    headerVisibility: Record<HeaderElementId, boolean>
    rightWidgets: {
        profile: boolean
        series: boolean
        subscribeForm: boolean
        socials: boolean
    }
}

export interface ReaderTypographySettings {
    headingFont: FontChoice
    bodyFont: FontChoice
    codeFont: 'mono' | 'space-mono'
    bodyFontSize: number // in px, e.g. 16.5
    bodyFontWeight: number // e.g. 300, 400, 500
    headingFontWeight: number // e.g. 400, 500, 600, 700
    titleFontWeight: number // e.g. 700, 800, 900
    titleScale: number // multiplier e.g. 1.0 to 2.2
    titleUppercase: boolean // uppercase transform
    lineHeight: number // unitless, e.g. 1.8
    paragraphSpacing: number // in px, e.g. 24
    headingMarginTop: number // in px, e.g. 32
    headingMarginBottom: number // in px, e.g. 12
    letterSpacing: number // in em, e.g. 0
    headingScale: number // multiplier e.g. 1.0
}

export interface ReaderAppearanceSettings {
    showReadingProgress: boolean
    showTableOfContents: boolean
    showShareButtons: boolean
    showReadingTime: boolean
    showPublishedDate: boolean
    showCategory: boolean
}

export interface ReaderSettings {
    layout: ReaderLayoutSettings
    typography: ReaderTypographySettings
    appearance: ReaderAppearanceSettings
}

export type ReaderPresetId =
    | 'default'
    | 'awwwards'
    | 'minimal'
    | 'magazine'
    | 'developer'
    | 'distraction-free'

export interface ReaderPreset {
    id: ReaderPresetId
    name: string
    tagline: string
    description: string
    badge?: string
    settings: ReaderSettings
}
