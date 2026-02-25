<template>
  <BasePanel data-test="race-horse-list-panel" class="flex-1 flex flex-col" title="Horse list">
    <HorseCardList v-if="horses.length > 0" :horses="horses" />
    <div v-else class="p-4 text-center text-stone-500">No horses in the list</div>
  </BasePanel>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRaceStore } from '@/stores/race'
import BasePanel from '@/components/base/panel/BasePanel.vue'
import HorseCardList from '@/components/horse/HorseCardList.vue'

const { horses } = storeToRefs(useRaceStore())
</script>
