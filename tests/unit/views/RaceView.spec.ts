import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import RaceView from '@/views/RaceView.vue'
import { BREAKPOINTS } from '@/constants/breakpoints'

const setViewportWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', { value: width, writable: true, configurable: true })
  Object.defineProperty(window, 'innerHeight', { value: 768, writable: true, configurable: true })
}

describe('RaceView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    setViewportWidth(BREAKPOINTS.lg)
  })

  afterEach(() => {
    vi.restoreAllMocks()
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

  it('should render tabs on mobile viewport', () => {
    setViewportWidth(BREAKPOINTS.lg - 1)
    const pinia = createPinia()
    const wrapper = mount(RaceView, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.find('[data-test="base-tabs"]').exists()).toBe(true)
  })

  it('should show only active tab panel on mobile viewport', () => {
    setViewportWidth(BREAKPOINTS.lg - 1)
    const pinia = createPinia()
    const wrapper = mount(RaceView, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.find('[data-test="race-track-panel"]').isVisible()).toBe(true)
    expect(wrapper.find('[data-test="race-horse-list-panel"]').isVisible()).toBe(false)
    expect(wrapper.find('[data-test="race-results-panel"]').isVisible()).toBe(false)
    expect(wrapper.find('[data-test="race-program-panel"]').isVisible()).toBe(false)
  })

  it('should switch visible panel when user clicks different tab on mobile', async () => {
    setViewportWidth(BREAKPOINTS.lg - 1)
    const pinia = createPinia()
    const wrapper = mount(RaceView, {
      global: {
        plugins: [pinia],
      },
    })

    const tabs = wrapper.find('[data-test="base-tabs"]')
    const horsesTabButton = tabs.findAll('button').find((btn) => btn.text() === 'Horses')
    await horsesTabButton!.trigger('click')

    expect(wrapper.find('[data-test="race-horse-list-panel"]').isVisible()).toBe(true)
    expect(wrapper.find('[data-test="race-track-panel"]').isVisible()).toBe(false)
  })

  it('should hide tabs and show all panels when viewport changes to desktop', async () => {
    setViewportWidth(BREAKPOINTS.lg - 1)
    const pinia = createPinia()
    const wrapper = mount(RaceView, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.find('[data-test="base-tabs"]').exists()).toBe(true)

    setViewportWidth(BREAKPOINTS.lg)
    window.dispatchEvent(new Event('resize'))
    await flushPromises()

    expect(wrapper.find('[data-test="base-tabs"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="race-track-panel"]').isVisible()).toBe(true)
    expect(wrapper.find('[data-test="race-horse-list-panel"]').isVisible()).toBe(true)
  })
})
