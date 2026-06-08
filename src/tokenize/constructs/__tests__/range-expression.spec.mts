/**
 * @file Unit Tests - rangeExpression
 * @module splat/tokenize/constructs/tests/unit/rangeExpression
 */

import snapshot from '#tests/utils/snapshot-events'
import {
  chars,
  codes,
  createTokenizer,
  initialize,
  type Chunk,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import testSubject from '../range-expression.mts'

describe('unit:constructs/rangeExpression', () => {
  let context: TokenizeContext

  beforeEach(() => {
    context = createTokenizer({
      initialize: initialize({ null: [testSubject] })
    })
  })

  it('should be unnamed partial `Construct`', () => {
    expect(testSubject).to.not.have.property('name')
    expect(testSubject).to.have.property('partial').be.true
    expect(testSubject).to.have.property('tokenize').be.a('function')
    expect(testSubject.tokenize.name).to.eq('tokenizeRangeExpression')
  })

  it.each<[slice: Chunk]>([
    [chars.lowercaseA],
    [chars.lowercaseX + chars.hyphen]
  ])('should not produce events without range expressions (%j)', slice => {
    expect(context.write([slice, codes.eos])).to.be.an('array').that.is.empty
  })

  it.each<[slice: Chunk]>([
    [chars.digit0 + chars.hyphen + chars.digit9],
    [chars.uppercaseA + chars.hyphen + chars.uppercaseC],
    [chars.lowercaseX + chars.hyphen + chars.lowercaseZ]
  ])('should tokenize range expressions (%j)', slice => {
    // Act
    const result = context.write([slice, codes.eos])

    // Expect
    expect(context).to.have.property('currentConstruct').be.undefined
    expect(result).to.have.property('length').be.at.least(2)
    expect(snapshot(result)).toMatchSnapshot()
  })
})
