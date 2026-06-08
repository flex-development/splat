/**
 * @file Nodes - Literal
 * @module splat/ast/nodes/Literal
 */

import type { Node } from '@flex-development/splat/ast'

/**
 * A node containing the smallest possible value.
 *
 * @see {@linkcode Node}
 *
 * @extends {Node}
 */
interface Literal extends Node {
  /**
   * The value.
   */
  value: number | string | null | undefined
}

export type { Literal as default }
