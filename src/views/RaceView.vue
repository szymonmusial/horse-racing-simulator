<template>
  <div class="h-full flex flex-col">
    <RaceHeader
      :can-start="canStart"
      :can-pause="canPause"
      @generate="generateProgram"
      @start="startRound"
      @pause="pauseRound"
    />

    <div class="flex-1 min-h-0 p-4 flex flex-row gap-4">
      <BasePanel class="w-1/6 flex-1 flex flex-col" title="Horse list">
        <HorseCardList :horses="horses" />
      </BasePanel>

      <div class="flex flex-col gap-4 w-3/6">
        <BasePanel class="flex-1 flex flex-col" title="Race track">
          <RacePreview v-if="currentRound" :round="currentRound" :race-positions="racePositions" />
          <div v-else class="p-4 text-center text-stone-500">No race in progress</div>
        </BasePanel>
      </div>

      <div class="flex flex-row gap-4 w-2/6">
        <BasePanel class="w-1/2 flex-1 flex flex-col" title="Race results">
          <RaceSummary :round-summaries="roundSummaries" />
        </BasePanel>

        <BasePanel class="w-1/2 flex flex-col" title="Race program">
          <RaceProgram :rounds="rounds" />
        </BasePanel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import type { Horse } from '@/types/horse'
import type { Round, RoundResult, RoundSummary } from '@/types/round'
import { RoundStatus } from '@/types/round'
import type { RacePosition } from '@/types/race'
import { ROUND_DISTANCES } from '@/constants/race'
import HorseCardList from '@/components/horse/HorseCardList.vue'
import BasePanel from '@/components/base/panel/BasePanel.vue'
import RaceHeader from '@/components/race/RaceHeader.vue'
import RaceProgram from '@/components/race/RaceProgram.vue'
import RaceSummary from '@/components/race/RaceSummary.vue'
import RacePreview from '@/components/race/RacePreview.vue'

const HORSE_NAMES = [
  'Lightning',
  'Gale',
  'Dawn',
  'Thunder',
  'Charge',
  'Hurricane',
  'Starlight',
  'Swift',
  'Daybreak',
  'Storm',
  'Steed',
  'Thunderbolt',
  'Zephyr',
  'Falcon',
  'Coot',
  'Arrow',
  'North Wind',
  'Flash',
  'Stallion',
  'Wanderer',
]

const pickRandomHorses = (horses: Horse[], count: number): Horse[] => {
  const shuffled = [...horses].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

const generateHorses = (): Horse[] => {
  return HORSE_NAMES.map((name, index) => ({
    id: index + 1,
    name,
    color: `hsl(${(index * 360) / 20}, 55%, 45%)`,
    condition: Math.floor(Math.random() * 100) + 1,
  })).sort((a, b) => b.condition - a.condition)
}

const horses = ref<Horse[]>([])
const rounds = ref<Round[]>([])
const isPaused = ref(false)

const generateProgram = (): void => {
  stopAnimation()
  const generatedHorses = generateHorses()
  horses.value = generatedHorses
  rounds.value = [1, 2, 3, 4, 5, 6].map((order) => ({
    order,
    distance: ROUND_DISTANCES[order as keyof typeof ROUND_DISTANCES]!,
    horses: pickRandomHorses(generatedHorses, 10),
    status: RoundStatus.PENDING,
  }))
  racePositions.value = []
  horseSpeeds.value = new Map()
  horseDistances.value = new Map()
  isPaused.value = false
}

const buildResultsForRound = (round: Round): RoundResult[] => {
  if (round.status !== RoundStatus.FINISHED) return []
  const withTime = round.horses.slice(0, 8).map((horse, index) => ({
    horse,
    timeMs: (125.5 + index * 2.3 + (index % 3) * 0.8) * 1000,
  }))
  withTime.sort((a, b) => a.timeMs - b.timeMs)
  return withTime.map((r, i) => ({ ...r, placement: i + 1 }))
}

const roundSummaries = computed<RoundSummary[]>(() =>
  rounds.value.map((round) => ({
    round,
    results: buildResultsForRound(round),
  })),
)

const currentRound = computed<Round | null>(
  () => rounds.value.find((round) => round.status === RoundStatus.IN_PROGRESS) ?? null,
)

const hasPendingRound = computed(() => rounds.value.some((round) => round.status === RoundStatus.PENDING))

const canStart = computed(() => rounds.value.length > 0 && (!!currentRound.value || hasPendingRound.value))

const isRaceRunning = ref(false)
const canPause = computed(() => !!currentRound.value && !isPaused.value && isRaceRunning.value)

const startRound = (): void => {
  isPaused.value = false
  if (currentRound.value) {
    startRace()
    return
  }
  const nextPending = rounds.value.find((r) => r.status === RoundStatus.PENDING)
  if (nextPending) {
    nextPending.status = RoundStatus.IN_PROGRESS
  }
}

const pauseRound = (): void => {
  isPaused.value = true
  stopAnimation()
}

const racePositions = ref<RacePosition[]>([])
const horseSpeeds = ref<Map<Horse['id'], number>>(new Map())
const horseDistances = ref<Map<Horse['id'], number>>(new Map())

let animationFrameId: number | null = null
let lastTimestamp = 0

const calculateSpeed = (horse: Horse): number => {
  const BASE_SPEED = 140
  const SPEED_VARIANCE = 80
  const randomFactor = Math.random() * 20 - 10

  return BASE_SPEED + (horse.condition / 100) * SPEED_VARIANCE + randomFactor
}

const initializeRace = (round: Round): void => {
  horseSpeeds.value = new Map(round.horses.map((horse) => [horse.id, calculateSpeed(horse)]))
  horseDistances.value = new Map(round.horses.map((horse) => [horse.id, 0]))
  racePositions.value = round.horses.map((horse) => ({
    horse,
    track: { progress: 0, placement: 0 },
  }))
}

const isRaceFinished = (): boolean => racePositions.value.every((entry) => entry.track.progress >= 100)

const updateRacePositions = (deltaTime: number): void => {
  const round = currentRound.value
  if (!round) return

  round.horses.forEach((horse) => {
    const speed = horseSpeeds.value.get(horse.id) ?? 0
    const currentDistance = horseDistances.value.get(horse.id) ?? 0
    const newDistance = Math.min(currentDistance + speed * deltaTime, round.distance)
    horseDistances.value.set(horse.id, newDistance)
  })

  const entries: RacePosition[] = round.horses.map((horse) => {
    const distance = horseDistances.value.get(horse.id) ?? 0
    return {
      horse,
      track: { progress: (distance / round.distance) * 100, placement: 0 },
    }
  })

  const ranked = [...entries].sort((a, b) => b.track.progress - a.track.progress)
  ranked.forEach((entry, index) => {
    entry.track.placement = index + 1
  })

  racePositions.value = entries
}

const stopAnimation = (): void => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  isRaceRunning.value = false
}

const animate = (timestamp: number): void => {
  if (!lastTimestamp) lastTimestamp = timestamp
  const deltaTime = (timestamp - lastTimestamp) / 1000

  updateRacePositions(deltaTime)

  if (!isRaceFinished()) {
    animationFrameId = requestAnimationFrame(animate)
  } else {
    const round = currentRound.value
    if (round) {
      round.status = RoundStatus.FINISHED
      if (!isPaused.value) {
        const nextPending = rounds.value.find((r) => r.status === RoundStatus.PENDING)
        if (nextPending) nextPending.status = RoundStatus.IN_PROGRESS
      }
    }
    stopAnimation()
  }

  lastTimestamp = timestamp
}

const startRace = (): void => {
  const round = currentRound.value
  if (!round || isPaused.value) {
    if (!round) racePositions.value = []
    return
  }

  stopAnimation()

  const hasExistingPositions =
    round.horses.every((h) => horseDistances.value.has(h.id)) &&
    racePositions.value.length === round.horses.length
  if (!hasExistingPositions) {
    initializeRace(round)
  }

  lastTimestamp = 0
  isRaceRunning.value = true
  animationFrameId = requestAnimationFrame(animate)
}

watch(
  () => currentRound.value?.order,
  () => {
    if (!isPaused.value) startRace()
  },
  { immediate: false },
)

onUnmounted(() => {
  stopAnimation()
})
</script>
