/**
 * @file Constructs - bracketExpression
 * @module splat/tokenize/constructs/bracketExpression
 */

import tt from '#tokenize/enums/tt'
import isBreak from '#tokenize/internal/is-break'
import {
  codes,
  type Code,
  type ConstructRecord,
  type Effects,
  type NamedConstruct,
  type State,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import { ok as assert } from 'devlop'
import bracketNegation from './bracket-negation.mts'
import characterClass from './character-class.mts'
import collatingSymbol from './collating-symbol.mts'
import equivalenceClass from './equivalence-class.mts'
import rangeExpression from './range-expression.mts'

/**
 * The bracket expression construct.
 *
 * Bracket expressions match any one of the enclosed characters.
 *
 * Two characters separated by a hyphen (`-`) denotes a *range expression*; any
 * character that falls between those two characters, inclusive, using the
 * current locale’s collating sequence and character set, matches.
 *
 * If the first character following the opener (`[`) is a caret (`^`) or an
 * exclamation point (`!`), then any character not within the range matches.
 *
 * To match a hyphen (`-`), include it as the first or last character in the
 * set. To match a closing bracket (`]`), include it as the first character in
 * the set.
 *
 * @see {@linkcode NamedConstruct}
 *
 * @const {NamedConstruct} bracketExpression
 */
const bracketExpression: NamedConstruct = {
  name: tt.bracketExpression,
  tokenize: tokenizeBracketExpression
}

export default bracketExpression

/**
 * Tokenize a bracket expression.
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
function tokenizeBracketExpression(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {
  /**
   * A record of constructs representing structured content.
   *
   * Structured content includes constructs like:
   *
   * - {@linkcode characterClass}
   * - {@linkcode collatingSymbol}
   * - {@linkcode equivalenceClass}
   * - {@linkcode rangeExpression}
   *
   * @const {ConstructRecord} content
   */
  const content: ConstructRecord = {
    [codes.leftBracket]: [equivalenceClass, collatingSymbol, characterClass],
    null: [rangeExpression]
  }

  /**
   * Whether a value has been seen inside the bracket expression.
   *
   * This prevents:
   *
   * ```markdown
   * > | []
   * > | [!]
   * ```
   *
   * from being treated as valid expressions, while allowing:
   *
   * ```markdown
   * > | []]
   * > | [!]]
   * ```
   *
   * where `]` is the first literal value.
   *
   * @var {boolean} valueSeen
   */
  let valueSeen: boolean = false

  return bracketExpression

  /**
   * At the beginning of a bracket expression.
   *
   * @example
   *  ```markdown
   *  > | [abc]
   *      ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | src/**index.[cm]ts
   *                  ^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function bracketExpression(this: void, code: Code): State | undefined {
    assert(code === codes.leftBracket, 'expected `codes.leftBracket`')
    return effects.enter(tt.bracketExpression), effects.consume(code), afterOpen
  }

  /**
   * After a bracket expression opener.
   *
   * @example
   *  ```markdown
   *  > | []
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [!]
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | []]
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [abc]
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [!abc]
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [^abc]
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | src/**index.[cm]ts
   *                   ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | src/**index.[!c]ts
   *                   ^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function afterOpen(this: void, code: Code): State | undefined {
    if (isBreak(code)) return nok(code)
    return effects.attempt(bracketNegation, inside, inside)(code)
  }

  /**
   * Inside a bracket expression.
   *
   * @example
   *  ```markdown
   *  > | [ ]
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | []]
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [!]]
   *        ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [abc]
   *       ^^^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [[:space:]]
   *       ^^^^^^^^^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | src/**index.[cm]ts
   *                   ^^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | src/**index.[!c]ts
   *                    ^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function inside(this: void, code: Code): State | undefined {
    if (isBreak(code)) return nok(code)

    // a right bracket closes the expression
    // only after at least one value has been seen.
    if (code === codes.rightBracket && valueSeen) {
      effects.consume(code)
      effects.exit(tt.bracketExpression)
      return ok
    }

    return effects.attempt(content, afterContent, literalStart)(code)
  }

  /**
   * After structured bracket expression content.
   *
   * @example
   *  ```markdown
   *  > | [0-9]
   *          ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [[:space:]][[:upper:]!]
   *                           ^
   *  ```
   *
   * @this {void}
   *
   * @param {Code} code
   *  The current character code
   * @return {State | undefined}
   *  The next state
   */
  function afterContent(this: void, code: Code): State | undefined {
    return valueSeen = true, inside(code)
  }

  /**
   * At the beginning of bracket expression text.
   *
   * @example
   *  ```markdown
   *  > | [!]
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [abc]
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [-[:lower:]]
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
  function literalStart(this: void, code: Code): State | undefined {
    assert(code !== codes.break, 'did not expect `codes.break`')
    assert(code !== codes.eos, 'did not expect `codes.eos`')

    effects.enter(tt.literal)
    effects.consume(code)

    return valueSeen = true, literal
  }

  /**
   * Inside bracket expression text.
   *
   * Text is interrupted by:
   *
   * - a left bracket (`[`) that may begin a nested construct
   * - a right bracket (`]`) that may close the expression
   *
   * @example
   *  ```markdown
   *  > | [!]
   *       ^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [abc]
   *       ^^^
   *  ```
   *
   * @example
   *  ```markdown
   *  > | [-[:lower:]]
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
  function literal(this: void, code: Code): State | undefined {
    if (code === codes.leftBracket || code === codes.rightBracket) {
      effects.exit(tt.literal)
      return inside(code)
    }

    if (isBreak(code)) return nok(code)
    return effects.consume(code), literal
  }
}
