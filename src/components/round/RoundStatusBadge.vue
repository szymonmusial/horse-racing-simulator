<template>
  <BaseBadge :variant="variant" :size="size">
    {{ label }}
  </BaseBadge>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RoundStatus } from '@/types/round'
import BaseBadge, { type BadgeSize } from '@/components/base/badge/BaseBadge.vue'

const props = defineProps<{ status: RoundStatus; size?: BadgeSize }>()

const label = computed(() => {
  switch (props.status) {
    case RoundStatus.PENDING:
      return 'Pending'
    case RoundStatus.IN_PROGRESS:
      return 'In progress'
    case RoundStatus.FINISHED:
      return 'Finished'
    default:
      return 'Unknown'
  }
})

const variant = computed(() => {
  switch (props.status) {
    case RoundStatus.PENDING:
      return 'default'
    case RoundStatus.IN_PROGRESS:
      return 'primary'
    case RoundStatus.FINISHED:
      return 'success'
    default:
      return 'default'
  }
})
</script>
