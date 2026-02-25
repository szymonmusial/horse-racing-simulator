<template>
  <BasePanel class="flex-1 flex flex-col" title="Race track">
    <RacePreview v-if="displayRound" :round="displayRound" />
    <div v-else class="p-4 text-center text-stone-500">No race in progress</div>
  </BasePanel>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRaceStore } from '@/stores/race'
import BasePanel from '@/components/base/panel/BasePanel.vue'
import RacePreview from '@/components/race/RacePreview.vue'

const { displayRound } = storeToRefs(useRaceStore())
</script>
