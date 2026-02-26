import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RoundProgram from '@/components/round/RoundProgram.vue'
import { ROUND_STATUS, type Round } from '@/types/round'
import type { Horse } from '@/types/horse'

const horsesFixture: Horse[] = [
  { id: 'h-1', name: 'Silver Arrow', color: '#111111', condition: 90 },
  { id: 'h-2', name: 'Golden Bolt', color: '#222222', condition: 80 },
]

const roundFixture: Round = {
  id: 'r-1',
  order: 1,
  distance: 1200,
  status: ROUND_STATUS.PENDING,
  horses: horsesFixture,
  positions: [],
  results: [],
}

describe('RoundProgram', () => {
  it('should render round program root container', () => {
    const wrapper = mount(RoundProgram, {
      props: { round: roundFixture },
    })

    expect(wrapper.find('[data-test="round-program"]').exists()).toBe(true)
  })

  it('should render horse identities from round horses', () => {
    const wrapper = mount(RoundProgram, {
      props: { round: roundFixture },
    })

    expect(wrapper.findAll('[data-test="horse-identity"]')).toHaveLength(2)
  })
})
