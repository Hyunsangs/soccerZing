import { HapticEventType } from '../constants/hapticEvents'

export interface MatchEvent {
  id: string
  fixtureId: string
  type: HapticEventType
  minute: number
  createdAt: string
}
