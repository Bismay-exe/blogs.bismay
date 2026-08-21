"use client";

import React, {
    forwardRef,
    useState,
    type ComponentPropsWithoutRef,
    type ReactNode,
} from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify-icon/react";

export type TwitterPostCardProps = Readonly<
    {
        username?: string;
        handle?: string;
        timestamp?: string;
        source?: string;
        content?: string;
        hashtags?: string;
        avatar?: string;
        avatarAlt?: string;
        mediaImage?: string;
        tweetUrl?: string;
        isVerified?: boolean;
        menuIcon?: ReactNode;
    } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Twitter Post component with Dark/Light mode support.
export const TwitterPostCard = forwardRef<HTMLDivElement, TwitterPostCardProps>(
    (
        {
            className,
            username = "Bismay",
            handle = "@Bismay_exe",
            timestamp = "9:03 PM · Mar 2, 2021",
            source,
            content = "Building the future of UI with minimalist design and performance-first components. Obsessed with the little details.",
            hashtags = "#WebDev #Nextjs",
            avatar,
            avatarAlt = "User avatar",
            mediaImage,
            tweetUrl,
            isVerified = false,
            menuIcon,
            ...props
        },
        ref,
    ) => {
        const cleanHandle = handle.replace(/^@/, "");
        const displayHandle = handle.startsWith("@") ? handle : `@${handle}`;
        const profileUrl = `https://x.com/${cleanHandle}`;
        const targetTweetUrl = tweetUrl || profileUrl;
        const avatarUrl = avatar || `https://unavatar.io/x/${cleanHandle}`;

        const [imgError, setImgError] = useState(false);
        const [mediaError, setMediaError] = useState(false);

        return (
            <div
                ref={ref}
                data-slot="twitter-post-card"
                className={cn(
                    "w-full max-w-lg rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#121212] p-5 font-sans shadow-lg shadow-black/5 dark:shadow-2xl dark:shadow-black/40 transition-all duration-300",
                    className,
                )}
                {...props}
            >
                <div data-slot="twitter-post-card-header" className="flex gap-3">
                    {/* Avatar */}
                    <a
                        href={profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-800 border border-neutral-200 dark:border-white/10 overflow-hidden shadow-sm hover:opacity-85 transition-opacity"
                    >
                        {!imgError ? (
                            <Image
                                src={avatarUrl}
                                alt={avatarAlt}
                                width={44}
                                height={44}
                                className="w-full h-full object-cover"
                                unoptimized
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <span className="text-sm font-bold text-accent">
                                {cleanHandle.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </a>

                    <div className="min-w-0 flex-1">
                        {/* Header author line */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                                <a
                                    href={profileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    title={username}
                                    className="text-sm font-bold text-neutral-900 dark:text-neutral-100 hover:text-accent transition-colors truncate"
                                >
                                    {username}
                                </a>

                                {isVerified && (
                                    <Icon icon="solar:verified-check-bold" className="text-sky-500 text-sm shrink-0" />
                                )}

                                <span title={displayHandle} className="text-xs text-neutral-500 dark:text-neutral-400 font-mono truncate">
                                    {displayHandle}
                                </span>
                            </div>

                            {/* X logo */}
                            <a
                                href={targetTweetUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="shrink-0 text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                                title="View on X"
                            >
                                {menuIcon ?? <Icon icon="ri:twitter-x-fill" width="14" />}
                            </a>
                        </div>

                        {/* Content */}
                        <p
                            data-slot="twitter-post-card-content"
                            className="mt-2.5 text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-200"
                        >
                            {content}{" "}
                            {hashtags && (
                                <span className="text-sky-500 dark:text-sky-400 font-medium">
                                    {hashtags}
                                </span>
                            )}
                        </p>

                        {/* Optional Media Image */}
                        {mediaImage && !mediaError && (
                            <div className="mt-3 overflow-hidden rounded-xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
                                <Image
                                    src={mediaImage}
                                    alt="Tweet media"
                                    width={500}
                                    height={300}
                                    className="w-full object-cover max-h-72"
                                    unoptimized
                                    onError={() => setMediaError(true)}
                                />
                            </div>
                        )}

                        {/* Date & Time below post text and below media */}
                        {timestamp && (
                            <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                                <a
                                    href={targetTweetUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:underline transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
                                >
                                    {timestamp}
                                </a>
                                {source && (
                                    <>
                                        <span>·</span>
                                        <span className="text-neutral-400 dark:text-neutral-500">{source}</span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    },
);

TwitterPostCard.displayName = "TwitterPostCard";