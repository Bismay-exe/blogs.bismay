'use client'

import React from 'react'
import Profile from '../../components/sections/rightLayout/Profile'
import Series from '../../components/sections/rightLayout/Series'
import SubscribeForm from '../../components/sections/rightLayout/SubscribeForm'
import Socials from '../../components/sections/rightLayout/Socials'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

const RightLayout = () => {
    const { settings } = useReaderSettings()
    const showRightSidebar = settings.layout?.showRightSidebar ?? true
    const widgets = settings.widgets || settings.layout?.rightWidgets

    if (!showRightSidebar) {
        return null
    }

    const showProfile = widgets?.profile ?? true
    const showSeries = widgets?.series ?? true
    const showSubscribe = widgets?.subscribeForm ?? true
    const showSocials = widgets?.socialLinks ?? (widgets as any)?.socials ?? true

    const hasAnyWidget = showProfile || showSeries || showSubscribe || showSocials

    if (!hasAnyWidget) {
        return null
    }

    return (
        <div className="w-full sm:max-w-76 shrink-0 h-full bg-transparent space-y-10 pt-7 pb-50 transition-all duration-300">
            {showProfile && <Profile />}
            {showSeries && <Series />}
            {showSubscribe && <SubscribeForm />}
            {showSocials && <Socials />}
        </div>
    )
}

export default RightLayout
