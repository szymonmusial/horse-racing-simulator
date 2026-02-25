import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCard from '@/components/base/card/BaseCard.vue'

describe('BaseCard', () => {
  it('should render slot content', () => {
    const wrapper = mount(BaseCard, {
      slots: { default: 'Card content' },
    })

    expect(wrapper.text()).toContain('Card content')
  })

  it('should apply accent border style when accentColor is provided', () => {
    const wrapper = mount(BaseCard, {
      props: { accentColor: '#123456' },
    })

    expect(wrapper.classes()).toContain('border-l-4')
    expect(wrapper.attributes('style')).toContain('border-left-color: rgb(18, 52, 86)')
  })
})
