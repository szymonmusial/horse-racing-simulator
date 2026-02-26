import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BasePanel from '@/components/base/panel/BasePanel.vue'

describe('BasePanel', () => {
  it('should render title in header when title prop is provided', () => {
    const wrapper = mount(BasePanel, {
      props: { title: 'Race program' },
    })

    expect(wrapper.text()).toContain('Race program')
  })

  it('should render default slot content in panel body', () => {
    const wrapper = mount(BasePanel, {
      slots: { default: '<div>Panel body</div>' },
    })

    expect(wrapper.text()).toContain('Panel body')
  })
})
