import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseCard from '@/components/horse/HorseCard.vue'
import type { Horse } from '@/types/horse'

const horseFixture: Horse = {
  id: 'h-1',
  name: 'Golden Bolt',
  color: '#abcdef',
  condition: 72,
}

describe('HorseCard', () => {
  it('should render horse name and condition percentage', () => {
    const wrapper = mount(HorseCard, {
      props: { horse: horseFixture },
    })

    expect(wrapper.text()).toContain('Golden Bolt')
    expect(wrapper.text()).toContain('72%')
  })

  it('should apply horse color as card accent', () => {
    const wrapper = mount(HorseCard, {
      props: { horse: horseFixture },
    })
    const card = wrapper.find('[data-test="base-card"]')

    expect(card.attributes('style')).toContain('border-left-color: rgb(171, 205, 239)')
  })
})
