/**
 * @file Nodes - RangeStart
 * @module splat/ast/nodes/RangeStart
 */

import type { Data, Literal } from '@flex-development/splat/ast'

/**
 * Info associated with range start points.
 *
 * @see {@linkcode Data}
 *
 * @extends {Data}
 */
interface RangeStartData extends Data {}

/**
 * The beginning of a range.
 *
 * @see {@linkcode Literal}
 *
 * @extends {Literal}
 */
interface RangeStart extends Literal {
  /**
   * Info from the ecosystem.
   *
   * @see {@linkcode RangeStartData}
   *
   * @override
   */
  data?: RangeStartData | undefined

  /**
   * The node type.
   *
   * @override
   */
  type: 'rangeStart'

  /**
   * The starting value of the range.
   *
   * @override
   */
  value: number | string
}

export type { RangeStart as default, RangeStartData }
