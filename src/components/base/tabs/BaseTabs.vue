<template>
  <div data-test="base-tabs" class="w-full">
    <div class="flex w-full gap-2 pb-1">
      <BaseButton
        v-for="option in options"
        :key="option.value"
        :variant="option.value === model ? 'primary' : 'light'"
        size="sm"
        class="min-w-0 flex-1"
        @click="model = option.value"
      >
        {{ option.label }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/button/BaseButton.vue'

export type TabOption = { value: string; label: string }

defineProps<{ options: TabOption[] }>()

const model = defineModel<string>({ required: true })
</script>
