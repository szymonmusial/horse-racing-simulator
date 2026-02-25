<template>
  <div class="flex items-center gap-2">
    <HorseBadge :color="horse.color" :size="32" />
    <span class="min-w-0 flex-1 font-medium text-stone-800">
      {{ horse.name }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { Horse } from '@/types/horse'
import HorseBadge from '@/components/horse/HorseBadge.vue'

defineProps<{ horse: Horse }>()
</script>
