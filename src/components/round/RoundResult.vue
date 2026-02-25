<template>
  <RoundCard :round="roundResults.round">
    <div v-if="roundResults.results.length > 0" class="flex flex-col gap-2">
      <RoundResultPosition v-for="result in roundResults.results" :key="result.horse.id" :result="result" />
    </div>
    <p v-else class="py-2 text-center text-sm text-stone-500">No results</p>
  </RoundCard>
</template>

<script setup lang="ts">
import type { RoundResults } from '@/types/round'
import RoundCard from '@/components/round/RoundCard.vue'
import RoundResultPosition from '@/components/round/RoundResultPosition.vue'

defineProps<{ roundResults: RoundResults }>()
</script>
