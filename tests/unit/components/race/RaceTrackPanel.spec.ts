import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { nextTick } from 'vue'
import RaceTrackPanel from '@/components/race/RaceTrackPanel.vue'
import { useRaceStore } from '@/stores/race'
import { ROUND_STATUS, type Round } from '@/types/round'
import type { Horse } from '@/types/horse'

const horsesFixture: Horse[] = [
  { id: 'h-1', name: 'Silver Arrow', color: '#111111', condition: 90 },
]

const inProgressRoundFixture: Round = {
  id: 'r-1',
  order: 1,
  distance: 1200,
  status: ROUND_STATUS.IN_PROGRESS,
  horses: horsesFixture,
  positions: [{ horseId: 'h-1', progress: 20, placement: 0 }],
  results: [],
}

describe('RaceTrackPanel', () => {
  it('should render empty state when no round is displayed', () => {
    const wrapper = mount(RaceTrackPanel, {
      global: { plugins: [createPinia()] },
    })

    expect(wrapper.text()).toContain('No race in progress')
  })

  it('should render race preview when display round is available', async () => {
    const pinia = createPinia()
    const wrapper = mount(RaceTrackPanel, {
      global: { plugins: [pinia] },
    })
    const store = useRaceStore(pinia)
    store.$patch({ rounds: [inProgressRoundFixture] })
    await nextTick()

    expect(wrapper.find('[data-test="race-preview"]').exists()).toBe(true)
  })
})
