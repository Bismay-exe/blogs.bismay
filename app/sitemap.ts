import type { MetadataRoute } from "next";
import { PUBLISHED_ARTICLES } from "@/lib/blogStorage";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://blogs-bismay.vercel.app";
    const blogUrls = PUBLISHED_ARTICLES.map((post) => ({
        url: `${baseUrl}/blogs/${post.slug}`,
        lastModified: post.publishing.updatedAt || post.publishing.publishedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        ...blogUrls,
    ];
}
