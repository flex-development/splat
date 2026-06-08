/**
 * @file Constructs - bracketNegation
 * @module splat/tokenize/constructs/bracketNegation
 */

import tt from '#tokenize/enums/tt'
import {
  codes,
  ev,
  type Code,
  type Effects,
  type Event,
  type PartialConstruct,
  type State,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'

/**
 * The bracket negation construct.
 *
 * @see {@linkcode PartialConstruct}
 *
 * @const {PartialConstruct} bracketNegation
 */
const bracketNegation: PartialConstruct = {
  partial: true,
  previous: previousNegation,
  tokenize: tokenizeBracketNegation
}

export default bracketNegation

/**
 * Check if a character `code` represents a negation marker.
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code
 *  The current character code
 * @return {boolean}
 *  `true` if `code` is {@linkcode codes.caret} or {@linkcode codes.exclamation}
 */
function marker(this: TokenizeContext, code: Code): boolean {
  return code === codes.caret || code === codes.exclamation
}

/**
 * Check if the previous character `code` can precede this construct.
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code
 *  The previous character code
 * @return {boolean}
 *  `true` if `code` is {@linkcode codes.leftBracket}
 *  and at the beginning of a bracket expression
 */
function previousNegation(this: TokenizeContext, code: Code): boolean {
  /**
   * The last event.
   *
   * @const {Event | undefined} lastEvent
   */
  const lastEvent: Event | undefined = this.events.at(-1)

  return (
    code === codes.leftBracket &&
    this.currentConstruct?.name === tt.bracketExpression &&
    lastEvent?.[0] === ev.enter &&
    lastEvent[1].type === tt.bracketExpression
  )
}

/**
 * Tokenize a bracket negation.
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
function tokenizeBracketNegation(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {
  /**
   * The tokenize context.
   *
   * @const {TokenizeContext} self
   */
  const self: TokenizeContext = this

  return bracketNegation

  /**
   * At a negation marker.
   *
   * @example
   *  ```markdown
   *  > | [!abc]
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [^xyz]
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
  function bracketNegation(this: void, code: Code): State | undefined {
    if (!marker.call(self, code)) return nok(code)

    effects.enter(tt.bracketNegation)
    effects.consume(code)
    effects.exit(tt.bracketNegation)

    return ok
  }
}
