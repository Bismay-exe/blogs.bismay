'use client'

import React, { useState } from 'react'
import {
    Code,
    Bold,
    Italic,
    Heading2,
    List,
    Quote,
    Link as LinkIcon,
    Image as ImageIcon,
    Eye,
    Edit3,
    Sparkles,
} from 'lucide-react'
import Body from '../../../../[slug]/components/sections/mainLayout/Body'

interface ContentEditorProps {
    content: string
    onContentChange: (content: string) => void
}

const ContentEditor: React.FC<ContentEditorProps> = ({ content, onContentChange }) => {
    const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'split'>('edit')

    const insertSnippet = (before: string, after: string = '') => {
        const textarea = document.getElementById('markdown-editor-textarea') as HTMLTextAreaElement | null
        if (!textarea) {
            onContentChange(content + before + after)
            return
        }

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const selected = content.substring(start, end)
        const replacement = before + (selected || 'text') + after
        const newContent = content.substring(0, start) + replacement + content.substring(end)

        onContentChange(newContent)

        setTimeout(() => {
            textarea.focus()
            textarea.setSelectionRange(start + before.length, start + before.length + (selected.length || 4))
        }, 10)
    }

    return (
        <div className="space-y-3 pt-2">
            {/* Header Toolbar */}
            <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl border border-sec/20 bg-fg/[0.03] backdrop-blur-md flex-wrap">
                {/* Markdown formatting quick buttons */}
                <div className="flex items-center gap-1 flex-wrap">
                    <button
                        type="button"
                        onClick={() => insertSnippet('\n## ', '\n')}
                        className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                        title="Heading 2 (##)"
                    >
                        <Heading2 size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => insertSnippet('**', '**')}
                        className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                        title="Bold (**text**)"
                    >
                        <Bold size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => insertSnippet('*', '*')}
                        className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                        title="Italic (*text*)"
                    >
                        <Italic size={16} />
                    </button>
                    <div className="h-4 w-px bg-sec/20 mx-1" />
                    <button
                        type="button"
                        onClick={() => insertSnippet('\n```javascript\n', '\n```\n')}
                        className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                        title="Code block"
                    >
                        <Code size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => insertSnippet('> ', '\n')}
                        className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                        title="Blockquote (>)"
                    >
                        <Quote size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => insertSnippet('\n* ', '\n')}
                        className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                        title="Bullet list (*)"
                    >
                        <List size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => insertSnippet('[', '](https://url.com)')}
                        className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                        title="Link [text](url)"
                    >
                        <LinkIcon size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => insertSnippet('\n![Image Alt](', ')\n*Optional caption text*\n')}
                        className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                        title="Image ![alt](url)"
                    >
                        <ImageIcon size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => insertSnippet('\n{% embed ', ' %}\n')}
                        className="px-2 py-1 rounded-lg hover:bg-fg/10 text-sec hover:text-accent font-mono text-xs transition-colors cursor-pointer"
                        title="Dev.to / GitHub Embed {% embed url %}"
                    >
                        Embed
                    </button>
                </div>

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
            <div className="rounded-3xl border border-sec/25 bg-fg/[0.02] shadow-sm overflow-hidden focus-within:border-accent/60 transition-colors">
                {viewMode === 'edit' && (
                    <textarea
                        id="markdown-editor-textarea"
                        value={content}
                        onChange={(e) => onContentChange(e.target.value)}
                        placeholder={`Write your article in Markdown format...\n\n## 🧠 Section Heading\n\nStart typing paragraph content, code snippets, lists, or tables.\n\n\`\`\`javascript\nconst hello = "world";\n\`\`\`\n\n![My Screenshot](https://...)\n*Caption text*`}
                        className="w-full h-[550px] overflow-y-auto p-5 sm:p-6 bg-transparent outline-none font-mono text-sm leading-relaxed text-fg placeholder:text-sec/30 resize-none selection:bg-accent/30"
                    />
                )}

                {viewMode === 'preview' && (
                    <div className="w-full h-[550px] overflow-y-auto p-5 sm:p-8 bg-transparent">
                        {content.trim() ? (
                            <Body content={content} />
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
