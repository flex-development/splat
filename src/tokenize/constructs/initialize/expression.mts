/**
 * @file Constructs - expression
 * @module splat/tokenize/constructs/initialize/expression
 */

import tt from '#tokenize/enums/tt'
import {
  codes,
  eos,
  type Code,
  type Effects,
  type InitialConstruct,
  type State,
  type Token,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import { ok as assert } from 'devlop'

/**
 * The initial expression construct.
 *
 * @see {@linkcode InitialConstruct}
 *
 * @const {InitialConstruct} expression
 */
const expression: InitialConstruct = { tokenize: tokenizeExpression }

export default expression

/**
 * @this {TokenizeContext}
 *
 * @param {Effects} effects
 *  The context object to transition the state machine
 * @return {State}
 *  The initial state
 */
function tokenizeExpression(this: TokenizeContext, effects: Effects): State {
  /**
   * The tokenize context.
   *
   * @const {TokenizeContext} self
   */
  const self: TokenizeContext = this

  /**
   * Whether codes are being consumed as literals.
   *
   * @var {boolean} eating
   */
  let eating: boolean = false

  return check

  /**
   * Try constructs.
   *
   * > 👉 **Note**: Constructs are checked before being attempted so literals
   * > are not exited unless a construct can actually start at `code`.
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function check(this: void, code: Code): State | undefined {
    if (eos(code)) return end(code)

    return effects.check(
      self.parser.constructs.expression,
      attempt, // attempt confirmed construct.
      eating ? swallow : eat // start or continue literal.
    )(code)
  }

  /**
   * Attempt a construct after confirming one can start.
   *
   * > 👉 **Note**: Literals are closed here instead of before calls to
   * > {@linkcode effects.check} in {@linkcode check} because checks revert
   * > tokenizer events, but they do not revert local variables captured by the
   * > state machine.
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function attempt(this: void, code: Code): State | undefined {
    if (eating) dump()
    return effects.attempt(self.parser.constructs.expression, check)(code)
  }

  /**
   * Handle end of content.
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function end(this: void, code: Code): State | undefined {
    assert(eos(code), 'expected end of content')
    return eating && dump(), effects.consume(code), end
  }

  /**
   * Consume `code` as a part of a literal.
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function eat(this: void, code: Code): State | undefined {
    assert(!eos(code), 'did not expect `codes.eos`')

    // start new literal.
    if (code !== codes.break) {
      eating = true
      plate()
    }

    // start new literal and consume first code.
    // return eating = true, plate(), swallow(code)
    return swallow(code)
  }

  /**
   * Consume `code` as part of a literal and recheck constructs.
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function swallow(this: void, code: Code): State | undefined {
    assert(!eos(code), 'did not expect `codes.eos`')

    // at end of an expression, but not at end of stream.
    if (code === codes.break && eating) dump()

    // consume character code.
    effects.consume(code)

    return check
  }

  /**
   * Start a literal.
   *
   * @this {void}
   *
   * @return {Token}
   *  The open token
   */
  function plate(this: void): Token {
    return effects.enter(tt.literal)
  }

  /**
   * Close a literal.
   *
   * @this {void}
   *
   * @return {undefined}
   */
  function dump(this: void): undefined {
    return eating = false, void effects.exit(tt.literal)
  }
}
