'use client'

import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export interface LightboxImage {
    src: string
    alt: string
    caption?: string
}

interface ImageLightboxProps {
    image: LightboxImage | null
    onClose: () => void
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ image, onClose }) => {
    // Handle Escape key and lock background scroll when image is zoomed
    useEffect(() => {
        if (image) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            document.body.style.overflow = 'unset'
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [image, onClose])

    if (!image) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                type="button"
                onClick={onClose}
                className="absolute top-5 right-5 z-50 flex items-center gap-2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-200 cursor-pointer shadow-lg group"
                title="Close (ESC)"
            >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-200" />
                <span className="text-xs font-mono pr-1 hidden sm:inline">ESC</span>
            </button>

            {/* Image Container */}
            <div
                className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center space-y-3 cursor-zoom-out"
                onClick={onClose}
            >
                <img
                    src={image.src}
                    alt={image.alt}
                    className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl border border-white/15 shadow-2xl animate-in zoom-in-95 duration-200"
                />
                {image.caption && (
                    <p className="text-center text-sm font-mono text-zinc-300 max-w-2xl px-4 py-1.5 rounded-xl bg-black/0">
                        {image.caption}
                    </p>
                )}
            </div>
        </div>
    )
}

export default ImageLightbox
