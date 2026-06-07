/**
 * @file createTokenizer
 * @module splat/tokenize/createTokenizer
 */

import {
  createTokenizer as create,
  type InitialConstructs,
  type TokenizeContext,
  type TokenType
} from '@flex-development/fsm-tokenizer'
import type { TokenizeOptions } from '@flex-development/splat/tokenize'
import expression from './constructs/initialize/expression.mts'
import pattern from './constructs/initialize/pattern.mts'
import ct from './enums/ct.mts'
import tt from './enums/tt.mts'
import syntax from './syntax.mts'

export default createTokenizer

/**
 * Create a tokenizer.
 *
 * @see {@linkcode TokenizeContext}
 * @see {@linkcode TokenizeOptions}
 *
 * @this {void}
 *
 * @param {TokenizeOptions | null | undefined} [options]
 *  The tokenization options
 * @return {TokenizeContext}
 *  The tokenization context
 */
function createTokenizer(
  this: void,
  options?: TokenizeOptions | null | undefined
): TokenizeContext {
  /**
   * The list of disabled constructs.
   *
   * @const {Set<TokenType>} disable
   */
  const disable: Set<TokenType> = new Set<TokenType>()

  // disable support for negation with leading exclamation point.
  if (options?.nonegate) disable.add(tt.patternNegation)

  /**
   * The tokenization context.
   *
   * @const {TokenizeContext} context
   */
  const context: TokenizeContext = create({
    debug: 'splat',
    disable,
    extensions: syntax,
    finalizeContext,
    initialize
  })

  return context.parser.pattern(options?.from)

  /**
   * Finalize the tokenization context.
   *
   * @this {void}
   *
   * @param {TokenizeContext} self
   *  The base tokenize context
   * @return {undefined}
   */
  function finalizeContext(this: void, self: TokenizeContext): undefined {
    return void Object.assign(self, options)
  }

  /**
   * Create a record of initial constructs.
   *
   * @this {void}
   *
   * @return {InitialConstructs}
   *  The record of initial constructs
   */
  function initialize(this: void): InitialConstructs {
    return {
      [ct.pattern]: pattern,
      [ct.expression]: expression
    }
  }
}
