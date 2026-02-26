import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTabs, { type TabOption } from '@/components/base/tabs/BaseTabs.vue'

const tabs: TabOption[] = [
  { value: 'first', label: 'First Tab' },
  { value: 'second', label: 'Second Tab' },
  { value: 'third', label: 'Third Tab' },
]

describe('BaseTabs', () => {
  it('should render all tab options as buttons', () => {
    const wrapper = mount(BaseTabs, {
      props: { options: tabs, modelValue: 'first' },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(3)
    expect(buttons[0]?.text()).toBe('First Tab')
    expect(buttons[1]?.text()).toBe('Second Tab')
    expect(buttons[2]?.text()).toBe('Third Tab')
  })

  it('should highlight active tab with primary variant styling', () => {
    const wrapper = mount(BaseTabs, {
      props: { options: tabs, modelValue: 'second' },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0]!.classes()).toContain('bg-white')
    expect(buttons[1]!.classes()).toContain('bg-slate-700')
    expect(buttons[2]!.classes()).toContain('bg-white')
  })

  it('should emit update:modelValue when user clicks inactive tab', async () => {
    const wrapper = mount(BaseTabs, {
      props: { options: tabs, modelValue: 'first' },
    })

    const buttons = wrapper.findAll('button')
    await buttons[2]!.trigger('click')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeDefined()
    expect(emitted).toHaveLength(1)
    expect(emitted![0]).toEqual(['third'])
  })

  it('should have data-test attribute for identification', () => {
    const wrapper = mount(BaseTabs, {
      props: { options: tabs, modelValue: 'first' },
    })

    expect(wrapper.find('[data-test="base-tabs"]').exists()).toBe(true)
  })
})
