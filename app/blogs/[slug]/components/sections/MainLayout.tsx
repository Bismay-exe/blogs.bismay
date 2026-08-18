import React from 'react'
import Banner from '../../components/ui/Banner'
import Author from './mainLayout/Author'
import Body from './mainLayout/Body'
import Tags from './mainLayout/Tags'
import Title from './mainLayout/Title'
import TopBar from './mainLayout/TopBar'

interface MainLayoutProps {
    markdown?: string
    title?: string
}

const Main: React.FC<MainLayoutProps> = ({ markdown = '', title }) => {
    return (
        <div className='w-full bg-red-500/0 space-y-5'>
            <TopBar />
            <Banner />
            <Author />
            <Title title={title} />
            <Tags />
            <Body content={markdown} />
        </div>
    )
}

export default Main
