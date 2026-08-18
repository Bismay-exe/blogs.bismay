import React from 'react'
import fs from 'fs'
import path from 'path'
import Main from './components/sections/MainLayout'
import RightLayout from './components/sections/RightLayout'
import LeftLayout from './components/sections/LeftLayout'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const page = () => {
    const filePath = path.join(process.cwd(), '/articles/day-11-article.md')
    let articleMarkdown = ''
    try {
        articleMarkdown = fs.readFileSync(filePath, 'utf-8')
    } catch {
        articleMarkdown = ''
    }

    return (
        <div className='w-full min-h-screen flex flex-col items-center'>
            <Navbar />
            <div className='max-w-7xl w-full h-full flex flex-col lg:flex-row gap-5 px-4 sm:px-6 lg:px-8'>
                <LeftLayout markdown={articleMarkdown} />
                <Main markdown={articleMarkdown} />
                <RightLayout />
            </div>
            <Footer />
        </div>
    )
}

export default page
