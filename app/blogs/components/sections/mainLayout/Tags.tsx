import React from 'react'

const Tags = () => {
    return (
        <div className='flex gap-5 items-center text-sm font-light text-sec'>
            <span className='font-mono hover:text-fg cursor-pointer rounded-lg hover:bg-(--hover) hover:px-3 py-1.5 transition-all duration-300 ease-in-out'>#react</span>
            <span className='font-mono hover:text-fg cursor-pointer rounded-lg hover:bg-(--hover) hover:px-3 py-1.5 transition-all duration-300 ease-in-out'>#javascript</span>
            <span className='font-mono hover:text-fg cursor-pointer rounded-lg hover:bg-(--hover) hover:px-3 py-1.5 transition-all duration-300 ease-in-out'>#webdev</span>
            <span className='font-mono hover:text-fg cursor-pointer rounded-lg hover:bg-(--hover) hover:px-3 py-1.5 transition-all duration-300 ease-in-out'>#beginers</span>
        </div>
    )
}

export default Tags
