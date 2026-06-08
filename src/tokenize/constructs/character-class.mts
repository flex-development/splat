/**
 * @file Constructs - characterClass
 * @module splat/tokenize/constructs/characterClass
 */

import tt from '#tokenize/enums/tt'
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
import { asciiAlpha } from 'micromark-util-character'

/**
 * The character class construct.
 *
 * Within a bracket expression, *character classes* can be specified using the
 * syntax `[:class:]`, where `class` is one of the following classes defined in
 * the POSIX standard:
 *
 * - `alnum`
 * - `alpha`
 * - `ascii`
 * - `blank`
 * - `cntrl`
 * - `digit`
 * - `graph`
 * - `lower`
 * - `print`
 * - `punct`
 * - `space`
 * - `upper`
 * - `word`
 * - `xdigit`
 *
 * @see {@linkcode Construct}
 *
 * @const {Construct} characterClass
 */
const characterClass: Construct = {
  partial: true,
  tokenize: tokenizeCharacterClass
}

export default characterClass

/**
 * Tokenize a character class.
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
function tokenizeCharacterClass(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {
  /**
   * The class value token.
   *
   * @var {Token | undefined} valueToken
   */
  let valueToken: Token | undefined = undefined

  return characterClass

  /**
   * At the beginning of a character class.
   *
   * @example
   *  ```markdown
   *  > | [[:alpha:]]
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [[:space:]][[:upper:]!].[-[:lower:]]
   *       ^          ^             ^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function characterClass(this: void, code: Code): State | undefined {
    assert(code === codes.leftBracket, 'expected `codes.leftBracket`')
    return effects.enter(tt.characterClass), effects.consume(code), afterOpener
  }

  /**
   * After a class opener.
   *
   * @example
   *  ```markdown
   *  > | [[:alpha:]]
   *        ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [[:space:]][[:upper:]!].[-[:lower:]]
   *        ^          ^             ^
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
    if (code !== codes.colon) return nok(code)
    return effects.consume(code), value
  }

  /**
   * Inside a character class value.
   *
   * @example
   *  ```markdown
   *  > | [[:alpha:]]
   *         ^^^^^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [[:space:]][[:upper:]!].[-[:lower:]]
   *         ^^^^^      ^^^^^         ^^^^^
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
    if (asciiAlpha(code)) {
      valueToken ??= effects.enter(tt.characterClassValue)
      return effects.consume(code), value
    }

    if (code === codes.colon) {
      assert(valueToken, 'expected character class value token')
      effects.exit(tt.characterClassValue)
      effects.consume(code)
      return afterValueCloser
    }

    return nok(code)
  }

  /**
   * After a class value closer.
   *
   * @example
   *  ```markdown
   *  > | [[:alpha:]]
   *               ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [[:space:]][[:upper:]!].[-[:lower:]]
   *               ^          ^             ^
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
    effects.exit(tt.characterClass)
    return ok
  }
}
