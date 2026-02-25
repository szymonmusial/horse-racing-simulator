export const ROUND_DISTANCES: Record<number, number> = {
  1: 1200,
  2: 1400,
  3: 1600,
  4: 1800,
  5: 2000,
  6: 2200,
} as const

export const HORSE_COUNT = 20
export const HORSES_PER_ROUND = 10
export const ROUND_COUNT = 6
export const BASE_SPEED = 200
export const NEXT_ROUND_DELAY_MS = 2000

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
