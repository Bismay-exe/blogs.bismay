import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ username: string }> }
) {
    const { username } = await params;
    const cleanUsername = username.replace(/^@/, "").trim();

    if (!cleanUsername) {
        return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    try {
        const res = await fetch(`https://api.fxtwitter.com/${cleanUsername}`, {
            headers: {
                "User-Agent": "Mozilla/5.0",
            },
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (res.ok) {
            const data = await res.json();
            if (data.code === 200 && data.user) {
                const user = data.user;
                return NextResponse.json({
                    success: true,
                    data: {
                        name: user.name,
                        username: `@${user.screen_name}`,
                        handle: user.screen_name,
                        bio: user.description,
                        location: user.location || undefined,
                        website: user.website?.url || user.website?.display_url || undefined,
                        websiteDisplay: user.website?.display_url || undefined,
                        joined: user.joined || undefined,
                        following: user.following,
                        followers: user.followers,
                        tweets: user.tweets,
                        avatar: user.avatar_url ? user.avatar_url.replace("_normal.", "_400x400.") : undefined,
                        banner: user.banner_url ? `${user.banner_url}/1500x500` : undefined,
                        isVerified: Boolean(user.verification?.verified),
                        profileUrl: `https://x.com/${user.screen_name}`,
                    },
                });
            }
        }
    } catch (err) {
        console.error("Failed to fetch twitter profile:", err);
    }

    // Fallback: Return basic object
    return NextResponse.json({
        success: false,
        data: {
            name: cleanUsername,
            username: `@${cleanUsername}`,
            handle: cleanUsername,
            avatar: `https://unavatar.io/x/${cleanUsername}`,
            profileUrl: `https://x.com/${cleanUsername}`,
        },
    });
}
