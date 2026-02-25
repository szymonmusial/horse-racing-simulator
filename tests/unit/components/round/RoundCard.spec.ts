import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RoundCard from '@/components/round/RoundCard.vue'
import { ROUND_STATUS, type Round } from '@/types/round'
import type { Horse } from '@/types/horse'

const horsesFixture: Horse[] = [
  { id: 'h-1', name: 'Silver Arrow', color: '#111111', condition: 90 },
]

const roundFixture: Round = {
  id: 'r-1',
  order: 3,
  distance: 1600,
  status: ROUND_STATUS.PENDING,
  horses: horsesFixture,
  positions: [],
  results: [],
}

describe('RoundCard', () => {
  it('should render round header content', () => {
    const wrapper = mount(RoundCard, {
      props: { round: roundFixture },
    })

    expect(wrapper.text()).toContain('Round 3')
    expect(wrapper.text()).toContain('1600 m')
  })

  it('should render slot content inside card body', () => {
    const wrapper = mount(RoundCard, {
      props: { round: roundFixture },
      slots: { default: 'Round body content' },
    })

    expect(wrapper.text()).toContain('Round body content')
  })
})
