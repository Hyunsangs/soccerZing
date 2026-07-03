import * as Notifications from 'expo-notifications'
import { doc, setDoc } from 'firebase/firestore'
import { db } from './firestore'

export async function registerDeviceToken(deviceId: string): Promise<string | null> {
  const { status } = await Notifications.requestPermissionsAsync()
  if (status !== 'granted') {
    return null
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data

  await setDoc(doc(db, 'devices', deviceId), {
    deviceId,
    fcmToken: token,
    platform: 'ios',
    createdAt: new Date().toISOString(),
  })

  return token
}
