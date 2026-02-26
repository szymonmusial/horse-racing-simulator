import type { Horse } from '@/types/horse'

export enum ROUND_STATUS {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

export type Round = {
  id: string
  order: number
  distance: number
  status: ROUND_STATUS

  horses: Horse[]
  positions: HorseRoundPosition[]
  results: HorseRoundResult[]
}

export type HorseRoundResult = {
  horseId: Horse['id']
  placement: number
  timeMs: number
}

export type HorseRoundPosition = {
  horseId: Horse['id']
  progress: number
  placement: number
}
