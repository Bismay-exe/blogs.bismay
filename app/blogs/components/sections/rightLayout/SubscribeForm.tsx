'use client'

import React, { useState } from 'react'
import { Check, Sparkles, Loader2 } from 'lucide-react'

const SubscribeForm = () => {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !email.includes('@')) {
            setStatus('error')
            setMessage('Please enter a valid email address.')
            return
        }

        setStatus('loading')
        // Simulate subscription
        setTimeout(() => {
            setStatus('success')
            setMessage('You’re in! Welcome aboard 🎉')
            setEmail('')
        }, 800)
    }

    return (
        <div className="relative w-full rounded-3xl bg-accent p-6 shadow-xl overflow-hidden transition-all duration-300">
            {/* Top right white swirl loop doodle */}
            <div className="absolute top-4 right-4 pointer-events-none opacity-85">
                <svg
                    width="44"
                    height="32"
                    viewBox="0 0 44 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-fg drop-shadow-sm"
                >
                    <path
                        d="M2 18C8 28 20 30 24 16C28 2 16 -1 12 10C8 20 22 28 32 18C38 12 42 16 42 20"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Header: Envelope + Title */}
            <div className="flex items-start gap-3.5 mb-5">
                {/* Hand-drawn style tilted envelope */}
                <div className="relative shrink-0 -rotate-12 hover:rotate-0 transition-transform duration-300 cursor-pointer pt-1">
                    <svg
                        width="54"
                        height="44"
                        viewBox="0 0 54 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-md"
                    >
                        {/* Envelope Body */}
                        <path
                            d="M4 10C4 6.68629 6.68629 4 10 4H44C47.3137 4 50 6.68629 50 10V34C50 37.3137 47.3137 40 44 40H10C6.68629 40 4 37.3137 4 34V10Z"
                            fill="#FFFFFF"
                            stroke="#18181B"
                            strokeWidth="2.8"
                            strokeLinejoin="round"
                        />
                        {/* Envelope Flap Lines */}
                        <path
                            d="M5 6L27 24L49 6"
                            stroke="#18181B"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6 38L21 21"
                            stroke="#18181B"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M48 38L33 21"
                            stroke="#18181B"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* Title with hand-drawn marker underline */}
                <div className="flex flex-col">
                    <h3 className="text-xl font-extrabold tracking-tight leading-[1.2] text-bg">
                        get stories <br />
                        in your inbox.
                    </h3>
                    {/* Hand-drawn marker stroke under 'in your inbox' */}
                    <div className="-mt-0.5 w-28">
                        <svg
                            viewBox="0 0 120 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-auto text-[#A78BFA] dark:text-[#9F7AEA]"
                        >
                            <path
                                d="M3 7C25 4 65 3 117 7C85 10 35 11 8 8.5"
                                fill="currentColor"
                                opacity="0.85"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-1.5">
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            if (status !== 'idle') setStatus('idle')
                        }}
                        placeholder="your email address"
                        disabled={status === 'loading' || status === 'success'}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] text-sm text-[#1A162B] placeholder:text-stone-400 border border-sec shadow-inner focus:outline-none transition-all font-sans"
                    />
                </div>

                {/* Bottom Row: Button and Lavender Flower */}
                <div className="flex items-center justify-between pt-1">
                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="relative px-6 py-3 rounded-2xl bg-[#18181B] hover:bg-[#000000] text-white font-bold text-sm tracking-wide shadow-lg shadow-black/20 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 cursor-pointer disabled:opacity-80 disabled:cursor-default"
                    >
                        {status === 'loading' ? (
                            <span className="flex items-center gap-1.5">
                                <Loader2 size={15} className="animate-spin" />
                                <span>Joining...</span>
                            </span>
                        ) : status === 'success' ? (
                            <span className="flex items-center gap-1.5 text-emerald-400">
                                <Check size={15} />
                                <span>Subscribed</span>
                            </span>
                        ) : (
                            'Subscribe'
                        )}
                    </button>

                    {/* 3D Cute Lavender Flower */}
                    <div className="relative w-14 h-14 -mr-1 -mb-1 hover:rotate-45 transition-transform duration-500 cursor-pointer select-none">
                        <svg
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full drop-shadow-md"
                        >
                            {/* Petal 1 (Top) */}
                            <ellipse
                                cx="50"
                                cy="24"
                                rx="14"
                                ry="20"
                                fill="#C4B6ED"
                                stroke="#A78BFA"
                                strokeWidth="2"
                            />
                            {/* Petal 2 (Top Right) */}
                            <ellipse
                                cx="74"
                                cy="42"
                                rx="14"
                                ry="20"
                                transform="rotate(72 74 42)"
                                fill="#B9A7E8"
                                stroke="#A78BFA"
                                strokeWidth="2"
                            />
                            {/* Petal 3 (Bottom Right) */}
                            <ellipse
                                cx="65"
                                cy="73"
                                rx="14"
                                ry="20"
                                transform="rotate(144 65 73)"
                                fill="#AEA0E4"
                                stroke="#9B7FE0"
                                strokeWidth="2"
                            />
                            {/* Petal 4 (Bottom Left) */}
                            <ellipse
                                cx="35"
                                cy="73"
                                rx="14"
                                ry="20"
                                transform="rotate(216 35 73)"
                                fill="#A78BFA"
                                stroke="#906EE0"
                                strokeWidth="2"
                            />
                            {/* Petal 5 (Top Left) */}
                            <ellipse
                                cx="26"
                                cy="42"
                                rx="14"
                                ry="20"
                                transform="rotate(288 26 42)"
                                fill="#C4B6ED"
                                stroke="#A78BFA"
                                strokeWidth="2"
                            />

                            {/* Petal Grooves / Indents */}
                            <path d="M50 12V28" stroke="#906EE0" strokeWidth="2" strokeLinecap="round" />
                            <path d="M82 38L68 45" stroke="#906EE0" strokeWidth="2" strokeLinecap="round" />
                            <path d="M72 80L62 67" stroke="#805AD5" strokeWidth="2" strokeLinecap="round" />
                            <path d="M28 80L38 67" stroke="#805AD5" strokeWidth="2" strokeLinecap="round" />
                            <path d="M18 38L32 45" stroke="#906EE0" strokeWidth="2" strokeLinecap="round" />

                            {/* Flower Center Pistil */}
                            <circle
                                cx="50"
                                cy="50"
                                r="12"
                                fill="#FAF8F5"
                                stroke="#18181B"
                                strokeWidth="2.5"
                            />
                            <circle
                                cx="50"
                                cy="50"
                                r="8"
                                fill="#E9D8FD"
                            />
                        </svg>
                    </div>
                </div>

                {/* Status Message */}
                {message && (
                    <div
                        className={`text-xs font-mono pt-1 text-center animate-in fade-in duration-200 ${
                            status === 'success' ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'text-rose-600 dark:text-rose-400'
                        }`}
                    >
                        {message}
                    </div>
                )}
            </form>
        </div>
    )
}

export default SubscribeForm
