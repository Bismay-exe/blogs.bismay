import React from 'react'
import Banner from './components/ui/Banner'
import Main from './components/sections/MainLayout'
import RightLayout from './components/sections/RightLayout'
import LeftLayout from './components/sections/LeftLayout'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const page = () => {
    return (
        <div className='w-full min-h-screen flex flex-col items-center'>
            <Navbar />
            <div className='max-w-7xl w-full h-full flex flex-col lg:flex-row gap-5 px-4 sm:px-6 lg:px-8'>
                <LeftLayout />
                <Main />
                <RightLayout />
            </div>
            <Footer />
        </div>
    )
}

export default page
