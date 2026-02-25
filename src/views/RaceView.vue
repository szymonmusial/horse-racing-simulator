<template>
  <div class="h-full flex flex-col">
    <RaceHeader />

    <div class="flex-1 min-h-0 p-4 flex flex-row gap-4">
      <RaceHorseListPanel />

      <div class="flex flex-col gap-4 w-3/6">
        <RaceTrackPanel />
      </div>

      <div class="flex flex-row gap-4 w-2/6">
        <RaceResultsPanel />
        <RaceProgramPanel />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RaceHeader from '@/components/race/RaceHeader.vue'
import RaceHorseListPanel from '@/components/race/RaceHorseListPanel.vue'
import RaceTrackPanel from '@/components/race/RaceTrackPanel.vue'
import RaceResultsPanel from '@/components/race/RaceResultsPanel.vue'
import RaceProgramPanel from '@/components/race/RaceProgramPanel.vue'
</script>
