<template>
  <BasePanel data-test="race-horse-list-panel" class="flex-1 flex flex-col" title="Horse list">
    <HorseCardList :horses="horses" />
  </BasePanel>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRaceStore } from '@/stores/race'
import BasePanel from '@/components/base/panel/BasePanel.vue'
import HorseCardList from '@/components/horse/HorseCardList.vue'

const { horses } = storeToRefs(useRaceStore())
</script>
