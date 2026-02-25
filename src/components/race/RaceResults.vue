<template>
  <div v-if="results.length > 0" class="flex flex-col gap-3 p-3">
    <RoundResult v-for="result in results" :key="result.round.order" :round-results="result" />
  </div>
  <div v-else class="p-4 text-center text-stone-500">No round results</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RoundStatus, type RoundResults } from '@/types/round'
import RoundResult from '@/components/round/RoundResult.vue'

const props = defineProps<{ roundsResults: RoundResults[] }>()
const results = computed(() => props.roundsResults.filter(({ round }) => round.status === RoundStatus.FINISHED))
</script>
