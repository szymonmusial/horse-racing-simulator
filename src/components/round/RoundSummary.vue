<template>
  <RoundCard :round="roundSummary.round">
    <div v-if="roundSummary.results.length > 0" class="flex flex-col gap-2">
      <RoundResult v-for="result in roundSummary.results" :key="result.horse.id" :result="result" />
    </div>
    <p v-else class="py-2 text-center text-sm text-stone-500">No results</p>
  </RoundCard>
</template>

<script setup lang="ts">
import type { RoundSummary } from '@/types/round'
import RoundCard from '@/components/round/RoundCard.vue'
import RoundResult from '@/components/round/RoundResult.vue'

defineProps<{ roundSummary: RoundSummary }>()
</script>
