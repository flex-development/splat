/**
 * @file Constructs - escape
 * @module splat/tokenize/constructs/escape
 */

import tt from '#tokenize/enums/tt'
import {
  codes,
  eos,
  type Code,
  type Construct,
  type Effects,
  type State,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import { ok as assert } from 'devlop'

/**
 * The escape sequence construct.
 *
 * > 👉 **Note**: Like `micromatch`, `splat` exclusively and explicitly reserves
 * > backslashes for escaping characters in a glob pattern, even on windows,
 * > which is consistent with bash behavior.
 *
 * @const {Construct} escape
 */
const escape: Construct = { tokenize: tokenizeEscape }

export default escape

/**
 * Tokenize an escape sequence.
 *
 * @this {TokenizeContext}
 *
 * @param {Effects} effects
 *  The context object to transition the state machine
 * @param {State} ok
 *  The successful tokenization state
 * @param {State} nok
 *  The failed tokenization state
 * @return {State}
 *  The initial state
 */
function tokenizeEscape(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {
  return escape

  /**
   * At the beginning of an escape sequence.
   *
   * @example
   *  ```markdown
   *  > | \*
   *      ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | src/\*.mts
   *          ^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function escape(this: void, code: Code): State | undefined {
    assert(code === codes.backslash, 'expected `codes.backslash`')

    effects.enter(tt.escape)

    effects.enter(tt.escapeMarker)
    effects.consume(code)
    effects.exit(tt.escapeMarker)

    return escapeValue
  }

  /**
   * After an escape sequence marker.
   *
   * @example
   *  ```markdown
   *  > | \*
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | src/\*.mts
   *           ^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function escapeValue(this: void, code: Code): State | undefined {
    if (eos(code)) return nok(code)

    effects.enter(tt.escapeValue)
    effects.consume(code)
    effects.exit(tt.escapeValue)

    effects.exit(tt.escape)

    return ok
  }
}
