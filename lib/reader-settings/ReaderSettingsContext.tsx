'use client'

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import {
    ReaderSettings,
    ReaderLayoutSettings,
    ReaderTypographySettings,
    ReaderAppearanceSettings,
    ReaderPresetId,
    HeaderElementId,
} from './types'
import { DEFAULT_READER_SETTINGS } from './defaults'
import { READER_PRESETS } from './presets'

export const READER_SETTINGS_STORAGE_KEY = 'reader_experience_settings'

interface ReaderSettingsContextType {
    settings: ReaderSettings
    activePreset: ReaderPresetId | 'custom'
    isLoaded: boolean
    updateLayout: (patch: Partial<ReaderLayoutSettings>) => void
    updateTypography: (patch: Partial<ReaderTypographySettings>) => void
    updateAppearance: (patch: Partial<ReaderAppearanceSettings>) => void
    reorderHeader: (newOrder: HeaderElementId[]) => void
    toggleHeaderVisibility: (id: HeaderElementId) => void
    toggleRightWidget: (id: keyof ReaderLayoutSettings['rightWidgets']) => void
    applyPreset: (presetId: ReaderPresetId) => void
    resetToDefaults: () => void
}

const ReaderSettingsContext = createContext<ReaderSettingsContextType | null>(null)

export const ReaderSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<ReaderSettings>(DEFAULT_READER_SETTINGS)
    const [activePreset, setActivePreset] = useState<ReaderPresetId | 'custom'>('default')
    const [isLoaded, setIsLoaded] = useState(false)

    // Helper to detect if settings match any known preset
    const detectPreset = useCallback((targetSettings: ReaderSettings): ReaderPresetId | 'custom' => {
        for (const preset of READER_PRESETS) {
            if (JSON.stringify(preset.settings) === JSON.stringify(targetSettings)) {
                return preset.id
            }
        }
        return 'custom'
    }, [])

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const raw = localStorage.getItem(READER_SETTINGS_STORAGE_KEY)
            if (raw) {
                const parsed = JSON.parse(raw) as Partial<ReaderSettings>
                const merged: ReaderSettings = {
                    layout: {
                        ...DEFAULT_READER_SETTINGS.layout,
                        ...(parsed.layout || {}),
                        headerVisibility: {
                            ...DEFAULT_READER_SETTINGS.layout.headerVisibility,
                            ...(parsed.layout?.headerVisibility || {}),
                        },
                        rightWidgets: {
                            ...DEFAULT_READER_SETTINGS.layout.rightWidgets,
                            ...(parsed.layout?.rightWidgets || {}),
                        },
                    },
                    typography: {
                        ...DEFAULT_READER_SETTINGS.typography,
                        ...(parsed.typography || {}),
                    },
                    appearance: {
                        ...DEFAULT_READER_SETTINGS.appearance,
                        ...(parsed.appearance || {}),
                    },
                }
                setSettings(merged)
                setActivePreset(detectPreset(merged))
            }
        } catch (error) {
            console.error('Failed to load reader settings from localStorage:', error)
        } finally {
            setIsLoaded(true)
        }
    }, [detectPreset])

    // Save to localStorage whenever settings change
    const persistSettings = useCallback((newSettings: ReaderSettings) => {
        try {
            localStorage.setItem(READER_SETTINGS_STORAGE_KEY, JSON.stringify(newSettings))
            window.dispatchEvent(new CustomEvent('reader-settings-changed', { detail: newSettings }))
        } catch (error) {
            console.error('Failed to persist reader settings:', error)
        }
    }, [])

    const updateLayout = useCallback((patch: Partial<ReaderLayoutSettings>) => {
        setSettings((prev) => {
            const updated: ReaderSettings = {
                ...prev,
                layout: {
                    ...prev.layout,
                    ...patch,
                },
            }
            setActivePreset(detectPreset(updated))
            persistSettings(updated)
            return updated
        })
    }, [detectPreset, persistSettings])

    const updateTypography = useCallback((patch: Partial<ReaderTypographySettings>) => {
        setSettings((prev) => {
            const updated: ReaderSettings = {
                ...prev,
                typography: {
                    ...prev.typography,
                    ...patch,
                },
            }
            setActivePreset(detectPreset(updated))
            persistSettings(updated)
            return updated
        })
    }, [detectPreset, persistSettings])

    const updateAppearance = useCallback((patch: Partial<ReaderAppearanceSettings>) => {
        setSettings((prev) => {
            const updated: ReaderSettings = {
                ...prev,
                appearance: {
                    ...prev.appearance,
                    ...patch,
                },
            }
            setActivePreset(detectPreset(updated))
            persistSettings(updated)
            return updated
        })
    }, [detectPreset, persistSettings])

    const reorderHeader = useCallback((newOrder: HeaderElementId[]) => {
        setSettings((prev) => {
            const updated: ReaderSettings = {
                ...prev,
                layout: {
                    ...prev.layout,
                    headerOrder: newOrder,
                },
            }
            setActivePreset(detectPreset(updated))
            persistSettings(updated)
            return updated
        })
    }, [detectPreset, persistSettings])

    const toggleHeaderVisibility = useCallback((id: HeaderElementId) => {
        setSettings((prev) => {
            const updated: ReaderSettings = {
                ...prev,
                layout: {
                    ...prev.layout,
                    headerVisibility: {
                        ...prev.layout.headerVisibility,
                        [id]: !prev.layout.headerVisibility[id],
                    },
                },
            }
            setActivePreset(detectPreset(updated))
            persistSettings(updated)
            return updated
        })
    }, [detectPreset, persistSettings])

    const toggleRightWidget = useCallback((id: keyof ReaderLayoutSettings['rightWidgets']) => {
        setSettings((prev) => {
            const updated: ReaderSettings = {
                ...prev,
                layout: {
                    ...prev.layout,
                    rightWidgets: {
                        ...prev.layout.rightWidgets,
                        [id]: !prev.layout.rightWidgets[id],
                    },
                },
            }
            setActivePreset(detectPreset(updated))
            persistSettings(updated)
            return updated
        })
    }, [detectPreset, persistSettings])

    const applyPreset = useCallback((presetId: ReaderPresetId) => {
        const found = READER_PRESETS.find((p) => p.id === presetId)
        if (found) {
            setSettings(found.settings)
            setActivePreset(presetId)
            persistSettings(found.settings)
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
            updateLayout,
            updateTypography,
            updateAppearance,
            reorderHeader,
            toggleHeaderVisibility,
            toggleRightWidget,
            applyPreset,
            resetToDefaults,
        }),
        [
            settings,
            activePreset,
            isLoaded,
            updateLayout,
            updateTypography,
            updateAppearance,
            reorderHeader,
            toggleHeaderVisibility,
            toggleRightWidget,
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
