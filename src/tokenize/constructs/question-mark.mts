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
  type Event,
  type State,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import { ok as assert } from 'devlop'
import { markdownSpace } from 'micromark-util-character'

/**
 * The question mark (`?`) construct.
 *
 * A single question mark matches any character, excluding path separators,
 * exactly once. They do not match path separators or leading dots.
 *
 * @const {Construct} questionMark
 */
const questionMark: Construct = {
  name: tt.questionMark,
  previous: previousQuestionMark,
  resolve: resolveQuestionMark,
  tokenize: tokenizeQuestionMark
}

export default questionMark

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
function previousQuestionMark(this: TokenizeContext, code: Code): boolean {
  return code !== codes.backslash && !markdownSpace(code)
}

/**
 * Resolve the events parsed by {@linkcode tokenizeQuestionMark}.
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
function resolveQuestionMark(this: void, events: Event[]): Event[] {
  assert(events.length === 2, 'expected `2` events')
  const [, token, self] = events[0]!
  return self.wild = true, token.value = self.sliceSerialize(token), events
}

/**
 * Tokenize a question mark.
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
    assert(code === codes.question, 'expected `codes.question`')

    effects.enter(tt.questionMark)
    effects.consume(code)
    effects.exit(tt.questionMark)

    return ok
  }
}
