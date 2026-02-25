import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseProgressBar from '@/components/base/bar/BaseProgressBar.vue'

describe('BaseProgressBar', () => {
  it('should render rounded percentage label', () => {
    const wrapper = mount(BaseProgressBar, {
      props: { value: 63, max: 100 },
    })

    expect(wrapper.text()).toContain('63%')
  })

  it('should clamp width to 100 percent when value exceeds max', () => {
    const wrapper = mount(BaseProgressBar, {
      props: { value: 150, max: 100 },
    })
    const bar = wrapper.find('.h-full.rounded-full')

    expect(bar.attributes('style')).toContain('width: 100%')
  })
})
