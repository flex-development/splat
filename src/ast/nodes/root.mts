/**
 * @file Nodes - Root
 * @module splat/ast/nodes/Root
 */

import type {
  Parent,
  PatternContent,
  PatternData
} from '@flex-development/splat/ast'

/**
 * Info associated with glob patterns.
 *
 * @see {@linkcode PatternData}
 *
 * @extends {PatternData}
 */
interface RootData extends PatternData {}

/**
 * A glob pattern.
 *
 * > 👉 **Note**: Must not be used as a child.
 *
 * @see {@linkcode Parent}
 *
 * @extends {Parent}
 */
interface Root extends Parent {
  /**
   * The list of children.
   *
   * @see {@linkcode PatternContent}
   *
   * @override
   */
  children: PatternContent[]

  /**
   * Info from the ecosystem.
   *
   * @see {@linkcode RootData}
   *
   * @override
   */
  data?: RootData | undefined

  /**
   * The node type.
   *
   * @override
   */
  type: 'root'
}

export type { Root as default, RootData }
