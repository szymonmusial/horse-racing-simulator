<template>
  <article class="rounded-lg border border-stone-200 bg-white p-3">
    <div class="mb-2 flex items-center justify-between gap-2">
      <span class="min-w-0 truncate text-sm font-medium text-stone-800">
        {{ horse.name }}
      </span>
      <div class="flex shrink-0 items-center gap-2 text-xs text-stone-500">
        <span v-if="position.placement" class="rounded bg-stone-100 px-2 py-0.5 font-semibold text-stone-700">
          #{{ position.placement }}
        </span>
      </div>
    </div>

    <RaceTrackLane :horse="horse" :position="position" />
  </article>
</template>

<script setup lang="ts">
import type { Horse } from '@/types/horse'
import type { HorseRoundPosition } from '@/types/round'
import RaceTrackLane from '@/components/race/RaceTrackLane.vue'

defineProps<{ horse: Horse; position: HorseRoundPosition }>()
</script>
