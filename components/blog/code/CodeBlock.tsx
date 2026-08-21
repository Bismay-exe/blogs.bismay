'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { highlightCodeLine } from './syntaxHighlight'

export interface CodeBlockProps {
    code: string
    language?: string
    filename?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript', filename }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const lines = code.split('\n')
    const langLower = (language || '').toLowerCase().trim()
    const isDiff = langLower === 'diff'
    const isPlaintext = langLower === 'text' || langLower === 'plaintext' || langLower === 'txt' || langLower === ''

    return (
        <div className="my-6 w-full max-w-full min-w-0 rounded-2xl overflow-hidden border border-white/10 bg-[#0E0E10] shadow-md shadow-black/20 group">
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#16161A] border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-400 min-w-0">
                    <div className="flex gap-1.5 mr-1 shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    {filename ? (
                        <span className="text-zinc-200 font-medium truncate">{filename}</span>
                    ) : (
                        <span className={`uppercase text-[11px] font-semibold tracking-wider ${isDiff ? 'text-amber-400' : 'text-zinc-400'}`}>
                            {language || 'TEXT'}
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-100 text-xs transition-all duration-200 cursor-pointer shrink-0"
                    title="Copy code"
                >
                    {copied ? (
                        <>
                            <Check size={13} className="text-emerald-400" />
                            <span className="text-emerald-400 font-mono text-[11px]">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={13} />
                            <span className="font-mono text-[11px]">Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code Content with Syntax & Diff Highlighting */}
            <pre className="py-3.5 px-0 w-full max-w-full overflow-x-auto text-[13.5px] leading-relaxed font-mono text-zinc-200 selection:bg-accent/30 bg-[#0E0E10]">
                <code className="block w-full">
                    {lines.map((line, idx) => {
                        const isAdded = isDiff && (line.startsWith('+') || line.startsWith('>'))
                        const isRemoved = isDiff && (line.startsWith('-') || line.startsWith('<'))

                        let rowClass = 'px-4 py-0.5 w-full block'
                        if (isAdded) {
                            rowClass += ' bg-emerald-500/15 text-emerald-300 border-l-2 border-emerald-500'
                        } else if (isRemoved) {
                            rowClass += ' bg-rose-500/15 text-rose-300 border-l-2 border-rose-500'
                        }

                        return (
                            <div key={idx} className={rowClass}>
                                <span className={isPlaintext ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'}>
                                    {isDiff ? (
                                        <span>{line}</span>
                                    ) : isPlaintext ? (
                                        <span className="text-zinc-200">{line}</span>
                                    ) : (
                                        highlightCodeLine(line, language)
                                    )}
                                </span>
                            </div>
                        )
                    })}
                </code>
            </pre>
        </div>
    )
}

export default CodeBlock
