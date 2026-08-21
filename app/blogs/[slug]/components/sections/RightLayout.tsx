'use client'

import React from 'react'
import Profile from '../../components/sections/rightLayout/Profile'
import Series from '../../components/sections/rightLayout/Series'
import SubscribeForm from '../../components/sections/rightLayout/SubscribeForm'
import Socials from '../../components/sections/rightLayout/Socials'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

const RightLayout = () => {
    const { settings } = useReaderSettings()
    const { showRightSidebar, rightWidgets } = settings.layout

    if (!showRightSidebar) {
        return null
    }

    const hasAnyWidget =
        rightWidgets.profile ||
        rightWidgets.series ||
        rightWidgets.subscribeForm ||
        rightWidgets.socials

    if (!hasAnyWidget) {
        return null
    }

    return (
        <div className="w-full sm:max-w-76 shrink-0 h-full bg-transparent space-y-10 pt-7 pb-50 transition-all duration-300">
            {rightWidgets.profile && <Profile />}
            {rightWidgets.series && <Series />}
            {rightWidgets.subscribeForm && <SubscribeForm />}
            {rightWidgets.socials && <Socials />}
        </div>
    )
}

export default RightLayout
