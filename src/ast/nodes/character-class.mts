/**
 * @file Nodes - CharacterClass
 * @module splat/ast/nodes/CharacterClass
 */

import type { Data, Literal } from '@flex-development/splat/ast'

/**
 * Info associated with character classes.
 *
 * @see {@linkcode Data}
 *
 * @extends {Data}
 */
interface CharacterClassData extends Data {}

/**
 * A character class.
 *
 * @example
 *  '[:alpha:]'
 *
 * @see {@linkcode Literal}
 *
 * @extends {Literal}
 */
interface CharacterClass extends Literal {
  /**
   * Info from the ecosystem.
   *
   * @see {@linkcode CharacterClassData}
   *
   * @override
   */
  data?: CharacterClassData | undefined

  /**
   * The node type.
   *
   * @override
   */
  type: 'characterClass'

  /**
   * The class value.
   *
   * @example
   *  'alpha'
   *
   * @override
   */
  value: string
}

export type { CharacterClassData, CharacterClass as default }
