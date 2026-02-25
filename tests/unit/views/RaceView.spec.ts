import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import RaceView from '@/views/RaceView.vue'

describe('RaceView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should render all main panels', () => {
    const pinia = createPinia()
    const wrapper = mount(RaceView, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.find('[data-test="race-header"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="race-horse-list-panel"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="race-track-panel"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="race-results-panel"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="race-program-panel"]').exists()).toBe(true)
  })

  it('should render default empty states before program generation', () => {
    const pinia = createPinia()
    const wrapper = mount(RaceView, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.text()).toContain('No race in progress')
    expect(wrapper.text()).toContain('No round results')
    expect(wrapper.text()).toContain('No rounds generated')
  })
})
