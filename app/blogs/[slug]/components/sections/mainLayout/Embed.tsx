'use client'

import React from 'react'
import DevtoEmbed from './embeded/DevtoEmbed'
import GithubProfileEmbed from './embeded/GithubProfileEmbed'
import GithubRepoEmbed from './embeded/GithubRepoEmbed'
import TwitterEmbed from './embeded/Twitterembed'
import LinkedinEmbed from './embeded/LinkedinEmbed'
import MediumEmbed from './embeded/MediumEmbed'
import InstagramEmbed from './embeded/InstagramEmbed'
import OtherEmbed from './embeded/OtherEmbed'

interface EmbedProps {
    url: string
}

const Embed: React.FC<EmbedProps> = ({ url }) => {
    if (!url) return null

    // 1. DEV.TO Embed
    if (url.includes('dev.to/')) {
        return <DevtoEmbed url={url} />
    }

    // 2. GITHUB Embed
    if (url.includes('github.com/')) {
        const parts = url.replace(/https?:\/\/github\.com\//, '').split('/').filter(Boolean)
        // If has repo path like username/repo
        if (parts.length >= 2) {
            return <GithubRepoEmbed url={url} />
        }
        return <GithubProfileEmbed url={url} />
    }

    // 3. TWITTER / X Embed
    if (url.includes('twitter.com/') || url.includes('x.com/')) {
        return <TwitterEmbed url={url} />
    }

    // 4. LINKEDIN Embed
    if (url.includes('linkedin.com/')) {
        return <LinkedinEmbed url={url} />
    }

    // 5. MEDIUM Embed
    if (url.includes('medium.com/')) {
        return <MediumEmbed url={url} />
    }

    // 6. INSTAGRAM Embed
    if (url.includes('instagram.com/')) {
        return <InstagramEmbed url={url} />
    }

    // 7. Fallback generic embed
    return <OtherEmbed url={url} />
}

export default Embed
