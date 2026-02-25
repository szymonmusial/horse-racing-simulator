<template>
  <li data-test="horse-card">
    <BaseCard :accent-color="horse.color">
      <div class="flex items-center justify-between gap-3">
        <HorseIdentity :horse="horse" />
        <div class="w-28">
          <BaseProgressBar :value="horse.condition" :max="100" />
        </div>
      </div>
    </BaseCard>
  </li>
</template>

<script setup lang="ts">
import type { Horse } from '@/types/horse'
import BaseCard from '@/components/base/card/BaseCard.vue'
import BaseProgressBar from '@/components/base/bar/BaseProgressBar.vue'
import HorseIdentity from '@/components/horse/HorseIdentity.vue'

defineProps<{ horse: Horse }>()
</script>
