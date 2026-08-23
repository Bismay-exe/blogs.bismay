// Helper to remove any block-level prefix (headings, lists, quotes, pullquotes, callouts, tasklists)
export function stripBlockPrefix(line: string): string {
    return line
        .replace(/^>>\s*(\*\*)?/, '')
        .replace(/(\*\*)?$/, '')
        .replace(/^>\s*\[!.*?\]\s*/i, '')
        .replace(/^#{1,6}\s+/, '')
        .replace(/^>\s*/, '')
        .replace(/^[\*\-]\s+\[[ xX]\]\s+/, '')
        .replace(/^([\*\-+]|\d+[\.\)])\s+/, '')
        .trim()
}

export function updateTextarea(
    textarea: HTMLTextAreaElement | null,
    newContent: string,
    selStart: number,
    selEnd: number,
    onContentChange: (content: string) => void
) {
    onContentChange(newContent)
    setTimeout(() => {
        if (textarea) {
            textarea.focus()
            textarea.setSelectionRange(selStart, selEnd)
        }
    }, 10)
}

export function toggleInlineFormat(
    textarea: HTMLTextAreaElement | null,
    content: string,
    type: 'bold' | 'italic' | 'strike' | 'code' | 'kbd' | 'highlight',
    onContentChange: (content: string) => void
) {
    if (!textarea) {
        const wrap =
            type === 'bold'
                ? '**'
                : type === 'italic'
                ? '*'
                : type === 'strike'
                ? '~~'
                : type === 'highlight'
                ? '=='
                : type === 'kbd'
                ? '<kbd>'
                : '`'
        const wrapEnd = type === 'kbd' ? '</kbd>' : wrap
        onContentChange(content + wrap + 'text' + wrapEnd)
        return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = content.slice(start, end)

    if (type === 'highlight') {
        if (selected.startsWith('==') && selected.endsWith('==') && selected.length >= 4) {
            const unwrapped = selected.slice(2, -2)
            const newContent = content.slice(0, start) + unwrapped + content.slice(end)
            updateTextarea(textarea, newContent, start, start + unwrapped.length, onContentChange)
            return
        }
        if (content.slice(Math.max(0, start - 2), start) === '==' && content.slice(end, end + 2) === '==') {
            const newContent = content.slice(0, start - 2) + selected + content.slice(end + 2)
            updateTextarea(textarea, newContent, start - 2, start - 2 + selected.length, onContentChange)
            return
        }
        const textToWrap = selected || 'highlighted text'
        const replacement = `==${textToWrap}==`
        const newContent = content.slice(0, start) + replacement + content.slice(end)
        updateTextarea(textarea, newContent, start + 2, start + 2 + textToWrap.length, onContentChange)
        return
    }

    if (type === 'kbd') {
        if (selected.startsWith('<kbd>') && selected.endsWith('</kbd>')) {
            const unwrapped = selected.slice(5, -6)
            const newContent = content.slice(0, start) + unwrapped + content.slice(end)
            updateTextarea(textarea, newContent, start, start + unwrapped.length, onContentChange)
            return
        }
        if (content.slice(Math.max(0, start - 5), start) === '<kbd>' && content.slice(end, end + 6) === '</kbd>') {
            const newContent = content.slice(0, start - 5) + selected + content.slice(end + 6)
            updateTextarea(textarea, newContent, start - 5, start - 5 + selected.length, onContentChange)
            return
        }
        const textToWrap = selected || 'Ctrl'
        const replacement = `<kbd>${textToWrap}</kbd>`
        const newContent = content.slice(0, start) + replacement + content.slice(end)
        updateTextarea(textarea, newContent, start + 5, start + 5 + textToWrap.length, onContentChange)
        return
    }

    if (type === 'strike') {
        if (selected.startsWith('~~') && selected.endsWith('~~') && selected.length >= 4) {
            const unwrapped = selected.slice(2, -2)
            const newContent = content.slice(0, start) + unwrapped + content.slice(end)
            updateTextarea(textarea, newContent, start, start + unwrapped.length, onContentChange)
            return
        }
        if (content.slice(Math.max(0, start - 2), start) === '~~' && content.slice(end, end + 2) === '~~') {
            const newContent = content.slice(0, start - 2) + selected + content.slice(end + 2)
            updateTextarea(textarea, newContent, start - 2, start - 2 + selected.length, onContentChange)
            return
        }
        const textToWrap = selected || 'strikethrough text'
        const replacement = `~~${textToWrap}~~`
        const newContent = content.slice(0, start) + replacement + content.slice(end)
        updateTextarea(textarea, newContent, start + 2, start + 2 + textToWrap.length, onContentChange)
        return
    }

    if (type === 'bold') {
        if (selected.startsWith('***') && selected.endsWith('***') && selected.length >= 6) {
            const inner = selected.slice(3, -3)
            const unwrapped = `*${inner}*`
            const newContent = content.slice(0, start) + unwrapped + content.slice(end)
            updateTextarea(textarea, newContent, start, start + unwrapped.length, onContentChange)
            return
        }

        if (content.slice(Math.max(0, start - 3), start) === '***' && content.slice(end, end + 3) === '***') {
            const newContent = content.slice(0, start - 3) + `*${selected}*` + content.slice(end + 3)
            updateTextarea(textarea, newContent, start - 2, start - 2 + selected.length, onContentChange)
            return
        }

        if (selected.startsWith('**') && selected.endsWith('**') && selected.length >= 4) {
            const unwrapped = selected.slice(2, -2)
            const newContent = content.slice(0, start) + unwrapped + content.slice(end)
            updateTextarea(textarea, newContent, start, start + unwrapped.length, onContentChange)
            return
        }

        if (
            content.slice(Math.max(0, start - 2), start) === '**' &&
            content.slice(end, end + 2) === '**' &&
            content.slice(Math.max(0, start - 3), start) !== '***'
        ) {
            const newContent = content.slice(0, start - 2) + selected + content.slice(end + 2)
            updateTextarea(textarea, newContent, start - 2, start - 2 + selected.length, onContentChange)
            return
        }

        if (selected.startsWith('*') && selected.endsWith('*') && !selected.startsWith('**') && selected.length >= 2) {
            const inner = selected.slice(1, -1)
            const wrapped = `***${inner}***`
            const newContent = content.slice(0, start) + wrapped + content.slice(end)
            updateTextarea(textarea, newContent, start, start + wrapped.length, onContentChange)
            return
        }

        if (
            content.slice(Math.max(0, start - 1), start) === '*' &&
            content.slice(end, end + 1) === '*' &&
            content.slice(Math.max(0, start - 2), start) !== '**'
        ) {
            const newContent = content.slice(0, start - 1) + `***${selected}***` + content.slice(end + 1)
            updateTextarea(textarea, newContent, start + 2, start + 2 + selected.length, onContentChange)
            return
        }

        const textToWrap = selected || 'bold text'
        const replacement = `**${textToWrap}**`
        const newContent = content.slice(0, start) + replacement + content.slice(end)
        updateTextarea(textarea, newContent, start + 2, start + 2 + textToWrap.length, onContentChange)
        return
    }

    if (type === 'italic') {
        if (selected.startsWith('***') && selected.endsWith('***') && selected.length >= 6) {
            const inner = selected.slice(3, -3)
            const unwrapped = `**${inner}**`
            const newContent = content.slice(0, start) + unwrapped + content.slice(end)
            updateTextarea(textarea, newContent, start, start + unwrapped.length, onContentChange)
            return
        }

        if (content.slice(Math.max(0, start - 3), start) === '***' && content.slice(end, end + 3) === '***') {
            const newContent = content.slice(0, start - 3) + `**${selected}**` + content.slice(end + 3)
            updateTextarea(textarea, newContent, start - 1, start - 1 + selected.length, onContentChange)
            return
        }

        if (selected.startsWith('*') && selected.endsWith('*') && !selected.startsWith('**') && selected.length >= 2) {
            const unwrapped = selected.slice(1, -1)
            const newContent = content.slice(0, start) + unwrapped + content.slice(end)
            updateTextarea(textarea, newContent, start, start + unwrapped.length, onContentChange)
            return
        }

        if (
            content.slice(Math.max(0, start - 1), start) === '*' &&
            content.slice(end, end + 1) === '*' &&
            content.slice(Math.max(0, start - 2), start) !== '**'
        ) {
            const newContent = content.slice(0, start - 1) + selected + content.slice(end + 1)
            updateTextarea(textarea, newContent, start - 1, start - 1 + selected.length, onContentChange)
            return
        }

        if (selected.startsWith('**') && selected.endsWith('**') && !selected.startsWith('***') && selected.length >= 4) {
            const inner = selected.slice(2, -2)
            const wrapped = `***${inner}***`
            const newContent = content.slice(0, start) + wrapped + content.slice(end)
            updateTextarea(textarea, newContent, start, start + wrapped.length, onContentChange)
            return
        }

        if (
            content.slice(Math.max(0, start - 2), start) === '**' &&
            content.slice(end, end + 2) === '**' &&
            content.slice(Math.max(0, start - 3), start) !== '***'
        ) {
            const newContent = content.slice(0, start - 2) + `***${selected}***` + content.slice(end + 2)
            updateTextarea(textarea, newContent, start + 1, start + 1 + selected.length, onContentChange)
            return
        }

        const textToWrap = selected || 'italic text'
        const replacement = `*${textToWrap}*`
        const newContent = content.slice(0, start) + replacement + content.slice(end)
        updateTextarea(textarea, newContent, start + 1, start + 1 + textToWrap.length, onContentChange)
        return
    }

    if (type === 'code') {
        if (selected.startsWith('`') && selected.endsWith('`') && selected.length >= 2) {
            const unwrapped = selected.slice(1, -1)
            const newContent = content.slice(0, start) + unwrapped + content.slice(end)
            updateTextarea(textarea, newContent, start, start + unwrapped.length, onContentChange)
            return
        }
        if (content.slice(Math.max(0, start - 1), start) === '`' && content.slice(end, end + 1) === '`') {
            const newContent = content.slice(0, start - 1) + selected + content.slice(end + 1)
            updateTextarea(textarea, newContent, start - 1, start - 1 + selected.length, onContentChange)
            return
        }
        const textToWrap = selected || 'code'
        const replacement = `\`${textToWrap}\``
        const newContent = content.slice(0, start) + replacement + content.slice(end)
        updateTextarea(textarea, newContent, start + 1, start + 1 + textToWrap.length, onContentChange)
        return
    }
}

export function toggleHeading(
    textarea: HTMLTextAreaElement | null,
    content: string,
    level: 1 | 2 | 3 | 4,
    onContentChange: (content: string) => void
) {
    const prefix = '#'.repeat(level) + ' '
    const placeholder = `Heading ${level}`

    if (!textarea) {
        onContentChange(content + prefix + placeholder)
        return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const lineStart = content.lastIndexOf('\n', start - 1) + 1
    let lineEnd = content.indexOf('\n', end)
    if (lineEnd === -1) lineEnd = content.length

    const fullBlock = content.slice(lineStart, lineEnd)
    const lines = fullBlock.split('\n')

    const allAlreadyThisLevel = lines.every((l) => l.trim().length === 0 || l.startsWith(prefix))

    let newLines: string[]
    if (allAlreadyThisLevel) {
        newLines = lines.map((l) => stripBlockPrefix(l))
    } else {
        newLines = lines.map((l) => {
            const cleaned = stripBlockPrefix(l)
            if (cleaned.length === 0) return ''
            return prefix + cleaned
        })
    }

    const replacement = newLines.join('\n')
    const newContent = content.slice(0, lineStart) + replacement + content.slice(lineEnd)
    updateTextarea(textarea, newContent, lineStart, lineStart + replacement.length, onContentChange)
}

export function toggleBlockElement(
    textarea: HTMLTextAreaElement | null,
    content: string,
    blockType: 'quote' | 'list' | 'ordered_list',
    onContentChange: (content: string) => void
) {
    if (!textarea) {
        const prefix = blockType === 'quote' ? '> ' : blockType === 'ordered_list' ? '1. ' : '* '
        const placeholder = blockType === 'quote' ? 'Quote text' : 'List item'
        onContentChange(content + prefix + placeholder)
        return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const lineStart = content.lastIndexOf('\n', start - 1) + 1
    let lineEnd = content.indexOf('\n', end)
    if (lineEnd === -1) lineEnd = content.length

    const fullBlock = content.slice(lineStart, lineEnd)
    const lines = fullBlock.split('\n')

    const allAlreadyThisType = lines.every((l) => {
        const trimmed = l.trim()
        if (trimmed.length === 0) return true
        if (blockType === 'quote') return l.startsWith('> ')
        if (blockType === 'list') return l.startsWith('* ') || l.startsWith('- ')
        if (blockType === 'ordered_list') return /^\d+\.\s+/.test(l)
        return false
    })

    let newLines: string[]
    if (allAlreadyThisType) {
        newLines = lines.map((l) => stripBlockPrefix(l))
    } else {
        newLines = lines.map((l, idx) => {
            const cleaned = stripBlockPrefix(l)
            if (cleaned.length === 0) return ''
            if (blockType === 'ordered_list') return `${idx + 1}. ${cleaned}`
            if (blockType === 'quote') return `> ${cleaned}`
            return `* ${cleaned}`
        })
    }

    const replacement = newLines.join('\n')
    const newContent = content.slice(0, lineStart) + replacement + content.slice(lineEnd)
    updateTextarea(textarea, newContent, lineStart, lineStart + replacement.length, onContentChange)
}

// Toggle Callout / Admonition block (> [!NOTE])
export function toggleCallout(
    textarea: HTMLTextAreaElement | null,
    content: string,
    calloutType: 'NOTE' | 'TIP' | 'WARNING' | 'DANGER' = 'NOTE',
    onContentChange: (content: string) => void
) {
    if (!textarea) {
        onContentChange(content + `> [!${calloutType}]\n> Callout content...`)
        return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const lineStart = content.lastIndexOf('\n', start - 1) + 1
    let lineEnd = content.indexOf('\n', end)
    if (lineEnd === -1) lineEnd = content.length

    const fullBlock = content.slice(lineStart, lineEnd).trim()

    if (fullBlock.startsWith('> [!')) {
        const unwrapped = fullBlock
            .split('\n')
            .map((l) => stripBlockPrefix(l))
            .filter(Boolean)
            .join('\n')
        const newContent = content.slice(0, lineStart) + unwrapped + content.slice(lineEnd)
        updateTextarea(textarea, newContent, lineStart, lineStart + unwrapped.length, onContentChange)
        return
    }

    const selected = content.slice(start, end).trim()
    const innerText = selected || fullBlock || 'Important note details...'
    const cleanText = innerText
        .split('\n')
        .map((l) => stripBlockPrefix(l))
        .join('\n> ')

    const replacement = `> [!${calloutType}]\n> ${cleanText}`
    const newContent = content.slice(0, lineStart) + replacement + content.slice(lineEnd)
    updateTextarea(textarea, newContent, lineStart + `> [!${calloutType}]\n> `.length, lineStart + replacement.length, onContentChange)
}

// Toggle Task / Checklist (- [ ])
export function toggleTaskList(
    textarea: HTMLTextAreaElement | null,
    content: string,
    onContentChange: (content: string) => void
) {
    if (!textarea) {
        onContentChange(content + '- [ ] Task item')
        return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const lineStart = content.lastIndexOf('\n', start - 1) + 1
    let lineEnd = content.indexOf('\n', end)
    if (lineEnd === -1) lineEnd = content.length

    const fullBlock = content.slice(lineStart, lineEnd)
    const lines = fullBlock.split('\n')

    const allHaveTasks = lines.every((l) => l.trim().length === 0 || /^[\*\-]\s+\[[ xX]\]\s+/.test(l.trim()))

    let newLines: string[]
    if (allHaveTasks) {
        newLines = lines.map((l) => stripBlockPrefix(l))
    } else {
        newLines = lines.map((l) => {
            const cleaned = stripBlockPrefix(l)
            if (cleaned.length === 0) return ''
            return `- [ ] ${cleaned}`
        })
    }

    const replacement = newLines.join('\n')
    const newContent = content.slice(0, lineStart) + replacement + content.slice(lineEnd)
    updateTextarea(textarea, newContent, lineStart, lineStart + replacement.length, onContentChange)
}

export function togglePullquote(
    textarea: HTMLTextAreaElement | null,
    content: string,
    onContentChange: (content: string) => void
) {
    if (!textarea) {
        onContentChange(content + '>> **Quote text**')
        return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const lineStart = content.lastIndexOf('\n', start - 1) + 1
    let lineEnd = content.indexOf('\n', end)
    if (lineEnd === -1) lineEnd = content.length

    const fullBlock = content.slice(lineStart, lineEnd).trim()

    if (fullBlock.startsWith('>>')) {
        const unwrapped = stripBlockPrefix(fullBlock)
        const newContent = content.slice(0, lineStart) + unwrapped + content.slice(lineEnd)
        updateTextarea(textarea, newContent, lineStart, lineStart + unwrapped.length, onContentChange)
        return
    }

    const selected = content.slice(start, end).trim()
    const rawQuote = selected || fullBlock || 'Important quote text...'
    const cleanQuote = stripBlockPrefix(rawQuote) || 'Important quote text...'
    const replacement = `>> **${cleanQuote}**`
    const newContent = content.slice(0, lineStart) + replacement + content.slice(lineEnd)
    updateTextarea(textarea, newContent, lineStart + 5, lineStart + replacement.length - 2, onContentChange)
}

export function toggleCodeBlock(
    textarea: HTMLTextAreaElement | null,
    content: string,
    language: string = 'javascript',
    onContentChange: (content: string) => void
) {
    if (!textarea) {
        onContentChange(content + `\`\`\`${language}\n// code here\n\`\`\``)
        return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = content.slice(start, end).trim()

    if (selected.startsWith('```') && selected.endsWith('```')) {
        const unwrapped = selected.replace(/^```[a-zA-Z]*\n?/, '').replace(/\n?```$/, '')
        const newContent = content.slice(0, start) + unwrapped + content.slice(end)
        updateTextarea(textarea, newContent, start, start + unwrapped.length, onContentChange)
        return
    }

    const rawCode =
        selected ||
        (language === 'diff'
            ? '- const oldState = false;\n+ const newState = true;'
            : 'const greeting = "Hello world";')

    const cleanCode = rawCode
        .split('\n')
        .map((l) => (language === 'diff' ? l : stripBlockPrefix(l)))
        .join('\n')

    const replacement = `\`\`\`${language}\n${cleanCode}\n\`\`\``
    const newContent = content.slice(0, start) + replacement + content.slice(end)
    updateTextarea(textarea, newContent, start + language.length + 4, start + language.length + 4 + cleanCode.length, onContentChange)
}

export function insertTable(
    textarea: HTMLTextAreaElement | null,
    content: string,
    onContentChange: (content: string) => void
) {
    const tableSnippet = `| Feature | Description | Status |\n| :--- | :--- | :--- |\n| Core Architecture | High performance setup | Completed |\n| Dynamic Rendering | Fully responsive layout | Active |`
    if (!textarea) {
        onContentChange(content + tableSnippet)
        return
    }
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const newContent = content.slice(0, start) + tableSnippet + content.slice(end)
    updateTextarea(textarea, newContent, start, start + tableSnippet.length, onContentChange)
}

export function insertDivider(
    textarea: HTMLTextAreaElement | null,
    content: string,
    onContentChange: (content: string) => void
) {
    const dividerSnippet = `---`
    if (!textarea) {
        onContentChange(content + dividerSnippet)
        return
    }
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const newContent = content.slice(0, start) + dividerSnippet + content.slice(end)
    updateTextarea(textarea, newContent, start, start + dividerSnippet.length, onContentChange)
}

export function toggleLink(
    textarea: HTMLTextAreaElement | null,
    content: string,
    onContentChange: (content: string) => void
) {
    if (!textarea) {
        onContentChange(content + '[link text](https://url.com)')
        return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = content.slice(start, end).trim()

    const linkMatch = selected.match(/^\[(.*?)\]\((.*?)\)$/)
    if (linkMatch) {
        const unwrapped = linkMatch[1]
        const newContent = content.slice(0, start) + unwrapped + content.slice(end)
        updateTextarea(textarea, newContent, start, start + unwrapped.length, onContentChange)
        return
    }

    const linkText = selected || 'link text'
    const replacement = `[${linkText}](https://url.com)`
    const newContent = content.slice(0, start) + replacement + content.slice(end)
    updateTextarea(textarea, newContent, start + 1, start + 1 + linkText.length, onContentChange)
}

export function toggleEmbed(
    textarea: HTMLTextAreaElement | null,
    content: string,
    onContentChange: (content: string) => void
) {
    if (!textarea) {
        onContentChange(content + '{% embed https://... %}')
        return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = content.slice(start, end).trim()

    if (selected.startsWith('{% embed') && selected.endsWith('%}')) {
        const unwrapped = selected.replace(/^\{%\s*embed\s+/, '').replace(/\s*\%\}$/, '')
        const newContent = content.slice(0, start) + unwrapped + content.slice(end)
        updateTextarea(textarea, newContent, start, start + unwrapped.length, onContentChange)
        return
    }

    const rawUrl = selected || 'https://github.com/username/repo'
    const url = stripBlockPrefix(rawUrl) || 'https://github.com/username/repo'
    const replacement = `{% embed ${url} %}`
    const newContent = content.slice(0, start) + replacement + content.slice(end)
    updateTextarea(textarea, newContent, start + 9, start + 9 + url.length, onContentChange)
}

export function insertYouTubeSnippet(
    textarea: HTMLTextAreaElement | null,
    content: string,
    onContentChange: (content: string) => void
) {
    const placeholder = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    if (!textarea) {
        onContentChange(content + `{% youtube ${placeholder} %}`)
        return
    }
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = content.slice(start, end).trim()
    const url = selected || placeholder
    const replacement = `{% youtube ${url} %}`
    const newContent = content.slice(0, start) + replacement + content.slice(end)
    updateTextarea(textarea, newContent, start + 11, start + 11 + url.length, onContentChange)
}

export function insertImageSnippet(
    textarea: HTMLTextAreaElement | null,
    content: string,
    onContentChange: (content: string) => void
) {
    const placeholder = 'https://images.unsplash.com/...'
    if (!textarea) {
        onContentChange(content + `![Image Alt](${placeholder})`)
        return
    }
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = content.slice(start, end).trim()
    const cleanAlt = stripBlockPrefix(selected) || 'Image Alt'
    const replacement = `![${cleanAlt}](${placeholder})`
    const newContent = content.slice(0, start) + replacement + content.slice(end)
    updateTextarea(
        textarea,
        newContent,
        start + 2 + cleanAlt.length + 2,
        start + 2 + cleanAlt.length + 2 + placeholder.length,
        onContentChange
    )
}
