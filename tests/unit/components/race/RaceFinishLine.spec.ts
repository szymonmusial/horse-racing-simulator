import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceFinishLine from '@/components/race/RaceFinishLine.vue'

describe('RaceFinishLine', () => {
  it('should render finish line element', () => {
    const wrapper = mount(RaceFinishLine)

    expect(wrapper.find('[data-test="race-finish-line"]').exists()).toBe(true)
  })
})
