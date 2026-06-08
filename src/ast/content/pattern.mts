/**
 * @file Content - pattern
 * @module splat/ast/content/pattern
 */

import type {
  BracketExpression,
  Escape,
  Negation,
  Separator,
  Text,
  Wildcard
} from '@flex-development/splat/ast'

/**
 * Union of registered nodes that can occur where pattern content is expected.
 *
 * To register custom nodes, augment {@linkcode PatternContentMap}.
 * They will be added to this union automatically.
 */
type PatternContent = PatternContentMap[keyof PatternContentMap]

/**
 * Registry of nodes that can occur where {@linkcode PatternContent}
 * is expected.
 *
 * This interface can be augmented to register custom nodes.
 *
 * @example
 *  declare module '@flex-development/splat/ast' {
 *    interface PatternContentMap {
 *      custom: CustomNode
 *    }
 *  }
 */
interface PatternContentMap {
  bracketExpression: BracketExpression
  escape: Escape
  negation: Negation
  separator: Separator
  text: Text
  wildcard: Wildcard
}

export type { PatternContent, PatternContentMap }
