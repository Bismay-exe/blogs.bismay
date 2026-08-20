import React from 'react'

export function highlightCodeLine(line: string, language: string = 'javascript'): React.ReactNode {
    // 1. Comments (// ...) -> Muted grey
    const commentIndex = line.indexOf('//')
    if (commentIndex !== -1) {
        const beforeComment = line.slice(0, commentIndex)
        const comment = line.slice(commentIndex)
        return (
            <>
                {beforeComment ? highlightTokens(beforeComment, language) : null}
                <span className="text-zinc-500 italic">{comment}</span>
            </>
        )
    }

    return highlightTokens(line, language)
}

export function highlightTokens(code: string, _language: string): React.ReactNode[] {
    const tokens: React.ReactNode[] = []

    // Token regex matching:
    // 1. Strings ("...", '...', `...`)
    // 2. React methods & function names (React.createElement, useContext, useState, useEffect, etc.)
    // 3. Keywords (function, return, const, let, var, import, export, default, from, etc.)
    // 4. JSX tags & component names (<MyShop.Provider, </MyShop.Provider>, <App />, etc.)
    // 5. Object / prop keys before colon or equals (value=, className=, key:, onClick:)
    // 6. Identifiers (MyShop, children, cartItems, isCartOpen, etc.)
    // 7. Booleans, Null, Numbers
    // 8. Punctuation / Brackets
    const regex =
        /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|<\/?[\w$]+(?:\.[\w$]+)*|\/?>|\b(?:React\.createElement|createElement|createContext|useContext|useState|useEffect|useRef|useMemo|useCallback|console\.log|console)\b|\b(?:function|return|const|let|var|import|export|default|from|if|else|while|for|switch|case|new|typeof|async|await|npm|run|dev|build)\b|\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*[:=])|\b(?:true|false|null|undefined)\b|\b\d+\b|\b[a-zA-Z_$][a-zA-Z0-9_$]*\b|[()\[\]{},;:.=+*\-\/<>])/g

    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(code)) !== null) {
        if (match.index > lastIndex) {
            tokens.push(
                <span key={`text-${lastIndex}`} className="text-zinc-200">
                    {code.slice(lastIndex, match.index)}
                </span>
            )
        }

        const text = match[0]

        if (text.startsWith('"') || text.startsWith("'") || text.startsWith('`')) {
            // Strings -> Golden yellow (#FDE047)
            tokens.push(
                <span key={match.index} className="text-[#FDE047]">
                    {text}
                </span>
            )
        } else if (
            /^(function|return|const|let|var|import|export|default|from|if|else|while|for|switch|case|new|typeof|async|await)$/.test(
                text
            )
        ) {
            // Keywords -> Lavender / Purple (#C4B6ED)
            tokens.push(
                <span key={match.index} className="text-[#C4B6ED] font-semibold">
                    {text}
                </span>
            )
        } else if (text === 'npm' || text === 'run' || text === 'dev' || text === 'build') {
            tokens.push(
                <span key={match.index} className="text-[#86EFAC] font-semibold">
                    {text}
                </span>
            )
        } else if (
            text.includes('createElement') ||
            text === 'createContext' ||
            text === 'useContext' ||
            text === 'useState' ||
            text === 'useEffect' ||
            text === 'React.createElement'
        ) {
            // React API / hooks -> Lime green (#A3E635)
            tokens.push(
                <span key={match.index} className="text-[#A3E635] font-medium">
                    {text}
                </span>
            )
        } else if (text.startsWith('<') || text.startsWith('</') || text === '>' || text === '/>') {
            // JSX tags & components -> Cyan / Sky (#38BDF8)
            tokens.push(
                <span key={match.index} className="text-[#38BDF8] font-medium">
                    {text}
                </span>
            )
        } else if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(text) && /^\s*[:=]/.test(code.slice(match.index + text.length))) {
            // Object property or JSX prop key (value=, className:, key:, onClick:) -> Coral / Rose (#FB7185)
            tokens.push(
                <span key={match.index} className="text-[#FB7185] font-medium">
                    {text}
                </span>
            )
        } else if (/^(true|false|null|undefined)$/.test(text)) {
            tokens.push(
                <span key={match.index} className="text-[#FB923C] font-semibold">
                    {text}
                </span>
            )
        } else if (/^\d+$/.test(text)) {
            tokens.push(
                <span key={match.index} className="text-[#FB923C]">
                    {text}
                </span>
            )
        } else if (
            text === '(' ||
            text === ')' ||
            text === '{' ||
            text === '}' ||
            text === '[' ||
            text === ']' ||
            text === ',' ||
            text === ';' ||
            text === '.'
        ) {
            tokens.push(
                <span key={match.index} className="text-zinc-400">
                    {text}
                </span>
            )
        } else if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(text)) {
            // Identifiers / variables -> Bright light zinc (#E4E4E7)
            tokens.push(
                <span key={match.index} className="text-zinc-200">
                    {text}
                </span>
            )
        } else {
            tokens.push(
                <span key={match.index} className="text-zinc-200">
                    {text}
                </span>
            )
        }

        lastIndex = match.index + text.length
    }

    if (lastIndex < code.length) {
        tokens.push(
            <span key={`text-${lastIndex}`} className="text-zinc-200">
                {code.slice(lastIndex)}
            </span>
        )
    }

    return tokens.length > 0 ? tokens : [<span key="raw" className="text-zinc-200">{code}</span>]
}
