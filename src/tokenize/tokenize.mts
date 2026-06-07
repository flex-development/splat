/**
 * @file tokenize
 * @module splat/tokenize/tokenize
 */

import { codes, type Chunk, type Event } from '@flex-development/fsm-tokenizer'
import type { TokenizeOptions } from '@flex-development/splat/tokenize'
import createTokenizer from './create-tokenizer.mts'
import nil from './internal/nil.mts'

export default tokenize

/**
 * Tokenize a glob pattern.
 *
 * @see {@linkcode Event}
 * @see {@linkcode TokenizeOptions}
 *
 * @this {void}
 *
 * @param {unknown} input
 *  The pattern to tokenize.
 *  Non-string values will be converted to strings
 * @param {TokenizeOptions | null | undefined} [options]
 *  Options for tokenizing the `input` pattern
 * @return {Event[]}
 *  The list of events
 */
function tokenize(
  this: void,
  input: unknown,
  options?: TokenizeOptions | null | undefined
): Event[] {
  /**
   * The chunks to write.
   *
   * @var {Chunk[]} chunks
   */
  let chunks: Chunk[] = [codes.eos]

  // add input pattern chunk, skip if `input` is `null` or `undefined`.
  if (!nil(input)) chunks.unshift(String(input))

  return createTokenizer(options).write(chunks)
}
