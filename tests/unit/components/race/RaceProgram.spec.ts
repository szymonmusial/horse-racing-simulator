import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceProgram from '@/components/race/RaceProgram.vue'
import { ROUND_STATUS, type Round } from '@/types/round'
import type { Horse } from '@/types/horse'

const horsesFixture: Horse[] = [
  { id: 'h-1', name: 'Silver Arrow', color: '#111111', condition: 90 },
  { id: 'h-2', name: 'Golden Bolt', color: '#222222', condition: 80 },
]

const roundsFixture: Round[] = [
  {
    id: 'r-1',
    order: 1,
    distance: 1200,
    status: ROUND_STATUS.PENDING,
    horses: horsesFixture,
    positions: [],
    results: [],
  },
]

describe('RaceProgram', () => {
  it('should render empty state when rounds list is empty', () => {
    const wrapper = mount(RaceProgram, {
      props: { rounds: [] },
    })

    expect(wrapper.text()).toContain('No rounds generated')
  })

  it('should render one round program item per round', () => {
    const wrapper = mount(RaceProgram, {
      props: { rounds: roundsFixture },
    })

    expect(wrapper.findAll('[data-test="round-program"]')).toHaveLength(1)
  })
})
