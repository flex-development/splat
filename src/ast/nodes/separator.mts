/**
 * @file Nodes - Separator
 * @module splat/ast/nodes/Separator
 */

import type { Data, Node } from '@flex-development/splat/ast'

/**
 * Info associated with separators.
 *
 * @see {@linkcode Data}
 *
 * @extends {Data}
 */
interface SeparatorData extends Data {}

/**
 * A pattern segment separator.
 *
 * @example
 *  '/'
 * @example
 *  'src/**.mts'
 *
 * @see {@linkcode Node}
 *
 * @extends {Node}
 */
interface Separator extends Node {
  /**
   * Info from the ecosystem.
   *
   * @see {@linkcode SeparatorData}
   *
   * @override
   */
  data?: SeparatorData | undefined

  /**
   * The node type.
   *
   * @override
   */
  type: 'separator'
}

export type { Separator as default, SeparatorData }
