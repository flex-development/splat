/**
 * @file Enums - tt
 * @module splat/tokenize/enums/tt
 */

import type { TokenType } from '@flex-development/fsm-tokenizer'

/**
 * Token types.
 *
 * @enum {TokenType}
 */
enum tt {
  /**
   * A question mark.
   */
  questionMark = 'questionMark',

  /**
   * A path separator.
   */
  separator = 'separator'
}

export default tt
