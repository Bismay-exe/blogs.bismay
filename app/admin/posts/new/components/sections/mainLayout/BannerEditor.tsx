'use client'

import React, { useState } from 'react'
import { Image as ImageIcon, Link as LinkIcon, X, Eye, Sliders } from 'lucide-react'

interface BannerEditorProps {
    bannerUrl?: string
    bannerAlt?: string
    bannerWidth?: number
    bannerHeight?: number
    onBannerChange: (url: string, alt: string, width?: number, height?: number) => void
}

const sampleBanners = [
    { label: 'React Gradient', url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Minimal Code', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Purple Dark', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop' },
]

const BannerEditor: React.FC<BannerEditorProps> = ({
    bannerUrl = '',
    bannerAlt = '',
    bannerWidth,
    bannerHeight,
    onBannerChange,
}) => {
    const [isEditing, setIsEditing] = useState(!bannerUrl)
    const [inputUrl, setInputUrl] = useState(bannerUrl)
    const [inputAlt, setInputAlt] = useState(bannerAlt)
    const [inputWidth, setInputWidth] = useState<string>(bannerWidth ? String(bannerWidth) : '')
    const [inputHeight, setInputHeight] = useState<string>(bannerHeight ? String(bannerHeight) : '')
    const [showDimensions, setShowDimensions] = useState(Boolean(bannerWidth || bannerHeight))

    const handleApply = () => {
        const w = inputWidth ? parseInt(inputWidth, 10) : undefined
        const h = inputHeight ? parseInt(inputHeight, 10) : undefined
        onBannerChange(inputUrl.trim(), inputAlt.trim() || 'Article Banner', w, h)
        setIsEditing(false)
    }

    const handleClear = () => {
        setInputUrl('')
        setInputAlt('')
        setInputWidth('')
        setInputHeight('')
        onBannerChange('', '', undefined, undefined)
        setIsEditing(true)
    }

    if (bannerUrl && !isEditing) {
        return (
            <div className="relative group w-full h-[220px] sm:h-[300px] rounded-3xl overflow-hidden border border-sec/20 bg-fg/5">
                <img
                    src={bannerUrl}
                    alt={bannerAlt || 'Article Banner'}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 backdrop-blur-xs">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-medium text-xs border border-white/20 transition-all cursor-pointer shadow-lg"
                    >
                        Change Banner
                    </button>
                    <button
                        onClick={handleClear}
                        className="p-2 rounded-xl bg-rose-500/80 hover:bg-rose-500 text-white transition-all cursor-pointer shadow-lg"
                        title="Remove banner"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full p-5 rounded-3xl border-2 border-dashed border-sec/30 bg-fg/2 hover:border-accent/50 transition-all duration-200 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-fg">
                    <ImageIcon size={18} className="text-accent" />
                    <span>Article Banner Image</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setShowDimensions(!showDimensions)}
                        className={`flex items-center gap-1 text-xs font-mono transition-colors cursor-pointer ${
                            showDimensions ? 'text-accent' : 'text-sec hover:text-fg'
                        }`}
                    >
                        <Sliders size={12} />
                        <span>Dimensions</span>
                    </button>
                    {bannerUrl && (
                        <button
                            onClick={() => setIsEditing(false)}
                            className="flex items-center gap-1 text-xs text-sec hover:text-fg cursor-pointer"
                        >
                            <Eye size={13} />
                            <span>Cancel Preview</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-xs font-mono text-sec flex items-center gap-1.5">
                        <LinkIcon size={12} /> Banner Image URL
                    </label>
                    <input
                        type="url"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/... or /images/banner.png"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-fg/5 border border-sec/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm text-fg placeholder:text-sec/40 transition-all font-mono text-xs"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-mono text-sec">Banner Alt Text</label>
                    <input
                        type="text"
                        value={inputAlt}
                        onChange={(e) => setInputAlt(e.target.value)}
                        placeholder="Descriptive caption / alt text"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-fg/5 border border-sec/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm text-fg placeholder:text-sec/40 transition-all text-xs"
                    />
                </div>
            </div>

            {/* Optional Dimensions Inputs */}
            {showDimensions && (
                <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-fg/5 border border-sec/15 animate-in fade-in duration-200">
                    <div className="space-y-1">
                        <label className="text-[11px] font-mono text-sec">Image Width (px)</label>
                        <input
                            type="number"
                            value={inputWidth}
                            onChange={(e) => setInputWidth(e.target.value)}
                            placeholder="e.g. 1200"
                            className="w-full px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs font-mono text-fg outline-none focus:border-accent"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-mono text-sec">Image Height (px)</label>
                        <input
                            type="number"
                            value={inputHeight}
                            onChange={(e) => setInputHeight(e.target.value)}
                            placeholder="e.g. 630"
                            className="w-full px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs font-mono text-fg outline-none focus:border-accent"
                        />
                    </div>
                </div>
            )}

            {/* Quick preset banners */}
            <div className="flex items-center gap-2 flex-wrap text-xs text-sec">
                <span className="font-mono text-[11px]">Quick Presets:</span>
                {sampleBanners.map((preset, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => {
                            setInputUrl(preset.url)
                            setInputAlt(preset.label)
                        }}
                        className="px-2.5 py-1 rounded-lg bg-fg/5 hover:bg-fg/10 text-fg text-xs font-mono border border-sec/15 transition-all cursor-pointer"
                    >
                        {preset.label}
                    </button>
                ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button
                    onClick={handleApply}
                    disabled={!inputUrl.trim()}
                    className="px-4 py-2 rounded-xl bg-accent text-black font-semibold text-xs hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md"
                >
                    Apply Banner
                </button>
            </div>
        </div>
    )
}

export default BannerEditor
