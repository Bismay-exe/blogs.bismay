import { NextResponse } from 'next/server'

export async function GET() {
    return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Blogs</title></channel></rss>', {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
}
