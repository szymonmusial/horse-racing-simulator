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
