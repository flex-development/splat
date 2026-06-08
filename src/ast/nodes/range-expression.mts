/**
 * @file Nodes - RangeExpression
 * @module splat/ast/nodes/RangeExpression
 */

import type {
  Data,
  Parent,
  RangeEnd,
  RangeStart
} from '@flex-development/splat/ast'

/**
 * Info associated with range expressions.
 *
 * @see {@linkcode Data}
 *
 * @extends {Data}
 */
interface RangeExpressionData extends Data {}

/**
 * A range expression.
 *
 * @see {@linkcode Parent}
 *
 * @extends {Parent}
 */
interface RangeExpression extends Parent {
  /**
   * The list of children.
   *
   * @see {@linkcode RangeEnd}
   * @see {@linkcode RangeStart}
   *
   * @override
   */
  children: [start: RangeStart, end: RangeEnd]

  /**
   * Info from the ecosystem.
   *
   * @see {@linkcode RangeExpressionData}
   *
   * @override
   */
  data?: RangeExpressionData | undefined

  /**
   * The node type.
   *
   * @override
   */
  type: 'rangeExpression'
}

export type { RangeExpression as default, RangeExpressionData }
