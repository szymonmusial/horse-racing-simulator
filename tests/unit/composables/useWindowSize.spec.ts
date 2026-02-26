import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useWindowSize } from '@/composables/useWindowSize'

type WindowSizeApi = ReturnType<typeof useWindowSize>

describe('useWindowSize', () => {
  beforeEach(() => {
    vi.stubGlobal('innerWidth', 1024)
    vi.stubGlobal('innerHeight', 768)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should return initial window dimensions on mount', () => {
    const Harness = defineComponent({
      template: '<div />',
      setup: () => useWindowSize(),
    })
    const wrapper = mount(Harness)
    const api = wrapper.vm as unknown as WindowSizeApi

    expect(api.width).toBe(1024)
    expect(api.height).toBe(768)
  })

  it('should update dimensions when window resize event fires', async () => {
    const Harness = defineComponent({
      template: '<div />',
      setup: () => useWindowSize(),
    })
    const wrapper = mount(Harness)
    const api = wrapper.vm as unknown as WindowSizeApi

    vi.stubGlobal('innerWidth', 1920)
    vi.stubGlobal('innerHeight', 1080)
    window.dispatchEvent(new Event('resize'))

    expect(api.width).toBe(1920)
    expect(api.height).toBe(1080)
  })

  it('should remove resize listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const Harness = defineComponent({
      template: '<div />',
      setup: () => useWindowSize(),
    })
    const wrapper = mount(Harness)

    wrapper.unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })
})
