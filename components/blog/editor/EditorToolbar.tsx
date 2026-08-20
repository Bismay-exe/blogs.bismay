'use client'

import React from 'react'
import {
    Heading1,
    Heading2,
    Heading3,
    Bold,
    Italic,
    Strikethrough,
    Code,
    Code2,
    Keyboard,
    GitCompare,
    AlertCircle,
    Quote,
    ListTodo,
    List,
    ListOrdered,
    Table as TableIcon,
    Link as LinkIcon,
    Image as ImageIcon,
    Minus,
} from 'lucide-react'
import {
    toggleInlineFormat,
    toggleHeading,
    toggleBlockElement,
    toggleCallout,
    toggleTaskList,
    togglePullquote,
    toggleCodeBlock,
    insertTable,
    insertDivider,
    toggleLink,
    toggleEmbed,
    insertYouTubeSnippet,
    insertImageSnippet,
} from '../../../lib/markdown/editorUtils'
import { Icon } from '@iconify-icon/react'

interface EditorToolbarProps {
    getTextarea: () => HTMLTextAreaElement | null
    content: string
    onContentChange: (content: string) => void
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
    getTextarea,
    content,
    onContentChange,
}) => {
    return (
        <div className="flex items-center gap-1 flex-wrap">
            {/* 1. Headings Group */}
            <button
                type="button"
                onClick={() => toggleHeading(getTextarea(), content, 1, onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                title="Heading 1 (#)"
            >
                <Heading1 size={16} />
            </button>
            <button
                type="button"
                onClick={() => toggleHeading(getTextarea(), content, 2, onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                title="Heading 2 (##)"
            >
                <Heading2 size={16} />
            </button>
            <button
                type="button"
                onClick={() => toggleHeading(getTextarea(), content, 3, onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                title="Heading 3 (###)"
            >
                <Heading3 size={16} />
            </button>

            <div className="h-4 w-px bg-sec/20 mx-1" />

            {/* 2. Inline Text Styling */}
            <button
                type="button"
                onClick={() => toggleInlineFormat(getTextarea(), content, 'bold', onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                title="Bold (**text**)"
            >
                <Bold size={16} />
            </button>
            <button
                type="button"
                onClick={() => toggleInlineFormat(getTextarea(), content, 'italic', onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                title="Italic (*text*)"
            >
                <Italic size={16} />
            </button>
            <button
                type="button"
                onClick={() => toggleInlineFormat(getTextarea(), content, 'strike', onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                title="Strikethrough (~~text~~)"
            >
                <Strikethrough size={16} />
            </button>
            <button
                type="button"
                onClick={() => toggleInlineFormat(getTextarea(), content, 'code', onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-accent transition-colors cursor-pointer"
                title="Inline Code (`code`)"
            >
                <Code2 size={16} />
            </button>
            <button
                type="button"
                onClick={() => toggleInlineFormat(getTextarea(), content, 'kbd', onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                title="Keyboard Keycap (<kbd>Key</kbd>)"
            >
                <Keyboard size={16} />
            </button>

            <div className="h-4 w-px bg-sec/20 mx-1" />

            {/* 3. Code & Blocks */}
            <button
                type="button"
                onClick={() => toggleCodeBlock(getTextarea(), content, 'javascript', onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-emerald-400 transition-colors cursor-pointer"
                title="Code Block (```javascript)"
            >
                <Code size={16} />
            </button>
            <button
                type="button"
                onClick={() => toggleCodeBlock(getTextarea(), content, 'diff', onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-amber-400 transition-colors cursor-pointer"
                title="Code Diff (```diff)"
            >
                <GitCompare size={16} />
            </button>
            <button
                type="button"
                onClick={() => toggleCallout(getTextarea(), content, 'NOTE', onContentChange)}
                className="p-1.5 rounded-r-lg hover:bg-fg/10 text-sec hover:text-sky-400 transition-colors cursor-pointer"
                title="Callout Box (> [!NOTE])"
            >
                <AlertCircle size={16} />
            </button>
            <button
                type="button"
                onClick={() => toggleBlockElement(getTextarea(), content, 'quote', onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                title="Blockquote (>)"
            >
                <Quote size={16} />
            </button>
            <button
                type="button"
                onClick={() => togglePullquote(getTextarea(), content, onContentChange)}
                className="px-1.5 py-0.5 rounded-lg hover:bg-fg/10 text-sec hover:text-accent font-serif font-black text-sm transition-colors cursor-pointer leading-none"
                title="Editorial Pullquote (>> **text**)"
            >
                “ ”
            </button>

            <div className="h-4 w-px bg-sec/20 mx-1" />

            {/* 4. Lists & Tables */}
            <button
                type="button"
                onClick={() => toggleTaskList(getTextarea(), content, onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-emerald-400 transition-colors cursor-pointer"
                title="Task Checklist (- [ ])"
            >
                <ListTodo size={16} />
            </button>
            <button
                type="button"
                onClick={() => toggleBlockElement(getTextarea(), content, 'list', onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                title="Bullet list (*)"
            >
                <List size={16} />
            </button>
            <button
                type="button"
                onClick={() => toggleBlockElement(getTextarea(), content, 'ordered_list', onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                title="Numbered list (1.)"
            >
                <ListOrdered size={16} />
            </button>
            <button
                type="button"
                onClick={() => insertTable(getTextarea(), content, onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                title="Table (| Col | Col |)"
            >
                <TableIcon size={16} />
            </button>

            <div className="h-4 w-px bg-sec/20 mx-1" />

            {/* 5. Media, Links & Extras */}
            <button
                type="button"
                onClick={() => toggleLink(getTextarea(), content, onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                title="Link [text](url)"
            >
                <LinkIcon size={16} />
            </button>
            <button
                type="button"
                onClick={() => insertImageSnippet(getTextarea(), content, onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                title="Image ![alt](url)"
            >
                <ImageIcon size={16} />
            </button>
            <button
                type="button"
                onClick={() => insertYouTubeSnippet(getTextarea(), content, onContentChange)}
                className="p-1.5 h-7 flex justify-center items-center rounded-lg hover:bg-fg/10 text-sec hover:text-rose-500 transition-colors cursor-pointer"
                title="YouTube Video Embed ({% youtube url %})"
            >
                <Icon icon="fa-brands:youtube" size={16} />
            </button>
            <button
                type="button"
                onClick={() => toggleEmbed(getTextarea(), content, onContentChange)}
                className="px-2 py-1 rounded-lg hover:bg-fg/10 text-sec hover:text-accent font-mono text-xs transition-colors cursor-pointer"
                title="Dev.to / GitHub Embed {% embed url %}"
            >
                Embed
            </button>
            <button
                type="button"
                onClick={() => insertDivider(getTextarea(), content, onContentChange)}
                className="p-1.5 rounded-lg hover:bg-fg/10 text-sec hover:text-fg transition-colors cursor-pointer"
                title="Divider Horizontal Rule (---)"
            >
                <Minus size={16} />
            </button>
        </div>
    )
}

export default EditorToolbar
