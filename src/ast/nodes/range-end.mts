/**
 * @file Nodes - RangeEnd
 * @module splat/ast/nodes/RangeEnd
 */

import type { Data, Literal } from '@flex-development/splat/ast'

/**
 * Info associated with range end points.
 *
 * @see {@linkcode Data}
 *
 * @extends {Data}
 */
interface RangeEndData extends Data {}

/**
 * The end of a range.
 *
 * @see {@linkcode Literal}
 *
 * @extends {Literal}
 */
interface RangeEnd extends Literal {
  /**
   * Info from the ecosystem.
   *
   * @see {@linkcode RangeEndData}
   *
   * @override
   */
  data?: RangeEndData | undefined

  /**
   * The node type.
   *
   * @override
   */
  type: 'rangeEnd'

  /**
   * The end value of the range.
   *
   * @override
   */
  value: number | string
}

export type { RangeEnd as default, RangeEndData }
