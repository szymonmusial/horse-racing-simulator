<template>
  <BaseBadge :variant="variant" :size="size">
    {{ label }}
  </BaseBadge>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ROUND_STATUS } from '@/types/round'
import BaseBadge, { type BadgeSize } from '@/components/base/badge/BaseBadge.vue'

const props = defineProps<{ status: ROUND_STATUS; size?: BadgeSize }>()

const label = computed(() => {
  switch (props.status) {
    case ROUND_STATUS.PENDING:
      return 'Pending'
    case ROUND_STATUS.IN_PROGRESS:
      return 'In progress'
    case ROUND_STATUS.FINISHED:
      return 'Finished'
    default:
      return 'Unknown'
  }
})

const variant = computed(() => {
  switch (props.status) {
    case ROUND_STATUS.PENDING:
      return 'default'
    case ROUND_STATUS.IN_PROGRESS:
      return 'primary'
    case ROUND_STATUS.FINISHED:
      return 'success'
    default:
      return 'default'
  }
})
</script>
