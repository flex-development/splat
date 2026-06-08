/**
 * @file Nodes - Escape
 * @module splat/ast/nodes/Escape
 */

import type { Data, Literal } from '@flex-development/splat/ast'

/**
 * Info associated with character escapes.
 *
 * @see {@linkcode Data}
 *
 * @extends {Data}
 */
interface EscapeData extends Data {}

/**
 * A character escape.
 *
 * @example
 *  '\\*'
 * @example
 *  'src/pages/\[*\].md'
 *
 * @see {@linkcode Literal}
 *
 * @extends {Literal}
 */
interface Escape extends Literal {
  /**
   * Info from the ecosystem.
   *
   * @see {@linkcode EscapeData}
   *
   * @override
   */
  data?: EscapeData | undefined

  /**
   * The node type.
   *
   * @override
   */
  type: 'escape'

  /**
   * The escaped character.
   *
   * @example
   *  '*'
   *
   * @override
   */
  value: string
}

export type { Escape as default, EscapeData }
