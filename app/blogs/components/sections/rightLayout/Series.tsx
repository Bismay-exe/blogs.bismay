import React from "react";
import Link from "next/link";

interface SeriesItem {
    id: number;
    title: string;
    href?: string;
}

const seriesList: SeriesItem[] = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Day ${i + 1} of Learning React`,
    href: `blogs/day-${i +1}-of-learning-react`,
}));

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
                        href={item.href || "#"}
                        className="flex items-center gap-2 project w-fit"
                    >
                        <div className="project-line"></div>
                        🚀 {item.title}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Series;

