'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
    children: ReactNode
    widgetTitle?: string
}

interface State {
    hasError: boolean
    errorMessage?: string
}

export class WidgetErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, errorMessage: error.message }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Widget render error:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="w-full p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 text-rose-500 space-y-1 text-xs font-mono">
                    <div className="flex items-center gap-2 font-bold">
                        <AlertTriangle size={14} />
                        <span>Widget Error: {this.props.widgetTitle || 'Custom Widget'}</span>
                    </div>
                    <p className="text-[11px] text-sec truncate">
                        {this.state.errorMessage || 'An error occurred while displaying this widget.'}
                    </p>
                </div>
            )
        }

        return this.props.children
    }
}
