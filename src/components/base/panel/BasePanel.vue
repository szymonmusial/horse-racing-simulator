<template>
  <div data-test="base-panel" class="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
    <header
      v-if="$slots.header || title"
      class="bg-slate-700 px-4 py-2.5 text-center font-bold uppercase tracking-wide text-white"
    >
      <slot name="header">
        {{ title }}
      </slot>
    </header>
    <div class="scrollbar flex-1 overflow-y-auto p-0">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>()
</script>
