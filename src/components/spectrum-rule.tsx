import { cn } from "@/lib/cn";

export function SpectrumRule({ className }: { className?: string }) {
  return (
    <div
      role="presentation"
      className={cn("spectrum-gradient h-px w-full", className)}
    />
  );
}
