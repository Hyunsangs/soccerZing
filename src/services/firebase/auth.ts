import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth'
import { firebaseApp } from './config'

export const auth = getAuth(firebaseApp)

export function ensureAnonymousSignIn(): Promise<User> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if (user) {
        resolve(user)
        return
      }
      signInAnonymously(auth)
        .then((credential) => resolve(credential.user))
        .catch(reject)
    })
  })
}
