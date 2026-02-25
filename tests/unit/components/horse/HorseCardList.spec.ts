import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseCardList from '@/components/horse/HorseCardList.vue'
import type { Horse } from '@/types/horse'

const horsesFixture: Horse[] = [
  { id: 'h-1', name: 'Silver Arrow', color: '#111111', condition: 90 },
  { id: 'h-2', name: 'Golden Bolt', color: '#222222', condition: 70 },
]

describe('HorseCardList', () => {
  it('should render list role for accessibility', () => {
    const wrapper = mount(HorseCardList, {
      props: { horses: horsesFixture },
    })

    expect(wrapper.attributes('role')).toBe('list')
  })

  it('should render one horse card per horse', () => {
    const wrapper = mount(HorseCardList, {
      props: { horses: horsesFixture },
    })

    expect(wrapper.findAll('[data-test="horse-card"]')).toHaveLength(2)
  })
})
