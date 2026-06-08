/**
 * @file Unit Tests - questionMark
 * @module splat/tokenize/constructs/tests/unit/questionMark
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
import testSubject from '../question-mark.mts'

describe('unit:constructs/questionMark', () => {
  let context: TokenizeContext

  beforeEach(() => {
    context = createTokenizer({
      initialize: initialize({ [codes.questionMark]: testSubject })
    })
  })

  it('should be unnamed `Construct`', () => {
    expect(testSubject).to.not.have.property('name')
    expect(testSubject).to.have.property('tokenize').be.a('function')
    expect(testSubject.tokenize.name).to.eq('tokenizeQuestionMark')
  })

  it.each<[slice: Chunk]>([
    [chars.hash]
  ])('should not produce events without question marks (%j)', slice => {
    expect(context.write([slice, codes.eos])).to.be.an('array').that.is.empty
  })

  it.each<[slice: Chunk]>([
    [chars.questionMark],
    [chars.questionMark.repeat(3)],
    [chars.digit3 + chars.questionMark + chars.digit1 + chars.digit3],
    [chars.lowercaseA + chars.lowercaseB + chars.questionMark]
  ])('should tokenize question marks (%j)', slice => {
    // Act
    const result = context.write([slice, codes.eos])

    // Expect
    expect(result).to.have.property('length').be.at.least(2)
    expect(result).to.each.have.nested.property('1.type', tt.questionMark)
  })
})
