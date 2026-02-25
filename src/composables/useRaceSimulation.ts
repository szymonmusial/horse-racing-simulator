import { computed, onUnmounted, ref, type Ref } from 'vue'
import { ROUND_STATUS, type Round } from '@/types/round'
import { useAnimationLoop } from '@/composables/useAnimationLoop'
import { BASE_SPEED, NEXT_ROUND_DELAY_MS } from '@/constants/race'

/**
 * Runtime simulation metadata for a horse in the active round.
 */
type HorseSimState = {
  horseId: string
  finishTimeMs: number
}

type RoundResult = {
  horseId: string
  timeMs: number
}

/**
 * Controls race progression and animation lifecycle for a list of rounds.
 *
 * @param rounds Reactive collection of rounds to simulate.
 * @returns Public state and controls for race playback.
 */
export const useRaceSimulation = (rounds: Ref<Round[]>) => {
  const isPaused = ref(false)
  const loop = useAnimationLoop()

  // -----------------------------------------------------------------------------
  // Internal Simulation State
  // -----------------------------------------------------------------------------
  let transitionTimeoutId: ReturnType<typeof setTimeout> | null = null
  let finishedHorseIds = new Set<string>()
  let positionMap = new Map<string, Round['positions'][number]>()

  const horseStates = ref<HorseSimState[]>([])
  const roundResults = ref<RoundResult[]>([])

  // -----------------------------------------------------------------------------
  // Derived State
  // -----------------------------------------------------------------------------
  const currentRound = computed(() => rounds.value.find((r) => r.status === ROUND_STATUS.IN_PROGRESS))

  const nextPendingRound = computed(() => rounds.value.find((r) => r.status === ROUND_STATUS.PENDING))

  const lastFinishedRound = computed(() => {
    const finished = rounds.value.filter((r) => r.status === ROUND_STATUS.FINISHED)
    return finished.length > 0 ? finished[finished.length - 1] : null
  })

  const displayRound = computed(() => currentRound.value ?? lastFinishedRound.value)

  const canStart = computed(() => {
    if (isPaused.value) return true
    if (currentRound.value) return false
    return nextPendingRound.value !== undefined
  })

  const canPause = computed(() => currentRound.value !== undefined && !isPaused.value)

  // -----------------------------------------------------------------------------
  // Simulation Helpers
  // -----------------------------------------------------------------------------

  /**
   * Estimates horse finish time in milliseconds from condition and round distance.
   */
  const calculateFinishTime = (condition: number, distance: number): number => {
    const conditionFactor = 0.8 + (condition / 100) * 0.4
    const randomFactor = 0.9 + Math.random() * 0.2
    return (distance / (BASE_SPEED * conditionFactor * randomFactor)) * 1000
  }

  const clearTransition = () => {
    if (transitionTimeoutId) {
      clearTimeout(transitionTimeoutId)
      transitionTimeoutId = null
    }
  }

  // -----------------------------------------------------------------------------
  // Round Lifecycle
  // -----------------------------------------------------------------------------

  const startNextRound = () => {
    const round = nextPendingRound.value
    if (!round || currentRound.value) return

    round.status = ROUND_STATUS.IN_PROGRESS

    horseStates.value = round.horses.map((horse) => ({
      horseId: horse.id,
      finishTimeMs: calculateFinishTime(horse.condition, round.distance),
    }))

    round.positions = round.horses.map((horse) => ({
      horseId: horse.id,
      progress: 0,
      placement: 0,
    }))

    // Keep O(1) position lookup during each animation tick.
    positionMap = new Map(round.positions.map((p) => [p.horseId, p]))

    finishedHorseIds = new Set()
    roundResults.value = []
    isPaused.value = false

    loop.start(simulateTick)
  }

  const simulateTick = (elapsed: number): boolean => {
    const round = currentRound.value
    if (!round) return true

    let allFinished = true

    for (const state of horseStates.value) {
      const progress = Math.min((elapsed / state.finishTimeMs) * 100, 100)

      const pos = positionMap.get(state.horseId)
      if (pos) pos.progress = progress

      if (progress >= 100 && !finishedHorseIds.has(state.horseId)) {
        finishedHorseIds.add(state.horseId)
        roundResults.value.push({
          horseId: state.horseId,
          timeMs: state.finishTimeMs,
        })
      }

      if (progress < 100) allFinished = false
    }

    updatePlacements(round)

    if (allFinished) {
      finalizeRound(round)
      return true
    }

    return false
  }

  const updatePlacements = (round: Round) => {
    const sorted = [...round.positions].sort((a, b) => b.progress - a.progress)
    sorted.forEach((pos, i) => {
      pos.placement = i + 1
    })
  }

  const finalizeRound = (round: Round) => {
    roundResults.value.sort((a, b) => a.timeMs - b.timeMs)

    round.results = roundResults.value.map((r, i) => ({
      horseId: r.horseId,
      placement: i + 1,
      timeMs: Math.round(r.timeMs),
    }))

    for (const result of round.results) {
      const pos = positionMap.get(result.horseId)
      if (pos) pos.placement = result.placement
    }

    round.status = ROUND_STATUS.FINISHED

    if (nextPendingRound.value) {
      transitionTimeoutId = setTimeout(() => {
        transitionTimeoutId = null
        startNextRound()
      }, NEXT_ROUND_DELAY_MS)
    }
  }

  // -----------------------------------------------------------------------------
  // Simulation Controls
  // -----------------------------------------------------------------------------

  /**
   * Starts simulation or resumes it if currently paused.
   */
  const start = () => {
    if (isPaused.value) {
      isPaused.value = false
      if (currentRound.value) return loop.resume()
      if (nextPendingRound.value) return startNextRound()
    }

    clearTransition()
    startNextRound()
  }

  /**
   * Pauses active animation loop and queued round transition.
   */
  const pause = () => {
    loop.pause()
    clearTransition()
    isPaused.value = true
  }

  /**
   * Stops the animation loop and clears all scheduled transitions.
   */
  const stop = () => {
    loop.stop()
    clearTransition()
    isPaused.value = false
  }

  onUnmounted(stop)

  return {
    displayRound,
    canStart,
    canPause,
    start,
    pause,
    stop,
  }
}
