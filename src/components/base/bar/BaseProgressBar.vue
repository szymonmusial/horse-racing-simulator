<template>
  <div class="flex min-w-0 flex-1 items-center gap-2">
    <div class="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-stone-200">
      <div class="h-full rounded-full transition-all duration-500 ease-out" :class="color" :style="{ width }" />
    </div>

    <span class="shrink-0 text-xs font-medium text-stone-600">
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ value: number; max?: number }>(), { max: 100 })

const COLOR_STEPS = [
  { min: 75, class: 'bg-emerald-500' },
  { min: 50, class: 'bg-amber-500' },
  { min: 25, class: 'bg-orange-500' },
  { min: 0, class: 'bg-red-500' },
]

const percentage = computed(() => {
  const raw = (props.value / props.max) * 100
  return Math.min(Math.max(raw, 0), 100)
})

const color = computed(() => COLOR_STEPS.find((step) => percentage.value >= step.min)!.class)
const width = computed(() => `${percentage.value}%`)
const label = computed(() => `${Math.round(percentage.value)}%`)
</script>
