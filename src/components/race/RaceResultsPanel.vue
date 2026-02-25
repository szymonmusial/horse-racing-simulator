<template>
  <BasePanel class="w-1/2 flex-1 flex flex-col" title="Race results">
    <RaceSummary :rounds="rounds" />
  </BasePanel>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRaceStore } from '@/stores/race'
import BasePanel from '@/components/base/panel/BasePanel.vue'
import RaceSummary from '@/components/race/RaceSummary.vue'

const { rounds } = storeToRefs(useRaceStore())
</script>
