'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { WidgetInstance } from '@/lib/widgets-settings'

interface CustomHtmlWidgetProps {
    widget: WidgetInstance
    articleData?: {
        title?: string
        slug?: string
        category?: string
        date?: string
        readingTimeMinutes?: number
        tags?: string[]
        [key: string]: any
    }
    forceTheme?: 'dark' | 'light'
}

export const interpolateTokens = (
    template: string,
    articleData?: Record<string, any>
): string => {
    if (!template) return ''

    const safeTitle = articleData?.title || 'Article Title'
    const safeSlug = articleData?.slug || 'sample-slug'
    const safeCategory = articleData?.category || 'Blog'
    const safeReadingTime = articleData?.readingTimeMinutes ? `${articleData.readingTimeMinutes} min read` : '5 min read'
    const safeDate = articleData?.date || 'Recent'
    const safeSiteUrl = typeof window !== 'undefined' ? window.location.origin : ''

    return template
        .replace(/\{\{\s*(?:article\.)?title\s*\}\}/gi, safeTitle)
        .replace(/\{\{\s*(?:article\.)?slug\s*\}\}/gi, safeSlug)
        .replace(/\{\{\s*(?:article\.)?category\s*\}\}/gi, safeCategory)
        .replace(/\{\{\s*(?:article\.)?readingTime\s*\}\}/gi, safeReadingTime)
        .replace(/\{\{\s*(?:article\.)?date\s*\}\}/gi, safeDate)
        .replace(/\{\{\s*(?:site\.)?url\s*\}\}/gi, safeSiteUrl)
}

const CustomHtmlWidget: React.FC<CustomHtmlWidgetProps> = ({
    widget,
    articleData,
    forceTheme,
}) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const [height, setHeight] = useState<number>(120)
    const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark')

    const rawHtml = widget.config?.html || ''
    const rawCss = widget.config?.css || ''
    const rawJs = widget.config?.js || ''
    const showHeader = widget.config?.customTitle !== undefined ? Boolean(widget.config.customTitle) : true
    const titleText = widget.config?.customTitle || widget.title

    // Synchronize theme with parent or forceTheme prop
    useEffect(() => {
        if (forceTheme) {
            setCurrentTheme(forceTheme)
            return
        }

        const checkTheme = () => {
            const isDark = document.documentElement.classList.contains('dark')
            setCurrentTheme(isDark ? 'dark' : 'light')
        }

        checkTheme()

        const observer = new MutationObserver(checkTheme)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        })

        return () => observer.disconnect()
    }, [forceTheme])

    // Listen for resize messages from inside iframe
    useEffect(() => {
        const handleMessage = (e: MessageEvent) => {
            if (
                e.data &&
                e.data.type === 'CUSTOM_WIDGET_RESIZE' &&
                e.data.id === widget.id
            ) {
                if (typeof e.data.height === 'number' && e.data.height > 0) {
                    setHeight(Math.ceil(e.data.height))
                }
            }
        }

        window.addEventListener('message', handleMessage)
        return () => window.removeEventListener('message', handleMessage)
    }, [widget.id])

    // Processed template tokens
    const processedHtml = useMemo(
        () => interpolateTokens(rawHtml, articleData),
        [rawHtml, articleData]
    )

    const processedCss = useMemo(
        () => interpolateTokens(rawCss, articleData),
        [rawCss, articleData]
    )

    const processedJs = useMemo(
        () => interpolateTokens(rawJs, articleData),
        [rawJs, articleData]
    )

    // Build the isolated CodePen-like sandbox document
    const srcDocContent = useMemo(() => {
        const escapedArticleData = JSON.stringify(articleData || {})
        const safeWidgetId = JSON.stringify(widget.id)

        return `<!DOCTYPE html>
<html class="${currentTheme}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <base target="_blank">
  <!-- Tailwind CSS v4 Browser CDN -->
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <style type="text/tailwindcss">
    @custom-variant dark (&:where(.dark, .dark *));

    @theme {
      --color-bg: var(--background);
      --color-fg: var(--foreground);
      --color-sec: var(--sec);
      --color-accent: var(--acc);
      --color-line: var(--line);
      --color-hover: var(--hover);
      --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }

    :root {
      --bg: #ffffff;
      --fg: #191919;
      --secondary: #7F7F7F;
      --accent: #7c3aed;
      --line: #e5e7eb;
      --hover: #f3f4f6;

      --dark-bg: #0C0C0C;
      --dark-fg: #E7E7E7;
      --dark-secondary: #868686;
      --dark-accent: #C4B6ED;
      --dark-line: #2d2d2d;
      --dark-hover: #1f1f1f;

      --background: var(--dark-bg);
      --foreground: var(--dark-fg);
      --sec: var(--dark-secondary);
      --acc: var(--dark-accent);
    }
    html.dark {
      --background: var(--dark-bg);
      --foreground: var(--dark-fg);
      --line: var(--dark-line);
      --hover: var(--dark-hover);
      --sec: var(--dark-secondary);
      --acc: var(--dark-accent);
    }
    html.light {
      --background: var(--bg);
      --foreground: var(--fg);
      --line: var(--line);
      --hover: var(--hover);
      --sec: var(--secondary);
      --acc: var(--accent);
    }
    *, ::before, ::after {
      box-sizing: border-box;
    }
    html, body, #widget-root {
      margin: 0;
      padding: 0;
      background: transparent !important;
      background-color: transparent !important;
      color: var(--foreground);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow: hidden;
      width: 100%;
    }
    /* Custom User CSS */
    ${processedCss}
  </style>
  <style>
    html, body, #widget-root {
      background: transparent !important;
      background-color: transparent !important;
    }
  </style>
</head>
<body style="background: transparent !important; background-color: transparent !important;">
  <div id="widget-root" style="background: transparent !important; background-color: transparent !important;">
    ${processedHtml || '<div style="font-size: 11px; opacity: 0.5; font-family: monospace; padding: 8px 0;">Empty Custom Widget</div>'}
  </div>

  <script>
    const widgetId = ${safeWidgetId};
    const articleData = ${escapedArticleData};
    const container = document.getElementById('widget-root');

    // Auto-Resize reporter to parent window
    function notifyHeight() {
      try {
        const root = document.getElementById('widget-root');
        const h = root ? root.offsetHeight : (document.body.scrollHeight || document.documentElement.scrollHeight);
        window.parent.postMessage({
          type: 'CUSTOM_WIDGET_RESIZE',
          id: widgetId,
          height: h
        }, '*');
      } catch (err) {
        // Safe fail
      }
    }

    // Observe changes
    const resizeObserver = new ResizeObserver(() => notifyHeight());
    const rootEl = document.getElementById('widget-root');
    if (rootEl) resizeObserver.observe(rootEl);
    window.addEventListener('resize', notifyHeight);
    window.addEventListener('load', notifyHeight);
    setTimeout(notifyHeight, 50);
    setTimeout(notifyHeight, 300);

    // Run User JS in safe context
    try {
      ${processedJs}
    } catch (err) {
      console.warn('[CustomWidget Script Error]:', err);
    }
  </script>
</body>
</html>`
    }, [currentTheme, processedHtml, processedCss, processedJs, widget.id, articleData])

    // Direct iframe update on theme switch
    useEffect(() => {
        if (iframeRef.current?.contentDocument?.documentElement) {
            iframeRef.current.contentDocument.documentElement.className = currentTheme
        }
    }, [currentTheme])

    return (
        <div className="w-full h-full custom-html-widget-card bg-transparent">
            {showHeader && titleText && (
                <div className="pb-3">
                    <h2 className="text-lg text-fg font-mono font-medium">
                        {titleText}
                    </h2>
                </div>
            )}

            <iframe
                ref={iframeRef}
                title={titleText || 'Custom Widget'}
                srcDoc={srcDocContent}
                allowTransparency={true}
                style={{
                    width: '100%',
                    height: `${height}px`,
                    border: 'none',
                    background: 'transparent',
                    backgroundColor: 'transparent',
                    overflow: 'hidden',
                    display: 'block',
                    transition: 'height 0.15s ease',
                }}
                sandbox="allow-scripts allow-popups allow-forms allow-same-origin"
                scrolling="no"
            />
        </div>
    )
}

export default CustomHtmlWidget
