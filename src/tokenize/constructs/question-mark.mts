/**
 * @file Constructs - questionMark
 * @module splat/tokenize/constructs/questionMark
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
 * The question mark (`?`) construct.
 *
 * A single question mark matches any character, excluding path separators,
 * exactly once. They do not match leading dots or path separators.
 *
 * @see {@linkcode Construct}
 *
 * @const {Construct} questionMark
 */
const questionMark: Construct = { tokenize: tokenizeQuestionMark }

export default questionMark

/**
 * Tokenize a question mark.
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
function tokenizeQuestionMark(
  this: TokenizeContext,
  effects: Effects,
  ok: State
): State {
  return questionMark

  /**
   * At a question mark.
   *
   * @example
   *  ```markdown
   *  > | a?.mjs
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | ab?.mjs
   *        ^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function questionMark(this: void, code: Code): State | undefined {
    assert(code === codes.questionMark, 'expected `codes.questionMark`')

    effects.enter(tt.questionMark)
    effects.consume(code)
    effects.exit(tt.questionMark)

    return ok
  }
}
