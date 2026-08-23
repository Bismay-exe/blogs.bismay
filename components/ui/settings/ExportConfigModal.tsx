'use client'

import React, { useState } from 'react'
import { Copy, Check, X, Sparkles } from 'lucide-react'
import { useReaderSettings } from '@/lib/reader-settings/ReaderSettingsContext'

interface ExportConfigModalProps {
    isOpen: boolean
    onClose: () => void
}

export const ExportConfigModal: React.FC<ExportConfigModalProps> = ({ isOpen, onClose }) => {
    const { settings } = useReaderSettings()
    const [format, setFormat] = useState<'json' | 'css'>('json')
    const [copied, setCopied] = useState(false)

    if (!isOpen) return null

    const jsonCode = JSON.stringify({ readerSettings: settings }, null, 2)
    const cssCode = `:root {
  --reader-heading-font: var(--font-${settings.typography.headingFont.headingFont});
  --reader-body-font: var(--font-${settings.typography.bodyFont.bodyFont});
  --reader-code-font: var(--font-${settings.typography.codeFont.codeFont});
  --reader-body-font-size: ${settings.typography.bodyFont.bodyFontSize}px;
  --reader-body-font-weight: ${settings.typography.bodyFont.bodyFontWeight};
  --reader-heading-font-weight: ${settings.typography.headingFont.headingFontWeight};
  --reader-title-font-weight: ${settings.typography.titleFont.titleFontWeight};
  --reader-title-scale: ${settings.typography.titleFont.titleScale};
  --reader-line-height: ${settings.typography.bodyFont.lineHeight};
  --reader-paragraph-spacing: ${settings.typography.bodyFont.paragraphSpacing}px;
  --reader-heading-margin-top: ${settings.typography.headingFont.headingMarginTop}px;
  --reader-heading-margin-bottom: ${settings.typography.headingFont.headingMarginBottom}px;
  --reader-accent-color: ${settings.appearance.accentColor};
}`

    const activeCode = format === 'json' ? jsonCode : cssCode

    const handleCopy = () => {
        navigator.clipboard.writeText(activeCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-xl rounded-3xl border border-neutral-800 bg-[#141414] text-white p-6 shadow-2xl space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-2xl bg-white/10 text-white flex items-center justify-center border border-white/10">
                            <Sparkles size={18} />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-white">Export Configuration</h3>
                            <p className="text-xs text-neutral-400">
                                Export reader preferences as JSON preset or CSS custom properties.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Format Switcher */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
                    <button
                        type="button"
                        onClick={() => setFormat('json')}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                            format === 'json' ? 'bg-white text-black font-bold shadow-xs' : 'text-neutral-400 hover:text-white'
                        }`}
                    >
                        JSON Schema
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormat('css')}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                            format === 'css' ? 'bg-white text-black font-bold shadow-xs' : 'text-neutral-400 hover:text-white'
                        }`}
                    >
                        CSS Tokens
                    </button>
                </div>

                {/* Code Block Container */}
                <div className="relative rounded-2xl bg-black border border-neutral-800 p-4 max-h-75 overflow-y-auto font-mono text-xs text-neutral-300">
                    <pre className="whitespace-pre-wrap">{activeCode}</pre>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-mono font-bold text-xs shadow-md hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
