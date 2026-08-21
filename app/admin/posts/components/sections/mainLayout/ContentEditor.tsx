'use client'

import React, { useState } from 'react'
import { Eye, Edit3, Sparkles } from 'lucide-react'
import ArticleBody from '@/components/blog/article/ArticleBody'
import EditorToolbar from '@/components/blog/editor/EditorToolbar'

interface ContentEditorProps {
    content: string
    onContentChange: (content: string) => void
}

const ContentEditor: React.FC<ContentEditorProps> = ({ content, onContentChange }) => {
    const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit')

    const getTextarea = () => document.getElementById('markdown-editor-textarea') as HTMLTextAreaElement | null

    return (
        <div className="space-y-3 pt-2">
            {/* Header Toolbar */}
            <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl border border-sec/20 bg-fg/3 backdrop-blur-md flex-wrap">
                {/* Markdown formatting quick buttons toolbar */}
                <EditorToolbar
                    getTextarea={getTextarea}
                    content={content}
                    onContentChange={onContentChange}
                />

                {/* View Mode Toggle Switch */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-fg/10 border border-sec/15 text-xs font-mono">
                    <button
                        type="button"
                        onClick={() => setViewMode('edit')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                            viewMode === 'edit'
                                ? 'bg-accent text-black font-bold shadow-sm'
                                : 'text-sec hover:text-fg'
                        }`}
                    >
                        <Edit3 size={13} />
                        <span>Edit</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode('preview')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                            viewMode === 'preview'
                                ? 'bg-accent text-black font-bold shadow-sm'
                                : 'text-sec hover:text-fg'
                        }`}
                    >
                        <Eye size={13} />
                        <span>Preview</span>
                    </button>
                </div>
            </div>

            {/* Content Container with Border and overflow-y-auto */}
            <div className="rounded-3xl border border-sec/25 bg-fg/2 shadow-sm overflow-hidden focus-within:border-accent/60 transition-colors">
                {viewMode === 'edit' && (
                    <textarea
                        id="markdown-editor-textarea"
                        value={content}
                        onChange={(e) => onContentChange(e.target.value)}
                        placeholder={`Write your article in Markdown format...\n\n## 🧠 Section Heading\n\nStart typing paragraph content, code snippets, lists, or tables.\n\n\`\`\`javascript\nconst hello = "world";\n\`\`\`\n\n![My Screenshot](https://...)\n*Caption text*`}
                        className="w-full h-[calc(100vh-170px)] overflow-y-auto p-5 sm:p-6 bg-transparent outline-none font-mono text-sm leading-relaxed text-fg placeholder:text-sec/30 resize-none selection:bg-accent/30"
                    />
                )}

                {viewMode === 'preview' && (
                    <div className="w-full max-w-full min-w-0 h-[calc(100vh-170px)] overflow-y-auto p-5 sm:p-8 bg-transparent">
                        {content.trim() ? (
                            <ArticleBody content={content} />
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-2 text-sec font-mono text-xs">
                                <Sparkles size={24} className="text-accent/60 animate-pulse" />
                                <p>Nothing to preview yet.</p>
                                <p className="text-[11px] text-sec/60">Switch to Edit mode and type some markdown!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ContentEditor
