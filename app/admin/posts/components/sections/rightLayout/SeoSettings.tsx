'use client'

import React, { useState } from 'react'
import { Globe, ChevronDown, ChevronUp, Bot, Share2 } from 'lucide-react'
import { ProductionBlogPost } from '@/articles/format/articleData'
import { Icon } from '@iconify-icon/react'

const TwitterIcon: React.FC<{ size?: number; className?: string }> = ({ size = 12, className = '' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)

interface SeoSettingsProps {
    metaTitle?: string
    metaDescription: string
    canonicalUrl: string
    ogTitle?: string
    ogDescription?: string
    ogImage: string
    twitter?: ProductionBlogPost['seo']['twitter']
    robots?: { index: boolean; follow: boolean }
    locale?: string
    onMetaTitleChange: (v: string) => void
    onMetaDescriptionChange: (v: string) => void
    onCanonicalUrlChange: (v: string) => void
    onOgTitleChange: (v: string) => void
    onOgDescriptionChange: (v: string) => void
    onOgImageChange: (v: string) => void
    onTwitterChange: (twitter: ProductionBlogPost['seo']['twitter']) => void
    onRobotsChange: (robots: { index: boolean; follow: boolean }) => void
    onLocaleChange: (v: string) => void
}

const SeoSettings: React.FC<SeoSettingsProps> = ({
    metaTitle = '',
    metaDescription,
    canonicalUrl,
    ogTitle = '',
    ogDescription = '',
    ogImage,
    twitter = { card: 'summary_large_image', title: '', description: '', image: '' },
    robots = { index: true, follow: true },
    locale = 'en_US',
    onMetaTitleChange,
    onMetaDescriptionChange,
    onCanonicalUrlChange,
    onOgTitleChange,
    onOgDescriptionChange,
    onOgImageChange,
    onTwitterChange,
    onRobotsChange,
    onLocaleChange,
}) => {
    const [collapsed, setCollapsed] = useState(true)
    const [activeTab, setActiveTab] = useState<'general' | 'og' | 'twitter' | 'robots'>('general')

    return (
        <div className="p-5 rounded-3xl border border-sec/20 bg-fg/2 space-y-3">
            <button
                type="button"
                onClick={() => setCollapsed(!collapsed)}
                className="w-full flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-sec hover:text-fg transition-colors cursor-pointer"
            >
                <span className="flex items-center gap-1.5">
                    <Globe size={14} className="text-accent" />
                    SEO, Social & Indexing
                </span>
                {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>

            {!collapsed && (
                <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                    {/* Sub-tabs for SEO sections */}
                    <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-fg/5 border border-sec/15 text-[10px] font-mono font-semibold">
                        <button
                            type="button"
                            onClick={() => setActiveTab('general')}
                            className={`py-1 rounded-xl transition-all cursor-pointer truncate px-1 ${activeTab === 'general'
                                ? 'bg-accent text-black font-bold shadow-xs'
                                : 'text-sec hover:text-fg'
                                }`}
                        >
                            General
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('og')}
                            className={`py-1 rounded-xl transition-all cursor-pointer truncate px-1 flex items-center justify-center gap-1 ${activeTab === 'og'
                                ? 'bg-accent text-black font-bold shadow-xs'
                                : 'text-sec hover:text-fg'
                                }`}
                        >
                            <Share2 size={10} />
                            <span>OG</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('twitter')}
                            className={`py-1 rounded-xl transition-all cursor-pointer truncate px-1 flex items-center justify-center gap-1 ${activeTab === 'twitter'
                                ? 'bg-accent text-black font-bold shadow-xs'
                                : 'text-sec hover:text-fg'
                                }`}
                        >
                            <Icon icon="bi:twitter" />
                            <span>Twitter</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('robots')}
                            className={`py-1 rounded-xl transition-all cursor-pointer truncate px-1 flex items-center justify-center gap-1 ${activeTab === 'robots'
                                ? 'bg-accent text-black font-bold shadow-xs'
                                : 'text-sec hover:text-fg'
                                }`}
                        >
                            <Bot size={10} />
                            <span>Robots</span>
                        </button>
                    </div>

                    {/* GENERAL TAB */}
                    {activeTab === 'general' && (
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-[11px] font-mono text-sec">Meta Title</label>
                                <input
                                    type="text"
                                    value={metaTitle}
                                    onChange={(e) => onMetaTitleChange(e.target.value)}
                                    placeholder="Custom SEO Title (defaults to article title)"
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
                                    className="w-full h-32 px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs text-fg placeholder:text-sec/40 outline-none focus:border-accent resize-none"
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
                                <label className="text-[11px] font-mono text-sec">Content Locale</label>
                                <input
                                    type="text"
                                    value={locale}
                                    onChange={(e) => onLocaleChange(e.target.value)}
                                    placeholder="en_US"
                                    className="w-full px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs text-fg placeholder:text-sec/40 outline-none focus:border-accent font-mono"
                                />
                            </div>
                        </div>
                    )}

                    {/* OPEN GRAPH TAB */}
                    {activeTab === 'og' && (
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-[11px] font-mono text-sec">OpenGraph Title</label>
                                <input
                                    type="text"
                                    value={ogTitle}
                                    onChange={(e) => onOgTitleChange(e.target.value)}
                                    placeholder="Custom social share title (optional)"
                                    className="w-full px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs text-fg placeholder:text-sec/40 outline-none focus:border-accent"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-mono text-sec">OpenGraph Description</label>
                                <textarea
                                    value={ogDescription}
                                    onChange={(e) => onOgDescriptionChange(e.target.value)}
                                    placeholder="Custom social share description (optional)"
                                    rows={2}
                                    className="w-full h-32 px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs text-fg placeholder:text-sec/40 outline-none focus:border-accent resize-none"
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

                    {/* TWITTER TAB */}
                    {activeTab === 'twitter' && (
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-[11px] font-mono text-sec">Twitter Card Type</label>
                                <select
                                    value={twitter?.card || 'summary_large_image'}
                                    onChange={(e) =>
                                        onTwitterChange({
                                            ...twitter,
                                            card: e.target.value as 'summary' | 'summary_large_image',
                                        })
                                    }
                                    className="w-full px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs font-mono text-fg outline-none focus:border-accent cursor-pointer"
                                >
                                    <option value="summary_large_image" className="bg-bg text-fg">
                                        Summary with Large Image (Recommended)
                                    </option>
                                    <option value="summary" className="bg-bg text-fg">
                                        Summary (Small Square)
                                    </option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-mono text-sec">Twitter Title</label>
                                <input
                                    type="text"
                                    value={twitter?.title || ''}
                                    onChange={(e) =>
                                        onTwitterChange({
                                            ...twitter,
                                            card: twitter?.card || 'summary_large_image',
                                            title: e.target.value,
                                        })
                                    }
                                    placeholder="Twitter custom title (fallback to OG)"
                                    className="w-full px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs text-fg placeholder:text-sec/40 outline-none focus:border-accent"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-mono text-sec">Twitter Description</label>
                                <textarea
                                    value={twitter?.description || ''}
                                    onChange={(e) =>
                                        onTwitterChange({
                                            ...twitter,
                                            card: twitter?.card || 'summary_large_image',
                                            description: e.target.value,
                                        })
                                    }
                                    placeholder="Twitter card description..."
                                    rows={2}
                                    className="w-full h-32 px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs text-fg placeholder:text-sec/40 outline-none focus:border-accent resize-none"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-mono text-sec">Twitter Image URL</label>
                                <input
                                    type="url"
                                    value={twitter?.image || ''}
                                    onChange={(e) =>
                                        onTwitterChange({
                                            ...twitter,
                                            card: twitter?.card || 'summary_large_image',
                                            image: e.target.value,
                                        })
                                    }
                                    placeholder="https://.../twitter-card.png"
                                    className="w-full px-3 py-2 rounded-xl bg-fg/5 border border-sec/20 text-xs text-fg placeholder:text-sec/40 outline-none focus:border-accent font-mono"
                                />
                            </div>
                        </div>
                    )}

                    {/* ROBOTS TAB */}
                    {activeTab === 'robots' && (
                        <div className="space-y-2.5">
                            <label className="flex items-center justify-between p-3 rounded-2xl bg-fg/5 border border-sec/15 cursor-pointer hover:bg-fg/10 transition-colors">
                                <div className="space-y-0.5">
                                    <div className="text-xs font-semibold text-fg">Index Article</div>
                                    <div className="text-[10px] font-mono text-sec">Allow search engines to index (robots: index)</div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={robots?.index ?? true}
                                    onChange={(e) =>
                                        onRobotsChange({
                                            index: e.target.checked,
                                            follow: robots?.follow ?? true,
                                        })
                                    }
                                    className="w-4 h-4 rounded accent-accent cursor-pointer"
                                />
                            </label>

                            <label className="flex items-center justify-between p-3 rounded-2xl bg-fg/5 border border-sec/15 cursor-pointer hover:bg-fg/10 transition-colors">
                                <div className="space-y-0.5">
                                    <div className="text-xs font-semibold text-fg">Follow Links</div>
                                    <div className="text-[10px] font-mono text-sec">Allow crawlers to follow article links (robots: follow)</div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={robots?.follow ?? true}
                                    onChange={(e) =>
                                        onRobotsChange({
                                            index: robots?.index ?? true,
                                            follow: e.target.checked,
                                        })
                                    }
                                    className="w-4 h-4 rounded accent-accent cursor-pointer"
                                />
                            </label>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SeoSettings
