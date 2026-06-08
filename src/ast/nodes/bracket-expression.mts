/**
 * @file Nodes - BracketExpression
 * @module splat/ast/nodes/BracketExpression
 */

import type {
  BracketExpressionContent,
  Data,
  Parent
} from '@flex-development/splat/ast'

/**
 * Info associated with bracket expression.
 *
 * @see {@linkcode Data}
 *
 * @extends {Data}
 */
interface BracketExpressionData extends Data {}

/**
 * A bracket expression.
 *
 * @see {@linkcode Parent}
 *
 * @extends {Parent}
 */
interface BracketExpression extends Parent {
  /**
   * The list of children.
   *
   * @see {@linkcode BracketExpressionContent}
   *
   * @override
   */
  children: BracketExpressionContent[]

  /**
   * Info from the ecosystem.
   *
   * @see {@linkcode BracketExpressionData}
   *
   * @override
   */
  data?: BracketExpressionData | undefined

  /**
   * The node type.
   *
   * @override
   */
  type: 'bracketExpression'
}

export type { BracketExpressionData, BracketExpression as default }
