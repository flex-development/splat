import type ct from '#tokenize/enums/ct'
import type tt from '#tokenize/enums/tt'
import type {} from '@flex-development/fsm-tokenizer'
import type {
  TokenizeOptions as Options
} from '@flex-development/splat/tokenize'

declare module '@flex-development/fsm-tokenizer' {
  interface ContentTypeMap {
    expression: ct.expression
    pattern: ct.pattern
  }

  interface TokenFields {
    /**
     * The value of the token.
     */
    value?: string | null | undefined
  }

  interface TokenInfo {
    /**
     * Whether an {@linkcode tt.asterisk} token represents a globstar.
     */
    globstar?: boolean | null | undefined
  }

  interface TokenTypeMap {
    asterisk: tt.asterisk
    bracketExpression: tt.bracketExpression
    bracketNegation: tt.bracketNegation
    characterClass: tt.characterClass
    characterClassValue: tt.characterClassValue
    chunkExpression: tt.chunkExpression
    collatingSymbol: tt.collatingSymbol
    collatingSymbolValue: tt.collatingSymbolValue
    eoc: tt.eoc
    equivalenceClass: tt.equivalenceClass
    equivalenceClassValue: tt.equivalenceClassValue
    escape: tt.escape
    escapeMarker: tt.escapeMarker
    escapeValue: tt.escapeValue
    literal: tt.literal
    patternNegation: tt.patternNegation
    questionMark: tt.questionMark
    rangeEnd: tt.rangeEnd
    rangeExpression: tt.rangeExpression
    rangeStart: tt.rangeStart
    separator: tt.separator
  }

  /**
   * The tokenization context.
   *
   * @see {@linkcode Options}
   *
   * @extends {Options}
   */
  interface TokenizeContext extends Options {}
}
