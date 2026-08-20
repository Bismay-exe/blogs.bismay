'use client'

import React, { useState } from 'react'
import { Plus, X, Tag as TagIcon } from 'lucide-react'

interface TagsEditorProps {
    tags: string[]
    onTagsChange: (tags: string[]) => void
}

const suggestedTags = ['React', 'JavaScript', 'Next.js', 'WebDev', 'TypeScript', 'CSS', 'Tailwind', 'Hooks', 'State']

const TagsEditor: React.FC<TagsEditorProps> = ({ tags, onTagsChange }) => {
    const [inputValue, setInputValue] = useState('')

    const handleAddTag = (newTag: string) => {
        const clean = newTag.trim().replace(/^#/, '')
        if (clean && !tags.includes(clean)) {
            onTagsChange([...tags, clean])
        }
        setInputValue('')
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            handleAddTag(inputValue)
        } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
            onTagsChange(tags.slice(0, -1))
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        onTagsChange(tags.filter((t) => t !== tagToRemove))
    }

    return (
        <div className="space-y-3 py-2">
            <div className="flex items-center gap-2 flex-wrap min-h-[42px] p-2 rounded-2xl border border-sec/20 bg-fg/2 focus-within:border-accent/60 transition-colors">
                <TagIcon size={15} className="text-sec ml-1.5 shrink-0" />

                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-fg/10 text-fg text-xs font-mono font-medium hover:bg-fg/15 transition-colors group"
                    >
                        <span>#{tag}</span>
                        <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-sec hover:text-rose-400 transition-colors cursor-pointer"
                        >
                            <X size={12} />
                        </button>
                    </span>
                ))}

                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={tags.length === 0 ? "Type tag & press Enter (e.g. React, WebDev)..." : "Add tag..."}
                    className="flex-1 min-w-[140px] bg-transparent outline-none text-xs font-mono text-fg placeholder:text-sec/40 px-2 py-1"
                />

                {inputValue.trim() && (
                    <button
                        type="button"
                        onClick={() => handleAddTag(inputValue)}
                        className="p-1 rounded-lg bg-accent text-black hover:opacity-90 transition-opacity cursor-pointer mr-1"
                    >
                        <Plus size={14} />
                    </button>
                )}
            </div>

            {/* Suggested quick chips */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs text-sec">
                <span className="font-mono text-[11px] mr-1">Suggestions:</span>
                {suggestedTags
                    .filter((t) => !tags.includes(t))
                    .slice(0, 6)
                    .map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => handleAddTag(tag)}
                            className="px-2 py-0.5 rounded-lg bg-fg/5 hover:bg-fg/10 text-sec hover:text-fg text-[11px] font-mono border border-sec/15 transition-all cursor-pointer"
                        >
                            +{tag}
                        </button>
                    ))}
            </div>
        </div>
    )
}

export default TagsEditor
