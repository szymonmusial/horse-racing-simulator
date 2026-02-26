<template>
  <BasePanel data-test="race-program-panel" class="flex-1 flex flex-col" title="Race program">
    <RaceProgram :rounds="rounds" />
  </BasePanel>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRaceStore } from '@/stores/race'
import BasePanel from '@/components/base/panel/BasePanel.vue'
import RaceProgram from '@/components/race/RaceProgram.vue'

const { rounds } = storeToRefs(useRaceStore())
</script>
