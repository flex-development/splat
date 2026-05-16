/**
 * @file Constructs - separator
 * @module splat/tokenize/constructs/separator
 */

import tt from '#tokenize/enums/tt'
import {
  codes,
  type Code,
  type Construct,
  type Effects,
  type Event,
  type State,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import { ok as assert } from 'devlop'

/**
 * The path separator construct.
 *
 * @const {Construct} separator
 */
const separator: Construct = {
  name: tt.separator,
  previous: previousSeparator,
  resolve: resolveSeparator,
  tokenize: tokenizeSeparator
}

export default separator

/**
 * Check if the previous character `code` can start this construct.
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code
 *  The previous character code
 * @return {boolean}
 *  `true` if `code` is not {@linkcode codes.backslash} and not whitespace
 */
function previousSeparator(this: TokenizeContext, code: Code): boolean {
  return code !== codes.backslash
}

/**
 * Resolve the events parsed by {@linkcode tokenizeSeparator}.
 *
 * @see {@linkcode Event}
 *
 * @this {void}
 *
 * @param {Event[]} events
 *  The list of events
 * @return {Event[]}
 *  The list of changed events
 */
function resolveSeparator(this: void, events: Event[]): Event[] {
  assert(events.length === 2, 'expected `2` events')
  const [, token, self] = events[0]!
  return token.value = self.sliceSerialize(token), events
}

/**
 * Tokenize a path separator.
 *
 * @see {@linkcode Effects}
 * @see {@linkcode State}
 * @see {@linkcode TokenizeContext}
 *
 * @this {TokenizeContext}
 *
 * @param {Effects} effects
 *  The transition context object
 * @param {State} ok
 *  The successful tokenization state
 * @return {State}
 *  The initial state
 */
function tokenizeSeparator(
  this: TokenizeContext,
  effects: Effects,
  ok: State
): State {
  return separator

  /**
   * At a path separator.
   *
   * @example
   *  ```markdown
   *  > | src/a.mts
   *         ^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function separator(this: void, code: Code): State | undefined {
    assert(code === codes.slash, 'expected `codes.slash`')

    effects.enter(tt.separator)
    effects.consume(code)
    effects.exit(tt.separator)

    return ok
  }
}
