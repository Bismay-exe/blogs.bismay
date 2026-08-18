import Banner from '../ui/Banner'
import Author from './mainLayout/Author'
import Tags from './mainLayout/Tags'
import Title from './mainLayout/Title'
import TopBar from './mainLayout/TopBar'

const Main = () => {
    return (
        <div className='w-full bg-red-500/0 space-y-5'>
            <TopBar />
            <Banner />
            <Author />
            <Title />
            <Tags />
        </div>
    )
}

export default Main
