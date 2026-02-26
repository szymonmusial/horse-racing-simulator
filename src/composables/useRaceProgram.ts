import { ref } from 'vue'
import type { Horse } from '@/types/horse'
import { ROUND_STATUS, type Round } from '@/types/round'
import {
  ROUND_DISTANCES,
  HORSE_COUNT,
  HORSES_PER_ROUND,
  ROUND_COUNT,
  HORSE_NAME_PREFIXES,
  HORSE_NAME_SUFFIXES,
} from '@/constants/race'
import { shuffleArray } from '@/utils/array'

/**
 * Generates and stores race program data: horses and rounds.
 */
export const useRaceProgram = () => {
  // -----------------------------------------------------------------------------
  // Program State
  // -----------------------------------------------------------------------------
  const horses = ref<Horse[]>([])
  const rounds = ref<Round[]>([])

  // -----------------------------------------------------------------------------
  // Program Builders
  // -----------------------------------------------------------------------------

  /**
   * Creates a random hex color for horse rendering.
   */
  const generateRandomColor = (): string => {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`
  }

  /**
   * Creates a random horse name (duplicates are allowed).
   */
  const generateRandomHorseName = (): string => {
    const prefix = shuffleArray([...HORSE_NAME_PREFIXES])[0]!
    const suffix = shuffleArray([...HORSE_NAME_SUFFIXES])[0]!
    return `${prefix} ${suffix}`
  }

  /** Creates HORSE_COUNT horses with random color and condition. */
  const generateHorses = (): Horse[] => {
    return Array.from({ length: HORSE_COUNT }, (_, i) => ({
      id: i.toString(),
      name: generateRandomHorseName(),
      color: generateRandomColor(),
      condition: Math.floor(Math.random() * 100) + 1,
    }))
  }

  /**
   * Creates race rounds from horses.
   * Each round takes a random HORSES_PER_ROUND subset
   * and uses distance defined in ROUND_DISTANCES.
   */
  const generateRounds = (horses: Horse[]): Round[] => {
    return Array.from({ length: ROUND_COUNT }, (_, i) => ({
      id: crypto.randomUUID(),
      order: i + 1,
      distance: ROUND_DISTANCES[i + 1]!,
      status: ROUND_STATUS.PENDING,
      horses: shuffleArray(horses).slice(0, HORSES_PER_ROUND),
      positions: [],
      results: [],
    }))
  }

  // -----------------------------------------------------------------------------
  // Program Controls
  // -----------------------------------------------------------------------------

  /** Generates a new race program and overwrites current state. */
  const generate = (): void => {
    horses.value = generateHorses()
    rounds.value = generateRounds(horses.value)
  }

  return {
    horses,
    rounds,
    generate,
  }
}
