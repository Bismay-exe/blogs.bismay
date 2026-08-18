import React from 'react'

interface TagsProps {
    tags?: string[]
}

const defaultTags = ['react', 'javascript', 'webdev', 'beginners']

const Tags: React.FC<TagsProps> = ({ tags = defaultTags }) => {
    const list = tags && tags.length > 0 ? tags : defaultTags

    return (
        <div className="flex gap-5 items-center text-sm font-light text-sec flex-wrap">
            {list.map((tag, idx) => {
                const cleaned = tag.replace(/^#/, '')
                return (
                    <span
                        key={idx}
                        className="font-mono hover:text-fg cursor-pointer rounded-lg hover:bg-(--hover) hover:px-3 py-1.5 transition-all duration-300 ease-in-out"
                    >
                        #{cleaned}
                    </span>
                )
            })}
        </div>
    )
}

export default Tags
