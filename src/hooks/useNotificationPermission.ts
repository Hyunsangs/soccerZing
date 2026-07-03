import { useCallback, useEffect, useState } from 'react'
import * as Notifications from 'expo-notifications'

export function useNotificationPermission() {
  const [status, setStatus] = useState<Notifications.PermissionStatus | null>(null)

  useEffect(() => {
    Notifications.getPermissionsAsync().then((result) => setStatus(result.status))
  }, [])

  const requestPermission = useCallback(async () => {
    const result = await Notifications.requestPermissionsAsync()
    setStatus(result.status)
    return result.status
  }, [])

  return { status, requestPermission }
}
