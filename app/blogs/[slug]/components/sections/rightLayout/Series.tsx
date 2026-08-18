import React from "react";
import Link from "next/link";

interface SeriesItem {
    id: number;
    title: string;
    href: string;
}

const seriesList: SeriesItem[] = [
    { id: 1, title: "🚀 Day 1 of Learning React", href: "/blogs/day-1-of-learning-react" },
    { id: 2, title: "🚀 Day 2 of Learning React", href: "/blogs/day-2-of-learning-react" },
    { id: 3, title: "🚀 Day 3 of Learning React", href: "/blogs/day-3-of-learning-react" },
    { id: 4, title: "🚀 Day 4 of Learning React", href: "/blogs/day-4-of-learning-react" },
    { id: 5, title: "🚀 Day 5 of Learning React", href: "/blogs/day-5-of-learning-react" },
    { id: 6, title: "🚀 Day 6 of Learning React", href: "/blogs/day-6-of-learning-react" },
    { id: 11, title: "🚀 Day 11 of Learning React", href: "/blogs/day-11-of-learning-react" },
];

const Series = () => {
    return (
        <div className="w-full h-full">
            <div className="pb-3">
                <h1 className="text-lg text-sec font-mono">
                    Part of Series
                </h1>
                <span className="text-lg font-semibold">🚀 React Learning Journal</span>
            </div>
            <div className="w-full h-full project-list">
                <div className="line"></div>

                {seriesList.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className="flex items-center gap-2 project w-fit group hover:text-accent transition-colors"
                    >
                        <div className="project-line"></div>
                        {item.title}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Series;
