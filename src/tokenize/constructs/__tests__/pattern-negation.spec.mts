/**
 * @file Unit Tests - patternNegation
 * @module splat/tokenize/constructs/tests/unit/patternNegation
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
import testSubject from '../pattern-negation.mts'

describe('unit:constructs/patternNegation', () => {
  let context: TokenizeContext

  beforeEach(() => {
    context = createTokenizer({
      initialize: initialize({ [codes.exclamation]: testSubject })
    })
  })

  it('should be named `Construct`', () => {
    expect(testSubject).to.have.property('name', tt.patternNegation)
    expect(testSubject).to.have.property('tokenize').be.a('function')
    expect(testSubject.tokenize.name).to.eq('tokenizePatternNegation')
  })

  it.each<[chunk: Chunk]>([
    [chars.backslash + chars.exclamation],
    [chars.exclamation],
    [chars.lowercaseA + chars.exclamation],
    [tsconfig.include[1]!]
  ])('should not produce events without pattern negation (%j)', slice => {
    expect(context.write([slice, codes.eos])).to.be.an('array').that.is.empty
  })

  it.each<[chunk: Chunk]>([
    [chars.exclamation.repeat(3)],
    [chars.exclamation + chars.lowercaseB]
  ])('should tokenize pattern negation (%j)', slice => {
    // Act
    const result = context.write([slice, codes.eos])

    // Expect
    expect(result).to.be.of.length(2)
    expect(result).to.each.have.nested.property('1.type', tt.patternNegation)
  })
})
