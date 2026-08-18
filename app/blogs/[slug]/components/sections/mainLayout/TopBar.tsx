import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

interface TopBarProps {
    category?: string
    date?: string
    readingTimeMinutes?: number
}

const TopBar: React.FC<TopBarProps> = ({
    category = 'Engineering',
    date = 'Published',
    readingTimeMinutes = 5,
}) => {
    return (
        <div className="pt-7">
            <div className="md:hidden pb-5 translate-x-8 w-fit">
                <Link href="/blogs" className="project flex items-center gap-2 w-fit hover:text-accent transition-colors">
                    <ArrowLeftIcon size={20} className="list-line" /> back to blogs
                </Link>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-sec">
                <div className="bg-accent text-bg font-bold tracking-wide px-3.5 py-1 w-fit rounded-xl">
                    {category}
                </div>
                <span>{date}</span>
                <div className="aspect-square w-1 bg-fg rounded-full" />
                <span>{readingTimeMinutes} min read</span>
            </div>
        </div>
    )
}

export default TopBar
