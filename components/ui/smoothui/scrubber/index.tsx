"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

export interface ScrubberProps {
  /** Additional CSS classes */
  className?: string;
  /** Number of decimal places to display */
  decimals?: number;
  /** Default value for uncontrolled usage */
  defaultValue?: number;
  /** Label displayed on the left side of the track */
  label?: string;
  /** Maximum value */
  max?: number;
  /** Minimum value */
  min?: number;
  /** Unit suffix displayed with value, e.g. "px" or "x" */
  unit?: string;
  /** Custom formatter for the displayed value */
  formatValue?: (value: number) => string;
  /** Called when value changes during interaction */
  onValueChange?: (value: number) => void;
  /** Step increment */
  step?: number;
  /** Number of tick marks (0 to hide) */
  ticks?: number;
  /** Controlled value */
  value?: number;
}

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const roundToStep = (val: number, step: number, min: number) =>
  Math.round((val - min) / step) * step + min;

export const Scrubber = ({
  label = "Value",
  value: controlledValue,
  defaultValue = 0,
  onValueChange,
  min = 0,
  max = 1,
  step = 0.01,
  decimals = 2,
  ticks = 9,
  unit = "",
  formatValue,
  className,
}: ScrubberProps) => {
  const shouldReduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const range = max - min;
  const percentage = range > 0 ? ((value - min) / range) * 100 : 0;
  const isActive = isDragging || (isHoverDevice && isHovering);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsHoverDevice(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsHoverDevice(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setValue = useCallback(
    (newValue: number) => {
      const clamped = clamp(roundToStep(newValue, step, min), min, max);
      if (!isControlled) {
        setInternalValue(clamped);
      }
      onValueChange?.(clamped);
    },
    [step, min, max, isControlled, onValueChange]
  );

  const getValueFromPointer = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) {
        return value;
      }
      const rect = track.getBoundingClientRect();
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      return min + ratio * range;
    },
    [min, range, value]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      trackRef.current?.setPointerCapture(e.pointerId);
      setIsDragging(true);
      setValue(getValueFromPointer(e.clientX));
    },
    [getValueFromPointer, setValue]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) {
        return;
      }
      setValue(getValueFromPointer(e.clientX));
    },
    [isDragging, getValueFromPointer, setValue]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let next: number | undefined;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = value + step;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          next = value - step;
          break;
        case "Home":
          next = min;
          break;
        case "End":
          next = max;
          break;
        default:
          return;
      }
      e.preventDefault();
      setValue(next);
    },
    [value, step, min, max, setValue]
  );

  const springConfig = shouldReduceMotion
    ? { duration: 0 }
    : { bounce: 0.1, duration: 0.25, type: "spring" as const };

  const displayVal = formatValue
    ? formatValue(value)
    : `${decimals === 0 ? Math.round(value) : value.toFixed(decimals)}${unit}`;

  return (
    <div className={cn("relative w-full select-none", className)}>
      <div
        aria-label={label}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={Number(value.toFixed(decimals))}
        className="relative cursor-pointer overflow-hidden rounded-2xl bg-bg/80 border border-sec/20 hover:border-sec/40 transition-colors outline-offset-2 shadow-xs"
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        ref={trackRef}
        role="slider"
        style={{
          height: 38,
          touchAction: "none",
        }}
        tabIndex={0}
      >
        {/* Fill indicator */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 bg-fg/10"
          style={{
            transition: isDragging
              ? "none"
              : "width 150ms cubic-bezier(0.23, 1, 0.32, 1)",
            width: `${percentage}%`,
          }}
        />

        {/* Tick marks */}
        {ticks > 0 && (
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: ticks }, (_, i) => {
              const pos = ((i + 1) / (ticks + 1)) * 100;
              return (
                <div
                  className="absolute top-1/2 bg-sec/30"
                  key={pos}
                  style={{
                    borderRadius: 999,
                    height: 5,
                    left: `${pos}%`,
                    transform: "translateX(-50%) translateY(-50%)",
                    width: 1,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Scrub bar (capsule thumb) */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: `${percentage}%`,
            marginLeft: -3,
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            transition: isDragging
              ? "none"
              : "left 150ms cubic-bezier(0.23, 1, 0.32, 1)",
            zIndex: 3,
          }}
        >
          <motion.div
            animate={{
              opacity: isActive ? 1 : 0.4,
              scaleX: isActive ? 1.2 : 0.85,
              scaleY: isActive ? 1.1 : 0.85,
            }}
            className="bg-fg shadow-sm"
            style={{
              borderRadius: 999,
              height: 20,
              width: 4,
            }}
            transition={springConfig}
          />
        </div>

        {/* Label */}
        <div
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 whitespace-nowrap text-fg text-xs font-semibold"
          style={{
            zIndex: 4,
          }}
        >
          {label}
        </div>

        {/* Value display */}
        <div
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-fg font-mono text-xs font-bold"
          style={{
            fontVariantNumeric: "tabular-nums",
            zIndex: 4,
          }}
        >
          {displayVal}
        </div>
      </div>
    </div>
  );
};

export default Scrubber;
