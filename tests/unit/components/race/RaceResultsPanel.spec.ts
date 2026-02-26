import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { nextTick } from 'vue'
import RaceResultsPanel from '@/components/race/RaceResultsPanel.vue'
import { useRaceStore } from '@/stores/race'
import { ROUND_STATUS, type Round } from '@/types/round'
import type { Horse } from '@/types/horse'

const horsesFixture: Horse[] = [{ id: 'h-1', name: 'Silver Arrow', color: '#111111', condition: 90 }]

const finishedRoundFixture: Round = {
  id: 'r-1',
  order: 1,
  distance: 1200,
  status: ROUND_STATUS.FINISHED,
  horses: horsesFixture,
  positions: [],
  results: [{ horseId: 'h-1', placement: 1, timeMs: 6100 }],
}

describe('RaceResultsPanel', () => {
  it('should render panel title', () => {
    const wrapper = mount(RaceResultsPanel, {
      global: { plugins: [createPinia()] },
    })

    expect(wrapper.text()).toContain('Race results')
  })

  it('should render finished round summary from store rounds', async () => {
    const pinia = createPinia()
    const wrapper = mount(RaceResultsPanel, {
      global: { plugins: [pinia] },
    })
    const store = useRaceStore(pinia)
    store.$patch({ rounds: [finishedRoundFixture] })
    await nextTick()

    expect(wrapper.findAll('[data-test="round-summary"]')).toHaveLength(1)
  })
})
