import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useAnimationLoop } from '@/composables/useAnimationLoop'

type AnimationApi = ReturnType<typeof useAnimationLoop>

describe('useAnimationLoop', () => {
  let now = 0
  let rafId = 0
  let rafCallbacks = new Map<number, FrameRequestCallback>()

  const runFrame = (timestamp: number) => {
    const first = rafCallbacks.entries().next().value as [number, FrameRequestCallback] | undefined
    expect(first).toBeDefined()
    const [id, callback] = first!
    rafCallbacks.delete(id)
    callback(timestamp)
  }

  beforeEach(() => {
    now = 0
    rafId = 0
    rafCallbacks = new Map<number, FrameRequestCallback>()

    vi.spyOn(performance, 'now').mockImplementation(() => now)
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((callback: FrameRequestCallback) => {
        rafId += 1
        rafCallbacks.set(rafId, callback)
        return rafId
      }),
    )
    vi.stubGlobal(
      'cancelAnimationFrame',
      vi.fn((id: number) => {
        rafCallbacks.delete(id)
      }),
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('should call callback with elapsed time and stop when callback returns true', () => {
    const callback = vi.fn(() => true)
    const Harness = defineComponent({
      template: '<div />',
      setup: () => useAnimationLoop(),
    })
    const wrapper = mount(Harness)
    const loop = wrapper.vm as unknown as AnimationApi

    now = 10
    loop.start(callback)
    runFrame(30)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(20)
  })

  it('should pause and resume with accumulated elapsed time', () => {
    const callback = vi.fn(() => false)
    const Harness = defineComponent({
      template: '<div />',
      setup: () => useAnimationLoop(),
    })
    const wrapper = mount(Harness)
    const loop = wrapper.vm as unknown as AnimationApi

    now = 10
    loop.start(callback)
    runFrame(30)

    now = 50
    loop.pause()

    now = 50
    loop.resume()
    runFrame(70)

    expect(callback).toHaveBeenNthCalledWith(1, 20)
    expect(callback).toHaveBeenNthCalledWith(2, 60)
  })

  it('should cancel scheduled frame on stop', () => {
    const callback = vi.fn(() => false)
    const Harness = defineComponent({
      template: '<div />',
      setup: () => useAnimationLoop(),
    })
    const wrapper = mount(Harness)
    const loop = wrapper.vm as unknown as AnimationApi

    loop.start(callback)
    loop.stop()

    expect(vi.mocked(cancelAnimationFrame)).toHaveBeenCalled()
  })
})
