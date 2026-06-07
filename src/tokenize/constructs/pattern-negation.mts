/**
 * @file Constructs - patternNegation
 * @module splat/tokenize/constructs/patternNegation
 */

import tt from '#tokenize/enums/tt'
import {
  codes,
  eos,
  type Code,
  type Effects,
  type NamedConstruct,
  type State,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import { ok as assert } from 'devlop'

/**
 * The pattern negation construct.
 *
 * @const {NamedConstruct} patternNegation
 */
const patternNegation: NamedConstruct = {
  name: tt.patternNegation,
  previous: previousPatternNegation,
  tokenize: tokenizePatternNegation
}

export default patternNegation

/**
 * Check if the previous character `code` can precede this construct.
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code
 *  The previous character code
 * @return {boolean}
 *  `true` if `code` is {@linkcode codes.eos}, `false` otherwise
 */
function previousPatternNegation(this: TokenizeContext, code: Code): boolean {
  return code === codes.eos
}

/**
 * Tokenize a pattern negation.
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
function tokenizePatternNegation(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {
  return patternNegation

  /**
   * At a negation marker.
   *
   * @example
   *  ```markdown
   *  > | !dist/index.mjs
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
  function patternNegation(this: void, code: Code): State | undefined {
    assert(code === codes.exclamation, 'expected `codes.exclamation`')

    effects.enter(tt.patternNegation)
    effects.consume(code)
    effects.exit(tt.patternNegation)

    return afterMarker
  }

  /**
   * After possible negation marker.
   *
   * @example
   *  ```markdown
   *  > | !
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | !dist/index.mjs
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
  function afterMarker(this: void, code: Code): State | undefined {
    return (eos(code) ? nok : ok)(code)
  }
}
