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
  bracketExpression = 'bracketExpression',
  bracketNegation = 'bracketNegation',
  characterClass = 'characterClass',
  characterClassValue = 'characterClassValue',
  chunkExpression = 'chunkExpression',
  collatingSymbol = 'collatingSymbol',
  collatingSymbolValue = 'collatingSymbolValue',
  eoc = 'eoc',
  equivalenceClass = 'equivalenceClass',
  equivalenceClassValue = 'equivalenceClassValue',
  escape = 'escape',
  escapeMarker = 'escapeMarker',
  escapeValue = 'escapeValue',
  literal = 'literal',
  patternNegation = 'patternNegation',
  questionMark = 'questionMark',
  rangeEnd = 'rangeEnd',
  rangeExpression = 'rangeExpression',
  rangeStart = 'rangeStart',
  separator = 'separator'
}

export default tt
