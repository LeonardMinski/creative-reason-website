import { cn } from "@/lib/cn";

type SectionMetaProps = {
  index: string;
  label: string;
  tone?: "ink" | "paper";
  className?: string;
};

/** Mono eyebrow index — part of the approved visible design system (SECTION B / SECTION I). */
export function SectionMeta({ index, label, tone = "ink", className }: SectionMetaProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em]",
        tone === "ink" ? "text-ink/50" : "text-paper/50",
        className
      )}
    >
      <span>{index}</span>
      <span>{label}</span>
    </div>
  );
}
