import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type PillProps = {
  children: ReactNode;
  /** "light" = sitting on a paper background; "dark" = sitting on an ink background. */
  tone?: "light" | "dark";
  title?: string;
  className?: string;
  /** Render tag — pass "li" when the direct parent is a `<ul>`/`<ol>`. */
  as?: ElementType;
};

/**
 * Shared tag/badge pill used across capability lists, project tags, focus
 * areas, etc. Purely decorative (not a control), so the hover treatment is
 * a tasteful hover-only flourish rather than functionality — colour, tint
 * and a slight lift, tying back to the signal accent on interaction.
 */
export function Pill({ children, tone = "light", title, className, as: Tag = "span" }: PillProps) {
  return (
    <Tag
      title={title}
      className={cn(
        "inline-block rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-all duration-200 ease-out hover:scale-105",
        tone === "light"
          ? "border-line-light text-ink/60 hover:border-signal hover:bg-signal/10 hover:text-signal"
          : "border-paper/25 text-paper/70 hover:border-signal hover:bg-signal/15 hover:text-signal",
        className
      )}
    >
      {children}
    </Tag>
  );
}
