/**
 * @file Internal - isBreak
 * @module splat/tokenize/internal/isBreak
 */

import { codes, eos, type Code } from '@flex-development/fsm-tokenizer'

/**
 * Check if a character `code` represents a stream break or the end of stream.
 *
 * @this {void}
 *
 * @param {Code} code
 *  The character code to check
 * @return {boolean}
 *  `true` if `code` is {@linkcode codes.break} or {@linkcode codes.eos}
 */
function isBreak(
  this: void,
  code: Code
): code is typeof codes.break | typeof codes.eos {
  return code === codes.break || eos(code)
}

export default isBreak
