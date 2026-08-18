'use client'

import React, { useState } from 'react'
import { Globe, ChevronDown, ChevronUp } from 'lucide-react'

interface SeoSettingsProps {
    metaTitle?: string
    metaDescription: string
    canonicalUrl: string
    ogImage: string
    onMetaTitleChange: (v: string) => void
    onMetaDescriptionChange: (v: string) => void
    onCanonicalUrlChange: (v: string) => void
    onOgImageChange: (v: string) => void
}

const SeoSettings: React.FC<SeoSettingsProps> = ({
    metaTitle = '',
    metaDescription,
    canonicalUrl,
    ogImage,
    onMetaTitleChange,
    onMetaDescriptionChange,
    onCanonicalUrlChange,
    onOgImageChange,
}) => {
    const [collapsed, setCollapsed] = useState(true)

    return (
        <div className="p-5 rounded-3xl border border-sec/20 bg-fg/[0.02] space-y-3">
            <button
                type="button"
                onClick={() => setCollapsed(!collapsed)}
                className="w-full flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-sec hover:text-fg transition-colors cursor-pointer"
            >
                <span className="flex items-center gap-1.5">
                    <Globe size={14} className="text-accent" />
                    SEO & OpenGraph Metadata
                </span>
                {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>

            {!collapsed && (
                <div className="space-y-3 pt-2 animate-in fade-in duration-200">
                    <div className="space-y-1">
                        <label className="text-[11px] font-mono text-sec">Meta Title</label>
                        <input
                            type="text"
                            value={metaTitle}
                            onChange={(e) => onMetaTitleChange(e.target.value)}
                            placeholder="Custom SEO Title"
                            className="w-full px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs text-fg placeholder:text-sec/40 outline-none focus:border-accent"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[11px] font-mono text-sec">Meta Description</label>
                        <textarea
                            value={metaDescription}
                            onChange={(e) => onMetaDescriptionChange(e.target.value)}
                            placeholder="SEO description for search engines..."
                            rows={2}
                            className="w-full px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs text-fg placeholder:text-sec/40 outline-none focus:border-accent resize-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[11px] font-mono text-sec">Canonical URL</label>
                        <input
                            type="url"
                            value={canonicalUrl}
                            onChange={(e) => onCanonicalUrlChange(e.target.value)}
                            placeholder="https://blogs.bismay.dev/..."
                            className="w-full px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs text-fg placeholder:text-sec/40 outline-none focus:border-accent font-mono"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[11px] font-mono text-sec">OG Social Image URL</label>
                        <input
                            type="url"
                            value={ogImage}
                            onChange={(e) => onOgImageChange(e.target.value)}
                            placeholder="https://.../og-banner.png"
                            className="w-full px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs text-fg placeholder:text-sec/40 outline-none focus:border-accent font-mono"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default SeoSettings
