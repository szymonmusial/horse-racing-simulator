<template>
  <div class="flex h-full flex-col overflow-hidden">
    <RaceHeader />

    <div class="flex flex-1 min-h-0 flex-col p-4">
      <BaseTabs v-if="isMobile" v-model="activeTab" :options="tabs" class="mb-4" />

      <div
        class="grid flex-1 min-h-0 gap-4 grid-cols-1 lg:grid-cols-[1.75fr_1fr] lg:grid-rows-2 2xl:grid-cols-[22.5rem_1fr_24rem_24rem] 2xl:grid-rows-1"
      >
        <RaceTrackPanel
          v-show="show('track')"
          class="min-h-0 overflow-auto lg:col-start-1 lg:row-start-1 2xl:col-start-2"
        />

        <RaceHorseListPanel
          v-show="show('horses')"
          class="min-h-0 overflow-auto lg:col-start-2 lg:row-start-1 2xl:col-start-1"
        />

        <RaceProgramPanel
          v-show="show('program')"
          class="min-h-0 overflow-auto lg:col-start-2 lg:row-start-2 2xl:col-start-3 2xl:row-start-1"
        />

        <RaceResultsPanel
          v-show="show('results')"
          class="min-h-0 overflow-auto lg:col-start-1 lg:row-start-2 2xl:col-start-4 2xl:row-start-1"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useBreakpoints } from '@/composables/useBreakpoints'
import RaceHeader from '@/components/race/RaceHeader.vue'
import RaceHorseListPanel from '@/components/race/RaceHorseListPanel.vue'
import RaceTrackPanel from '@/components/race/RaceTrackPanel.vue'
import RaceResultsPanel from '@/components/race/RaceResultsPanel.vue'
import RaceProgramPanel from '@/components/race/RaceProgramPanel.vue'
import BaseTabs, { type TabOption } from '@/components/base/tabs/BaseTabs.vue'

const activeTab = ref('track')
const tabs: TabOption[] = [
  { value: 'horses', label: 'Horses' },
  { value: 'track', label: 'Track' },
  { value: 'results', label: 'Results' },
  { value: 'program', label: 'Program' },
]

const { lgDown: isMobile } = useBreakpoints()
const show = (tab: string) => !isMobile.value || activeTab.value === tab
</script>
