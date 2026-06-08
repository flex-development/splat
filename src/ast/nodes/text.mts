/**
 * @file Nodes - Text
 * @module splat/ast/nodes/Text
 */

import type { Data, Literal } from '@flex-development/splat/ast'

/**
 * Info associated with plaintext.
 *
 * @see {@linkcode Data}
 *
 * @extends {Data}
 */
interface TextData extends Data {}

/**
 * A character, or sequence of characters, considered to be plaintext.
 *
 * @example
 *  'src'
 *
 * @see {@linkcode Literal}
 *
 * @extends {Literal}
 */
interface Text extends Literal {
  /**
   * Info from the ecosystem.
   *
   * @see {@linkcode TextData}
   *
   * @override
   */
  data?: TextData | undefined

  /**
   * The node type.
   *
   * @override
   */
  type: 'text'

  /**
   * The plaintext.
   *
   * @override
   */
  value: string
}

export type { Text as default, TextData }
