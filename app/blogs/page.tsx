import React from 'react'
import Banner from './components/ui/Banner'
import Main from './components/sections/MainLayout'
import RightLayout from './components/sections/RightLayout'
import LeftLayout from './components/sections/LeftLayout'

const page = () => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center md:px-5'>
            {/* <Banner /> */}
            <div className='max-w-7xl w-full h-full flex flex-col lg:flex-row gap-5 zbg-red-500 px-5'>
                <LeftLayout />
                <Main />
                <RightLayout />
            </div>
            
        </div>
    )
}

export default page
