/**
 * @file Unit Tests - bracketExpression
 * @module splat/tokenize/constructs/tests/unit/bracketExpression
 */

import snapshot from '#tests/utils/snapshot-events'
import tt from '#tokenize/enums/tt'
import {
  chars,
  codes,
  createTokenizer,
  initialize,
  type Chunk,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import testSubject from '../bracket-expression.mts'

describe('unit:constructs/bracketExpression', () => {
  let context: TokenizeContext

  beforeEach(() => {
    context = createTokenizer({
      initialize: initialize({ [codes.leftBracket]: testSubject })
    })
  })

  it('should be named `Construct`', () => {
    expect(testSubject).to.have.property('name', tt.bracketExpression)
    expect(testSubject).to.have.property('tokenize').be.a('function')
    expect(testSubject.tokenize.name).to.eq('tokenizeBracketExpression')
  })

  it.each<[slice: Chunk]>([
    [chars.leftBracket + chars.rightBracket],
    [chars.leftBracket + chars.caret + chars.rightBracket],
    [chars.leftBracket + chars.exclamation + chars.rightBracket],
    [chars.leftBracket + chars.leftBracket + chars.colon],
    [chars.leftBracket + chars.leftBracket],
    [chars.leftBracket + chars.lowercaseA],
    ['[[:space:'],
    ['[a-z']
  ])('should not produce events without bracket expressions (%j)', slice => {
    expect(context.write([slice, codes.eos])).to.be.an('array').that.is.empty
  })

  it.each<[slice: Chunk]>([
    ['[!]]'],
    ['[!def]'],
    ['[0-9a-z]'],
    ['[[.gu.]]'],
    ['[[:space:]]'],
    ['[[:space:]][[:upper:]!].[-[:lower:]]'],
    ['[[=x=]]'],
    ['[]]'],
    ['[^xyz]'],
    ['src/**index.[!c]ts'],
    ['src/**index.[cm]ts']
  ])('should tokenize bracket expressions (%j)', slice => {
    // Act
    const result = context.write([slice, codes.eos])

    // Expect
    expect(result).to.have.property('length').be.at.least(2)
    expect(snapshot(result)).toMatchSnapshot()
  })
})
