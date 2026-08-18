import React from 'react'

interface BannerProps {
    src?: string
    alt?: string
}

const Banner: React.FC<BannerProps> = ({
    src = 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.us-east-2.amazonaws.com%2Fuploads%2Farticles%2Fhew29obo84cj4o50024q.jpg',
    alt = 'Blog Banner',
}) => {
    if (!src) return null

    return (
        <div className="max-w-375 w-full rounded-2xl overflow-hidden border border-sec">
            <img
                className="w-full object-cover max-h-110"
                src={src}
                alt={alt}
            />
        </div>
    )
}

export default Banner
