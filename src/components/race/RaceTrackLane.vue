<template>
  <div class="relative h-12 overflow-hidden rounded-md border border-stone-200 bg-emerald-50/30">
    <RaceFinishLine />
    <div class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-stone-300/50" />
    <RaceTrackHorse :horse="horse" :position="position" />
  </div>
</template>

<script setup lang="ts">
import type { Horse } from '@/types/horse'
import type { HorseRoundPosition } from '@/types/round'
import RaceFinishLine from '@/components/race/RaceFinishLine.vue'
import RaceTrackHorse from '@/components/race/RaceTrackHorse.vue'

defineProps<{ horse: Horse; position: HorseRoundPosition }>()
</script>
