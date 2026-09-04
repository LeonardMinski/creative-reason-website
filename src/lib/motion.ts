/**
 * Central motion tokens. Durations mirror the approved design-system motion
 * spec (CR_FRAME_20): MICRO / UI / CONTENT / EDITORIAL bands. Components
 * should reference these rather than hard-coding timings.
 */
export const motion = {
  duration: {
    micro: 150, // 100-180ms — button/tab/hover states
    ui: 240, // 180-280ms — dropdowns, modal reveals, indicators
    content: 400, // 300-500ms — content/media crossfades
    editorial: 700, // 600-800ms — primary transitions, mode transfers
  },
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
} as const;

export function msVar(ms: number): string {
  return `${ms}ms`;
}
