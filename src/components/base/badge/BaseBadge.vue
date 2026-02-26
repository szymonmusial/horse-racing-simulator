<template>
  <span
    data-test="base-badge"
    class="inline-flex items-center justify-center rounded-full font-medium"
    :class="[size, variant]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger'
export type BadgeSize = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    variant?: BadgeVariant
    size?: BadgeSize
  }>(),
  {
    variant: 'default',
    size: 'md',
  },
)

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-3 py-2 text-sm',
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'bg-stone-200 text-stone-700',
  primary: 'bg-blue-100 text-blue-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  danger: 'bg-red-100 text-red-700',
}

const size = computed(() => SIZE_CLASSES[props.size])
const variant = computed(() => VARIANT_CLASSES[props.variant])
</script>
