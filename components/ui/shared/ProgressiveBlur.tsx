"use client";

import React, { useEffect, useRef } from "react";

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
    const elRef = useRef<HTMLDivElement>(null);
    const isTop = position === "top";

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        let rafId: number;
        const numericHeight = parseFloat(height) || 150;

        const updatePosition = () => {
            const parent = el.parentElement;
            if (!parent) return;

            const parentRect = parent.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (isTop) {
                // Keep top blur attached to parent top if parent scrolls down
                const offset = Math.max(0, parentRect.top);
                el.style.transform = `translate3d(0, ${offset}px, 0)`;
            } else {
                // If parent bottom enters the viewport, push bottom blur UP with the parent and fade it
                const offset = Math.max(0, windowHeight - parentRect.bottom);
                el.style.transform = `translate3d(0, -${offset}px, 0)`;
                const opacity = Math.max(0, 1 - (offset / numericHeight));
                el.style.opacity = String(opacity);
            }
        };

        const onScrollOrResize = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(updatePosition);
        };

        updatePosition();
        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize, { passive: true });

        // Also observe parent resizing
        const ro = new ResizeObserver(onScrollOrResize);
        if (el.parentElement) {
            ro.observe(el.parentElement);
        }

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
            ro.disconnect();
        };
    }, [isTop, height]);

    return (
        <div
            ref={elRef}
            aria-hidden="true"
            className={`pointer-events-none fixed left-0 w-full select-none z-20 will-change-transform ${
                isTop ? "" : "rounded-b-[2.5rem] sm:rounded-b-[3.5rem]"
            } ${className}`}
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
