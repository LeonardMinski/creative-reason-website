import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

// Intrinsic size shared by every crop below — all four were cut from the
// same source canvas (Desktop/Creative Reason/LOGOS/Creative-Reason-Logo.png).
const SOURCE_WIDTH = 1051;
const SOURCE_HEIGHT = 811;
const ASPECT_RATIO = SOURCE_WIDTH / SOURCE_HEIGHT;

const MARK_LIGHT = "/brand/mark.png";
const MARK_DARK = "/brand/mark-on-dark.png";
const MARK_R_LAYER = "/brand/mark-r-layer.png";
const MARK_C_LAYER = "/brand/mark-c-layer.png";

type CreativeReasonMarkProps = {
  /** Fixed rendered height in pixels (icon-style usage, e.g. the header). Ignored when `animated`. */
  size?: number;
  /** Plays the R-anchor / colour-resolve construction sequence once on mount. Sized by `className` (e.g. a width utility) rather than `size`. */
  animated?: boolean;
  /** Use the paper-recoloured variant for placement on ink (dark) backgrounds. */
  tone?: "light" | "dark";
  className?: string;
  style?: CSSProperties;
  /** next/image `sizes` for the animated variant — override when it renders larger than the 256px default (e.g. a hero-scale mark), so a low-res crop isn't served. */
  sizes?: string;
};

/**
 * The real Creative Reason mark (source: Desktop/Creative Reason/LOGOS —
 * Creative-Reason-Logo.png), cropped to an icon-only asset and, for dark
 * sections, recoloured so the "R" reads as paper instead of ink. The
 * animated variant layers the real R+outline art under the real spectrum
 * "C" art, matching the approved construction sequence (R anchor, then the
 * coloured C resolves in) using genuine artwork rather than a redrawn mark.
 */
export function CreativeReasonMark({
  size = 32,
  animated = false,
  tone = "light",
  className,
  style,
  sizes = "256px",
}: CreativeReasonMarkProps) {
  if (animated) {
    return (
      <span
        className={cn("relative block", className)}
        style={{ aspectRatio: ASPECT_RATIO, ...style }}
      >
        <Image
          src={MARK_R_LAYER}
          alt="Creative Reason"
          fill
          sizes={sizes}
          className="animate-mark-enter object-contain"
          priority
        />
        <Image
          src={MARK_C_LAYER}
          alt=""
          aria-hidden="true"
          fill
          sizes={sizes}
          className="animate-mark-enter object-contain [animation-delay:160ms]"
          priority
        />
      </span>
    );
  }

  const width = Math.round(size * ASPECT_RATIO);

  return (
    <Image
      src={tone === "dark" ? MARK_DARK : MARK_LIGHT}
      alt="Creative Reason"
      width={width}
      height={size}
      // Tailwind's preflight sets a global `img { height: auto }`, which
      // otherwise fights the width/height attributes below (CSS wins over
      // HTML attributes) and stretches the mark. Pin both via inline style,
      // which beats that rule regardless of specificity.
      style={{ width, height: size, ...style }}
      className={cn("shrink-0", className)}
      priority
    />
  );
}
