<template>
  <BaseCard :accent-color="getPodiumAccent(result.placement)" class="flex items-center gap-4">
    <span
      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
      :class="getPlacementClass(result.placement)"
    >
      {{ result.placement }}
    </span>
    <HorseIdentity :horse="horse" class="min-w-0 flex-1 text-sm" />
    <span class="shrink-0 font-mono text-sm tabular-nums text-stone-600">{{ formatTime(result.timeMs) }}</span>
  </BaseCard>
</template>

<script setup lang="ts">
import type { Horse } from '@/types/horse'
import type { HorseRoundResult } from '@/types/round'
import { formatTime } from '@/utils/time'
import BaseCard from '@/components/base/card/BaseCard.vue'
import HorseIdentity from '@/components/horse/HorseIdentity.vue'

defineProps<{ result: HorseRoundResult; horse: Horse }>()

const PODIUM: Record<number, { accent: string; class: string }> = {
  1: { accent: '#D4AF37', class: 'bg-amber-100 text-amber-800' },
  2: { accent: '#C0C0C0', class: 'bg-slate-200 text-slate-700' },
  3: { accent: '#CD7F32', class: 'bg-amber-200 text-amber-900' },
}

const DEFAULT_PLACEMENT_CLASS = 'bg-stone-100 text-stone-600'

const getPodiumAccent = (placement: number): string | undefined => PODIUM[placement]?.accent
const getPlacementClass = (placement: number): string => PODIUM[placement]?.class ?? DEFAULT_PLACEMENT_CLASS
</script>
