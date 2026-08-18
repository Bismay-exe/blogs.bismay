'use client'

import React, { useState, useEffect } from 'react'
import { Send, Check, Loader2, MessageSquare } from 'lucide-react'

const CommentForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [comment, setComment] = useState('')
    const [saveInfo, setSaveInfo] = useState(false)
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    // Load saved name and email from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('commenter_info')
            if (saved) {
                const parsed = JSON.parse(saved)
                if (parsed.name) setName(parsed.name)
                if (parsed.email) setEmail(parsed.email)
                setSaveInfo(true)
            }
        } catch {
            // Ignore storage errors
        }
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!name.trim()) {
            setStatus('error')
            setErrorMessage('Please enter your name.')
            return
        }

        if (!email.trim() || !email.includes('@')) {
            setStatus('error')
            setErrorMessage('Please enter a valid email address.')
            return
        }

        if (!comment.trim()) {
            setStatus('error')
            setErrorMessage('Please write a comment before submitting.')
            return
        }

        setStatus('loading')
        setErrorMessage('')

        // Handle save info checkbox preference
        try {
            if (saveInfo) {
                localStorage.setItem(
                    'commenter_info',
                    JSON.stringify({ name: name.trim(), email: email.trim() })
                )
            } else {
                localStorage.removeItem('commenter_info')
            }
        } catch {
            // Ignore storage errors
        }

        // Simulate posting comment
        setTimeout(() => {
            setStatus('success')
            setComment('')
            if (!saveInfo) {
                setName('')
                setEmail('')
            }
            setTimeout(() => setStatus('idle'), 4000)
        }, 800)
    }

    return (
        <div className="w-full h-full">
            <div className="pb-3">
                <h1 className="text-lg text-fg font-mono">
                    Leave a <span className="text-fg font-semibold font-sans">comment</span>
                </h1>
            </div>

            <div className="w-full space-y-4">
                <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className='flex gap-3'>
                        {/* Name Input */}
                        <div className="space-y-1 w-1/2">
                            <label className="text-xs font-mono text-sec">Name *</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                    if (status === 'error') setStatus('idle')
                                }}
                                placeholder="e.g. John Doe"
                                disabled={status === 'loading'}
                                className="w-full px-3.5 py-3 rounded-xl bg-fg/5 border border-sec/30 focus:border-accent text-sm text-fg font-medium placeholder:text-sec/50 outline-none transition-all duration-200"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1">
                            <label className="text-xs font-mono text-sec">Email *</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    if (status === 'error') setStatus('idle')
                                }}
                                placeholder="john@example.com"
                                disabled={status === 'loading'}
                                className="w-full px-3.5 py-3 rounded-xl bg-fg/5 border border-sec/30 focus:border-accent text-sm text-fg font-medium placeholder:text-sec/50 outline-none transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Comment Textarea */}
                    <div className="space-y-1">
                        <label className="text-xs font-mono text-sec">Comment *</label>
                        <textarea
                            rows={3}
                            value={comment}
                            onChange={(e) => {
                                setComment(e.target.value)
                                if (status === 'error') setStatus('idle')
                            }}
                            placeholder="Share your thoughts on this post..."
                            disabled={status === 'loading'}
                            className="w-full px-3.5 py-3 rounded-xl bg-fg/5 border border-sec/30 focus:border-accent text-sm text-fg font-medium placeholder:text-sec/50 outline-none transition-all duration-200 min-h-22"
                        />
                    </div>

                    {/* Save Name and Email Checkbox */}
                    <label className="flex items-start gap-2.5 cursor-pointer select-none group pt-1">
                        <input
                            type="checkbox"
                            checked={saveInfo}
                            onChange={(e) => setSaveInfo(e.target.checked)}
                            className="mt-0.5 w-4 h-4 rounded border-sec/40 text-accent focus:ring-accent bg-transparent accent-accent cursor-pointer"
                        />
                        <span className="text-xs text-sec group-hover:text-fg transition-colors leading-tight">
                            Save my name and email for next time
                        </span>
                    </label>

                    {/* Error Message */}
                    {status === 'error' && errorMessage && (
                        <p className="text-xs font-mono text-rose-400 animate-in fade-in">
                            {errorMessage}
                        </p>
                    )}

                    {/* Success Message */}
                    {status === 'success' && (
                        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 animate-in fade-in">
                            <Check size={14} />
                            <span>Comment posted successfully! 🚀</span>
                        </div>
                    )}

                    {/* Post Comment Button */}
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-3 px-4 rounded-xl bg-accent text-bg font-bold text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 size={15} className="animate-spin" />
                                <span>Posting...</span>
                            </>
                        ) : status === 'success' ? (
                            <>
                                <Check size={15} />
                                <span>Posted!</span>
                            </>
                        ) : (
                            <>
                                <Send size={14} />
                                <span>Post Comment</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CommentForm
