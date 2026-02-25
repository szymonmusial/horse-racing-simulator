<template>
  <div class="flex min-w-0 flex-1 items-center gap-2">
    <div class="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-stone-200">
      <div class="h-full rounded-full transition-all duration-500 ease-out" :class="color" :style="{ width }" />
    </div>
    <span class="shrink-0 text-xs font-medium text-stone-600">
      {{ roundedValue }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(defineProps<{ value: number; max?: number }>(), { max: 100 })

const percentage = computed(() => {
  const percentage = (props.value / props.max) * 100
  const clamp = Math.min(Math.max(percentage, 0), 100)
  return clamp
})

const color = computed(() => {
  if (percentage.value >= 75) return 'bg-emerald-500'
  if (percentage.value >= 50) return 'bg-amber-500'
  if (percentage.value >= 25) return 'bg-orange-500'
  return 'bg-red-500'
})

const roundedValue = computed(() => `${Math.round(percentage.value)}%`)
const width = computed(() => `${percentage.value}%`)
</script>
