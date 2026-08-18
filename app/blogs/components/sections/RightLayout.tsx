import React from 'react'
import Profile from './rightLayout/Profile'
import Series from './rightLayout/Series'
import SubscribeForm from './rightLayout/SubscribeForm'
import Socials from './rightLayout/Socials'
import CommentForm from './rightLayout/CommentForm'

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
