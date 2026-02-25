<template>
  <RoundCard data-test="round-summary" :round="round">
    <div v-if="round.results.length > 0" class="flex flex-col gap-2">
      <RoundResult
        v-for="result in round.results"
        :key="result.horseId"
        :result="result"
        :horse="getHorse(result.horseId)"
      />
    </div>
    <p v-else class="py-2 text-center text-sm text-stone-500">No results</p>
  </RoundCard>
</template>

<script setup lang="ts">
import type { Horse } from '@/types/horse'
import type { Round } from '@/types/round'
import RoundCard from '@/components/round/RoundCard.vue'
import RoundResult from '@/components/round/RoundResult.vue'

const props = defineProps<{ round: Round }>()
const getHorse = (horseId: Horse['id']) => props.round.horses.find((h) => h.id === horseId)!
</script>
