/**
 * @file Content - bracketExpression
 * @module splat/ast/content/bracketExpression
 */

import type {
  CharacterClass,
  CollatingSymbol,
  EquivalenceClass,
  Negation,
  RangeExpression,
  Wildcard
} from '@flex-development/splat/ast'

/**
 * Union of registered nodes that can occur where bracket expression content
 * is expected.
 *
 * To register custom nodes, augment {@linkcode BracketExpressionContentMap}.
 * They will be added to this union automatically.
 */
type BracketExpressionContent =
  BracketExpressionContentMap[keyof BracketExpressionContentMap]

/**
 * Registry of nodes that can occur where {@linkcode BracketExpressionContent}
 * is expected.
 *
 * This interface can be augmented to register custom nodes.
 *
 * @example
 *  declare module '@flex-development/splat/ast' {
 *    interface BracketExpressionContentMap {
 *      custom: CustomNode
 *    }
 *  }
 */
interface BracketExpressionContentMap {
  characterClass: CharacterClass
  collatingSymbol: CollatingSymbol
  equivalenceClass: EquivalenceClass
  negation: Negation
  rangeExpression: RangeExpression
  wildcard: Wildcard
}

export type { BracketExpressionContent, BracketExpressionContentMap }
