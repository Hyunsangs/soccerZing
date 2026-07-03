import { getFirestore, doc, setDoc, deleteDoc, collection } from 'firebase/firestore'
import { firebaseApp } from './config'

export const db = getFirestore(firebaseApp)

export function followMatch(deviceId: string, fixtureId: string) {
  const ref = doc(collection(db, 'follows'), `${deviceId}_${fixtureId}`)
  return setDoc(ref, { deviceId, fixtureId, createdAt: new Date().toISOString() })
}

export function unfollowMatch(deviceId: string, fixtureId: string) {
  const ref = doc(collection(db, 'follows'), `${deviceId}_${fixtureId}`)
  return deleteDoc(ref)
}
