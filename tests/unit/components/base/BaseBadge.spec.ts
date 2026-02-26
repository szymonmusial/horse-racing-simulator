import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseBadge from '@/components/base/badge/BaseBadge.vue'

describe('BaseBadge', () => {
  it('should render slot content', () => {
    const wrapper = mount(BaseBadge, {
      slots: { default: 'Pending' },
    })

    expect(wrapper.text()).toContain('Pending')
  })

  it('should apply variant and size classes from props', () => {
    const wrapper = mount(BaseBadge, {
      props: { variant: 'success', size: 'sm' },
      slots: { default: 'Finished' },
    })

    expect(wrapper.classes()).toContain('bg-green-100')
    expect(wrapper.classes()).toContain('text-xs')
  })
})
