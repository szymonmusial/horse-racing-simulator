import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { nextTick } from 'vue'
import RaceProgramPanel from '@/components/race/RaceProgramPanel.vue'
import { useRaceStore } from '@/stores/race'
import { ROUND_STATUS, type Round } from '@/types/round'
import type { Horse } from '@/types/horse'

const horsesFixture: Horse[] = [
  { id: 'h-1', name: 'Silver Arrow', color: '#111111', condition: 90 },
]

const pendingRoundFixture: Round = {
  id: 'r-1',
  order: 1,
  distance: 1200,
  status: ROUND_STATUS.PENDING,
  horses: horsesFixture,
  positions: [],
  results: [],
}

describe('RaceProgramPanel', () => {
  it('should render panel title', () => {
    const wrapper = mount(RaceProgramPanel, {
      global: { plugins: [createPinia()] },
    })

    expect(wrapper.text()).toContain('Race program')
  })

  it('should render round program from store rounds', async () => {
    const pinia = createPinia()
    const wrapper = mount(RaceProgramPanel, {
      global: { plugins: [pinia] },
    })
    const store = useRaceStore(pinia)
    store.$patch({ rounds: [pendingRoundFixture] })
    await nextTick()

    expect(wrapper.findAll('[data-test="round-program"]')).toHaveLength(1)
  })
})
