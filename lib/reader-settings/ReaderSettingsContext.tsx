'use client'

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import {
    ReaderSettings,
    ReaderPresetId,
    HeaderElementId,
    ReaderThemeMode,
    VideoPlayerSkin,
    ContentWidth,
    BannerWidth,
    TitleWidth,
    AuthorStyle,
    HeaderAlignment,
    FontChoice,
    WidgetInstance,
} from './types'
import { DEFAULT_READER_SETTINGS, DEFAULT_WIDGET_ITEMS, getFontFamily } from './defaults'
import { READER_PRESETS } from './presets'

export const READER_SETTINGS_STORAGE_KEY = 'reader_experience_settings_v2'

interface ReaderSettingsContextType {
    settings: ReaderSettings
    activePreset: ReaderPresetId | 'custom'
    isLoaded: boolean
    updateAppearance: (patch: Partial<ReaderSettings['appearance']>) => void
    updateTypography: (patch: Partial<ReaderSettings['typography']>) => void
    updateTitleFont: (patch: Partial<ReaderSettings['typography']['titleFont']>) => void
    updateHeadingFont: (patch: Partial<ReaderSettings['typography']['headingFont']>) => void
    updateBodyFont: (patch: Partial<ReaderSettings['typography']['bodyFont']>) => void
    updateCodeFont: (patch: Partial<ReaderSettings['typography']['codeFont']>) => void
    updateLayout: (patch: Partial<ReaderSettings['layout']>) => void
    updateArticleLayout: (patch: Partial<ReaderSettings['articleLayout']>) => void
    updateArticleInformation: (patch: Partial<ReaderSettings['articleInformation']>) => void
    updateMedia: (patch: Partial<ReaderSettings['media']>) => void
    updateWidgets: (patch: Partial<ReaderSettings['widgets']>) => void
    reorderHeader: (newOrder: HeaderElementId[]) => void
    toggleHeaderVisibility: (id: HeaderElementId) => void
    toggleWidget: (id: string | keyof ReaderSettings['widgets']) => void
    reorderWidgets: (newItems: WidgetInstance[]) => void
    toggleWidgetActive: (id: string) => void
    addWidget: (widget: WidgetInstance) => void
    updateWidgetConfig: (id: string, patch: Partial<WidgetInstance>) => void
    deleteWidget: (id: string) => void
    resetWidgets: () => void
    applyPreset: (presetId: ReaderPresetId) => void
    resetToDefaults: () => void
}

const ReaderSettingsContext = createContext<ReaderSettingsContextType | null>(null)

export const ReaderSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<ReaderSettings>(DEFAULT_READER_SETTINGS)
    const [activePreset, setActivePreset] = useState<ReaderPresetId | 'custom'>('default')
    const [isLoaded, setIsLoaded] = useState(false)

    // Helper to merge partial settings with defaults
    const mergeSettings = (raw: Partial<ReaderSettings>): ReaderSettings => {
        // Synthesize widget items if not provided or migrate from legacy booleans
        let resolvedWidgetItems: WidgetInstance[] = []

        if (Array.isArray(raw.widgets?.items) && raw.widgets.items.length > 0) {
            resolvedWidgetItems = raw.widgets.items
        } else {
            // Migrate from legacy booleans or fallback to default
            resolvedWidgetItems = DEFAULT_WIDGET_ITEMS.map((item) => {
                if (item.id === 'profile' && raw.widgets?.profile !== undefined) {
                    return { ...item, enabled: raw.widgets.profile }
                }
                if (item.id === 'series' && raw.widgets?.series !== undefined) {
                    return { ...item, enabled: raw.widgets.series }
                }
                if (item.id === 'subscribeForm' && raw.widgets?.subscribeForm !== undefined) {
                    return { ...item, enabled: raw.widgets.subscribeForm }
                }
                if (item.id === 'socialLinks' && (raw.widgets?.socialLinks !== undefined || (raw.widgets as any)?.socials !== undefined)) {
                    return { ...item, enabled: raw.widgets?.socialLinks ?? (raw.widgets as any)?.socials }
                }
                if (item.id === 'commentForm' && raw.widgets?.commentForm !== undefined) {
                    return { ...item, enabled: raw.widgets.commentForm }
                }
                return item
            })
        }

        const isEnabled = (id: string, fallback: boolean) => {
            const found = resolvedWidgetItems.find((w) => w.id === id)
            return found ? found.enabled : fallback
        }

        return {
            presets: raw.presets || DEFAULT_READER_SETTINGS.presets,
            appearance: {
                ...DEFAULT_READER_SETTINGS.appearance,
                ...(raw.appearance || {}),
            },
            typography: {
                titleFont: {
                    ...DEFAULT_READER_SETTINGS.typography.titleFont,
                    ...(raw.typography?.titleFont || {}),
                },
                headingFont: {
                    ...DEFAULT_READER_SETTINGS.typography.headingFont,
                    ...(raw.typography?.headingFont || {}),
                },
                bodyFont: {
                    ...DEFAULT_READER_SETTINGS.typography.bodyFont,
                    ...(raw.typography?.bodyFont || {}),
                },
                codeFont: {
                    ...DEFAULT_READER_SETTINGS.typography.codeFont,
                    ...(raw.typography?.codeFont || {}),
                },
                // Backward-compat computed aliases:
                get headingFontChoice() { return this.headingFont.headingFont },
                get bodyFontChoice() { return this.bodyFont.bodyFont },
                get codeFontChoice() { return this.codeFont.codeFont },
                get bodyFontSize() { return this.bodyFont.bodyFontSize },
                get bodyFontWeight() { return this.bodyFont.bodyFontWeight },
                get headingFontWeight() { return this.headingFont.headingFontWeight },
                get titleFontWeight() { return this.titleFont.titleFontWeight },
                get titleScale() { return this.titleFont.titleScale },
                get titleUppercase() { return this.titleFont.titleUppercase },
                get lineHeight() { return this.bodyFont.lineHeight },
                get paragraphSpacing() { return this.bodyFont.paragraphSpacing },
                get headingMarginTop() { return this.headingFont.headingMarginTop },
                get headingMarginBottom() { return this.headingFont.headingMarginBottom },
                get headingScale() { return this.headingFont.headingScale },
            },
            layout: {
                ...DEFAULT_READER_SETTINGS.layout,
                ...(raw.layout || {}),
                // Backward-compat aliases mapping to articleLayout:
                get headerOrder() { return raw.articleLayout?.headerBuilder?.headerOrder || DEFAULT_READER_SETTINGS.articleLayout.headerBuilder.headerOrder },
                get headerVisibility() { return raw.articleLayout?.headerBuilder?.headerVisibility || DEFAULT_READER_SETTINGS.articleLayout.headerBuilder.headerVisibility },
                get bannerWidth() { return raw.articleLayout?.bannerWidth || DEFAULT_READER_SETTINGS.articleLayout.bannerWidth },
                get titleWidth() { return raw.articleLayout?.titleWidth || DEFAULT_READER_SETTINGS.articleLayout.titleWidth },
                get authorStyle() { return raw.articleLayout?.authorStyle || DEFAULT_READER_SETTINGS.articleLayout.authorStyle },
                get bannerMarginTop() { return raw.articleLayout?.bannerMarginTop || DEFAULT_READER_SETTINGS.articleLayout.bannerMarginTop },
                get bannerMarginBottom() { return raw.articleLayout?.bannerMarginBottom || DEFAULT_READER_SETTINGS.articleLayout.bannerMarginBottom },
                get headerAlignment() { return raw.articleLayout?.headerAlignment || DEFAULT_READER_SETTINGS.articleLayout.headerAlignment },
                get rightWidgets() {
                    return {
                        profile: isEnabled('profile', DEFAULT_READER_SETTINGS.widgets.profile),
                        series: isEnabled('series', DEFAULT_READER_SETTINGS.widgets.series),
                        subscribeForm: isEnabled('subscribeForm', DEFAULT_READER_SETTINGS.widgets.subscribeForm),
                        socials: isEnabled('socialLinks', DEFAULT_READER_SETTINGS.widgets.socialLinks),
                        commentForm: isEnabled('commentForm', false),
                    }
                },
            },
            articleLayout: {
                headerBuilder: {
                    headerOrder: raw.articleLayout?.headerBuilder?.headerOrder || DEFAULT_READER_SETTINGS.articleLayout.headerBuilder.headerOrder,
                    headerVisibility: {
                        ...DEFAULT_READER_SETTINGS.articleLayout.headerBuilder.headerVisibility,
                        ...(raw.articleLayout?.headerBuilder?.headerVisibility || {}),
                    },
                },
                headerAlignment: raw.articleLayout?.headerAlignment || DEFAULT_READER_SETTINGS.articleLayout.headerAlignment,
                bannerWidth: raw.articleLayout?.bannerWidth || DEFAULT_READER_SETTINGS.articleLayout.bannerWidth,
                titleWidth: raw.articleLayout?.titleWidth || DEFAULT_READER_SETTINGS.articleLayout.titleWidth,
                authorStyle: raw.articleLayout?.authorStyle || DEFAULT_READER_SETTINGS.articleLayout.authorStyle,
                bannerMarginTop: raw.articleLayout?.bannerMarginTop ?? DEFAULT_READER_SETTINGS.articleLayout.bannerMarginTop,
                bannerMarginBottom: raw.articleLayout?.bannerMarginBottom ?? DEFAULT_READER_SETTINGS.articleLayout.bannerMarginBottom,
            },
            articleInformation: {
                ...DEFAULT_READER_SETTINGS.articleInformation,
                ...(raw.articleInformation || {}),
            },
            media: {
                ...DEFAULT_READER_SETTINGS.media,
                ...(raw.media || {}),
            },
            widgets: {
                ...DEFAULT_READER_SETTINGS.widgets,
                ...(raw.widgets || {}),
                profile: isEnabled('profile', DEFAULT_READER_SETTINGS.widgets.profile),
                series: isEnabled('series', DEFAULT_READER_SETTINGS.widgets.series),
                subscribeForm: isEnabled('subscribeForm', DEFAULT_READER_SETTINGS.widgets.subscribeForm),
                socialLinks: isEnabled('socialLinks', DEFAULT_READER_SETTINGS.widgets.socialLinks),
                commentForm: isEnabled('commentForm', false),
                items: resolvedWidgetItems,
            },
        }
    }

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const raw = localStorage.getItem(READER_SETTINGS_STORAGE_KEY)
            if (raw) {
                const parsed = JSON.parse(raw)
                const merged = mergeSettings(parsed)
                setSettings(merged)
            }
        } catch (error) {
            console.error('Failed to load reader settings:', error)
        } finally {
            setIsLoaded(true)
        }
    }, [])

    // Apply Theme & Accent Color dynamically to document.documentElement
    useEffect(() => {
        if (typeof window === 'undefined') return

        const theme = settings.appearance?.theme || 'system'
        const accent = settings.appearance?.accentColor || '#9b51e0'

        const applyThemeClass = (effectiveTheme: 'dark' | 'light') => {
            document.documentElement.classList.remove('dark', 'light')
            document.documentElement.classList.add(effectiveTheme)
            try {
                localStorage.setItem('theme', effectiveTheme)
            } catch {}
        }

        let mediaQuery: MediaQueryList | null = null
        const handleMediaChange = (e: MediaQueryListEvent) => {
            applyThemeClass(e.matches ? 'dark' : 'light')
        }

        if (theme === 'dark') {
            applyThemeClass('dark')
        } else if (theme === 'light') {
            applyThemeClass('light')
        } else {
            // 'system'
            mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            applyThemeClass(mediaQuery.matches ? 'dark' : 'light')
            mediaQuery.addEventListener('change', handleMediaChange)
        }

        // Apply accent color to CSS variables
        if (accent) {
            document.documentElement.style.setProperty('--acc', accent)
            document.documentElement.style.setProperty('--accent', accent)
            document.documentElement.style.setProperty('--reader-accent-color', accent)
        }

        return () => {
            if (mediaQuery) {
                mediaQuery.removeEventListener('change', handleMediaChange)
            }
        }
    }, [settings.appearance.theme, settings.appearance.accentColor])

    // Persist settings to localStorage
    const persistSettings = useCallback((newSettings: ReaderSettings) => {
        try {
            localStorage.setItem(READER_SETTINGS_STORAGE_KEY, JSON.stringify(newSettings))
            window.dispatchEvent(new CustomEvent('reader-settings-changed', { detail: newSettings }))
        } catch (error) {
            console.error('Failed to persist reader settings:', error)
        }
    }, [])

    const updateAppearance = useCallback((patch: Partial<ReaderSettings['appearance']>) => {
        setSettings((prev) => {
            const updated = mergeSettings({
                ...prev,
                appearance: { ...prev.appearance, ...patch },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const updateTypography = useCallback((patch: Partial<ReaderSettings['typography']>) => {
        setSettings((prev) => {
            const updated = mergeSettings({
                ...prev,
                typography: { ...prev.typography, ...patch },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const updateTitleFont = useCallback((patch: Partial<ReaderSettings['typography']['titleFont']>) => {
        setSettings((prev) => {
            const updated = mergeSettings({
                ...prev,
                typography: {
                    ...prev.typography,
                    titleFont: { ...prev.typography.titleFont, ...patch },
                },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const updateHeadingFont = useCallback((patch: Partial<ReaderSettings['typography']['headingFont']>) => {
        setSettings((prev) => {
            const updated = mergeSettings({
                ...prev,
                typography: {
                    ...prev.typography,
                    headingFont: { ...prev.typography.headingFont, ...patch },
                },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const updateBodyFont = useCallback((patch: Partial<ReaderSettings['typography']['bodyFont']>) => {
        setSettings((prev) => {
            const updated = mergeSettings({
                ...prev,
                typography: {
                    ...prev.typography,
                    bodyFont: { ...prev.typography.bodyFont, ...patch },
                },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const updateCodeFont = useCallback((patch: Partial<ReaderSettings['typography']['codeFont']>) => {
        setSettings((prev) => {
            const updated = mergeSettings({
                ...prev,
                typography: {
                    ...prev.typography,
                    codeFont: { ...prev.typography.codeFont, ...patch },
                },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const updateLayout = useCallback((patch: Partial<ReaderSettings['layout']>) => {
        setSettings((prev) => {
            const updated = mergeSettings({
                ...prev,
                layout: { ...prev.layout, ...patch },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const updateArticleLayout = useCallback((patch: Partial<ReaderSettings['articleLayout']>) => {
        setSettings((prev) => {
            const updated = mergeSettings({
                ...prev,
                articleLayout: { ...prev.articleLayout, ...patch },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const updateArticleInformation = useCallback((patch: Partial<ReaderSettings['articleInformation']>) => {
        setSettings((prev) => {
            const updated = mergeSettings({
                ...prev,
                articleInformation: { ...prev.articleInformation, ...patch },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const updateMedia = useCallback((patch: Partial<ReaderSettings['media']>) => {
        setSettings((prev) => {
            const updated = mergeSettings({
                ...prev,
                media: { ...prev.media, ...patch },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const updateWidgets = useCallback((patch: Partial<ReaderSettings['widgets']>) => {
        setSettings((prev) => {
            const updated = mergeSettings({
                ...prev,
                widgets: { ...prev.widgets, ...patch },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const reorderHeader = useCallback((newOrder: HeaderElementId[]) => {
        setSettings((prev) => {
            const updated = mergeSettings({
                ...prev,
                articleLayout: {
                    ...prev.articleLayout,
                    headerBuilder: {
                        ...prev.articleLayout.headerBuilder,
                        headerOrder: newOrder,
                    },
                },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const toggleHeaderVisibility = useCallback((id: HeaderElementId) => {
        setSettings((prev) => {
            const currentVis = prev.articleLayout.headerBuilder.headerVisibility
            const updated = mergeSettings({
                ...prev,
                articleLayout: {
                    ...prev.articleLayout,
                    headerBuilder: {
                        ...prev.articleLayout.headerBuilder,
                        headerVisibility: {
                            ...currentVis,
                            [id]: !currentVis[id],
                        },
                    },
                },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const reorderWidgets = useCallback((newItems: WidgetInstance[]) => {
        setSettings((prev) => {
            const updated = mergeSettings({
                ...prev,
                widgets: {
                    ...prev.widgets,
                    items: newItems,
                },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const toggleWidgetActive = useCallback((id: string) => {
        setSettings((prev) => {
            const items = prev.widgets.items || DEFAULT_WIDGET_ITEMS
            const updatedItems = items.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w))
            const updated = mergeSettings({
                ...prev,
                widgets: {
                    ...prev.widgets,
                    items: updatedItems,
                },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const toggleWidget = useCallback((id: string | keyof ReaderSettings['widgets']) => {
        setSettings((prev) => {
            const items = prev.widgets.items || DEFAULT_WIDGET_ITEMS
            const itemExists = items.some((w) => w.id === id)
            let updatedItems = items
            if (itemExists) {
                updatedItems = items.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w))
            }

            const updated = mergeSettings({
                ...prev,
                widgets: {
                    ...prev.widgets,
                    items: updatedItems,
                    ...(typeof id === 'string' && id in prev.widgets ? { [id]: !((prev.widgets as any)[id]) } : {}),
                },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const addWidget = useCallback((widget: WidgetInstance) => {
        setSettings((prev) => {
            const items = prev.widgets.items || DEFAULT_WIDGET_ITEMS
            const updatedItems = [...items, widget]
            const updated = mergeSettings({
                ...prev,
                widgets: {
                    ...prev.widgets,
                    items: updatedItems,
                },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const updateWidgetConfig = useCallback((id: string, patch: Partial<WidgetInstance>) => {
        setSettings((prev) => {
            const items = prev.widgets.items || DEFAULT_WIDGET_ITEMS
            const updatedItems = items.map((w) => (w.id === id ? { ...w, ...patch, config: { ...w.config, ...(patch.config || {}) } } : w))
            const updated = mergeSettings({
                ...prev,
                widgets: {
                    ...prev.widgets,
                    items: updatedItems,
                },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const deleteWidget = useCallback((id: string) => {
        setSettings((prev) => {
            const items = prev.widgets.items || DEFAULT_WIDGET_ITEMS
            const updatedItems = items.filter((w) => w.id !== id)
            const updated = mergeSettings({
                ...prev,
                widgets: {
                    ...prev.widgets,
                    items: updatedItems,
                },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const resetWidgets = useCallback(() => {
        setSettings((prev) => {
            const updated = mergeSettings({
                ...prev,
                widgets: {
                    ...prev.widgets,
                    items: DEFAULT_WIDGET_ITEMS,
                },
            })
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const applyPreset = useCallback((presetId: ReaderPresetId) => {
        const found = READER_PRESETS.find((p) => p.id === presetId)
        if (found) {
            const updated = mergeSettings(found.settings)
            setSettings(updated)
            setActivePreset(presetId)
            persistSettings(updated)
        }
    }, [persistSettings])

    const resetToDefaults = useCallback(() => {
        setSettings(DEFAULT_READER_SETTINGS)
        setActivePreset('default')
        persistSettings(DEFAULT_READER_SETTINGS)
    }, [persistSettings])

    const value = useMemo(
        () => ({
            settings,
            activePreset,
            isLoaded,
            updateAppearance,
            updateTypography,
            updateTitleFont,
            updateHeadingFont,
            updateBodyFont,
            updateCodeFont,
            updateLayout,
            updateArticleLayout,
            updateArticleInformation,
            updateMedia,
            updateWidgets,
            reorderHeader,
            toggleHeaderVisibility,
            toggleWidget,
            reorderWidgets,
            toggleWidgetActive,
            addWidget,
            updateWidgetConfig,
            deleteWidget,
            resetWidgets,
            applyPreset,
            resetToDefaults,
        }),
        [
            settings,
            activePreset,
            isLoaded,
            updateAppearance,
            updateTypography,
            updateTitleFont,
            updateHeadingFont,
            updateBodyFont,
            updateCodeFont,
            updateLayout,
            updateArticleLayout,
            updateArticleInformation,
            updateMedia,
            updateWidgets,
            reorderHeader,
            toggleHeaderVisibility,
            toggleWidget,
            reorderWidgets,
            toggleWidgetActive,
            addWidget,
            updateWidgetConfig,
            deleteWidget,
            resetWidgets,
            applyPreset,
            resetToDefaults,
        ]
    )

    return (
        <ReaderSettingsContext.Provider value={value}>
            {children}
        </ReaderSettingsContext.Provider>
    )
}

export function useReaderSettings() {
    const ctx = useContext(ReaderSettingsContext)
    if (!ctx) {
        throw new Error('useReaderSettings must be used within a ReaderSettingsProvider')
    }
    return ctx
}
