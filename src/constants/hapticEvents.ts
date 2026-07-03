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
 * Event type -> bundled sound file name (.caf).
 * Server (functions/src/soundMapper.ts) must mirror this mapping.
 * See docs/08-haptic-design.md for waveform spec per event.
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
