/**
 * @file Test Utilities - snapshotEvents
 * @module tests/utils/snapshotEvents
 */

import tt from '#tokenize/enums/tt'
import {
  ev,
  type Event,
  type EventType,
  type Token
} from '@flex-development/fsm-tokenizer'

/**
 * Get a snapshot-compliant list of events.
 *
 * @this {void}
 *
 * @param {Event[]} events
 *  List of events
 * @return {[EventType, Token][]}
 *  List of event types and tokens
 */
function snapshotEvents(this: void, events: Event[]): [EventType, Token][] {
  return events.map(([event, token, self]) => {
    if (
      event === ev.enter &&
      token.type !== tt.eoc &&
      token.type !== tt.bracketExpression &&
      token.type !== tt.characterClass &&
      token.type !== tt.collatingSymbol &&
      token.type !== tt.equivalenceClass &&
      token.type !== tt.escape &&
      token.type !== tt.escapeMarker &&
      token.type !== tt.rangeExpression &&
      !Object.prototype.hasOwnProperty.call(token, 'value')
    ) {
      token.value = self.sliceSerialize(token)
    }

    return [event, token] as const
  })
}

export default snapshotEvents
