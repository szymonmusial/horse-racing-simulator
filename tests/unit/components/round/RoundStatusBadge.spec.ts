import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RoundStatusBadge from '@/components/round/RoundStatusBadge.vue'
import { ROUND_STATUS } from '@/types/round'

describe('RoundStatusBadge', () => {
  it('should render pending label for pending status', () => {
    const wrapper = mount(RoundStatusBadge, {
      props: { status: ROUND_STATUS.PENDING },
    })

    expect(wrapper.text()).toContain('Pending')
  })

  it('should apply success variant classes for finished status', () => {
    const wrapper = mount(RoundStatusBadge, {
      props: { status: ROUND_STATUS.FINISHED },
    })

    expect(wrapper.classes()).toContain('bg-green-100')
  })
})
