import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceTrackHorse from '@/components/race/RaceTrackHorse.vue'
import type { Horse } from '@/types/horse'
import type { HorseRoundPosition } from '@/types/round'

const horseFixture: Horse = {
  id: 'h-1',
  name: 'Silver Arrow',
  color: '#00aaff',
  condition: 90,
}

const positionFixture: HorseRoundPosition = {
  horseId: 'h-1',
  progress: 42,
  placement: 0,
}

describe('RaceTrackHorse', () => {
  it('should set left style from horse progress', () => {
    const wrapper = mount(RaceTrackHorse, {
      props: {
        horse: horseFixture,
        position: positionFixture,
      },
    })

    expect(wrapper.attributes('style')).toContain('left: 42%')
  })

  it('should render horse badge with horse color', () => {
    const wrapper = mount(RaceTrackHorse, {
      props: {
        horse: horseFixture,
        position: positionFixture,
      },
    })
    const badge = wrapper.find('[data-test="horse-badge"]')

    expect(badge.attributes('title')).toBe('#00aaff')
  })
})
