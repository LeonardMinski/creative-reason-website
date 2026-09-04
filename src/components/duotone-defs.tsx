/**
 * SVG duotone filter, mounted once, referenced anywhere via
 * `style={{ filter: "url(#duotone-cr)" }}`. Maps shadows to ink (#0A0A0A)
 * and highlights to signal (#E8503A) so photography reads as part of the
 * brand system rather than a plain stock-style headshot.
 */
export function DuotoneDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        <filter id="duotone-cr" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0      0      0      1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.0392 0.9098" />
            <feFuncG type="table" tableValues="0.0392 0.3137" />
            <feFuncB type="table" tableValues="0.0392 0.2275" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}

/** Inline style applying the duotone filter — well-supported on raster <img> elements in current Chrome/Firefox/Safari. */
export const duotoneStyle = { filter: "url(#duotone-cr)" } as const;
