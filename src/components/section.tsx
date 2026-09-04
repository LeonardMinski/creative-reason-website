import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  tone?: "paper" | "ink";
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  id?: string;
  "aria-labelledby"?: string;
};

/** Shared section shell: tone (paper/ink alternation) + consistent container + padding rhythm. */
export function Section({
  tone = "paper",
  className,
  containerClassName,
  children,
  id,
  ...aria
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "border-t",
        tone === "paper"
          ? "bg-paper text-ink border-line-light/60"
          : "bg-ink text-paper border-line",
        className
      )}
      {...aria}
    >
      <div className={cn("mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 md:py-24 lg:px-16", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
