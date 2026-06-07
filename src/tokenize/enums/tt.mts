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
  asterisk = 'asterisk',
  chunkExpression = 'chunkExpression',
  eoc = 'eoc',
  escape = 'escape',
  escapeMarker = 'escapeMarker',
  escapeValue = 'escapeValue',
  literal = 'literal',
  patternNegation = 'patternNegation',
  questionMark = 'questionMark',
  separator = 'separator'
}

export default tt
