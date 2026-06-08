/**
 * @file Unit Tests - collatingSymbol
 * @module splat/tokenize/constructs/tests/unit/collatingSymbol
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
import testSubject from '../collating-symbol.mts'

describe('unit:constructs/collatingSymbol', () => {
  let context: TokenizeContext

  beforeEach(() => {
    context = createTokenizer({
      initialize: initialize({ [codes.leftBracket]: testSubject })
    })
  })

  it('should be unnamed partial `Construct`', () => {
    expect(testSubject).to.not.have.property('name')
    expect(testSubject).to.have.property('partial').be.true
    expect(testSubject).to.have.property('tokenize').be.a('function')
    expect(testSubject.tokenize.name).to.eq('tokenizeCollatingSymbol')
  })

  it.each<[slice: Chunk]>([
    [chars.leftBracket],
    [chars.leftBracket + chars.dot],
    [chars.leftBracket + chars.dot.repeat(2) + chars.rightBracket],
    [chars.leftBracket + chars.dot + chars.lowercaseL.repeat(2)],
    [chars.leftBracket + chars.dot + chars.lowercaseR.repeat(2) + chars.dot]
  ])('should not produce events without collating symbols (%j)', slice => {
    expect(context.write([slice, codes.eos])).to.be.an('array').that.is.empty
  })

  it.each<[slice: Chunk]>([
    [chars.leftBracket + chars.dot.repeat(3) + chars.rightBracket],
    ['[.rr.]']
  ])('should tokenize collating symbols (%j)', slice => {
    // Act
    const result = context.write([slice, codes.eos])

    // Expect
    expect(context).to.have.property('currentConstruct').be.undefined
    expect(result).to.have.property('length').be.at.least(2)
    expect(snapshot(result)).toMatchSnapshot()
  })
})
