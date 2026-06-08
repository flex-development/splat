/**
 * @file Constructs - collatingSymbol
 * @module splat/tokenize/constructs/collatingSymbol
 */

import tt from '#tokenize/enums/tt'
import isBreak from '#tokenize/internal/is-break'
import {
  codes,
  type Code,
  type Construct,
  type Effects,
  type State,
  type Token,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import { ok as assert } from 'devlop'

/**
 * The collating symbol construct.
 *
 * Within a bracket expression, *collating symbols* can be specified using the
 * syntax *`[.symbol.]`*, which matches the collating symbol *symbol*.
 *
 * @see {@linkcode Construct}
 *
 * @const {Construct} collatingSymbol
 */
const collatingSymbol: Construct = {
  partial: true,
  tokenize: tokenizeCollatingSymbol
}

export default collatingSymbol

/**
 * Tokenize a collating symbol.
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
function tokenizeCollatingSymbol(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {
  /**
   * The symbol value token.
   *
   * @var {Token | undefined} valueToken
   */
  let valueToken: Token | undefined = undefined

  /**
   * Whether a value has been seen inside the collating symbol.
   *
   * This prevents:
   *
   * ```markdown
   * > | [..]
   * ```
   *
   * from being treated as a valid collating symbol, while allowing:
   *
   * ```markdown
   * > | [...]
   * ```
   *
   * where `.` is the collating symbol value.
   *
   * @var {boolean} valueSeen
   */
  let valueSeen: boolean = false

  return collatingSymbol

  /**
   * At the beginning of a collating symbol.
   *
   * @example
   *  ```markdown
   *  > | [.ch.]
   *      ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [...]
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
  function collatingSymbol(this: void, code: Code): State | undefined {
    assert(code === codes.leftBracket, 'expected `codes.leftBracket`')

    effects.enter(tt.collatingSymbol)
    effects.consume(code)

    return afterOpener
  }

  /**
   * After the collating symbol opener.
   *
   * @example
   *  ```markdown
   *  > | [.ch.]
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [...]
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
    if (code !== codes.dot) return nok(code)
    return effects.consume(code), value
  }

  /**
   * Inside the symbol value.
   *
   * @example
   *  ```markdown
   *  > | [.ch.]
   *        ^^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [...]
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

    if (code === codes.dot && valueSeen) {
      assert(valueToken, 'expected collating symbol value token')

      effects.exit(tt.collatingSymbolValue)
      effects.consume(code)

      return afterValueCloser
    }

    valueToken ??= effects.enter(tt.collatingSymbolValue)
    return valueSeen = true, effects.consume(code), value
  }

  /**
   * After the symbol value closer.
   *
   * @example
   *  ```markdown
   *  > | [.ch.]
   *           ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [...]
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
    effects.exit(tt.collatingSymbol)

    return ok
  }
}
