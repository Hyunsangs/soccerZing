import { HAPTIC_EVENT_TYPES, HAPTIC_SOUND_FILE } from './hapticEvents'

describe('HAPTIC_SOUND_FILE', () => {
  it('has a sound file mapped for every event type', () => {
    HAPTIC_EVENT_TYPES.forEach((eventType) => {
      expect(HAPTIC_SOUND_FILE[eventType]).toMatch(/\.caf$/)
    })
  })
})
