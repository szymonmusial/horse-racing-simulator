<template>
  <BaseCard no-accent>
    <div class="flex flex-col gap-3">
      <header class="flex items-start justify-between">
        <div>
          <h3 class="text-base font-semibold text-slate-800">Round {{ round.order }}</h3>
          <p class="text-sm text-slate-500">{{ round.distance }} m</p>
        </div>

        <RoundStatusBadge :status="round.status" size="sm" />
      </header>

      <div class="grid grid-cols-2 gap-2">
        <div v-for="horse in round.horses" :key="horse.id">
          <HorseIdentity :horse="horse" class="text-sm" />
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import type { Round } from '@/types/round'
import BaseCard from '@/components/base/card/BaseCard.vue'
import RoundStatusBadge from '@/components/round/RoundStatusBadge.vue'
import HorseIdentity from '@/components/horse/HorseIdentity.vue'

defineProps<{ round: Round }>()
</script>
