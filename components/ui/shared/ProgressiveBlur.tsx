import React from "react";

type ProgressiveBlurProps = {
    className?: string;
    backgroundColor?: string;
    position?: "top" | "bottom";
    height?: string;
    blurAmount?: string;
};

const ProgressiveBlur = ({
    className = "",
    backgroundColor = "#f5f4f3",
    position = "top",
    height = "150px",
    blurAmount = "4px",
}: ProgressiveBlurProps) => {
    const isTop = position === "top";

    return (
        <div
            className={`pointer-events-none fixed left-0 w-full select-none ${className}`}
            style={{
                [isTop ? "top" : "bottom"]: 0,
                height,
                background: isTop
                    ? `linear-gradient(to top, transparent, ${backgroundColor})`
                    : `linear-gradient(to bottom, transparent, ${backgroundColor})`,
                maskImage: isTop
                    ? `linear-gradient(to bottom, ${backgroundColor} 50%, transparent)`
                    : `linear-gradient(to top, ${backgroundColor} 50%, transparent)`,
                WebkitBackdropFilter: `blur(${blurAmount})`,
                backdropFilter: `blur(${blurAmount})`,
                WebkitUserSelect: "none",
                userSelect: "none",
            }}
        />
    );
};

export { ProgressiveBlur };

/**
 * Skiper 41 Canvas_Landing_004 — React + framer motion
 * Inspired by and adapted from https://devouringdetails.com/
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the devouringdetails.com . They’re independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
