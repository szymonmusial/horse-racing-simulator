import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { nextTick } from 'vue'
import RaceHeader from '@/components/race/RaceHeader.vue'
import { useRaceStore } from '@/stores/race'
import { HORSE_COUNT, ROUND_COUNT } from '@/constants/race'
import { ROUND_STATUS, type Round } from '@/types/round'
import type { Horse } from '@/types/horse'

const horsesFixture: Horse[] = [{ id: 'h-1', name: 'Silver Arrow', color: '#123456', condition: 85 }]

const pendingRoundFixture: Round = {
  id: 'r-1',
  order: 1,
  distance: 1200,
  status: ROUND_STATUS.PENDING,
  horses: horsesFixture,
  positions: [],
  results: [],
}

const inProgressRoundFixture: Round = {
  ...pendingRoundFixture,
  status: ROUND_STATUS.IN_PROGRESS,
  positions: [{ horseId: 'h-1', progress: 25, placement: 0 }],
}

describe('RaceHeader', () => {
  const mountWithStore = () => {
    const pinia = createPinia()
    const wrapper = mount(RaceHeader, {
      global: { plugins: [pinia] },
    })
    const store = useRaceStore(pinia)
    return { wrapper, store }
  }

  it('should render generate and start buttons when race is not running', async () => {
    const { wrapper, store } = mountWithStore()

    store.$patch({
      horses: horsesFixture,
      rounds: [pendingRoundFixture],
    })
    await nextTick()

    expect(wrapper.text()).toContain('Horse Racing Simulator')
    expect(wrapper.text()).toContain('Generate')
    expect(wrapper.text()).toContain('Start')
    expect(wrapper.text()).not.toContain('Pause')
  })

  it('should generate race program when generate button is clicked', async () => {
    const { wrapper, store } = mountWithStore()

    const generateButton = wrapper
      .findAll('[data-test="base-button"]')
      .find((button) => button.text().trim() === 'Generate')

    expect(generateButton).toBeDefined()
    await generateButton!.trigger('click')

    expect(store.horses).toHaveLength(HORSE_COUNT)
    expect(store.rounds).toHaveLength(ROUND_COUNT)
  })

  it('should start race when start button is clicked', async () => {
    const { wrapper, store } = mountWithStore()

    store.$patch({
      horses: horsesFixture,
      rounds: [pendingRoundFixture],
    })
    await nextTick()
    const startButton = wrapper.findAll('[data-test="base-button"]').find((button) => button.text().trim() === 'Start')

    expect(startButton).toBeDefined()
    await startButton!.trigger('click')

    expect(store.rounds[0]!.status).toBe(ROUND_STATUS.IN_PROGRESS)
  })

  it('should render start button after pause is clicked', async () => {
    const { wrapper, store } = mountWithStore()

    store.$patch({
      horses: horsesFixture,
      rounds: [inProgressRoundFixture],
    })
    await nextTick()
    const pauseButton = wrapper.findAll('[data-test="base-button"]').find((button) => button.text().trim() === 'Pause')

    expect(wrapper.text()).toContain('Pause')
    expect(wrapper.text()).not.toContain('Start')
    expect(pauseButton).toBeDefined()

    await pauseButton!.trigger('click')

    expect(wrapper.text()).toContain('Start')
    expect(wrapper.text()).not.toContain('Pause')
  })
})
