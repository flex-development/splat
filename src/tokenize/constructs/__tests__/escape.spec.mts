/**
 * @file Unit Tests - escape
 * @module splat/tokenize/constructs/tests/unit/escape
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
import testSubject from '../escape.mts'

describe('unit:constructs/escape', () => {
  let context: TokenizeContext

  beforeEach(() => {
    context = createTokenizer({
      initialize: initialize({ [codes.backslash]: testSubject })
    })
  })

  it('should be unnamed `Construct`', () => {
    expect(testSubject).to.not.have.property('name')
    expect(testSubject).to.have.property('tokenize').be.a('function')
    expect(testSubject.tokenize.name).to.eq('tokenizeEscape')
  })

  it.each<[slice: Chunk]>([
    [chars.asterisk],
    [chars.backslash],
    [chars.lowercaseA]
  ])('should not produce events without escape sequences (%j)', slice => {
    expect(context.write([slice, codes.eos])).to.be.an('array').that.is.empty
  })

  it.each<[slice: Chunk]>([
    [chars.backslash + chars.ampersand],
    [chars.backslash + chars.apostrophe],
    [chars.backslash + chars.at],
    [chars.backslash + chars.backslash],
    [chars.backslash + chars.bar],
    [chars.backslash + chars.comma],
    [chars.backslash + chars.exclamation],
    [chars.backslash + chars.leftBrace],
    [chars.backslash + chars.leftBracket],
    [chars.backslash + chars.leftParen],
    [chars.backslash + chars.plus],
    [chars.backslash + chars.questionMark],
    [chars.backslash + chars.quotation],
    [chars.backslash + chars.rightBrace],
    [chars.backslash + chars.rightBracket],
    [chars.backslash + chars.rightParen],
    [chars.backslash + chars.slash],
    ['src/pages/api/\\[api\\].mdx']
  ])('should tokenize escapes (%j)', slice => {
    // Act
    const result = context.write([slice, codes.eos])

    // Expect
    expect(result).to.have.property('length').be.at.least(2)
    expect(snapshot(result)).toMatchSnapshot()
  })
})
