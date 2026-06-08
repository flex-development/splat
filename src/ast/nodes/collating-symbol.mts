/**
 * @file Nodes - CollatingSymbol
 * @module splat/ast/nodes/CollatingSymbol
 */

import type { Data, Literal } from '@flex-development/splat/ast'

/**
 * Info associated with collating symbols.
 *
 * @see {@linkcode Data}
 *
 * @extends {Data}
 */
interface CollatingSymbolData extends Data {}

/**
 * A collating symbol.
 *
 * @example
 *  '[.ch.]'
 *
 * @see {@linkcode Literal}
 *
 * @extends {Literal}
 */
interface CollatingSymbol extends Literal {
  /**
   * Info from the ecosystem.
   *
   * @see {@linkcode CollatingSymbolData}
   *
   * @override
   */
  data?: CollatingSymbolData | undefined

  /**
   * The node type.
   *
   * @override
   */
  type: 'collatingSymbol'

  /**
   * The symbol value.
   *
   * @example
   *  'ch'
   *
   * @override
   */
  value: string
}

export type { CollatingSymbolData, CollatingSymbol as default }
