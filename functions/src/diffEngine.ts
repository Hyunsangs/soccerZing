import { RawFixtureEvent } from './footballApiClient'

/**
 * API-Football returns the full event list on every call, so new events
 * must be derived by diffing against the previously stored snapshot
 * (docs/09-api-architecture.md section 5).
 */
export function findNewEvents(
  previousSnapshot: RawFixtureEvent[],
  currentSnapshot: RawFixtureEvent[]
): RawFixtureEvent[] {
  return currentSnapshot.slice(previousSnapshot.length)
}
