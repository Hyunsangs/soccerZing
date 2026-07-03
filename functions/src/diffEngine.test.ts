import { findNewEvents } from './diffEngine'
import { RawFixtureEvent } from './footballApiClient'

const goal: RawFixtureEvent = { time: { elapsed: 10 }, type: 'Goal', detail: 'Normal Goal' }
const yellowCard: RawFixtureEvent = { time: { elapsed: 20 }, type: 'Card', detail: 'Yellow Card' }

describe('findNewEvents', () => {
  it('returns only events added since the previous snapshot', () => {
    const previous = [goal]
    const current = [goal, yellowCard]

    expect(findNewEvents(previous, current)).toEqual([yellowCard])
  })

  it('returns an empty array when nothing changed', () => {
    expect(findNewEvents([goal], [goal])).toEqual([])
  })
})
