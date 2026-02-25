import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RoundResult from '@/components/round/RoundResult.vue'
import type { Horse } from '@/types/horse'
import type { HorseRoundResult } from '@/types/round'

const horseFixture: Horse = {
  id: 'h-1',
  name: 'Silver Arrow',
  color: '#222222',
  condition: 90,
}

describe('RoundResult', () => {
  it('should render placement and formatted time', () => {
    const resultFixture: HorseRoundResult = {
      horseId: 'h-1',
      placement: 1,
      timeMs: 6123,
    }
    const wrapper = mount(RoundResult, {
      props: { result: resultFixture, horse: horseFixture },
    })

    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('0:06.12')
  })

  it('should apply podium accent for top placement', () => {
    const resultFixture: HorseRoundResult = {
      horseId: 'h-1',
      placement: 1,
      timeMs: 6123,
    }
    const wrapper = mount(RoundResult, {
      props: { result: resultFixture, horse: horseFixture },
    })
    const card = wrapper.find('[data-test="round-result"]')

    expect(card.attributes('style')).toContain('border-left-color: rgb(212, 175, 55)')
  })
})
