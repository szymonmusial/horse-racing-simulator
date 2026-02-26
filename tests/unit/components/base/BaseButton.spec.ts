import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/base/button/BaseButton.vue'

describe('BaseButton', () => {
  it('should render text prop when no slot content is provided', () => {
    const wrapper = mount(BaseButton, {
      props: { text: 'Start race' },
    })

    expect(wrapper.text()).toContain('Start race')
  })

  it('should render slot content instead of text prop', () => {
    const wrapper = mount(BaseButton, {
      props: { text: 'Fallback text' },
      slots: { default: 'Slot label' },
    })

    expect(wrapper.text()).toContain('Slot label')
    expect(wrapper.text()).not.toContain('Fallback text')
  })

  it('should emit click event when user clicks enabled button', async () => {
    const wrapper = mount(BaseButton, {
      props: { text: 'Generate' },
    })

    await wrapper.get('[data-test="base-button"]').trigger('click')

    const emitted = wrapper.emitted('click')
    expect(emitted).toBeDefined()
    expect(emitted).toHaveLength(1)
    expect(emitted![0]).toEqual([])
  })

  it('should not emit click event when button is disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: { text: 'Start', disabled: true },
    })

    await wrapper.get('[data-test="base-button"]').trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
