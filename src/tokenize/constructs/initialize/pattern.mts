/**
 * @file Constructs - pattern
 * @module splat/tokenize/constructs/initialize/pattern
 */

import ct from '#tokenize/enums/ct'
import tt from '#tokenize/enums/tt'
import {
  codes,
  eos,
  ev,
  splice,
  type Code,
  type Effects,
  type Event,
  type InitialConstruct,
  type State,
  type Token,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import { ok as assert } from 'devlop'

/**
 * The initial pattern construct.
 *
 * @see {@linkcode InitialConstruct}
 *
 * @const {InitialConstruct} pattern
 */
const pattern: InitialConstruct = {
  resolveAll: resolveAllPattern,
  tokenize: tokenizePattern
}

export default pattern

/**
 * @this {void}
 *
 * @param {Event[]} events
 *  The current list of events
 * @param {TokenizeContext} context
 *  The tokenize context
 * @return {Event[]}
 *  The list of changed events
 */
function resolveAllPattern(
  this: void,
  events: Event[],
  context: TokenizeContext
): Event[] {
  /**
   * The index of the current event.
   *
   * @var {number} index
   */
  let index: number = -1

  /**
   * Whether a wildcard token was encountered.
   *
   * @var {boolean} wild
   */
  let wild: boolean = false

  while (++index < events.length) {
    assert(events[index], 'expected events[index]')
    const [event, token, self] = events[index]!

    // remove content type events.
    if (token.contentType) {
      splice(events, index, 1)
      index--
    }

    // serialize tokens.
    if (event === ev.enter && token.type !== tt.eoc) {
      token.value = self.sliceSerialize(token)

      // asterisk or sequence of asterisks seen.
      if (token.type === tt.asterisk) {
        assert(typeof token.value === 'string', 'expected `token.value`')
        token.globstar = token.value.length === 2 && !self.noglobstar
        self.wild = wild = true
        index++
      }

      // single question mark seen.
      if (token.type === tt.questionMark) {
        self.wild = wild = true
        index++
      }
    }
  }

  return context.wild = wild, events
}

/**
 * @this {TokenizeContext}
 *
 * @param {Effects} effects
 *  The context object to transition the state machine
 * @return {State}
 *  The initial state
 */
function tokenizePattern(this: TokenizeContext, effects: Effects): State {
  /**
   * The tokenize context.
   *
   * @const {TokenizeContext} self
   */
  const self: TokenizeContext = this

  /**
   * The expression tokenization context.
   *
   * @var {TokenizeContext | undefined} child
   */
  let child: TokenizeContext | undefined

  /**
   * Whether codes are being consumed as expressions.
   *
   * @var {boolean} eating
   */
  let eating: boolean = false

  return check

  /**
   * Try constructs.
   *
   * > 👉 **Note**: Constructs are checked before being attempted so expressions
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
      self.parser.constructs.pattern,
      attempt, // attempt confirmed construct.
      eating ? swallow : eat // continue or start expression.
    )(code)
  }

  /**
   * Attempt a construct after confirming one can start.
   *
   * > 👉 **Note**: Expressions are closed here instead of before calls to
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
    if (eating) dump() // no need to check for `eos` code; construct confirmed.
    return effects.attempt(self.parser.constructs.pattern, check, eat)(code)
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

    // exit expression.
    if (eating) dump(true)

    // mark end of content.
    effects.enter(tt.eoc)
    effects.consume(code)
    effects.exit(tt.eoc)

    return void code
  }

  /**
   * Consume `code` as a part of a new expression.
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

    // start new expression tokenizer at current point in pattern.
    child ??= self.parser.expression(self.now())

    // start new expression and consume first code.
    return eating = true, plate(), swallow(code)
  }

  /**
   * Consume `code` as part of an expression and recheck constructs.
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
    return effects.consume(code), check
  }

  /**
   * Start an expression.
   *
   * @this {void}
   *
   * @return {Token}
   *  The open token
   */
  function plate(this: void): Token {
    return effects.enter(tt.chunkExpression, { contentType: ct.expression })
  }

  /**
   * Close an expression.
   *
   * @this {void}
   *
   * @param {boolean} [end]
   *  Whether the end of stream has been reached
   * @return {undefined}
   */
  function dump(this: void, end?: boolean): undefined {
    return eating = false, void feed(effects.exit(tt.chunkExpression), end)
  }

  /**
   * Write to {@linkcode child}.
   *
   * @this {void}
   *
   * @param {Token} token
   *  The token to write
   * @param {boolean | null | undefined} [end]
   *  Whether the token is at the end of stream
   * @return {undefined}
   */
  function feed(
    this: void,
    token: Token,
    end?: boolean | null | undefined
  ): undefined {
    assert(child, 'expected `child` when feeding')

    child.write(self.sliceStream(token))
    child.write(end ? codes.eos : codes.break)

    return flush(), child = undefined
  }

  /**
   * Collect child events.
   *
   * @this {void}
   *
   * @return {undefined}
   */
  function flush(this: void): undefined {
    assert(child, 'expected `child` when flushing')
    splice(self.events, self.events.length - 1, 0, child.events)
    return void 0
  }
}
