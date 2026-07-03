import { getFirestore } from 'firebase-admin/firestore'
import { fetchFixtureEvents, RawFixtureEvent } from './footballApiClient'
import { findNewEvents } from './diffEngine'
import { fanOutEvent } from './fanOutService'
import { HapticEventType } from './soundMapper'

const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY ?? ''

function mapToHapticEventType(event: RawFixtureEvent): HapticEventType | null {
  switch (event.type) {
    case 'Goal':
      return 'goal'
    case 'Card':
      return event.detail === 'Red Card' ? 'red_card' : 'yellow_card'
    case 'Var':
      return 'var'
    default:
      return null
  }
}

/**
 * Runs on a schedule (docs/10-backend-architecture.md section 5).
 * Polls only fixtures that currently have at least one follower.
 */
export async function pollLiveFixtures(): Promise<void> {
  const db = getFirestore()
  const liveFixtures = await db.collection('fixtures_cache').where('status', '==', 'live').get()

  for (const fixtureDoc of liveFixtures.docs) {
    const fixtureId = fixtureDoc.id
    const followersSnapshot = await db
      .collection('follows')
      .where('fixtureId', '==', fixtureId)
      .limit(1)
      .get()

    if (followersSnapshot.empty) {
      continue
    }

    const previousSnapshot = (fixtureDoc.data().lastEventsSnapshot ?? []) as RawFixtureEvent[]
    const currentSnapshot = await fetchFixtureEvents(fixtureId, API_FOOTBALL_KEY)
    const newEvents = findNewEvents(previousSnapshot, currentSnapshot)

    for (const event of newEvents) {
      const hapticType = mapToHapticEventType(event)
      if (hapticType) {
        await fanOutEvent(fixtureId, hapticType)
      }
    }

    await fixtureDoc.ref.update({
      lastEventsSnapshot: currentSnapshot,
      lastPolledAt: new Date().toISOString(),
    })
  }
}
