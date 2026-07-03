import { getMessaging } from 'firebase-admin/messaging'
import { getFirestore } from 'firebase-admin/firestore'
import { HapticEventType, resolveSoundFile } from './soundMapper'

export async function fanOutEvent(fixtureId: string, eventType: HapticEventType): Promise<void> {
  const db = getFirestore()
  const followsSnapshot = await db
    .collection('follows')
    .where('fixtureId', '==', fixtureId)
    .get()

  if (followsSnapshot.empty) {
    return
  }

  const deviceIds = followsSnapshot.docs.map((doc) => doc.data().deviceId as string)
  const devicesSnapshot = await db
    .collection('devices')
    .where('deviceId', 'in', deviceIds)
    .get()

  const tokens = devicesSnapshot.docs
    .map((doc) => doc.data().fcmToken as string)
    .filter(Boolean)

  if (tokens.length === 0) {
    return
  }

  await getMessaging().sendEachForMulticast({
    tokens,
    apns: {
      payload: {
        aps: {
          sound: resolveSoundFile(eventType),
        },
      },
    },
  })
}
