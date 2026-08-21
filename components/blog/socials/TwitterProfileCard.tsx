"use client";

import React, {
    forwardRef,
    useState,
    useEffect,
    type ComponentPropsWithoutRef,
    type ReactNode,
} from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MapPin, Globe, ArrowUpRight, Calendar } from "lucide-react";
import { Icon } from "@iconify-icon/react";

export type TwitterProfileCardProps = Readonly<
    {
        name?: string;
        username?: string;
        bio?: string;
        location?: string;
        website?: string;
        joined?: string;
        following?: string | number;
        followers?: string | number;
        coverImage?: string;
        avatar?: string;
        coverImageAlt?: string;
        avatarAlt?: string;
        followLabel?: string;
        profileUrl?: string;
        isVerified?: boolean;
        locationIcon?: ReactNode;
        websiteIcon?: ReactNode;
        joinedIcon?: ReactNode;
        followButton?: ReactNode;
        onFollow?: () => void;
    } & ComponentPropsWithoutRef<"div">
>;

interface LiveProfileData {
    name?: string;
    username?: string;
    bio?: string;
    location?: string;
    website?: string;
    joined?: string;
    following?: number | string;
    followers?: number | string;
    avatar?: string;
    banner?: string;
    isVerified?: boolean;
    tweets?: number;
}

function formatJoinedDate(dateStr?: string): string | null {
    if (!dateStr) return null;
    try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return null;
        const month = d.toLocaleDateString("en-US", { month: "long" });
        const year = d.getFullYear();
        return `Joined ${month} ${year}`;
    } catch {
        return null;
    }
}

function formatNumber(num?: number | string): string {
    if (num === undefined || num === null) return "0";
    if (typeof num === "string") return num;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
    if (num >= 10_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
    return num.toLocaleString();
}

// Production-ready Twitter Profile Card component with live data fetching & theme integration
export const TwitterProfileCard = forwardRef<
    HTMLDivElement,
    TwitterProfileCardProps
>(
    (
        {
            className,
            name: propName,
            username = "Bismay_exe",
            bio: propBio,
            location: propLocation,
            website: propWebsite,
            joined: propJoined,
            following: propFollowing,
            followers: propFollowers,
            coverImage: propCoverImage,
            avatar: propAvatar,
            coverImageAlt = "Profile banner",
            avatarAlt = "Profile avatar",
            followLabel = "Follow",
            profileUrl: propProfileUrl,
            isVerified: propIsVerified,
            locationIcon,
            websiteIcon,
            joinedIcon,
            followButton,
            onFollow,
            ...props
        },
        ref,
    ) => {
        const cleanHandle = username.replace(/^@/, "").trim();
        const displayUsername = `@${cleanHandle}`;
        const targetProfileUrl = propProfileUrl || `https://x.com/${cleanHandle}`;

        const [liveData, setLiveData] = useState<LiveProfileData | null>(null);
        const [loading, setLoading] = useState(!propBio && !propAvatar);
        const [imgError, setImgError] = useState(false);
        const [coverError, setCoverError] = useState(false);

        useEffect(() => {
            if (!cleanHandle) return;

            let isMounted = true;

            const fetchProfile = async () => {
                try {
                    // 1. Try local API route first
                    let res = await fetch(`/api/twitter/user/${cleanHandle}`);
                    let json = await res.json();

                    if (json.success && json.data) {
                        if (isMounted) {
                            setLiveData(json.data);
                            setLoading(false);
                        }
                        return;
                    }

                    // 2. Direct fallback to FXTwitter API
                    res = await fetch(`https://api.fxtwitter.com/${cleanHandle}`);
                    json = await res.json();
                    if (json.code === 200 && json.user && isMounted) {
                        const u = json.user;
                        setLiveData({
                            name: u.name,
                            username: `@${u.screen_name}`,
                            bio: u.description,
                            location: u.location,
                            website: u.website?.url || u.website?.display_url,
                            joined: u.joined,
                            following: u.following,
                            followers: u.followers,
                            avatar: u.avatar_url?.replace("_normal.", "_400x400."),
                            banner: u.banner_url ? `${u.banner_url}/1500x500` : undefined,
                            isVerified: Boolean(u.verification?.verified),
                            tweets: u.tweets,
                        });
                    }
                } catch {
                    // Fallback to prop values
                } finally {
                    if (isMounted) setLoading(false);
                }
            };

            fetchProfile();

            return () => {
                isMounted = false;
            };
        }, [cleanHandle]);

        const displayName = propName || liveData?.name || cleanHandle;
        const displayBio = propBio || liveData?.bio || "";
        const displayLocation = propLocation || liveData?.location;
        const displayWebsite = propWebsite || liveData?.website;
        const displayJoined = formatJoinedDate(propJoined || liveData?.joined);
        const displayFollowing = propFollowing !== undefined ? propFollowing : (liveData?.following ?? 0);
        const displayFollowers = propFollowers !== undefined ? propFollowers : (liveData?.followers ?? 0);
        const displayCover = propCoverImage || liveData?.banner;
        const displayAvatar = propAvatar || liveData?.avatar || `https://unavatar.io/x/${cleanHandle}`;
        const isVerified = propIsVerified !== undefined ? propIsVerified : (liveData?.isVerified ?? false);

        const handleFollowClick = () => {
            if (onFollow) {
                onFollow();
            } else {
                window.open(`https://x.com/intent/follow?screen_name=${cleanHandle}`, "_blank", "noopener,noreferrer");
            }
        };

        if (loading) {
            return (
                <div
                    ref={ref}
                    className={cn(
                        "w-full max-w-lg overflow-hidden rounded-2xl border border-sec/30 bg-bg p-5 font-sans animate-pulse space-y-4 shadow-lg",
                        className
                    )}
                    {...props}
                >
                    <div className="h-32 w-full bg-sec/30 rounded-xl" />
                    <div className="flex justify-between items-end px-2 -mt-10">
                        <div className="size-20 rounded-full bg-sec/50 border-4 border-bg" />
                        <div className="h-8 w-24 bg-sec/40 rounded-full" />
                    </div>
                    <div className="space-y-2 px-2 pt-2">
                        <div className="h-5 w-40 bg-sec/40 rounded" />
                        <div className="h-3.5 w-24 bg-sec/30 rounded" />
                        <div className="h-10 w-full bg-sec/20 rounded mt-2" />
                    </div>
                </div>
            );
        }

        return (
            <div
                ref={ref}
                data-slot="twitter-profile-card"
                className={cn(
                    "w-full max-w-lg overflow-hidden rounded-2xl border border-sec/30 bg-bg font-sans shadow-lg shadow-black/5 dark:shadow-2xl transition-all duration-300",
                    className,
                )}
                {...props}
            >
                {/* Cover Banner */}
                <div data-slot="twitter-profile-card-cover" className="relative h-32 sm:h-36 w-full bg-neutral-900 overflow-hidden">
                    {displayCover && !coverError ? (
                        <Image
                            src={displayCover}
                            alt={coverImageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 512px"
                            onError={() => setCoverError(true)}
                            priority
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 via-neutral-900 to-black" />
                    )}

                    {/* Gradient Overlay for Top Badges */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* X (Twitter) Logo Badge in top-right */}
                    <a
                        href={targetProfileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white text-xs font-mono transition-transform hover:scale-105"
                        title="View profile on X"
                    >
                        <Icon icon="ri:twitter-x-fill" width="12" />
                        <span className="font-semibold text-[11px]">X</span>
                        <ArrowUpRight size={12} className="opacity-70" />
                    </a>
                </div>

                {/* Profile Header & Avatar Area */}
                <div className="px-5 pb-5">
                    <div className="flex items-end justify-between -mt-10 sm:-mt-12 mb-3">
                        {/* Profile Avatar */}
                        <div className="relative z-20 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border-4 border-bg bg-neutral-800 shadow-xl overflow-hidden shrink-0">
                            {!imgError ? (
                                <Image
                                    src={displayAvatar}
                                    alt={avatarAlt}
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div className="w-full h-full bg-accent/30 text-accent font-bold text-2xl flex items-center justify-center">
                                    {cleanHandle.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        {/* Follow Button */}
                        {followButton ?? (
                            <button
                                type="button"
                                aria-label={`Follow ${displayName}`}
                                onClick={handleFollowClick}
                                className="cursor-pointer shrink-0 rounded-full bg-fg text-bg font-bold px-4 py-1.5 text-xs sm:text-sm transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 shadow-sm"
                            >
                                {followLabel}
                            </button>
                        )}
                    </div>

                    {/* Names & Handle */}
                    <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                            <a
                                href={targetProfileUrl}
                                target="_blank"
                                rel="noreferrer"
                                title={displayName}
                                className="text-lg sm:text-xl leading-tight font-bold text-fg hover:text-accent transition-colors truncate block"
                            >
                                {displayName}
                            </a>
                            {isVerified && (
                                <Icon icon="solar:verified-check-bold" className="text-sky-500 shrink-0 text-base" />
                            )}
                        </div>

                        <a
                            href={targetProfileUrl}
                            target="_blank"
                            rel="noreferrer"
                            title={displayUsername}
                            className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-mono hover:underline block truncate mt-0.5"
                        >
                            {displayUsername}
                        </a>
                    </div>

                    {/* Bio */}
                    {displayBio && (
                        <p
                            data-slot="twitter-profile-card-bio"
                            title={displayBio}
                            className="mt-3.5 text-[15px] leading-snug text-fg"
                        >
                            {displayBio}
                        </p>
                    )}

                    {/* Profile Metadata (Location, Website, Joined Date) */}
                    <div
                        data-slot="twitter-profile-card-details"
                        className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400"
                    >
                        {displayLocation && (
                            <span className="flex items-center gap-1.5">
                                {locationIcon ?? <MapPin size={13} className="shrink-0 text-neutral-400 dark:text-neutral-500" />}
                                <span>{displayLocation}</span>
                            </span>
                        )}

                        {displayWebsite && (
                            <a
                                href={displayWebsite.startsWith("http") ? displayWebsite : `https://${displayWebsite}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 text-sky-500 dark:text-sky-400 hover:underline font-medium"
                            >
                                {websiteIcon ?? <Globe size={13} className="shrink-0" />}
                                <span className="truncate max-w-[200px]">{displayWebsite.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                            </a>
                        )}

                        {displayJoined && (
                            <span className="flex items-center gap-1.5">
                                {joinedIcon ?? <Calendar size={13} className="shrink-0 text-neutral-400 dark:text-neutral-500" />}
                                <span>{displayJoined}</span>
                            </span>
                        )}
                    </div>

                    {/* Stats (Following & Followers) */}
                    <div
                        data-slot="twitter-profile-card-stats"
                        className="mt-4 flex gap-5 text-xs text-neutral-500 dark:text-neutral-400 pt-3 border-t border-sec/30"
                    >
                        <a
                            href={`${targetProfileUrl}/following`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline flex items-center gap-1"
                        >
                            <b className="font-bold text-fg">
                                {formatNumber(displayFollowing)}
                            </b>{" "}
                            Following
                        </a>

                        <a
                            href={`${targetProfileUrl}/verified_followers`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline flex items-center gap-1"
                        >
                            <b className="font-bold text-fg">
                                {formatNumber(displayFollowers)}
                            </b>{" "}
                            Followers
                        </a>
                    </div>
                </div>
            </div>
        );
    },
);

TwitterProfileCard.displayName = "TwitterProfileCard";