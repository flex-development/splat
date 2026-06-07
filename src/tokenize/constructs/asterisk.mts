/**
 * @file Constructs - asterisk
 * @module splat/tokenize/constructs/asterisk
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
 * The asterisk (`*`) construct.
 *
 * A single asterisk matches any character zero (`0`) or more times, excluding
 * path separators. They do *not* match directories, hidden files ('dotfiles')
 * or path separators by default.
 *
 * Two consecutive asterisks (stars), also known as a globstar, match any
 * character zero (`0`) or more times, including path separators.
 * More than two consecutive asterisks in a pattern are counted as a single
 * star; thus, `a***` is equivalent to `a*`.
 *
 * @see {@linkcode Construct}
 *
 * @const {Construct} asterisk
 */
const asterisk: Construct = { tokenize: tokenizeAsterisk }

export default asterisk

/**
 * Tokenize an asterisk, or a sequence of asterisks.
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
function tokenizeAsterisk(
  this: TokenizeContext,
  effects: Effects,
  ok: State
): State {
  return asterisk

  /**
   * At an asterisk.
   *
   * @example
   *  ```markdown
   *  > | a*.mjs
   *       ^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function asterisk(this: void, code: Code): State | undefined {
    assert(code === codes.asterisk, 'expected `codes.asterisk`')
    return effects.enter(tt.asterisk), effects.consume(code), after
  }

  /**
   * After an asterisk.
   *
   * @example
   *  ```markdown
   *  > | a*.mjs
   *        ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | a***.mjs
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
  function after(this: void, code: Code): State | undefined {
    if (code === codes.asterisk) return effects.consume(code), after
    return effects.exit(tt.asterisk), ok(code)
  }
}
