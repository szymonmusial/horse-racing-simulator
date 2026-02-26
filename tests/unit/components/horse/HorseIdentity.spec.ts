import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseIdentity from '@/components/horse/HorseIdentity.vue'
import type { Horse } from '@/types/horse'

const horseFixture: Horse = {
  id: 'h-1',
  name: 'Silver Arrow',
  color: '#123456',
  condition: 85,
}

describe('HorseIdentity', () => {
  it('should display horse name', () => {
    const wrapper = mount(HorseIdentity, {
      props: { horse: horseFixture },
    })

    expect(wrapper.text()).toContain('Silver Arrow')
  })

  it('should pass horse color to badge title', () => {
    const wrapper = mount(HorseIdentity, {
      props: { horse: horseFixture },
    })
    const badge = wrapper.find('[data-test="horse-badge"]')

    expect(badge.attributes('title')).toBe('#123456')
  })
})
