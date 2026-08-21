"use client";

import { ExpandableTabs } from "@/components/expandable-tabs";
import {
    BadgeCheck,
    Brush,
    CalendarClock,
    ChartSpline,
    ChevronRight,
    ClipboardCheck,
    CloudUpload,
    FileText,
    Gauge,
    GitBranch,
    Images,
    Inbox,
    type LucideIcon,
    Megaphone,
    MessageCircle,
    PackageOpen,
    RefreshCw,
    Rocket,
    Siren,
    SwatchBook,
    UploadCloud,
    Users,
    Webhook,
    Workflow,
} from "lucide-react";

function Row({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
    return (
        <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
            <Icon className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1">{label}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
    );
}

function Menu({ rows }: { rows: { icon: LucideIcon; label: string }[] }) {
    return (
        <div className="flex w-[17.125rem] flex-col gap-0.5">
            {rows.map((r) => (
                <Row key={r.label} icon={r.icon} label={r.label} />
            ))}
        </div>
    );
}

export function ExpandableTabsPreview() {
    return (
        <div className="flex min-h-88 w-full items-end justify-center">
            <ExpandableTabs
                items={[
                    {
                        id: "launch",
                        label: "Launch",
                        icon: <Rocket className="h-4 w-4" />,
                        content: (
                            <Menu
                                rows={[
                                ]}
                            />
                        ),
                    },
                    {
                        id: "inbox",
                        label: "Inbox",
                        icon: <Inbox className="h-4 w-4" />,
                        content: (
                            <Menu
                                rows={[
                                ]}
                            />
                        ),
                    },
                    {
                        id: "flows",
                        label: "Flows",
                        icon: <Workflow className="h-4 w-4" />,
                        content: (
                            <Menu
                                rows={[
                                ]}
                            />
                        ),
                    },
                    {
                        id: "assets",
                        label: "Assets",
                        icon: <PackageOpen className="h-4 w-4" />,
                        content: (
                            <Menu
                                rows={[
                                ]}
                            />
                        ),
                    },
                    {
                        id: "status",
                        label: "Status",
                        icon: <ChartSpline className="h-4 w-4" />,
                        content: (
                            <Menu
                                rows={[
                                ]}
                            />
                        ),
                    },
                ]}
            />
        </div>
    );
}
