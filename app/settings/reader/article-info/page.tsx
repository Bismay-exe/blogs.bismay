'use client'

import React from 'react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'
import { ReaderNav } from '@/components/settings/ReaderNav'

export default function ArticleInfoSettingsPage() {
    const { settings, updateArticleInformation, isLoaded } = useReaderSettings()

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="w-8 h-8 rounded-full border-2 border-sec/30 border-t-fg animate-spin" />
            </div>
        )
    }

    const { articleInformation } = settings

    return (
        <div className="relative bg-bg text-fg py-12 pl-18 pr-3 sm:pr-6">
            <ReaderNav />
            <div className="max-w-2xl mx-auto space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-fg mb-6">
                    Article Information
                </h1>

                {/* Card: Grouped Article Info Toggles */}
                <div className="rounded-[28px] bg-fg/5 text-fg divide-y divide-sec/10 overflow-hidden">
                    {/* Row 1: Reading Time */}
                    <div className="flex items-center justify-between px-4 py-5 sm:px-7 sm:py-7">
                        <div>
                            <h3 className="text-sm font-semibold text-fg">Reading time</h3>
                            <p className="text-xs text-sec mt-0.5">Show estimated reading duration badge.</p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={articleInformation.showReadingTime}
                            onClick={() => updateArticleInformation({ showReadingTime: !articleInformation.showReadingTime })}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                                articleInformation.showReadingTime ? 'bg-accent' : 'bg-sec/20'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    articleInformation.showReadingTime ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Row 2: Published Date */}
                    <div className="flex items-center justify-between px-4 py-5 sm:px-7 sm:py-7">
                        <div>
                            <h3 className="text-sm font-semibold text-fg">Published date</h3>
                            <p className="text-xs text-sec mt-0.5">Show article publication timestamp.</p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={articleInformation.showPublishedDate}
                            onClick={() => updateArticleInformation({ showPublishedDate: !articleInformation.showPublishedDate })}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                                articleInformation.showPublishedDate ? 'bg-accent' : 'bg-sec/20'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    articleInformation.showPublishedDate ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Row 3: Category */}
                    <div className="flex items-center justify-between px-4 py-5 sm:px-7 sm:py-7">
                        <div>
                            <h3 className="text-sm font-semibold text-fg">Category</h3>
                            <p className="text-xs text-sec mt-0.5">Show the article taxonomy topic chip.</p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={articleInformation.showCategory}
                            onClick={() => updateArticleInformation({ showCategory: !articleInformation.showCategory })}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                                articleInformation.showCategory ? 'bg-accent' : 'bg-sec/20'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    articleInformation.showCategory ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Row 4: Share Buttons */}
                    <div className="flex items-center justify-between px-4 py-5 sm:px-7 sm:py-7">
                        <div>
                            <h3 className="text-sm font-semibold text-fg">Share buttons</h3>
                            <p className="text-xs text-sec mt-0.5">Show social share & copy URL action button.</p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={articleInformation.showShareButtons}
                            onClick={() => updateArticleInformation({ showShareButtons: !articleInformation.showShareButtons })}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                                articleInformation.showShareButtons ? 'bg-accent' : 'bg-sec/20'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg shadow-sm ring-0 transition duration-200 ease-in-out ${
                                    articleInformation.showShareButtons ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
