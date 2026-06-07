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
  type State,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import { ok as assert } from 'devlop'

/**
 * The path separator construct.
 *
 * > 👉 **Note**: Like `micromatch`, `splat` only considers forward slashes
 * > (`/`) to be separators, even on windows, which is consistent with bash
 * > behavior.
 *
 * @const {Construct} separator
 */
const separator: Construct = { tokenize: tokenizeSeparator }

export default separator

/**
 * Tokenize a path separator.
 *
 * @this {TokenizeContext}
 *
 * @param {Effects} effects
 *  The context object to transition the state machine
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
