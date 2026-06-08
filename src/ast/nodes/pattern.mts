/**
 * @file Nodes - Pattern
 * @module splat/ast/nodes/Pattern
 */

import type { Data, Parent, PatternContent } from '@flex-development/splat/ast'

/**
 * Info associated with glob patterns.
 *
 * @see {@linkcode Data}
 *
 * @extends {Data}
 */
interface PatternData extends Data {}

/**
 * A glob pattern.
 *
 * > 👉 **Note**: Must not be used as a child.
 *
 * @see {@linkcode Parent}
 *
 * @extends {Parent}
 */
interface Pattern extends Parent {
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
   * @see {@linkcode PatternData}
   *
   * @override
   */
  data?: PatternData | undefined

  /**
   * The node type.
   *
   * @override
   */
  type: 'pattern'
}

export type { Pattern as default, PatternData }
