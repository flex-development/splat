/**
 * @file Unit Tests - separator
 * @module splat/tokenize/constructs/tests/integration/separator
 */

import snapshot from '#tests/utils/snapshot-events'
import tt from '#tokenize/enums/tt'
import {
  chars,
  codes,
  createTokenizer,
  initialize,
  tokenize,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import pathe from '@flex-development/pathe'
import tsconfig from '../../../../tsconfig.build.json'
import testSubject from '../separator.mts'

describe('integration:tokenize/constructs/separator', () => {
  let context: TokenizeContext

  beforeEach(() => {
    context = createTokenizer({
      debug: pathe.basename(import.meta.url),
      initial: initialize({ [codes.slash]: testSubject })
    })
  })

  it.each<[string | null | undefined]>([
    [null],
    [chars.backslash + chars.slash],
    [chars.asterisk + chars.dot + chars.lowercaseH]
  ])('should produce no events without valid path separator (%j)', chunks => {
    expect(tokenize(chunks, context)).to.be.an('array').that.is.empty
  })

  it.each<[string]>([
    [chars.slash],
    [tsconfig.include[0]!]
  ])('should tokenize path separator (%j)', chunks => {
    // Act
    const result = tokenize(chunks, context)

    // Expect
    expect(context).to.not.have.property('wild')
    expect(result).to.each.have.nested.property('1.type', tt.separator)
    expect(result).to.each.have.nested.property('1.value').be.a('string')
    expect(snapshot(result)).toMatchSnapshot()
  })
})
