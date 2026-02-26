import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RoundSummary from '@/components/round/RoundSummary.vue'
import { ROUND_STATUS, type Round } from '@/types/round'
import type { Horse } from '@/types/horse'

const horsesFixture: Horse[] = [{ id: 'h-1', name: 'Silver Arrow', color: '#111111', condition: 90 }]

describe('RoundSummary', () => {
  it('should render empty state when round has no results', () => {
    const roundFixture: Round = {
      id: 'r-1',
      order: 1,
      distance: 1200,
      status: ROUND_STATUS.FINISHED,
      horses: horsesFixture,
      positions: [],
      results: [],
    }
    const wrapper = mount(RoundSummary, {
      props: { round: roundFixture },
    })

    expect(wrapper.text()).toContain('No results')
  })

  it('should render round result rows when results are available', () => {
    const roundFixture: Round = {
      id: 'r-1',
      order: 1,
      distance: 1200,
      status: ROUND_STATUS.FINISHED,
      horses: horsesFixture,
      positions: [],
      results: [{ horseId: 'h-1', placement: 1, timeMs: 6100 }],
    }
    const wrapper = mount(RoundSummary, {
      props: { round: roundFixture },
    })

    expect(wrapper.findAll('[data-test="round-result"]')).toHaveLength(1)
  })
})
