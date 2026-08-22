"use client";

import React, { Suspense } from "react";
import { enrichTweet, type EnrichedTweet } from "react-tweet";
import { useTweet } from "react-tweet";
import { type Tweet } from "react-tweet/api";
import { Icon } from "@iconify-icon/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const truncate = (str: string | null, length: number) => {
    if (!str || str.length <= length) return str;
    return `${str.slice(0, length - 3)}...`;
};

const Skeleton = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn("bg-neutral-200 dark:bg-sec animate-pulse rounded-md", className)} {...props} />
    );
};

export const TweetSkeleton = ({
    className,
    ...props
}: {
    className?: string;
    [key: string]: unknown;
}) => (
    <div
        className={cn(
            "flex w-full flex-col gap-3 rounded-2xl border border-sec/30 bg-bg p-5 shadow-lg shadow-black/5 dark:shadow-2xl",
            className
        )}
        {...props}
    >
        <div className="flex flex-row items-center gap-3">
            <Skeleton className="size-11 shrink-0 rounded-full" />
            <div className="flex flex-col gap-1.5 w-full">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
            </div>
        </div>
        <Skeleton className="h-16 w-full rounded-lg" />
        <div className="flex gap-4 pt-2">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-12" />
        </div>
    </div>
);

export const TweetNotFound = ({
    className,
    id,
    tweetUrl,
    ...props
}: {
    className?: string;
    id?: string;
    tweetUrl?: string;
    [key: string]: unknown;
}) => {
    const targetUrl = tweetUrl || (id ? `https://x.com/i/status/${id}` : "https://x.com");

    return (
        <div
            className={cn(
                "flex w-full flex-col gap-3 rounded-2xl border border-sec/30 bg-bg p-5 shadow-lg shadow-black/5 dark:shadow-2xl",
                className
            )}
            {...props}
        >
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2 font-mono">
                    <div className="w-5 h-5 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                        <Icon icon="ri:twitter-x-fill" width="12" />
                    </div>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">X (Twitter)</span>
                </div>
                <a
                    href={targetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-accent font-semibold hover:underline"
                >
                    <span>Open on X</span>
                    <ArrowUpRight size={13} />
                </a>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Unable to load tweet preview. Click below to view the post and conversation directly on X.
            </p>
            <a
                href={targetUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-100 dark:bg-sec/80 px-4 py-2 text-xs font-semibold text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-sec transition-colors"
            >
                <Icon icon="ri:twitter-x-fill" width="13" />
                View Post on X
            </a>
        </div>
    );
};

export const TweetHeader = ({ tweet }: { tweet: EnrichedTweet }) => (
    <div className="flex flex-row items-start justify-between tracking-normal gap-2">
        <div className="flex items-center space-x-3 min-w-0">
            <a
                href={tweet.user.url}
                target="_blank"
                rel="noreferrer"
                className="shrink-0"
            >
                <img
                    title={`Profile picture of ${tweet.user.name}`}
                    alt={tweet.user.screen_name}
                    height={44}
                    width={44}
                    src={tweet.user.profile_image_url_https}
                    className="size-11 rounded-full border border-neutral-200 dark:border-white/10 object-cover shadow-sm hover:opacity-85 transition-opacity"
                />
            </a>
            <div className="flex flex-col min-w-0">
                <a
                    href={tweet.user.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-fg/90 flex items-center font-bold text-sm leading-tight transition-colors hover:text-fg truncate"
                >
                    <span className="truncate">{truncate(tweet.user.name, 24)}</span>
                    {(tweet.user.verified || tweet.user.is_blue_verified) && (
                        <Icon icon="solar:verified-check-bold" className="ml-1 inline text-sky-500 text-sm shrink-0" />
                    )}
                </a>
                <a
                    href={tweet.user.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sec font-mono text-xs hover:underline truncate mt-0.5"
                >
                    @{truncate(tweet.user.screen_name, 20)}
                </a>
            </div>
        </div>
        <a
            href={tweet.url}
            target="_blank"
            rel="noreferrer"
            className="text-sec hover:text-fg transition-all shrink-0 p-1"
            title="View on X"
        >
            <Icon icon="ri:twitter-x-fill" width="16" />
        </a>
    </div>
);

export const TweetBody = ({ tweet }: { tweet: EnrichedTweet }) => (
    <div className="text-[18px] leading-snug tracking-normal wrap-break-word text-fg">
        {tweet.entities.map((entity, idx) => {
            switch (entity.type) {
                case "url":
                case "symbol":
                case "hashtag":
                case "mention":
                    return (
                        <a
                            key={idx}
                            href={entity.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-500 dark:text-sky-400 hover:underline font-medium"
                        >
                            <span>{entity.text}</span>
                        </a>
                    );
                case "text":
                    return (
                        <span
                            key={idx}
                            dangerouslySetInnerHTML={{ __html: entity.text }}
                        />
                    );
                default:
                    return null;
            }
        })}
    </div>
);

interface UnifiedMediaItem {
    id: string;
    type: "photo" | "video" | "animated_gif";
    posterUrl: string;
    alt: string;
    aspectRatio?: [number, number];
}

const getMediaItems = (tweet: EnrichedTweet): UnifiedMediaItem[] => {
    if (tweet.mediaDetails && tweet.mediaDetails.length > 0) {
        return tweet.mediaDetails.map((media, idx) => {
            const isVideo = media.type === "video" || media.type === "animated_gif";
            const ratio = isVideo
                ? media.video_info?.aspect_ratio
                : media.original_info
                ? ([media.original_info.width, media.original_info.height] as [number, number])
                : undefined;
            return {
                id: media.media_url_https || `${idx}`,
                type: media.type,
                posterUrl: media.media_url_https,
                alt: (media.type === "photo" && media.ext_alt_text) || tweet.text || `Media ${idx + 1}`,
                aspectRatio: ratio,
            };
        });
    }

    const items: UnifiedMediaItem[] = [];
    if (tweet.video) {
        items.push({
            id: "video",
            type: "video",
            posterUrl: tweet.video.poster,
            alt: tweet.text || "Tweet video",
            aspectRatio: tweet.video.aspectRatio,
        });
    }
    if (tweet.photos && tweet.photos.length > 0) {
        tweet.photos.forEach((photo, idx) => {
            items.push({
                id: photo.url || `${idx}`,
                type: "photo",
                posterUrl: photo.url,
                alt: tweet.text || `Photo ${idx + 1}`,
                aspectRatio: photo.width && photo.height ? [photo.width, photo.height] : undefined,
            });
        });
    }
    return items;
};

const TweetMediaCarousel = ({
    items,
    tweetUrl,
}: {
    items: UnifiedMediaItem[];
    tweetUrl: string;
}) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(false);

    const updateScrollState = React.useCallback(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }, []);

    React.useEffect(() => {
        updateScrollState();
        const el = scrollContainerRef.current;
        if (!el) return;

        el.addEventListener("scroll", updateScrollState, { passive: true });
        window.addEventListener("resize", updateScrollState);

        return () => {
            el.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, [updateScrollState]);

    const handleScroll = (direction: "left" | "right") => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const scrollAmount = el.clientWidth * 0.75;
        el.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="group/carousel relative w-full overflow-hidden rounded-xl border border-sec/30">
            {/* Scrollable Media Container */}
            <div
                ref={scrollContainerRef}
                className="flex w-full h-[280px] sm:h-[340px] gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {items.map((item, idx) => {
                    const isVideoOrGif = item.type === "video" || item.type === "animated_gif";
                    const ratioStyle = item.aspectRatio
                        ? { aspectRatio: `${item.aspectRatio[0]} / ${item.aspectRatio[1]}` }
                        : { aspectRatio: "16 / 9" };

                    return (
                        <a
                            key={item.id || idx}
                            href={tweetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={ratioStyle}
                            className="group relative h-full shrink-0 snap-start overflow-hidden bg-bg/80 cursor-pointer block"
                        >
                            {/* Media Poster / Image */}
                            <img
                                src={item.posterUrl}
                                alt={item.alt}
                                className="h-full w-full object-cover transition-transform duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-105 block"
                                loading="lazy"
                            />

                            {/* Video / GIF Overlay */}
                            {isVideoOrGif && (
                                <>
                                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sec/40 backdrop-blur-sm text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-sec/60">
                                            <Icon icon="solar:play-bold" className="text-lg ml-0.5" />
                                        </div>
                                    </div>

                                    {item.type === "animated_gif" ? (
                                        <div className="absolute bottom-2.5 left-2.5 flex items-center rounded-md bg-black/70 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 pointer-events-none">
                                            GIF
                                        </div>
                                    ) : (
                                        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-full bg-black/70 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-white/90 border border-white/10 group-hover:bg-black/90 transition-colors pointer-events-none">
                                            <Icon icon="ri:twitter-x-fill" className="text-xs" />
                                            <span>Watch on X</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </a>
                    );
                })}
            </div>

            {/* Left Navigation Arrow */}
            {canScrollLeft && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleScroll("left");
                    }}
                    aria-label="Previous media"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/75 hover:bg-black/90 text-white shadow-lg backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 z-10"
                >
                    <ChevronLeft size={18} />
                </button>
            )}

            {/* Right Navigation Arrow */}
            {canScrollRight && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleScroll("right");
                    }}
                    aria-label="Next media"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/75 hover:bg-black/90 text-white shadow-lg backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 z-10"
                >
                    <ChevronRight size={18} />
                </button>
            )}
        </div>
    );
};

export const TweetMedia = ({ tweet }: { tweet: EnrichedTweet }) => {
    const items = getMediaItems(tweet);
    if (items.length === 0) return null;

    // Single media item
    if (items.length === 1) {
        const item = items[0];
        const isVideoOrGif = item.type === "video" || item.type === "animated_gif";
        return (
            <div className="w-full overflow-hidden rounded-xl">
                <a
                    href={tweet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={
                        item.aspectRatio
                            ? { aspectRatio: `${item.aspectRatio[0]} / ${item.aspectRatio[1]}` }
                            : undefined
                    }
                    className="group relative w-full block overflow-hidden rounded-xl border border-sec/30 bg-bg/80 cursor-pointer"
                >
                    {/* Media Poster / Image */}
                    <img
                        src={item.posterUrl}
                        alt={item.alt}
                        className="h-full w-full object-cover transition-transform duration-300 opacity-90 group-hover:opacity-100 block"
                        loading="lazy"
                    />

                    {isVideoOrGif && (
                        <>
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-bg/20 via-transparent to-transparent pointer-events-none" />

                            {/* Centered Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sec/30 backdrop-blur-sm text-white shadow-xl transition-all duration-300 group-hover:bg-sec/50">
                                    <Icon icon="solar:play-bold" className="text-xl ml-0.5" />
                                </div>
                            </div>

                            {/* Type badge */}
                            {item.type === "animated_gif" ? (
                                <div className="absolute bottom-3 left-3 flex items-center rounded-md bg-black/70 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 pointer-events-none">
                                    GIF
                                </div>
                            ) : (
                                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white/90 border border-white/10 group-hover:bg-black/90 transition-colors pointer-events-none">
                                    <Icon icon="ri:twitter-x-fill" className="text-xs" />
                                    <span>Watch on X</span>
                                </div>
                            )}
                        </>
                    )}
                </a>
            </div>
        );
    }

    // Multiple media items -> Horizontal Aspect-Ratio Carousel with Navigation Controls
    return <TweetMediaCarousel items={items} tweetUrl={tweet.url} />;
};

/**
 * Tweet Date and Time placed below text & media (bottom-left)
 */
export const TweetTimestamp = ({ tweet }: { tweet: EnrichedTweet }) => {
    if (!tweet.created_at) return null;

    let formatted = "";
    try {
        const date = new Date(tweet.created_at);
        if (!isNaN(date.getTime())) {
            const timeStr = date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });
            const dateStr = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
            formatted = `${timeStr} · ${dateStr}`;
        }
    } catch {
        formatted = tweet.created_at;
    }

    if (!formatted) return null;

    return (
        <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
            <a
                href={tweet.url}
                target="_blank"
                rel="noreferrer"
                className="hover:underline transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
            >
                {formatted}
            </a>
        </div>
    );
};

const withSafeEntities = <T extends { entities?: Tweet["entities"] }>(
    tweet: T
): T & { entities: Tweet["entities"] } => ({
    ...tweet,
    entities: {
        ...tweet.entities,
        hashtags: tweet.entities?.hashtags ?? [],
        urls: tweet.entities?.urls ?? [],
        symbols: tweet.entities?.symbols ?? [],
        user_mentions: tweet.entities?.user_mentions ?? [],
    },
});

export type TwitterPostCard2Props = Readonly<
    {
        id?: string;
        tweet?: Tweet;
        apiUrl?: string;
        fallback?: React.ReactNode;
        tweetUrl?: string;
    } & React.ComponentPropsWithoutRef<"div">
>;

export const MagicTweet = ({
    tweet,
    className,
    ...props
}: {
    tweet: Tweet;
    className?: string;
    [key: string]: unknown;
}) => {
    const safeTweet: Tweet = {
        ...withSafeEntities(tweet),
        quoted_tweet: tweet.quoted_tweet
            ? withSafeEntities(tweet.quoted_tweet)
            : undefined,
    };
    const enrichedTweet = enrichTweet(safeTweet);
    return (
        <div
            className={cn(
                "relative flex h-fit w-full flex-col gap-3.5 overflow-hidden rounded-2xl border border-sec/30 bg-bg p-5 font-sans transition-all duration-300",
                className
            )}
            {...props}
        >
            <TweetHeader tweet={enrichedTweet} />
            {/* <div className="pl-14 flex flex-col gap-3.5"> */}
                <TweetBody tweet={enrichedTweet} />
                <TweetMedia tweet={enrichedTweet} />
                <TweetTimestamp tweet={enrichedTweet} />
            {/* </div> */}
        </div>
    );
};

/**
 * ClientTweetCard - Safe for Client Components, fetches live tweet via SWR
 */
export const ClientTweetCard = ({
    id,
    apiUrl,
    fallback = <TweetSkeleton />,
    tweetUrl,
    className,
    ...props
}: {
    id?: string;
    apiUrl?: string;
    fallback?: React.ReactNode;
    tweetUrl?: string;
    className?: string;
    [key: string]: unknown;
}) => {
    const { data: tweet, error, isLoading } = useTweet(id, apiUrl);

    if (isLoading) return <>{fallback}</>;
    if (error || !tweet) {
        return <TweetNotFound id={id} tweetUrl={tweetUrl} className={className} {...props} />;
    }

    return <MagicTweet tweet={tweet} className={className} {...props} />;
};

export const TwitterPostCard2 = ({
    id,
    tweet,
    apiUrl,
    fallback,
    tweetUrl,
    className,
    ...props
}: TwitterPostCard2Props) => {
    if (tweet) {
        return <MagicTweet tweet={tweet} className={className} {...props} />;
    }

    if (id) {
        return (
            <Suspense fallback={fallback || <TweetSkeleton />}>
                <ClientTweetCard
                    id={id}
                    apiUrl={apiUrl}
                    fallback={fallback}
                    tweetUrl={tweetUrl}
                    className={className}
                    {...props}
                />
            </Suspense>
        );
    }

    return <TweetNotFound id={id} tweetUrl={tweetUrl} className={className} {...props} />;
};

export default TwitterPostCard2;
