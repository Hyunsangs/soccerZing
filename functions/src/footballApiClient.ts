const API_FOOTBALL_BASE_URL = 'https://v3.football.api-sports.io'

export interface RawFixtureEvent {
  time: { elapsed: number }
  type: string
  detail: string
}

/**
 * Thin wrapper around API-Football's /fixtures/events endpoint.
 * API key must come from Firebase Functions config/secrets, never hardcoded.
 * See docs/09-api-architecture.md for endpoint list and polling strategy.
 */
export async function fetchFixtureEvents(
  fixtureId: string,
  apiKey: string
): Promise<RawFixtureEvent[]> {
  const response = await fetch(`${API_FOOTBALL_BASE_URL}/fixtures/events?fixture=${fixtureId}`, {
    headers: { 'x-apisports-key': apiKey },
  })

  if (!response.ok) {
    throw new Error(`API-Football request failed with status ${response.status}`)
  }

  const body = (await response.json()) as { response: RawFixtureEvent[] }
  return body.response
}
