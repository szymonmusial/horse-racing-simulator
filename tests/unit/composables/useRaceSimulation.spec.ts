import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useRaceSimulation } from '@/composables/useRaceSimulation'
import { NEXT_ROUND_DELAY_MS } from '@/constants/simulation'
import { ROUND_STATUS, type Round } from '@/types/round'
import type { Horse } from '@/types/horse'
import * as animationLoopModule from '@/composables/useAnimationLoop'

const horsesFixture: Horse[] = [
  { id: 'h-1', name: 'Silver Arrow', color: '#111111', condition: 90 },
  { id: 'h-2', name: 'Golden Bolt', color: '#222222', condition: 88 },
]

const createRound = (order: number): Round => ({
  id: `r-${order}`,
  order,
  distance: 1200 + (order - 1) * 200,
  status: ROUND_STATUS.PENDING,
  horses: horsesFixture,
  positions: [],
  results: [],
})

describe('useRaceSimulation', () => {
  let tick: ((elapsedMs: number) => boolean) | null = null
  const startSpy = vi.fn((callback: (elapsedMs: number) => boolean) => {
    tick = callback
  })
  const pauseSpy = vi.fn()
  const resumeSpy = vi.fn()
  const stopSpy = vi.fn()

  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    tick = null
    startSpy.mockClear()
    pauseSpy.mockClear()
    resumeSpy.mockClear()
    stopSpy.mockClear()
    vi.spyOn(animationLoopModule, 'useAnimationLoop').mockReturnValue({
      start: startSpy,
      pause: pauseSpy,
      resume: resumeSpy,
      stop: stopSpy,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  const mountWithRounds = (initialRounds: Round[]) => {
    const rounds = ref<Round[]>(initialRounds)
    const Harness = defineComponent({
      template: '<div />',
      setup: () => useRaceSimulation(rounds),
    })
    const wrapper = mount(Harness)
    return {
      wrapper,
      rounds,
      simulation: wrapper.vm as unknown as ReturnType<typeof useRaceSimulation>,
    }
  }

  it('should start next pending round and initialize positions', () => {
    const { rounds, simulation } = mountWithRounds([createRound(1)])

    simulation.start()

    expect(rounds.value[0]!.status).toBe(ROUND_STATUS.IN_PROGRESS)
    expect(rounds.value[0]!.positions).toHaveLength(horsesFixture.length)
    expect(startSpy).toHaveBeenCalledTimes(1)
  })

  it('should finalize current round and schedule next round start', async () => {
    const { rounds, simulation } = mountWithRounds([createRound(1), createRound(2)])

    simulation.start()
    const shouldStop = tick!(60_000)

    expect(shouldStop).toBe(true)
    expect(rounds.value[0]!.status).toBe(ROUND_STATUS.FINISHED)
    expect(rounds.value[0]!.results).toHaveLength(horsesFixture.length)

    await vi.advanceTimersByTimeAsync(NEXT_ROUND_DELAY_MS)

    expect(rounds.value[1]!.status).toBe(ROUND_STATUS.IN_PROGRESS)
    expect(startSpy).toHaveBeenCalledTimes(2)
  })

  it('should clear scheduled transition when paused after round finish', async () => {
    const { rounds, simulation } = mountWithRounds([createRound(1), createRound(2)])

    simulation.start()
    tick!(60_000)
    simulation.pause()
    await vi.advanceTimersByTimeAsync(NEXT_ROUND_DELAY_MS)

    expect(pauseSpy).toHaveBeenCalledTimes(1)
    expect(rounds.value[1]!.status).toBe(ROUND_STATUS.PENDING)
  })

  it('should expose canStart true when paused and canPause false after pause', () => {
    const { simulation } = mountWithRounds([createRound(1)])

    simulation.start()
    simulation.pause()

    expect(simulation.canStart).toBe(true)
    expect(simulation.canPause).toBe(false)
  })
})
