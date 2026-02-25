<template>
  <div class="h-full flex flex-col">
    <RaceHeader :can-start="canStart" :can-pause="canPause" @generate="generateProgram" @start="start" @pause="pause" />

    <div class="flex-1 min-h-0 p-4 flex flex-row gap-4">
      <BasePanel class="w-1/6 flex-1 flex flex-col" title="Horse list">
        <HorseCardList :horses="horses" />
      </BasePanel>

      <div class="flex flex-col gap-4 w-3/6">
        <BasePanel class="flex-1 flex flex-col" title="Race track">
          <RacePreview v-if="displayRound" :round="displayRound" />
          <div v-else class="p-4 text-center text-stone-500">No race in progress</div>
        </BasePanel>
      </div>

      <div class="flex flex-row gap-4 w-2/6">
        <BasePanel class="w-1/2 flex-1 flex flex-col" title="Race results">
          <RaceSummary :rounds="rounds" />
        </BasePanel>

        <BasePanel class="w-1/2 flex flex-col" title="Race program">
          <RaceProgram :rounds="rounds" />
        </BasePanel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRaceStore } from '@/stores/race'
import BasePanel from '@/components/base/panel/BasePanel.vue'
import RacePreview from '@/components/race/RacePreview.vue'
import RaceSummary from '@/components/race/RaceSummary.vue'
import RaceProgram from '@/components/race/RaceProgram.vue'
import RaceHeader from '@/components/race/RaceHeader.vue'
import HorseCardList from '@/components/horse/HorseCardList.vue'

const raceStore = useRaceStore()
const { horses, rounds, displayRound, canStart, canPause } = storeToRefs(raceStore)

const start = () => raceStore.start()
const pause = () => raceStore.pause()
const generateProgram = () => raceStore.generateProgram()
</script>
