<template>
  <RoundCard :round="round">
    <div class="grid grid-cols-2 gap-2">
      <HorseIdentity v-for="horse in round.horses" :key="horse.id" :horse="horse" class="text-sm" />
    </div>
  </RoundCard>
</template>

<script setup lang="ts">
import type { Round } from '@/types/round'
import RoundCard from '@/components/round/RoundCard.vue'
import HorseIdentity from '@/components/horse/HorseIdentity.vue'

defineProps<{ round: Round }>()
</script>
