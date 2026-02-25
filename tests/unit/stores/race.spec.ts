import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed, ref } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { useRaceStore } from '@/stores/race'
import { ROUND_STATUS, type Round } from '@/types/round'
import type { Horse } from '@/types/horse'
import * as raceProgramModule from '@/composables/useRaceProgram'
import * as raceSimulationModule from '@/composables/useRaceSimulation'

const horsesFixture: Horse[] = [
  { id: 'h-1', name: 'Silver Arrow', color: '#111111', condition: 90 },
]

const roundsFixture: Round[] = [
  {
    id: 'r-1',
    order: 1,
    distance: 1200,
    status: ROUND_STATUS.PENDING,
    horses: horsesFixture,
    positions: [],
    results: [],
  },
]

describe('useRaceStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.restoreAllMocks()
  })

  it('should expose horses and rounds from race program', () => {
    const horses = ref([...horsesFixture])
    const rounds = ref([...roundsFixture])

    vi.spyOn(raceProgramModule, 'useRaceProgram').mockReturnValue({
      horses,
      rounds,
      generate: vi.fn(),
    })
    vi.spyOn(raceSimulationModule, 'useRaceSimulation').mockReturnValue({
      displayRound: computed(() => null),
      canStart: computed(() => true),
      canPause: computed(() => false),
      start: vi.fn(),
      pause: vi.fn(),
      stop: vi.fn(),
    })

    const store = useRaceStore()

    expect(store.horses).toEqual(horsesFixture)
    expect(store.rounds).toEqual(roundsFixture)
  })

  it('should delegate start pause and stop to race simulation', () => {
    const startSpy = vi.fn()
    const pauseSpy = vi.fn()
    const stopSpy = vi.fn()

    vi.spyOn(raceProgramModule, 'useRaceProgram').mockReturnValue({
      horses: ref([...horsesFixture]),
      rounds: ref([...roundsFixture]),
      generate: vi.fn(),
    })
    vi.spyOn(raceSimulationModule, 'useRaceSimulation').mockReturnValue({
      displayRound: computed(() => null),
      canStart: computed(() => true),
      canPause: computed(() => false),
      start: startSpy,
      pause: pauseSpy,
      stop: stopSpy,
    })

    const store = useRaceStore()
    store.start()
    store.pause()
    store.stop()

    expect(startSpy).toHaveBeenCalledTimes(1)
    expect(pauseSpy).toHaveBeenCalledTimes(1)
    expect(stopSpy).toHaveBeenCalledTimes(1)
  })

  it('should stop simulation before generating new race program', () => {
    const stopSpy = vi.fn()
    const generateSpy = vi.fn()

    vi.spyOn(raceProgramModule, 'useRaceProgram').mockReturnValue({
      horses: ref([...horsesFixture]),
      rounds: ref([...roundsFixture]),
      generate: generateSpy,
    })
    vi.spyOn(raceSimulationModule, 'useRaceSimulation').mockReturnValue({
      displayRound: computed(() => null),
      canStart: computed(() => true),
      canPause: computed(() => false),
      start: vi.fn(),
      pause: vi.fn(),
      stop: stopSpy,
    })

    const store = useRaceStore()
    store.generateProgram()

    expect(stopSpy).toHaveBeenCalledTimes(1)
    expect(generateSpy).toHaveBeenCalledTimes(1)
    expect(stopSpy.mock.invocationCallOrder[0]).toBeLessThan(generateSpy.mock.invocationCallOrder[0]!)
  })
})
