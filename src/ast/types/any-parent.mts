/**
 * @file Type Aliases - AnyParent
 * @module splat/ast/types/AnyParent
 */

import type { Root } from '@flex-development/splat/ast'
import type { Parents } from '@flex-development/unist-util-types'

/**
 * Union of [*parents*][parent] that are [*inclusive descendants*][descendant]
 * of {@linkcode Root}.
 *
 * [descendant]: https://github.com/syntax-tree/unist#descendant
 * [parent]: https://github.com/syntax-tree/unist#parent
 *
 * @see {@linkcode Parents}
 * @see {@linkcode Root}
 */
type AnyParent = Parents<Root>

export type { AnyParent as default }
