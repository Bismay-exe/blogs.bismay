export type WidgetType =
    | 'profile'
    | 'series'
    | 'subscribeForm'
    | 'socialLinks'
    | 'commentForm'
    | 'customHtml'
    | 'customMarkdown'

export interface WidgetInstance {
    id: string
    type: WidgetType
    title: string
    enabled: boolean
    isBuiltIn?: boolean
    config?: {
        // Custom Code Widget
        html?: string
        css?: string
        js?: string
        // Custom Markdown Widget
        markdown?: string
        // Card container overrides
        customTitle?: string
        showCardBorder?: boolean
        // Built-in overrides
        bio?: string
        name?: string
        role?: string
        avatarUrl?: string
        heading?: string
        buttonText?: string
        seriesName?: string
        links?: Array<{ id: string; name: string; href: string; icon: string }>
        [key: string]: any
    }
}

export interface WidgetsSettings {
    items: WidgetInstance[]
    showRightSidebar: boolean
}

export interface WidgetsSettingsContextType {
    widgets: WidgetInstance[]
    items: WidgetInstance[]
    activeWidgets: WidgetInstance[]
    showRightSidebar: boolean
    isLoaded: boolean
    reorderWidgets: (newItems: WidgetInstance[]) => void
    toggleWidgetActive: (id: string) => void
    addWidget: (widget: WidgetInstance) => void
    updateWidgetConfig: (id: string, patch: Partial<WidgetInstance>) => void
    deleteWidget: (id: string) => void
    resetWidgets: () => void
    setShowRightSidebar: (show: boolean) => void
}
