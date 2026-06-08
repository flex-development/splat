/**
 * @file Unit Tests - asterisk
 * @module splat/tokenize/constructs/tests/unit/asterisk
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
import testSubject from '../asterisk.mts'

describe('unit:tokenize/constructs/asterisk', () => {
  let context: TokenizeContext

  beforeEach(() => {
    context = createTokenizer({
      initialize: initialize({ [codes.asterisk]: testSubject })
    })
  })

  it('should be unnamed `Construct`', () => {
    expect(testSubject).to.not.have.property('name')
    expect(testSubject).to.have.property('tokenize').be.a('function')
    expect(testSubject.tokenize.name).to.eq('tokenizeAsterisk')
  })

  it.each<[slice: Chunk]>([
    [chars.questionMark],
    [chars.lowercaseA]
  ])('should not produce events without asterisks (%j)', slice => {
    expect(context.write([slice, codes.eos])).to.be.an('array').that.is.empty
  })

  it.each<[slice: Chunk]>([
    [chars.asterisk],
    [chars.asterisk.repeat(3)],
    [tsconfig.include[0]!]
  ])('should tokenize asterisks (%j)', slice => {
    // Act
    const result = context.write([slice, codes.eos])

    // Expect
    expect(result).to.have.property('length').be.at.least(2)
    expect(result).to.each.have.nested.property('1.type', tt.asterisk)
  })
})
