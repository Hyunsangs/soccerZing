export const SUPPORTED_LEAGUES = {
  EPL: 'epl',
  WORLD_CUP: 'world_cup',
} as const

export type SupportedLeague = (typeof SUPPORTED_LEAGUES)[keyof typeof SUPPORTED_LEAGUES]
