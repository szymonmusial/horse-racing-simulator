/** Distance in meters per round number (1–6). */
export const ROUND_DISTANCES: Record<number, number> = {
  1: 1200,
  2: 1400,
  3: 1600,
  4: 1800,
  5: 2000,
  6: 2200,
} as const

/** Total number of horses in the program. */
export const HORSE_COUNT = 20

/** Number of horses that run in a single round. */
export const HORSES_PER_ROUND = 10

/** Total number of rounds in a race program. */
export const ROUND_COUNT = 6

/** First part of generated horse names (e.g. "Silver", "Thunder"). */
export const HORSE_NAME_PREFIXES = [
  'Silver',
  'Golden',
  'Midnight',
  'Thunder',
  'Rapid',
  'Wild',
  'Crimson',
  'Shadow',
  'Royal',
  'Storm',
  'Iron',
  'Neon',
] as const

/** Second part of generated horse names (e.g. "Arrow", "Blaze"). */
export const HORSE_NAME_SUFFIXES = [
  'Arrow',
  'Spirit',
  'Blaze',
  'Runner',
  'Comet',
  'Dash',
  'Whisper',
  'Flash',
  'Wind',
  'Rocket',
  'Stride',
  'Bolt',
] as const
