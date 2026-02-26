/** Minimum viewport widths in px used by responsive helpers. */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const

/** Available breakpoint keys. */
export type Breakpoint = keyof typeof BREAKPOINTS
