import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useBreakpoints } from '@/composables/useBreakpoints'
import { BREAKPOINTS } from '@/constants/breakpoints'

const Harness = defineComponent({
  template: '<div />',
  setup: () => useBreakpoints(),
})

describe('useBreakpoints', () => {
  beforeEach(() => {
    vi.stubGlobal('innerWidth', 1024)
    vi.stubGlobal('innerHeight', 768)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should return true for greater when width equals breakpoint', () => {
    vi.stubGlobal('innerWidth', BREAKPOINTS.md)
    const { vm } = mount(Harness)

    expect(vm.greater('md').value).toBe(true)
  })

  it('should return true for greater when width exceeds breakpoint', () => {
    vi.stubGlobal('innerWidth', BREAKPOINTS.md + 100)
    const { vm } = mount(Harness)

    expect(vm.greater('md').value).toBe(true)
  })

  it('should return false for greater when width is below breakpoint', () => {
    vi.stubGlobal('innerWidth', BREAKPOINTS.md - 1)
    const { vm } = mount(Harness)

    expect(vm.greater('md').value).toBe(false)
  })

  it('should return true for smaller when width is below breakpoint', () => {
    vi.stubGlobal('innerWidth', BREAKPOINTS.lg - 1)
    const { vm } = mount(Harness)

    expect(vm.smaller('lg').value).toBe(true)
  })

  it('should return false for smaller when width equals breakpoint', () => {
    vi.stubGlobal('innerWidth', BREAKPOINTS.lg)
    const { vm } = mount(Harness)

    expect(vm.smaller('lg').value).toBe(false)
  })

  it('should return true for between when width is in range', () => {
    vi.stubGlobal('innerWidth', BREAKPOINTS.md + 50)
    const { vm } = mount(Harness)

    expect(vm.between('md', 'lg').value).toBe(true)
  })

  it('should return false for between when width is below lower bound', () => {
    vi.stubGlobal('innerWidth', BREAKPOINTS.md - 1)
    const { vm } = mount(Harness)

    expect(vm.between('md', 'lg').value).toBe(false)
  })

  it('should return false for between when width equals upper bound', () => {
    vi.stubGlobal('innerWidth', BREAKPOINTS.lg)
    const { vm } = mount(Harness)

    expect(vm.between('md', 'lg').value).toBe(false)
  })

  it('should provide correct smDown flag for mobile viewport', () => {
    vi.stubGlobal('innerWidth', BREAKPOINTS.sm - 1)
    const { vm } = mount(Harness)

    expect(vm.smDown).toBe(true)
    expect(vm.smUp).toBe(false)
  })

  it('should provide correct lgUp flag for desktop viewport', () => {
    vi.stubGlobal('innerWidth', BREAKPOINTS.lg)
    const { vm } = mount(Harness)

    expect(vm.lgUp).toBe(true)
    expect(vm.lgDown).toBe(false)
  })

  it('should reactively update flags when window resizes', () => {
    vi.stubGlobal('innerWidth', BREAKPOINTS.sm - 1)
    const { vm } = mount(Harness)

    expect(vm.mdUp).toBe(false)

    vi.stubGlobal('innerWidth', BREAKPOINTS.md)
    window.dispatchEvent(new Event('resize'))

    expect(vm.mdUp).toBe(true)
  })
})
