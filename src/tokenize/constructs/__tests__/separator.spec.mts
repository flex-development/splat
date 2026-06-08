/**
 * @file Unit Tests - separator
 * @module splat/tokenize/constructs/tests/unit/separator
 */

import tt from '#tokenize/enums/tt'
import {
  chars,
  codes,
  createTokenizer,
  initialize,
  type Chunk,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import tsconfig from '../../../../tsconfig.build.json'
import testSubject from '../separator.mts'

describe('unit:tokenize/constructs/separator', () => {
  let context: TokenizeContext

  beforeEach(() => {
    context = createTokenizer({
      initialize: initialize({ [codes.slash]: testSubject })
    })
  })

  it('should be unnamed `Construct`', () => {
    expect(testSubject).to.not.have.property('name')
    expect(testSubject).to.have.property('tokenize').be.a('function')
    expect(testSubject.tokenize.name).to.eq('tokenizeSeparator')
  })

  it.each<[slice: Chunk]>([
    [chars.backslash],
    [chars.digit0]
  ])('should not produce events without separators (%j)', slice => {
    expect(context.write([slice, codes.eos])).to.be.an('array').that.is.empty
  })

  it.each<[slice: Chunk]>([
    [chars.slash],
    [chars.slash.repeat(3)],
    [tsconfig.include[1]!]
  ])('should tokenize separators (%j)', slice => {
    // Act
    const result = context.write([slice, codes.eos])

    // Expect
    expect(result).to.have.property('length').be.at.least(2)
    expect(result).to.each.have.nested.property('1.type', tt.separator)
  })
})
