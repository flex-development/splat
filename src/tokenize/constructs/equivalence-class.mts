/**
 * @file Constructs - equivalenceClass
 * @module splat/tokenize/constructs/equivalenceClass
 */

import tt from '#tokenize/enums/tt'
import isBreak from '#tokenize/internal/is-break'
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
 * The equivalence class construct.
 *
 * Within a bracket expression, *equivalence classes* can be specified using the
 * syntax *`[=c=]`*, which matches all characters with the same collation weight
 * (as defined by the current locale) as the character *c*.
 *
 * @see {@linkcode Construct}
 *
 * @const {Construct} equivalenceClass
 */
const equivalenceClass: Construct = {
  partial: true,
  tokenize: tokenizeEquivalenceClass
}

export default equivalenceClass

/**
 * Tokenize an equivalence class.
 *
 * @this {TokenizeContext}
 *
 * @param {Effects} effects
 *  The state machine context
 * @param {State} ok
 *  The successful tokenization state
 * @param {State} nok
 *  The failed tokenization state
 * @return {State}
 *  The initial state
 */
function tokenizeEquivalenceClass(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {
  return equivalenceClass

  /**
   * At the beginning of an equivalence class.
   *
   * @example
   *  ```markdown
   *  > | [=a=]
   *      ^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function equivalenceClass(this: void, code: Code): State | undefined {
    assert(code === codes.leftBracket, 'expected `codes.leftBracket`')

    effects.enter(tt.equivalenceClass)
    effects.consume(code)

    return afterOpener
  }

  /**
   * After the class opener.
   *
   * @example
   *  ```markdown
   *  > | [=a=]
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
  function afterOpener(this: void, code: Code): State | undefined {
    if (code !== codes.equal) return nok(code)
    return effects.consume(code), value
  }

  /**
   * At the class value.
   *
   * @example
   *  ```markdown
   *  > | [=a=]
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
  function value(this: void, code: Code): State | undefined {
    if (isBreak(code)) return nok(code)

    effects.enter(tt.equivalenceClassValue)
    effects.consume(code)
    effects.exit(tt.equivalenceClassValue)

    return afterValue
  }

  /**
   * After the class value.
   *
   * @example
   *  ```markdown
   *  > | [=a=]
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
  function afterValue(this: void, code: Code): State | undefined {
    if (code !== codes.equal) return nok(code)
    return effects.consume(code), afterValueCloser
  }

  /**
   * After the class value closer.
   *
   * @example
   *  ```markdown
   *  > | [=a=]
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
  function afterValueCloser(this: void, code: Code): State | undefined {
    if (code !== codes.rightBracket) return nok(code)

    effects.consume(code)
    effects.exit(tt.equivalenceClass)

    return ok
  }
}
