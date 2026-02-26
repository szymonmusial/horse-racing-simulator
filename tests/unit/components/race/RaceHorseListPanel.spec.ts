import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { nextTick } from 'vue'
import RaceHorseListPanel from '@/components/race/RaceHorseListPanel.vue'
import { useRaceStore } from '@/stores/race'
import type { Horse } from '@/types/horse'

const horsesFixture: Horse[] = [
  { id: 'h-1', name: 'Silver Arrow', color: '#111111', condition: 90 },
  { id: 'h-2', name: 'Golden Bolt', color: '#222222', condition: 70 },
]

describe('RaceHorseListPanel', () => {
  it('should render panel title', () => {
    const wrapper = mount(RaceHorseListPanel, {
      global: { plugins: [createPinia()] },
    })

    expect(wrapper.text()).toContain('Horse list')
  })

  it('should render horse cards from store', async () => {
    const pinia = createPinia()
    const wrapper = mount(RaceHorseListPanel, {
      global: { plugins: [pinia] },
    })
    const store = useRaceStore(pinia)
    store.$patch({ horses: horsesFixture })
    await nextTick()

    expect(wrapper.findAll('[data-test="horse-card"]')).toHaveLength(2)
  })
})
