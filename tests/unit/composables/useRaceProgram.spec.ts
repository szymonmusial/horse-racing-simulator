import { afterEach, describe, expect, it, vi } from 'vitest'
import { useRaceProgram } from '@/composables/useRaceProgram'
import {
  HORSE_COUNT,
  HORSES_PER_ROUND,
  ROUND_COUNT,
  ROUND_DISTANCES,
  HORSE_NAME_PREFIXES,
  HORSE_NAME_SUFFIXES,
} from '@/constants/race'
import { ROUND_STATUS } from '@/types/round'

describe('useRaceProgram', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should generate horses and rounds with expected counts', () => {
    const { horses, rounds, generate } = useRaceProgram()

    generate()

    expect(horses.value).toHaveLength(HORSE_COUNT)
    expect(rounds.value).toHaveLength(ROUND_COUNT)
  })

  it('should generate rounds with pending status and configured distances', () => {
    const { rounds, generate } = useRaceProgram()

    generate()

    rounds.value.forEach((round) => {
      expect(round.status).toBe(ROUND_STATUS.PENDING)
      expect(round.distance).toBe(ROUND_DISTANCES[round.order]!)
    })
  })

  it('should assign fixed number of horses per round', () => {
    const { rounds, generate } = useRaceProgram()

    generate()

    rounds.value.forEach((round) => {
      expect(round.horses).toHaveLength(HORSES_PER_ROUND)
    })
  })

  it('should generate horse names from configured dictionary', () => {
    const { horses, generate } = useRaceProgram()

    generate()

    horses.value.forEach((horse) => {
      const [prefix, suffix] = horse.name.split(' ')
      expect(HORSE_NAME_PREFIXES).toContain(prefix as (typeof HORSE_NAME_PREFIXES)[number])
      expect(HORSE_NAME_SUFFIXES).toContain(suffix as (typeof HORSE_NAME_SUFFIXES)[number])
    })
  })

  it('should generate new round ids with crypto.randomUUID', () => {
    const uuidSpy = vi.spyOn(crypto, 'randomUUID')
    const { generate } = useRaceProgram()

    generate()

    expect(uuidSpy).toHaveBeenCalledTimes(ROUND_COUNT)
  })
})
