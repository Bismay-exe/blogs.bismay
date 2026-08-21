'use client'

import React from 'react'
import AnimatedTags from '@/components/ui/smoothui/animated-tags'

interface TagsEditorProps {
    tags: string[]
    onTagsChange: (tags: string[]) => void
}

const suggestedTags = [
    'React',
    'JavaScript',
    'Next.js',
    'WebDev',
    'TypeScript',
    'CSS',
    'Tailwind',
    'Hooks',
    'State',
    'Frontend',
    'Architecture',
    'Performance',
    'FullStack',
]

const TagsEditor: React.FC<TagsEditorProps> = ({ tags, onTagsChange }) => {
    return (
        <div className="py-2">
            <AnimatedTags
                initialTags={suggestedTags}
                selectedTags={tags}
                onChange={onTagsChange}
                placeholder="Type custom tag & press Enter (e.g. Redux, Vite)..."
                label="Article Classification Tags"
            />
        </div>
    )
}

export default TagsEditor
