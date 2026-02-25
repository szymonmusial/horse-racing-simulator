<template>
  <div v-if="rounds.length > 0" class="flex flex-col gap-3 p-3">
    <RoundProgram v-for="round in rounds" :key="round.order" :round="round" />
  </div>
  <div v-else class="p-4 text-center text-stone-500">No rounds generated</div>
</template>

<script setup lang="ts">
import type { Round } from '@/types/round'
import RoundProgram from '@/components/round/RoundProgram.vue'

defineProps<{ rounds: Round[] }>()
</script>
