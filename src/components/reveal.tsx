"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /** Render tag — pass "li" when the direct parent is a `<ul>`/`<ol>`, otherwise the default `div` is invalid HTML there and breaks hydration. */
  as?: ElementType;
};

/**
 * Scroll-triggered fade/rise, once per element. Initial state is always
 * `false` on both server and client — `typeof IntersectionObserver` is
 * itself undefined during SSR, so branching on it in the initial state
 * (rather than inside the effect) produced a real hydration mismatch here
 * previously. The `.reveal` class exists purely so the `<noscript>` override
 * in the root layout can force content visible when JS never runs.
 *
 * Under prefers-reduced-motion the global stylesheet collapses the
 * transition duration to ~0, so content simply appears without extra
 * branching here.
 */
export function Reveal({ children, className, delayMs = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      // Pre-2019 browsers only. A genuine one-off client-side feature-detection
      // fallback (can't be known during SSR/render), not props-derived state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "reveal transition-[opacity,transform] duration-500 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className
      )}
    >
      {children}
    </Tag>
  );
}
