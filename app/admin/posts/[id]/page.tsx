import React from 'react'
import PostEditor from '../components/PostEditor'

interface EditPostPageProps {
    params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const { id } = await params
    return <PostEditor initialId={id} />
}
