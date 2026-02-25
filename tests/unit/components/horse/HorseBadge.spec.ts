import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import HorseBadge from '@/components/horse/HorseBadge.vue'

describe('HorseBadge', () => {
  it('should render provided color in title attribute', () => {
    const wrapper = mount(HorseBadge, {
      props: { color: '#ff0000', size: 32 },
    })

    expect(wrapper.attributes('title')).toBe('#ff0000')
  })

  it('should apply width and height from size prop', () => {
    const wrapper = mount(HorseBadge, {
      props: { color: '#00ff00', size: 48 },
    })

    expect(wrapper.attributes('style')).toContain('width: 48px')
    expect(wrapper.attributes('style')).toContain('height: 48px')
  })
})
