"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type TypewriterWordProps = {
  /** The word (or short phrase) to type out. Rendered as one visual unit — put the rest of the heading around this component. */
  word: string;
  className?: string;
  /** ms per character. */
  speedMs?: number;
  /** ms to hold the fully-typed word before it resets and types again. */
  pauseMs?: number;
};

/**
 * Renders `word` complete and whole by default (this is also what SSR, a
 * no-JS visitor, and crawlers see — never a partial or empty string), then
 * once it scrolls into view, jump-cuts to empty and types it back out
 * character-by-character, holds, and loops indefinitely as a decorative
 * flourish. The full word is always present for assistive tech via
 * aria-label on the wrapper, with the animated characters hidden from it,
 * so meaning is never carried only by the animation and the repeat-forever
 * loop is invisible to screen readers. Under prefers-reduced-motion the word
 * simply stays whole, with no typing and no looping.
 */
export function TypewriterWord({
  word,
  className,
  speedMs = 180,
  pauseMs = 2000,
}: TypewriterWordProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Starts fully typed (the word's own length, not 0) so the word is always
  // complete before the animation loop below ever gets a chance to run.
  const [visibleChars, setVisibleChars] = useState(word.length);
  const [started, setStarted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Must read the real preference client-side after mount: computing it
    // eagerly (e.g. in a lazy useState initializer) would run during
    // hydration too and could disagree with the server's always-false
    // render for reduced-motion users, causing a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || reduceMotion) return;

    if (visibleChars < word.length) {
      const timer = setTimeout(() => setVisibleChars((n) => n + 1), speedMs);
      return () => clearTimeout(timer);
    }

    // Fully typed — hold, then loop back to the start and type it again.
    // Never terminates: this is a deliberate perpetual loop, not a bug.
    const timer = setTimeout(() => setVisibleChars(0), pauseMs);
    return () => clearTimeout(timer);
  }, [started, reduceMotion, visibleChars, word, speedMs, pauseMs]);

  const shown = reduceMotion ? word : word.slice(0, visibleChars);

  return (
    <span ref={ref} aria-label={word} className={cn("inline-block", className)}>
      <span aria-hidden="true">
        {shown}
        {started && !reduceMotion && (
          <span className="typewriter-cursor" aria-hidden="true">
            |
          </span>
        )}
      </span>
    </span>
  );
}
