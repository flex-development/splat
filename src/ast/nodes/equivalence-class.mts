/**
 * @file Nodes - EquivalenceClass
 * @module splat/ast/nodes/EquivalenceClass
 */

import type { Data, Literal } from '@flex-development/splat/ast'

/**
 * Info associated with equivalence classes.
 *
 * @see {@linkcode Data}
 *
 * @extends {Data}
 */
interface EquivalenceClassData extends Data {}

/**
 * An equivalence class.
 *
 * @example
 *  '[=a=]'
 *
 * @see {@linkcode Literal}
 *
 * @extends {Literal}
 */
interface EquivalenceClass extends Literal {
  /**
   * Info from the ecosystem.
   *
   * @see {@linkcode EquivalenceClassData}
   *
   * @override
   */
  data?: EquivalenceClassData | undefined

  /**
   * The node type.
   *
   * @override
   */
  type: 'equivalenceClass'

  /**
   * The class value.
   *
   * @example
   *  'a'
   *
   * @override
   */
  value: string
}

export type { EquivalenceClass as default, EquivalenceClassData }
