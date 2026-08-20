'use client'

import React, { useState } from 'react'
import { Save, Download, RotateCcw, Check, Sparkles, ExternalLink } from 'lucide-react'
import { ProductionBlogPost } from '@/articles/format/articleData'
import Link from 'next/link'

interface SaveActionsProps {
    article: ProductionBlogPost
    onSaveToLocalStorage: () => void
    onReset: () => void
}

const SaveActions: React.FC<SaveActionsProps> = ({ article, onSaveToLocalStorage, onReset }) => {
    const [savedSuccess, setSavedSuccess] = useState(false)

    const handleSave = () => {
        onSaveToLocalStorage()
        setSavedSuccess(true)
        setTimeout(() => setSavedSuccess(false), 3000)
    }

    const handleExportJson = () => {
        const jsonStr = JSON.stringify(article, null, 2)
        const blob = new Blob([jsonStr], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${article.slug || 'article'}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return (
        <div className="p-5 rounded-3xl border border-accent/30 bg-accent/5 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <Sparkles size={14} />
                Actions
            </h3>

            {/* Primary Save to LocalStorage */}
            <button
                type="button"
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-accent hover:opacity-90 text-black font-bold text-sm transition-all cursor-pointer shadow-md shadow-accent/20"
            >
                {savedSuccess ? (
                    <>
                        <Check size={16} className="text-black" />
                        <span>Saved to LocalStorage!</span>
                    </>
                ) : (
                    <>
                        <Save size={16} />
                        <span>Save Article</span>
                    </>
                )}
            </button>

            {/* Export JSON button */}
            <button
                type="button"
                onClick={handleExportJson}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-fg/10 hover:bg-fg/15 text-fg font-semibold text-xs transition-colors cursor-pointer border border-sec/20"
            >
                <Download size={14} />
                <span>Export article.json</span>
            </button>

            {/* Preview link if slug exists */}
            {article.slug && (
                <Link
                    href={`/blogs/${article.slug}`}
                    target="_blank"
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-sec hover:text-accent text-xs font-mono transition-colors"
                >
                    <span>View /blogs/{article.slug}</span>
                    <ExternalLink size={12} />
                </Link>
            )}

            {/* Reset / Clear */}
            <div className="pt-2 border-t border-sec/15 flex justify-end">
                <button
                    type="button"
                    onClick={onReset}
                    className="flex items-center gap-1 text-[11px] font-mono text-sec hover:text-rose-400 transition-colors cursor-pointer"
                >
                    <RotateCcw size={11} />
                    <span>Reset Form</span>
                </button>
            </div>
        </div>
    )
}

export default SaveActions
