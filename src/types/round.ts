import type { Horse } from '@/types/horse'

export enum RoundStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

export type Round = {
  order: number
  distance: number
  status: RoundStatus
  horses: Horse[]
}

export type RoundResult = {
  horse: Horse
  position: number
  timeMs: number
}

export type RoundResults = {
  round: Round
  results: RoundResult[]
}
