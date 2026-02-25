import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceSummary from '@/components/race/RaceSummary.vue'
import { ROUND_STATUS, type Round } from '@/types/round'
import type { Horse } from '@/types/horse'

const horsesFixture: Horse[] = [
  { id: 'h-1', name: 'Silver Arrow', color: '#111111', condition: 88 },
  { id: 'h-2', name: 'Golden Bolt', color: '#222222', condition: 76 },
]

const roundsFixture: Round[] = [
  {
    id: 'r-1',
    order: 1,
    distance: 1200,
    status: ROUND_STATUS.FINISHED,
    horses: horsesFixture,
    positions: [],
    results: [
      { horseId: 'h-2', placement: 1, timeMs: 6050 },
      { horseId: 'h-1', placement: 2, timeMs: 6190 },
    ],
  },
  {
    id: 'r-2',
    order: 2,
    distance: 1400,
    status: ROUND_STATUS.PENDING,
    horses: horsesFixture,
    positions: [],
    results: [],
  },
]

describe('RaceSummary', () => {
  it('should render empty state when there are no finished rounds', () => {
    const wrapper = mount(RaceSummary, {
      props: {
        rounds: [{ ...roundsFixture[1]! }],
      },
    })

    expect(wrapper.find('[data-test="race-summary"]').text()).toContain('No round results')
  })

  it('should render only finished rounds', () => {
    const wrapper = mount(RaceSummary, {
      props: {
        rounds: roundsFixture,
      },
    })

    expect(wrapper.findAll('[data-test="round-summary"]')).toHaveLength(1)
    expect(wrapper.text()).toContain('Round 1')
    expect(wrapper.text()).not.toContain('Round 2')
  })
})
