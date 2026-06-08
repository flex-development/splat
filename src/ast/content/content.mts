/**
 * @file Content - content
 * @module splat/ast/content/content
 */

import type {
  BracketExpressionContent,
  PatternContent
} from '@flex-development/splat/ast'

/**
 * Union of registered content model nodes.
 *
 * Nodes are grouped by content type, if applicable.
 * Each node in `globtree` falls into one or more categories of `Content`.
 *
 * @see {@linkcode BracketExpressionContent}
 * @see {@linkcode PatternContent}
 */
type Content = BracketExpressionContent | PatternContent

export type { Content as default }
