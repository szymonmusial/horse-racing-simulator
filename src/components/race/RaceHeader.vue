<template>
  <header class="flex flex-shrink-0 items-center justify-between gap-4 bg-slate-700 px-4 py-2.5 text-white">
    <h1 class="text-lg font-semibold text-white">Horse Racing Simulator</h1>
    <div class="flex items-center gap-4">
      <BaseButton variant="light" text="Generate" @click="$emit('generate')" />
      <BaseButton
        v-if="!canPause"
        variant="success"
        class="min-w-24"
        text="Start"
        :disabled="!canStart"
        @click="$emit('start')"
      />
      <BaseButton v-if="canPause" variant="secondary" class="min-w-24" text="Pause" @click="$emit('pause')" />
    </div>
  </header>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/button/BaseButton.vue'

defineProps<{ canStart: boolean; canPause: boolean }>()
defineEmits<{ generate: []; start: []; pause: [] }>()
</script>
