<template>
  <div class="flex h-full flex-col gap-3 p-3">
    <header class="flex items-baseline justify-between py-2">
      <h2 class="text-base font-semibold text-slate-800">Round {{ round.order }}</h2>
      <span class="text-sm text-slate-600">{{ round.distance }} m</span>
    </header>

    <RaceTrack v-for="entry in racePositions" :key="entry.horse.id" :horse="entry.horse" :position="entry.track" />
  </div>
</template>

<script setup lang="ts">
import type { Round } from '@/types/round'
import type { RacePosition } from '@/types/race'
import RaceTrack from '@/components/race/RaceTrack.vue'

defineProps<{ round: Round; racePositions: RacePosition[] }>()
</script>
