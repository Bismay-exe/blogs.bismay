import fs from 'fs'
import path from 'path'
import Banner from '../../components/ui/Banner'
import Author from '../../components/sections/mainLayout/Author'
import Body from '../../components/sections/mainLayout/Body'
import Tags from '../../components/sections/mainLayout/Tags'
import Title from '../../components/sections/mainLayout/Title'
import TopBar from '../../components/sections/mainLayout/TopBar'

interface MainLayoutProps { markdown?: string }

const Main: React.FC<MainLayoutProps> = ({ markdown = '' }) => {

    return (
        <div className='w-full bg-red-500/0 space-y-5'>
            <TopBar />
            <Banner />
            <Author />
            <Title />
            <Tags />
            <Body content={markdown} />
        </div>
    )
}

export default Main
