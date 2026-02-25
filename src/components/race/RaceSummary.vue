<template>
  <div v-if="finishedRounds.length > 0" class="flex flex-col gap-3 p-3">
    <RoundSummary v-for="summary in finishedRounds" :key="summary.round.order" :round-summary="summary" />
  </div>
  <div v-else class="p-4 text-center text-stone-500">No round results</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RoundStatus, type RoundSummary as RoundSummaryType } from '@/types/round'
import RoundSummary from '@/components/round/RoundSummary.vue'

const props = defineProps<{ roundSummaries: RoundSummaryType[] }>()
const finishedRounds = computed(() => props.roundSummaries.filter(({ round }) => round.status === RoundStatus.FINISHED))
</script>
