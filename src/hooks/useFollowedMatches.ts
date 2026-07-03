import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../services/firebase/firestore'
import { Match } from '../types/match'

/**
 * Subscribes to matches followed by this device via Firestore realtime updates.
 * Components should read match data through this hook rather than
 * querying Firestore directly (see CLAUDE.md code rules).
 */
export function useFollowedMatches(deviceId: string) {
  const [matches, setMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const followsQuery = query(collection(db, 'follows'), where('deviceId', '==', deviceId))

    const unsubscribe = onSnapshot(followsQuery, () => {
      // TODO: resolve followed fixtureIds against fixtures_cache once backend is wired up
      setMatches([])
      setIsLoading(false)
    })

    return unsubscribe
  }, [deviceId])

  return { matches, isLoading }
}
