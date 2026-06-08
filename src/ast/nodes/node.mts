/**
 * @file Nodes - Node
 * @module splat/ast/nodes/Node
 */

import type { Data } from '@flex-development/splat/ast'
import type unist from 'unist'

/**
 * An abstract node.
 *
 * @see {@linkcode unist.Node}
 *
 * @extends {unist.Node}
 */
interface Node extends unist.Node {
  /**
   * Info from the ecosystem.
   *
   * @see {@linkcode Data}
   */
  data?: Data | undefined

  /**
   * The location of the node in the source content.
   *
   * > 👉 **Note**: Nodes that are [*generated*][generated]
   * > must not have a position.
   *
   * [generated]: https://github.com/syntax-tree/unist#generated
   *
   * @see {@linkcode unist.Position}
   */
  position?: unist.Position | undefined
}

export type { Node as default }
