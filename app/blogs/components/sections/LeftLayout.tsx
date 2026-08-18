
import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'

const LeftLayout = () => {
    return (
        <div className="sticky top-0 max-w-50 w-full h-screen hidden xl:flex flex-col gap-5 justify-center bg-blue-500/0 group">
            <div className='absolute top-0 pt-5  cursor-pointer translate-x-8 w-fit'>
                <div className='project flex items-center gap-2 w-fit'>
                    <ArrowLeftIcon size={20} className='list-line' /> back to blogs
                </div>
            </div>
            <div className='absolute w-[75%] space-y-3 group-hover:opacity-0 transition-all duration-300 ease-in-out'>
                <div className='h-0.5 w-[30%] bg-sec rounded-full' />
                <div className='h-0.5 w-[50%] bg-sec rounded-full' />
                <div className='h-0.5 w-[40%] bg-sec rounded-full' />
                <div className='h-0.5 w-[80%] bg-fg rounded-full' />
                <div className='h-0.5 w-[60%] bg-sec rounded-full' />
                <div className='h-0.5 w-[50%] bg-sec rounded-full' />
                <div className='h-0.5 w-[40%] bg-sec rounded-full' />
                <div className='h-0.5 w-[80%] bg-sec rounded-full' />
                <div className='h-0.5 w-[70%] bg-sec rounded-full' />
                <div className='h-0.5 w-[80%] bg-sec rounded-full' />
                <div className='h-0.5 w-[40%] bg-sec rounded-full' />
                <div className='h-0.5 w-[50%] bg-sec rounded-full' />
            </div>
            <h1 className='group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out text-md zuppercase'>On this page</h1>
            <div className='group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out w-full space-y-2 text-sm text-sec'>
                <h3 className="list hover:text-fg hover:font-medium">💡 Quick Recap</h3>
                <h3 className="list hover:text-fg hover:font-medium">🧠 The Biggest Lesson of Today</h3>
                <h3 className="list hover:text-fg hover:font-medium">⚙️ What Really Happens When I Run npm run dev?</h3>
                <h3 className="list hover:text-fg hover:font-medium">📦 Bundlers — The Part I Never Thought About</h3>
                <h3 className="list hover:text-fg hover:font-medium">🤯 JSX Isn't HTML... and It Isn't JavaScript Either</h3>
                <h3 className="list hover:text-fg hover:font-medium">✨ JSX Makes UI Easier to Read</h3>
                <h3 className="list hover:text-fg hover:font-medium">🔍 How I Debug JSX Code</h3>
                <h3 className="list hover:text-fg hover:font-medium">⚡ Why I Stopped Writing Plain HTML in React</h3>
                <h3 className="list hover:text-fg hover:font-medium">🚀 The Shift From Logic to Language</h3>
                <h3 className="list hover:text-fg hover:font-medium">🧩 Components — Finally, They Clicked</h3>
                <h3 className="list hover:text-fg hover:font-medium">📨 Props — How Components Talk to Each Other</h3>
            </div>
        </div>
    )
}

export default LeftLayout
