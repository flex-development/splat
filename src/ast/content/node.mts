/**
 * @file Content - node
 * @module splat/ast/content/node
 */

import type {
  BracketExpressionContentMap,
  PatternContentMap,
  RangeEnd,
  RangeStart,
  Root
} from '@flex-development/splat/ast'

/**
 * Union of registered globtree nodes.
 *
 * To register custom globtree nodes, augment {@linkcode NodeMap}.
 * They will be added to this union automatically.
 */
type GlobTreeNode = NodeMap[keyof NodeMap]

/**
 * Registry of globtree nodes.
 *
 * This interface can be augmented to register custom nodes.
 *
 * @example
 *  declare module '@flex-development/splat/ast' {
 *    interface NodeMap {
 *      customNode: CustomNode
 *    }
 *  }
 *
 * @extends {BracketExpressionContentMap}
 * @extends {PatternContentMap}
 */
interface NodeMap extends BracketExpressionContentMap, PatternContentMap {
  rangeEnd: RangeEnd
  rangeStart: RangeStart
  root: Root
}

export type { GlobTreeNode, NodeMap }
