/**
 * @file Nodes - Parent
 * @module splat/ast/nodes/Parent
 */

import type { Child, Node } from '@flex-development/splat/ast'

/**
 * A node containing other nodes.
 *
 * @see {@linkcode Node}
 *
 * @extends {Node}
 */
interface Parent extends Node {
  /**
   * The list of children.
   *
   * @see {@linkcode Node}
   */
  children: Child[]
}

export type { Parent as default }
