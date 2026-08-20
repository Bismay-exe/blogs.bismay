'use client'

import React from 'react'
import Embed from '../../../app/blogs/[slug]/components/sections/mainLayout/Embeded'

interface EmbedBlockProps {
    url: string
}

const EmbedBlock: React.FC<EmbedBlockProps> = ({ url }) => {
    return <Embed url={url} />
}

export default EmbedBlock
