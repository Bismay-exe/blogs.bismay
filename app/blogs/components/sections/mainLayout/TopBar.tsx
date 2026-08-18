import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'

const TopBar = () => {
    return (
        <div className='pt-7'>
            <div className='md:hidden pb-5 cursor-pointer translate-x-8 w-fit'>
                <div className='project flex items-center gap-2 w-fit'>
                    <ArrowLeftIcon size={20} className='list-line' /> back to blogs
                </div>
            </div>
            <div className='flex flex-wrap items-center gap-4'>
                <div className='bg-accent text-bg font-bold tracking-wide px-4 py-1 w-fit rounded-xl'>Learning</div>
                <span>25 June, 2026</span>
                <div className='aspect-square w-1  bg-fg rounded-full' />
                <span>8 min read</span>
                <div className='aspect-square w-1  bg-fg rounded-full' />
                <span>React</span>
            </div>
        </div>
    )
}

export default TopBar
