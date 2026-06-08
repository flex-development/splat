/**
 * @file Constructs - rangeExpression
 * @module splat/tokenize/constructs/rangeExpression
 */

import tt from '#tokenize/enums/tt'
import isBreak from '#tokenize/internal/is-break'
import {
  codes,
  eof,
  type Code,
  type Construct,
  type Effects,
  type State,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'

/**
 * The range expression construct.
 *
 * Two (`2`) characters separated by a hyphen (`-`) denotes a range expression;
 * any character that falls between those two characters, inclusive, using the
 * current locale’s collating sequence and character set, matches.
 *
 * @see {@linkcode Construct}
 *
 * @const {Construct} rangeExpression
 */
const rangeExpression: Construct = {
  partial: true,
  tokenize: tokenizeRangeExpression
}

export default rangeExpression

/**
 * Tokenize a range expression.
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
function tokenizeRangeExpression(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {
  return rangeExpression

  /**
   * At the beginning of a range expression.
   *
   * @example
   *  ```markdown
   *  > | [a-c]
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [!x-z]
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
  function rangeExpression(this: void, code: Code): State | undefined {
    if (eof(code)) return nok(code)

    effects.enter(tt.rangeExpression)

    effects.enter(tt.rangeStart)
    effects.consume(code)
    effects.exit(tt.rangeStart)

    return rangeSeparator
  }

  /**
   * After the first character in a possible range expression.
   *
   * @example
   *  ```markdown
   *  > | [a-c]
   *        ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [!x-z]
   *         ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [abc]
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
  function rangeSeparator(this: void, code: Code): State | undefined {
    if (code !== codes.hyphen) return nok(code)
    return effects.consume(code), rangeEnd
  }

  /**
   * After the range separator.
   *
   * @example
   *  ```markdown
   *  > | [a-c]
   *         ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [!x-z]
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
  function rangeEnd(this: void, code: Code): State | undefined {
    if (isBreak(code)) return nok(code)

    effects.enter(tt.rangeEnd)
    effects.consume(code)
    effects.exit(tt.rangeEnd)

    return effects.exit(tt.rangeExpression), ok
  }
}
