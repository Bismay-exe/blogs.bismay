import React from 'react'
import Link from 'next/link'
import { BookOpen, Sparkles, Sliders, ArrowRight, Type, Layout, Shield } from 'lucide-react'

export default function SettingsHubPage() {
    return (
        <div className="space-y-8 max-w-4xl pb-20">
            <div>
                <h1 className="text-3xl font-extrabold text-fg tracking-tight">System & Site Settings</h1>
                <p className="text-sm text-sec mt-1">
                    Manage reading customizations, editor defaults, and site preferences.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                    href="/settings/reader"
                    className="group p-6 rounded-3xl border border-sec/20 bg-fg/2 hover:bg-fg/5 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-sm"
                >
                    <div className="space-y-3">
                        <div className="w-11 h-11 rounded-2xl bg-accent/15 text-accent flex items-center justify-center border border-accent/20 group-hover:scale-105 transition-transform">
                            <BookOpen size={22} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-bold text-fg group-hover:text-accent transition-colors">
                                    Reading Experience
                                </h2>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/20 text-accent font-semibold">
                                    New
                                </span>
                            </div>
                            <p className="text-xs text-sec mt-1 leading-relaxed">
                                Customize header element ordering, sidebar widgets, typography fonts, font sizes, line height, and distraction-free mode.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-accent pt-2">
                        <span>Open Studio</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </Link>

                <Link
                    href="/admin/posts"
                    className="group p-6 rounded-3xl border border-sec/20 bg-fg/2 hover:bg-fg/5 hover:border-sec/40 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-sm"
                >
                    <div className="space-y-3">
                        <div className="w-11 h-11 rounded-2xl bg-fg/5 text-sec flex items-center justify-center border border-sec/15 group-hover:scale-105 transition-transform">
                            <Sliders size={22} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-fg group-hover:text-accent transition-colors">
                                Post & Content Management
                            </h2>
                            <p className="text-xs text-sec mt-1 leading-relaxed">
                                Create new articles, write in Markdown, preview live AST blocks, and publish blog series.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-sec group-hover:text-fg pt-2">
                        <span>Manage Articles</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </Link>
            </div>
        </div>
    )
}
