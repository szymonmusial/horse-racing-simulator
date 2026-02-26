import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RacePreview from '@/components/race/RacePreview.vue'
import { ROUND_STATUS, type Round } from '@/types/round'
import type { Horse } from '@/types/horse'

const horsesFixture: Horse[] = [
  { id: 'h-1', name: 'Silver Arrow', color: '#111111', condition: 90 },
  { id: 'h-2', name: 'Golden Bolt', color: '#222222', condition: 88 },
]

const roundFixture: Round = {
  id: 'r-1',
  order: 1,
  distance: 1200,
  status: ROUND_STATUS.IN_PROGRESS,
  horses: horsesFixture,
  positions: [
    { horseId: 'h-1', progress: 25, placement: 2 },
    { horseId: 'h-2', progress: 40, placement: 1 },
  ],
  results: [],
}

describe('RacePreview', () => {
  it('should render round header with order and distance', () => {
    const wrapper = mount(RacePreview, {
      props: { round: roundFixture },
    })

    expect(wrapper.text()).toContain('Round 1')
    expect(wrapper.text()).toContain('1200 m')
  })

  it('should render one race track row per position', () => {
    const wrapper = mount(RacePreview, {
      props: { round: roundFixture },
    })

    expect(wrapper.findAll('[data-test="race-track"]')).toHaveLength(2)
  })
})
