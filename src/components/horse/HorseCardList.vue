<template>
  <ul data-test="horse-card-list" class="flex flex-col gap-2 p-3 list-none m-0" role="list">
    <HorseCard v-for="horse in horses" :key="horse.id" :horse="horse" />
  </ul>
</template>

<script setup lang="ts">
import type { Horse } from '@/types/horse'
import HorseCard from '@/components/horse/HorseCard.vue'

defineProps<{
  horses: Horse[]
}>()
</script>
