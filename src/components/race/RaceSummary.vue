<template>
  <div v-if="finishedRounds.length > 0" class="flex flex-col gap-3 p-3">
    <RoundSummary v-for="round in finishedRounds" :key="round.order" :round="round" :results="round.results" />
  </div>
  <div v-else class="p-4 text-center text-stone-500">No round results</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RoundStatus, type Round } from '@/types/round'
import RoundSummary from '@/components/round/RoundSummary.vue'

const props = defineProps<{ rounds: Round[] }>()
const finishedRounds = computed(() => props.rounds.filter((round) => round.status === RoundStatus.FINISHED))
</script>
