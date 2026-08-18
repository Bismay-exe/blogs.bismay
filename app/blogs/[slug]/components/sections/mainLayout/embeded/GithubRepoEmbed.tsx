'use client'

import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Icon } from '@iconify-icon/react'

interface GithubRepoEmbedProps {
    url: string
}

const GithubRepoEmbed: React.FC<GithubRepoEmbedProps> = ({ url }) => {
    const parts = url.replace(/https?:\/\/github\.com\//, '').split('/').filter(Boolean)
    const username = parts[0] || 'Bismay-exe'
    const repo = parts[1] || 'repository'
    const ogImageUrl = `https://opengraph.githubassets.com/1/${username}/${repo}`
    const title = `${username}/${repo}`
    const description = `Open-source codebase by @${username}. Explore source code, issues, commits, and releases on GitHub.`

    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group my-7 block overflow-hidden rounded-2xl border border-sec/25 bg-fg/2 hover:border-accent/50 hover:bg-fg/4 transition-all duration-300 shadow-md shadow-black/5 hover:shadow-xl"
        >
            {/* Full-width High-Res OpenGraph Image Banner */}
            <div className="w-full aspect-[2/1] sm:aspect-[2.1/1] overflow-hidden bg-[#0E0E10] border-b border-sec/15 relative">
                <img
                    src={ogImageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-500"
                    loading="lazy"
                />
            </div>

            {/* Metadata Details */}
            <div className="p-5 sm:p-6 space-y-3">
                {/* Site name & Favicon */}
                <div className="flex items-center justify-between text-xs text-sec">
                    <div className="flex items-center gap-2 font-mono">
                        <div className="w-5 h-5 rounded-full bg-fg/10 flex items-center justify-center text-fg">
                            <Icon icon="mingcute:github-fill" width="14" />
                        </div>
                        <span className="font-semibold text-fg/90">GitHub</span>
                        <span>•</span>
                        <span className="text-sec">Repository</span>
                    </div>
                    <div className="flex items-center gap-1 text-accent font-semibold text-xs">
                        <span>View Repository</span>
                        <ArrowUpRight size={14} className='group-hover:rotate-45 transition-transform duration-300 ease-in-out' />
                    </div>
                </div>

                {/* OG Title */}
                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-fg group-hover:text-accent transition-colors leading-snug">
                    {title}
                </h4>

                {/* OG Description */}
                <p className="text-xs sm:text-sm text-sec leading-relaxed line-clamp-3">
                    {description}
                </p>

                {/* Canonical URL & Handle */}
                <div className="flex items-center justify-between pt-3 border-t border-sec/15 text-xs text-sec font-mono">
                    <span className="truncate max-w-[240px] sm:max-w-md">github.com/{username}/{repo}</span>
                    <span className="text-fg font-medium">@{username}</span>
                </div>
            </div>
        </a>
    )
}

export default GithubRepoEmbed
