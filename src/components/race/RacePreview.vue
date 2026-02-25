<template>
  <div data-test="race-preview" class="flex h-full flex-col gap-3 p-3">
    <header class="flex items-baseline justify-between py-2">
      <h2 class="text-base font-semibold text-slate-800">Round {{ round.order }}</h2>
      <span class="text-sm text-slate-600">{{ round.distance }} m</span>
    </header>

    <RaceTrack
      v-for="position in round.positions"
      :key="`${round.id}-${position.horseId}`"
      :horse="getHorse(position.horseId)"
      :position="position"
    />
  </div>
</template>

<script setup lang="ts">
import type { Horse } from '@/types/horse'
import type { Round } from '@/types/round'
import RaceTrack from '@/components/race/RaceTrack.vue'

const props = defineProps<{ round: Round }>()
const getHorse = (horseId: Horse['id']) => props.round.horses.find((horse) => horse.id === horseId)!
</script>
