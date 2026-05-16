import type tt from '#tokenize/enums/tt'
import type {} from '@flex-development/fsm-tokenizer'

declare module '@flex-development/fsm-tokenizer' {
  interface TokenFields {
    /**
     * The value of the token.
     */
    value?: string | null | undefined
  }

  interface TokenTypeMap {
    questionMark: tt.questionMark
  }

  interface TokenizeContext {
    /**
     * Whether the input pattern contains at least one wildcard character.
     */
    wild?: boolean | null | undefined
  }
}
