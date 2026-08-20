'use client'

import React, { useState } from 'react'
import { User, Edit2, Check } from 'lucide-react'

interface AuthorProps {
    authorId?: string
    onAuthorIdChange?: (authorId: string) => void
}

const Author: React.FC<AuthorProps> = ({ authorId = 'bismay', onAuthorIdChange }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [tempId, setTempId] = useState(authorId)

    const today = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })

    const handleSave = () => {
        if (onAuthorIdChange && tempId.trim()) {
            onAuthorIdChange(tempId.trim().toLowerCase())
        }
        setIsEditing(false)
    }

    const initial = (authorId || 'B').charAt(0).toUpperCase()

    return (
        <div className="flex items-center gap-3.5 py-1">
            <div className="w-11 h-11 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-bold text-base shadow-sm shrink-0">
                {initial}
            </div>
            <div className="space-y-0.5 flex-1">
                <div className="flex items-center gap-2">
                    {isEditing ? (
                        <div className="flex items-center gap-1.5">
                            <input
                                type="text"
                                autoFocus
                                value={tempId}
                                onChange={(e) => setTempId(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSave()
                                    if (e.key === 'Escape') setIsEditing(false)
                                }}
                                className="px-2 py-0.5 rounded-lg bg-fg/10 border border-accent text-xs font-mono text-fg outline-none"
                                placeholder="author-id"
                            />
                            <button
                                type="button"
                                onClick={handleSave}
                                className="p-1 rounded-md bg-accent text-black hover:opacity-90 cursor-pointer"
                                title="Save author ID"
                            >
                                <Check size={12} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 group/author">
                            <span className="font-bold text-fg text-sm capitalize">{authorId || 'bismay'}</span>
                            {onAuthorIdChange && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTempId(authorId)
                                        setIsEditing(true)
                                    }}
                                    className="text-sec/40 hover:text-accent opacity-0 group-hover/author:opacity-100 transition-opacity cursor-pointer p-0.5"
                                    title="Edit author ID"
                                >
                                    <Edit2 size={11} />
                                </button>
                            )}
                        </div>
                    )}

                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/20 flex items-center gap-1">
                        <User size={10} />
                        Author
                    </span>
                </div>
                <p className="text-xs text-sec font-mono">{today} • React Learning Journal</p>
            </div>
        </div>
    )
}

export default Author
