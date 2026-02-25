<template>
  <div class="h-full p-4 flex flex-row gap-4">
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
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import type { Horse } from '@/types/horse'
import type { Round, RoundResult, RoundSummary } from '@/types/round'
import { RoundStatus } from '@/types/round'
import type { RacePosition } from '@/types/race'
import { ROUND_DISTANCES } from '@/constants/race'
import HorseCardList from '@/components/horse/HorseCardList.vue'
import BasePanel from '@/components/base/panel/BasePanel.vue'
import RaceProgram from '@/components/race/RaceProgram.vue'
import RaceSummary from '@/components/race/RaceSummary.vue'
import RacePreview from '@/components/race/RacePreview.vue'

const horses: Horse[] = [
  { id: 1, name: 'Lightning', color: '#8B4513', condition: 25 },
  { id: 2, name: 'Gale', color: '#2F4F4F', condition: 78 },
  { id: 3, name: 'Dawn', color: '#CD853F', condition: 92 },
  { id: 4, name: 'Thunder', color: '#4A4A4A', condition: 45 },
  { id: 5, name: 'Charge', color: '#8B0000', condition: 88 },
  { id: 6, name: 'Hurricane', color: '#2E8B57', condition: 61 },
  { id: 7, name: 'Starlight', color: '#DAA520', condition: 33 },
  { id: 8, name: 'Swift', color: '#A0522D', condition: 71 },
  { id: 9, name: 'Daybreak', color: '#DEB887', condition: 54 },
  { id: 10, name: 'Storm', color: '#1C1C1C', condition: 19 },
  { id: 11, name: 'Steed', color: '#8B4513', condition: 95 },
  { id: 12, name: 'Thunderbolt', color: '#696969', condition: 42 },
  { id: 13, name: 'Zephyr', color: '#D2B48C', condition: 67 },
  { id: 14, name: 'Falcon', color: '#654321', condition: 81 },
  { id: 15, name: 'Coot', color: '#2F2F2F', condition: 29 },
  { id: 16, name: 'Arrow', color: '#8B7355', condition: 76 },
  { id: 17, name: 'North Wind', color: '#5C4033', condition: 58 },
  { id: 18, name: 'Flash', color: '#C0C0C0', condition: 91 },
  { id: 19, name: 'Stallion', color: '#6B4423', condition: 37 },
  { id: 20, name: 'Wanderer', color: '#3D2817', condition: 63 },
].sort((a, b) => b.condition - a.condition)

const rounds: Round[] = [
  {
    order: 1,
    distance: ROUND_DISTANCES[1]!,
    horses: horses.slice(0, 10),
    status: RoundStatus.FINISHED,
  },
  {
    order: 2,
    distance: ROUND_DISTANCES[2]!,
    horses: horses.slice(5, 15),
    status: RoundStatus.IN_PROGRESS,
  },
  {
    order: 3,
    distance: ROUND_DISTANCES[3]!,
    horses: horses.slice(10, 20),
    status: RoundStatus.PENDING,
  },
  {
    order: 4,
    distance: ROUND_DISTANCES[4]!,
    horses: horses.slice(0, 10),
    status: RoundStatus.PENDING,
  },
  {
    order: 5,
    distance: ROUND_DISTANCES[5]!,
    horses: horses.slice(2, 12),
    status: RoundStatus.PENDING,
  },
  {
    order: 6,
    distance: ROUND_DISTANCES[6]!,
    horses: horses.slice(4, 14),
    status: RoundStatus.PENDING,
  },
]

const buildResultsForRound = (round: Round): RoundResult[] => {
  if (round.status !== RoundStatus.FINISHED) return []
  const withTime = round.horses.slice(0, 8).map((horse, index) => ({
    horse,
    timeMs: (125.5 + index * 2.3 + (index % 3) * 0.8) * 1000,
  }))
  withTime.sort((a, b) => a.timeMs - b.timeMs)
  return withTime.map((r, i) => ({ ...r, placement: i + 1 }))
}

const roundSummaries: RoundSummary[] = rounds.map((round) => ({
  round,
  results: buildResultsForRound(round),
}))

const currentRound = computed<Round | null>(
  () => rounds.find((round) => round.status === RoundStatus.IN_PROGRESS) ?? null,
)

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
}

const animate = (timestamp: number): void => {
  if (!lastTimestamp) lastTimestamp = timestamp
  const deltaTime = (timestamp - lastTimestamp) / 1000

  updateRacePositions(deltaTime)

  if (!isRaceFinished()) {
    animationFrameId = requestAnimationFrame(animate)
  } else {
    stopAnimation()
  }

  lastTimestamp = timestamp
}

const startRace = (): void => {
  const round = currentRound.value
  if (!round) {
    racePositions.value = []
    return
  }

  stopAnimation()
  initializeRace(round)
  lastTimestamp = 0
  animationFrameId = requestAnimationFrame(animate)
}

watch(
  () => currentRound.value?.order,
  () => {
    startRace()
  },
  { immediate: true },
)

onMounted(() => {
  startRace()
})

onUnmounted(() => {
  stopAnimation()
})
</script>
