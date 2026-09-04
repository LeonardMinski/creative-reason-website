import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Shared "text + arrow" call-to-action link. On hover/focus the arrow slides
 * right and the label shifts to signal — one consistent, slightly richer
 * interaction for every arrow-CTA on the site instead of a plain opacity fade.
 */
export function CtaLink({ href, children, tone = "light", className }: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest underline underline-offset-4 transition-colors duration-200",
        tone === "light" ? "text-ink/60 hover:text-signal" : "text-paper hover:text-signal",
        className
      )}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
