import { initializeApp } from 'firebase-admin/app'
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { pollLiveFixtures } from './pollingWorker'

initializeApp()

// docs/09-api-architecture.md targets a 15~30s live-polling interval, but
// Cloud Scheduler's minimum granularity is 1 minute. TODO: revisit during the
// week-1 API spike (docs/13-release-plan.md) — likely needs an in-function
// loop with delays, or a queue-based retrigger, to hit the target interval.
export const pollLiveFixturesScheduled = onSchedule('every 1 minutes', async () => {
  await pollLiveFixtures()
})
