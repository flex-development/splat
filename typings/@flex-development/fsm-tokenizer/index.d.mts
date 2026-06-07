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
    chunkExpression: tt.chunkExpression
    eoc: tt.eoc
    escape: tt.escape
    escapeMarker: tt.escapeMarker
    escapeValue: tt.escapeValue
    literal: tt.literal
    patternNegation: tt.patternNegation
    questionMark: tt.questionMark
    separator: tt.separator
  }

  /**
   * The tokenization context.
   *
   * @see {@linkcode Options}
   *
   * @extends {Options}
   */
  interface TokenizeContext extends Options {
    /**
     * Whether the input pattern contains at least one wildcard character.
     */
    wild?: boolean | null | undefined
  }
}
