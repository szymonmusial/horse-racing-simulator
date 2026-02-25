import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceTrack from '@/components/race/RaceTrack.vue'
import type { Horse } from '@/types/horse'
import type { HorseRoundPosition } from '@/types/round'

const horseFixture: Horse = {
  id: 'h-1',
  name: 'Rapid Dash',
  color: '#555555',
  condition: 80,
}

describe('RaceTrack', () => {
  it('should render horse name', () => {
    const positionFixture: HorseRoundPosition = {
      horseId: 'h-1',
      progress: 20,
      placement: 0,
    }
    const wrapper = mount(RaceTrack, {
      props: { horse: horseFixture, position: positionFixture },
    })

    expect(wrapper.text()).toContain('Rapid Dash')
  })

  it('should display placement badge when placement is available', () => {
    const positionFixture: HorseRoundPosition = {
      horseId: 'h-1',
      progress: 90,
      placement: 2,
    }
    const wrapper = mount(RaceTrack, {
      props: { horse: horseFixture, position: positionFixture },
    })

    expect(wrapper.text()).toContain('#2')
  })
})
