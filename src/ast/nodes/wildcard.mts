/**
 * @file Nodes - Wildcard
 * @module splat/ast/nodes/Wildcard
 */

import type { Data, Literal } from '@flex-development/splat/ast'

/**
 * Info associated with wildcards.
 *
 * @see {@linkcode Data}
 *
 * @extends {Data}
 */
interface WildcardData extends Data {
  /**
   * Whether the wildcard represents a globstar.
   */
  globstar?: boolean | null | undefined
}

/**
 * A wildcard character, or sequence of characters (asterisks only).
 *
 * @example
 *  '*'
 * @example
 *  '***'
 * @example
 *  '?'
 *
 * @see {@linkcode Literal}
 *
 * @extends {Literal}
 */
interface Wildcard extends Literal {
  /**
   * Info from the ecosystem.
   *
   * @see {@linkcode WildcardData}
   *
   * @override
   */
  data?: WildcardData | undefined

  /**
   * The node type.
   *
   * @override
   */
  type: 'wildcard'

  /**
   * The wildcard character, or sequence of characters.
   *
   * @override
   */
  value: string
}

export type { Wildcard as default, WildcardData }
