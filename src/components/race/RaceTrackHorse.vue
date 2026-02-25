<template>
  <div
    class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-100 ease-linear"
    :style="horseStyle"
  >
    <HorseBadge :color="horse.color" :size="48" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Horse } from '@/types/horse'
import type { HorseRoundPosition } from '@/types/round'
import HorseBadge from '@/components/horse/HorseBadge.vue'

const props = defineProps<{
  horse: Horse
  position: HorseRoundPosition
}>()

const horseStyle = computed(() => ({ left: `${props.position.progress}%` }))
</script>
