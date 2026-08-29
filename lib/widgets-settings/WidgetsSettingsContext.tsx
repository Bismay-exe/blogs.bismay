'use client'

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import { WidgetInstance, WidgetsSettings, WidgetsSettingsContextType } from './types'
import { DEFAULT_WIDGET_ITEMS, DEFAULT_WIDGETS_SETTINGS } from './defaults'

export const WIDGETS_SETTINGS_STORAGE_KEY = 'widgets_experience_settings_v1'
const LEGACY_READER_SETTINGS_STORAGE_KEY = 'reader_experience_settings_v2'

const WidgetsSettingsContext = createContext<WidgetsSettingsContextType | null>(null)

export const WidgetsSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<WidgetsSettings>(DEFAULT_WIDGETS_SETTINGS)
    const [isLoaded, setIsLoaded] = useState(false)

    // Helper to merge raw stored state with defaults and migrate legacy reader settings
    const mergeWidgetsSettings = (raw: Partial<WidgetsSettings>): WidgetsSettings => {
        let resolvedItems: WidgetInstance[] = []

        if (Array.isArray(raw.items) && raw.items.length > 0) {
            resolvedItems = raw.items
        } else {
            resolvedItems = DEFAULT_WIDGET_ITEMS
        }

        return {
            items: resolvedItems,
            showRightSidebar: raw.showRightSidebar ?? DEFAULT_WIDGETS_SETTINGS.showRightSidebar,
        }
    }

    // Load from localStorage on mount (with fallback migration from legacy reader settings)
    useEffect(() => {
        try {
            const raw = localStorage.getItem(WIDGETS_SETTINGS_STORAGE_KEY)
            if (raw) {
                const parsed = JSON.parse(raw)
                setSettings(mergeWidgetsSettings(parsed))
            } else {
                // Check legacy reader settings for existing widget config
                const legacyRaw = localStorage.getItem(LEGACY_READER_SETTINGS_STORAGE_KEY)
                if (legacyRaw) {
                    const legacy = JSON.parse(legacyRaw)
                    if (Array.isArray(legacy.widgets?.items) && legacy.widgets.items.length > 0) {
                        const migrated: WidgetsSettings = {
                            items: legacy.widgets.items,
                            showRightSidebar: legacy.layout?.showRightSidebar ?? true,
                        }
                        setSettings(migrated)
                        localStorage.setItem(WIDGETS_SETTINGS_STORAGE_KEY, JSON.stringify(migrated))
                    } else if (legacy.widgets) {
                        const migratedItems = DEFAULT_WIDGET_ITEMS.map((item) => {
                            if (item.id === 'profile' && legacy.widgets.profile !== undefined) {
                                return { ...item, enabled: legacy.widgets.profile }
                            }
                            if (item.id === 'series' && legacy.widgets.series !== undefined) {
                                return { ...item, enabled: legacy.widgets.series }
                            }
                            if (item.id === 'subscribeForm' && legacy.widgets.subscribeForm !== undefined) {
                                return { ...item, enabled: legacy.widgets.subscribeForm }
                            }
                            if (item.id === 'socialLinks' && (legacy.widgets.socialLinks !== undefined || legacy.widgets.socials !== undefined)) {
                                return { ...item, enabled: legacy.widgets.socialLinks ?? legacy.widgets.socials }
                            }
                            if (item.id === 'commentForm' && legacy.widgets.commentForm !== undefined) {
                                return { ...item, enabled: legacy.widgets.commentForm }
                            }
                            return item
                        })
                        const migrated: WidgetsSettings = {
                            items: migratedItems,
                            showRightSidebar: legacy.layout?.showRightSidebar ?? true,
                        }
                        setSettings(migrated)
                        localStorage.setItem(WIDGETS_SETTINGS_STORAGE_KEY, JSON.stringify(migrated))
                    }
                }
            }
        } catch (error) {
            console.error('Failed to load widgets settings:', error)
        } finally {
            setIsLoaded(true)
        }
    }, [])

    // Persist settings
    const persistSettings = useCallback((newSettings: WidgetsSettings) => {
        try {
            localStorage.setItem(WIDGETS_SETTINGS_STORAGE_KEY, JSON.stringify(newSettings))
            window.dispatchEvent(new CustomEvent('widgets-settings-changed', { detail: newSettings }))
        } catch (error) {
            console.error('Failed to persist widgets settings:', error)
        }
    }, [])

    const reorderWidgets = useCallback((newItems: WidgetInstance[]) => {
        setSettings((prev) => {
            const updated: WidgetsSettings = { ...prev, items: newItems }
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const toggleWidgetActive = useCallback((id: string) => {
        setSettings((prev) => {
            const updatedItems = prev.items.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w))
            const updated: WidgetsSettings = { ...prev, items: updatedItems }
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const addWidget = useCallback((widget: WidgetInstance) => {
        setSettings((prev) => {
            const updatedItems = [...prev.items, widget]
            const updated: WidgetsSettings = { ...prev, items: updatedItems }
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const updateWidgetConfig = useCallback((id: string, patch: Partial<WidgetInstance>) => {
        setSettings((prev) => {
            const updatedItems = prev.items.map((w) =>
                w.id === id
                    ? {
                          ...w,
                          ...patch,
                          config: { ...w.config, ...(patch.config || {}) },
                      }
                    : w
            )
            const updated: WidgetsSettings = { ...prev, items: updatedItems }
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const deleteWidget = useCallback((id: string) => {
        setSettings((prev) => {
            const updatedItems = prev.items.filter((w) => w.id !== id)
            const updated: WidgetsSettings = { ...prev, items: updatedItems }
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const resetWidgets = useCallback(() => {
        setSettings(() => {
            persistSettings(DEFAULT_WIDGETS_SETTINGS)
            return DEFAULT_WIDGETS_SETTINGS
        })
    }, [persistSettings])

    const setShowRightSidebar = useCallback((show: boolean) => {
        setSettings((prev) => {
            const updated: WidgetsSettings = { ...prev, showRightSidebar: show }
            persistSettings(updated)
            return updated
        })
    }, [persistSettings])

    const activeWidgets = useMemo(() => settings.items.filter((w) => w.enabled), [settings.items])

    const value = useMemo(
        () => ({
            widgets: settings.items,
            items: settings.items,
            activeWidgets,
            showRightSidebar: settings.showRightSidebar,
            isLoaded,
            reorderWidgets,
            toggleWidgetActive,
            addWidget,
            updateWidgetConfig,
            deleteWidget,
            resetWidgets,
            setShowRightSidebar,
        }),
        [
            settings.items,
            settings.showRightSidebar,
            activeWidgets,
            isLoaded,
            reorderWidgets,
            toggleWidgetActive,
            addWidget,
            updateWidgetConfig,
            deleteWidget,
            resetWidgets,
            setShowRightSidebar,
        ]
    )

    return (
        <WidgetsSettingsContext.Provider value={value}>
            {children}
        </WidgetsSettingsContext.Provider>
    )
}

export function useWidgetsSettings() {
    const ctx = useContext(WidgetsSettingsContext)
    if (!ctx) {
        throw new Error('useWidgetsSettings must be used within a WidgetsSettingsProvider')
    }
    return ctx
}
