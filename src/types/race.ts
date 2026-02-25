import type { Horse } from '@/types/horse'

export type TrackPosition = {
  progress: number
  placement: number
}

export type RacePosition = {
  horse: Horse
  track: TrackPosition
}
