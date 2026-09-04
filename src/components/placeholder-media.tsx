import { cn } from "@/lib/cn";

type PlaceholderMediaProps = {
  label: string;
  className?: string;
};

/**
 * Clearly identified stand-in for real product/founder media that does not
 * yet exist in the repository. Intentionally styled as a system state (in
 * the mono/metadata language already used across the design) rather than a
 * broken-image affordance, and intentionally never disguised as a real
 * screenshot per the brief's "do not invent a product screenshot" rule.
 */
export function PlaceholderMedia({ label, className }: PlaceholderMediaProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden border border-dashed border-current/20 bg-[repeating-linear-gradient(135deg,currentColor_0,currentColor_1px,transparent_1px,transparent_14px)] bg-current/[0.03]",
        className
      )}
    >
      <span className="rounded-full border border-current/25 bg-current/[0.06] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-current/60">
        {label} — media pending
      </span>
    </div>
  );
}
