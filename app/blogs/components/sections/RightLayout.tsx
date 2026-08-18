import React from 'react'
import Profile from './rightLayout/Profile'
import Series from './rightLayout/Series'

const RightLayout = () => {
    return (
        <div className='w-140 h-full zbg-blue-400/20 space-y-10 pt-7 pb-50'>
            <Profile />
            <Series />
        </div>
    )
}

export default RightLayout
