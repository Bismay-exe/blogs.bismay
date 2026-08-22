export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface HeadingBlock {
    type: 'heading'
    level: HeadingLevel
    content: string
    id: string
}

export interface ParagraphBlock {
    type: 'paragraph'
    content: string
}

export interface ImageBlock {
    type: 'image'
    src: string
    alt: string
    caption?: string
}

export interface VideoBlock {
    type: 'video'
    src: string
    alt: string
    caption?: string
    poster?: string
}

export interface CodeBlockData {
    type: 'code'
    language: string
    code: string
    filename?: string
}

export interface TableBlock {
    type: 'table'
    headers: string[]
    rows: string[][]
}

export interface QuoteBlock {
    type: 'quote'
    content: string
}

export interface PullquoteBlock {
    type: 'pullquote'
    content: string
}

export interface ListBlock {
    type: 'list'
    ordered: boolean
    items: string[]
}

export interface TaskItem {
    checked: boolean
    text: string
}

export interface TaskListBlock {
    type: 'tasklist'
    items: TaskItem[]
}

export type CalloutType = 'note' | 'tip' | 'warning' | 'caution' | 'danger' | 'important'

export interface CalloutBlock {
    type: 'callout'
    calloutType: CalloutType
    title?: string
    content: string
}

export interface YouTubeBlock {
    type: 'youtube'
    videoId: string
    url: string
}

export interface EmbedBlockData {
    type: 'embed'
    url: string
}

export interface DividerBlock {
    type: 'divider'
}

export interface AiDisclosureBlock {
    type: 'ai-disclosure'
}

export type MarkdownBlock =
    | HeadingBlock
    | ParagraphBlock
    | ImageBlock
    | VideoBlock
    | CodeBlockData
    | TableBlock
    | QuoteBlock
    | PullquoteBlock
    | ListBlock
    | TaskListBlock
    | CalloutBlock
    | YouTubeBlock
    | EmbedBlockData
    | DividerBlock
    | AiDisclosureBlock
