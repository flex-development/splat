/**
 * @file Nodes - Negation
 * @module splat/ast/nodes/Negation
 */

import type { Data, Literal } from '@flex-development/splat/ast'

/**
 * Info associated with negations.
 *
 * @see {@linkcode Data}
 *
 * @extends {Data}
 */
interface NegationData extends Data {}

/**
 * A pattern or bracket negation.
 *
 * @see {@linkcode Literal}
 *
 * @extends {Literal}
 */
interface Negation extends Literal {
  /**
   * Info from the ecosystem.
   *
   * @see {@linkcode NegationData}
   *
   * @override
   */
  data?: NegationData | undefined

  /**
   * The node type.
   *
   * @override
   */
  type: 'negation'

  /**
   * The negation marker.
   *
   * @override
   */
  value: string
}

export type { Negation as default, NegationData }
