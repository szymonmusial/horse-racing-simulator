<template>
  <div
    class="rounded-lg border border-stone-200 bg-white px-4 py-2 shadow-sm transition hover:border-slate-500 hover:shadow-md"
    :class="{ 'border-l-4': accentColor }"
    :style="style"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ accentColor?: string }>()
const style = computed(() => (props.accentColor ? { borderLeftColor: props.accentColor } : {}))
</script>
