export const HAPTIC_EVENT_TYPES = [
  'goal',
  'var',
  'yellow_card',
  'red_card',
  'kickoff',
  'halftime',
  'fulltime',
] as const

export type HapticEventType = (typeof HAPTIC_EVENT_TYPES)[number]

/**
 * Must stay identical to src/constants/hapticEvents.ts on the client
 * (docs/08-haptic-design.md, docs/12-folder-structure.md).
 */
export const HAPTIC_SOUND_FILE: Record<HapticEventType, string> = {
  goal: 'goal.caf',
  var: 'var.caf',
  yellow_card: 'yellow_card.caf',
  red_card: 'red_card.caf',
  kickoff: 'kickoff.caf',
  halftime: 'halftime.caf',
  fulltime: 'fulltime.caf',
}

export function resolveSoundFile(eventType: HapticEventType): string {
  return HAPTIC_SOUND_FILE[eventType]
}
