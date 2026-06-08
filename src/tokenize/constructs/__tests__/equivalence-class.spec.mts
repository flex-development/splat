/**
 * @file Unit Tests - equivalenceClass
 * @module splat/tokenize/constructs/tests/unit/equivalenceClass
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
import testSubject from '../equivalence-class.mts'

describe('unit:constructs/equivalenceClass', () => {
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
    expect(testSubject.tokenize.name).to.eq('tokenizeEquivalenceClass')
  })

  it.each<[slice: Chunk]>([
    [chars.leftBracket],
    [chars.leftBracket + chars.equal],
    [chars.leftBracket + chars.equal.repeat(2) + chars.rightBracket],
    [chars.leftBracket + chars.equal + chars.lowercaseA],
    [chars.leftBracket + chars.equal + chars.lowercaseE + chars.equal]
  ])('should not produce events without equivalence classes (%j)', slice => {
    expect(context.write([slice, codes.eos])).to.be.an('array').that.is.empty
  })

  it.each<[slice: Chunk]>([
    [chars.leftBracket + chars.equal.repeat(3) + chars.rightBracket],
    [`[=${chars.digit1}=]`],
    [`[=${chars.lowercaseA}=]`],
    [`[=${chars.uppercaseE}=]`]
  ])('should tokenize equivalence classes (%j)', slice => {
    // Act
    const result = context.write([slice, codes.eos])

    // Expect
    expect(context).to.have.property('currentConstruct').be.undefined
    expect(result).to.have.property('length').be.at.least(2)
    expect(snapshot(result)).toMatchSnapshot()
  })
})
