"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface FooterRevealProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
}

/**
 * FooterReveal
 *
 * Production-ready scroll-driven footer reveal wrapper.
 * The footer sits completely fixed and stationary at the bottom, while the upper
 * content layer scrolls up and uncovers it like a curtain.
 *
 * - Dynamic height auto-measuring via ResizeObserver (adapts to any content/viewport).
 * - Rock-solid clip-path fixed reveal mask (immune to parent overflow bugs & smooth scroll).
 *
 * @example
 * ```tsx
 * <FooterReveal className="bg-neutral-950 text-white">
 *   <div className="py-20 text-center">Your custom footer content here</div>
 * </FooterReveal>
 * ```
 */
export const FooterReveal: React.FC<FooterRevealProps> = ({
  children,
  className,
  containerClassName,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState<number | null>(null);

  // Dynamic height auto-measuring
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const height = Math.round(rect.height);
      if (height > 0) {
        setFooterHeight(height);
      }
    };

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden pointer-events-none", containerClassName)}
      style={{
        height: footerHeight ? `${footerHeight}px` : "auto",
        minHeight: footerHeight ? `${footerHeight}px` : undefined,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      }}
    >
      <div
        ref={footerRef}
        className={cn(
          "fixed bottom-0 left-0 right-0 w-full z-0 pointer-events-auto",
          className
        )}
        style={{
          height: footerHeight ? `${footerHeight}px` : "auto",
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FooterReveal;
