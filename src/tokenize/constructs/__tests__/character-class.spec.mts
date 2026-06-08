/**
 * @file Unit Tests - characterClass
 * @module splat/tokenize/constructs/tests/unit/characterClass
 */

import cc from '#fixtures/cc'
import snapshot from '#tests/utils/snapshot-events'
import {
  codes,
  createTokenizer,
  initialize,
  type Chunk,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import testSubject from '../character-class.mts'

describe('unit:constructs/characterClass', () => {
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
    expect(testSubject.tokenize.name).to.eq('tokenizeCharacterClass')
  })

  it.each<[slice: Chunk]>([
    ['[:1:]'],
    ['[xyz]'],
    [`[:${cc.digit}:`],
    [`{:${cc.space}:}`]
  ])('should not produce events without character classes (%j)', slice => {
    expect(context.write([slice, codes.eos])).to.be.an('array').that.is.empty
  })

  it.each<[slice: Chunk]>([
    [`[:${cc.alnum}:]`],
    [`[:${cc.alpha}:]`],
    [`[:${cc.ascii}:]`],
    [`[:${cc.blank}:]`],
    [`[:${cc.cntrl}:]`],
    [`[:${cc.digit}:]`],
    [`[:${cc.graph}:]`],
    [`[:${cc.lower}:]`],
    [`[:${cc.print}:]`],
    [`[:${cc.punct}:]`],
    [`[:${cc.space}:]`],
    [`[:${cc.upper}:]`],
    [`[:${cc.word}:]`],
    [`[:${cc.xdigit}:]`]
  ])('should tokenize character classes (%j)', slice => {
    // Act
    const result = context.write([slice, codes.eos])

    // Expect
    expect(context).to.have.property('currentConstruct').be.undefined
    expect(result).to.have.property('length').be.at.least(2)
    expect(snapshot(result)).toMatchSnapshot()
  })
})
