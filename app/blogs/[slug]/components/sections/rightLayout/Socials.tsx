'use client'

import { Icon } from '@iconify-icon/react'

const socialLinks = [
    { id: 'linkedin', name: 'LinkedIn', href: '#', icon: 'brandico:linkedin' },
    { id: 'twitter', name: 'Twitter', href: '#', icon: 'selfhst:twitter' },
    { id: 'github', name: 'GitHub', href: '#', icon: 'mingcute:github-fill' },
    { id: 'instagram', name: 'Instagram', href: '#', icon: 'ri:instagram-fill' },
    { id: 'threads', name: 'Threads', href: '#', icon: 'thesvg:threads' },
    { id: 'discord', name: 'Discord', href: '#', icon: 'logos:discord-icon' },
    { id: 'devto', name: 'Dev.to', href: '#', icon: 'fa-brands:dev' },
    { id: 'hashnode', name: 'Hashnode', href: '#', icon: 'logos:hashnode-icon' },
    { id: 'bluesky', name: 'Bluesky', href: '#', icon: 'logos:bluesky' },
    { id: 'medium', name: 'Medium', href: '#', icon: 'cib:medium-m' },
]

const Socials = () => {
    return (
        <div className="w-full h-full">
            <div className="pb-3">
                <h1 className="text-lg text-sec font-mono">
                    Let's connect
                </h1>
            </div>
            <div className='w-full flex flex-wrap gap-1'>
                {socialLinks.map((social) => (
                    <a
                        key={social.id}
                        href={social.href}
                        title={social.name}
                        target="_blank"
                        rel="noreferrer"
                        className="w-11 h-12 rounded-full zbg-accent flex justify-center items-center grayscale group hover:grayscale-0 transition-transform duration-200"
                    >
                        <Icon icon={social.icon} height="24" className='text-sec group-hover:text-fg' />
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Socials
