import React from 'react'
import Banner from './mainLayout/Banner'
import Author from './mainLayout/Author'
import Body from './mainLayout/Body'
import Tags from './mainLayout/Tags'
import Title from './mainLayout/Title'
import TopBar from './mainLayout/TopBar'

interface MainLayoutProps {
    markdown?: string
    title?: string
    bannerUrl?: string
    bannerAlt?: string
    tags?: string[]
    category?: string
    date?: string
    readingTimeMinutes?: number
}

const Main: React.FC<MainLayoutProps> = ({
    markdown = '',
    title,
    bannerUrl,
    bannerAlt,
    tags,
    category,
    date,
    readingTimeMinutes,
}) => {
    return (
        <div className="w-full space-y-5 pb-16">
            <TopBar
                category={category}
                date={date}
                readingTimeMinutes={readingTimeMinutes}
            />
            {bannerUrl && <Banner src={bannerUrl} alt={bannerAlt || title} />}
            <Author />
            <Title title={title} />
            {tags && tags.length > 0 && <Tags tags={tags} />}
            <Body content={markdown} />
        </div>
    )
}

export default Main
