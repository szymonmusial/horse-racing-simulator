<template>
  <button
    type="button"
    class="inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
    :class="[sizeClass, variantClass]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot>
      {{ text }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type ButtonVariant = 'primary' | 'success' | 'secondary' | 'outline' | 'light'
export type ButtonSize = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    disabled?: boolean
    text?: string
  }>(),
  {
    variant: 'secondary',
    size: 'md',
    disabled: false,
  },
)

defineEmits<{ click: [] }>()

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-slate-700 text-white hover:bg-slate-600',
  success: 'bg-emerald-600 text-white hover:bg-emerald-500',
  secondary: 'bg-stone-600 text-stone-100 hover:bg-stone-500',
  outline: 'border border-white bg-transparent text-white hover:bg-white/10',
  light: 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200',
}

const sizeClass = computed(() => SIZE_CLASSES[props.size])
const variantClass = computed(() => VARIANT_CLASSES[props.variant])
</script>
