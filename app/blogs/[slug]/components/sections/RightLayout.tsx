import React from 'react'
import Profile from '../../components/sections/rightLayout/Profile'
import Series from '../../components/sections/rightLayout/Series'
import SubscribeForm from '../../components/sections/rightLayout/SubscribeForm'
import Socials from '../../components/sections/rightLayout/Socials'
import CommentForm from '../../components/sections/rightLayout/CommentForm'

const RightLayout = () => {
    return (
        <div className='w-full sm:max-w-76 h-full bg-blue-400/0 space-y-10 pt-7 pb-50'>
            <Profile />
            <Series />
            <SubscribeForm />
            <Socials />
            <CommentForm />
        </div>
    )
}

export default RightLayout
