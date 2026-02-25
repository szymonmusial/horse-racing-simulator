<template>
  <header class="flex flex-shrink-0 items-center justify-between gap-4 bg-slate-700 px-4 py-2.5 text-white">
    <h1 class="text-lg font-semibold text-white">Horse Racing Simulator</h1>
    <div class="flex items-center gap-4">
      <BaseButton variant="light" text="Generate" @click="generateProgram" />
      <BaseButton
        v-if="!canPause"
        variant="success"
        class="min-w-24"
        text="Start"
        :disabled="!canStart"
        @click="start"
      />
      <BaseButton v-if="canPause" variant="secondary" class="min-w-24" text="Pause" @click="pause" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRaceStore } from '@/stores/race'
import BaseButton from '@/components/base/button/BaseButton.vue'

const { start, pause, generateProgram } = useRaceStore()
const { canStart, canPause } = storeToRefs(useRaceStore())
</script>
