import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceTrackLane from '@/components/race/RaceTrackLane.vue'
import type { Horse } from '@/types/horse'
import type { HorseRoundPosition } from '@/types/round'

const horseFixture: Horse = {
  id: 'h-1',
  name: 'Silver Arrow',
  color: '#123456',
  condition: 91,
}

const positionFixture: HorseRoundPosition = {
  horseId: 'h-1',
  progress: 55,
  placement: 1,
}

describe('RaceTrackLane', () => {
  it('should render race finish line', () => {
    const wrapper = mount(RaceTrackLane, {
      props: { horse: horseFixture, position: positionFixture },
    })

    expect(wrapper.find('[data-test="race-finish-line"]').exists()).toBe(true)
  })

  it('should render race track horse', () => {
    const wrapper = mount(RaceTrackLane, {
      props: { horse: horseFixture, position: positionFixture },
    })

    expect(wrapper.find('[data-test="race-track-horse"]').exists()).toBe(true)
  })
})
