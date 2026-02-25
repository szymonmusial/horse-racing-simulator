<template>
  <BaseCard :accent-color="getPodiumAccent(result.position)" class="flex items-center gap-4">
    <span
      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
      :class="getPositionClass(result.position)"
    >
      {{ result.position }}
    </span>
    <HorseIdentity :horse="result.horse" class="min-w-0 flex-1 text-sm" />
    <span class="shrink-0 font-mono text-sm tabular-nums text-stone-600">{{ formatTime(result.timeMs) }} </span>
  </BaseCard>
</template>

<script setup lang="ts">
import type { RoundResult } from '@/types/round'
import { formatTime } from '@/utils/time'
import BaseCard from '@/components/base/card/BaseCard.vue'
import HorseIdentity from '@/components/horse/HorseIdentity.vue'

defineProps<{ result: RoundResult }>()

const PODIUM: Record<number, { accent: string; class: string }> = {
  1: { accent: '#D4AF37', class: 'bg-amber-100 text-amber-800' },
  2: { accent: '#C0C0C0', class: 'bg-slate-200 text-slate-700' },
  3: { accent: '#CD7F32', class: 'bg-amber-200 text-amber-900' },
}

const DEFAULT_POSITION_CLASS = 'bg-stone-100 text-stone-600'

const getPodiumAccent = (position: number): string | undefined => PODIUM[position]?.accent
const getPositionClass = (position: number): string => PODIUM[position]?.class ?? DEFAULT_POSITION_CLASS
</script>
