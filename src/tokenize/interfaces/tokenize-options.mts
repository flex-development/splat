/**
 * @file Interfaces - TokenizeOptions
 * @module splat/tokenize/interfaces/TokenizeOptions
 */

import type { Point } from '@flex-development/fsm-tokenizer'

/**
 * Options used for tokenizing glob patterns.
 */
interface TokenizeOptions {
  /**
   * The point before the first character in the pattern.
   *
   * @see {@linkcode Point}
   */
  from?: Point | null | undefined

  /**
   * Whether to disable support for globstars (`**`).
   */
  noglobstar?: boolean | null | undefined

  /**
   * Whether to disable support for pattern negation.
   */
  nonegate?: boolean | null | undefined
}

export type { TokenizeOptions as default }
