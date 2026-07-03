import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../services/firebase/firestore'
import { Match } from '../types/match'

/**
 * Subscribes to today's cached fixture list (see docs/10-backend-architecture.md
 * fixtures_cache collection). Used by the home screen to render matches
 * available to follow.
 */
export function useMatchList() {
  const [matches, setMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'fixtures_cache'), (snapshot) => {
      const next = snapshot.docs.map((docSnapshot) => docSnapshot.data() as Match)
      setMatches(next)
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  return { matches, isLoading }
}
