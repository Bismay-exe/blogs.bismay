import { WidgetInstance, WidgetsSettings } from './types'

export const DEFAULT_WIDGET_ITEMS: WidgetInstance[] = [
    {
        id: 'profile',
        type: 'profile',
        title: 'Author Profile',
        enabled: true,
        isBuiltIn: true,
        config: {
            showCardBorder: true,
        },
    },
    {
        id: 'series',
        type: 'series',
        title: 'Series Navigation',
        enabled: true,
        isBuiltIn: true,
    },
    {
        id: 'subscribeForm',
        type: 'subscribeForm',
        title: 'Subscribe Newsletter',
        enabled: true,
        isBuiltIn: true,
    },
    {
        id: 'socialLinks',
        type: 'socialLinks',
        title: 'Social Links',
        enabled: true,
        isBuiltIn: true,
    },
    {
        id: 'commentForm',
        type: 'commentForm',
        title: 'Leave a Comment',
        enabled: false,
        isBuiltIn: true,
    },
]

export const DEFAULT_WIDGETS_SETTINGS: WidgetsSettings = {
    items: DEFAULT_WIDGET_ITEMS,
    showRightSidebar: true,
}
