import { create } from 'zustand'
import { SupportedLeague } from '../constants/leagues'

interface UserPreferencesState {
  notificationEnabled: boolean
  favoriteLeague: SupportedLeague | null
  favoriteTeams: string[]
  setNotificationEnabled: (enabled: boolean) => void
  setFavoriteLeague: (league: SupportedLeague) => void
  setFavoriteTeams: (teams: string[]) => void
}

export const useUserPreferences = create<UserPreferencesState>((set) => ({
  notificationEnabled: true,
  favoriteLeague: null,
  favoriteTeams: [],
  setNotificationEnabled: (enabled) => set({ notificationEnabled: enabled }),
  setFavoriteLeague: (league) => set({ favoriteLeague: league }),
  setFavoriteTeams: (teams) => set({ favoriteTeams: teams }),
}))
