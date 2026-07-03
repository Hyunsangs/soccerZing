import { SupportedLeague } from '../constants/leagues'

export type MatchStatus = 'scheduled' | 'live' | 'halftime' | 'finished'

export interface Match {
  fixtureId: string
  leagueId: SupportedLeague
  homeTeam: string
  awayTeam: string
  homeScore: number | null
  awayScore: number | null
  status: MatchStatus
  kickoffAt: string
}
