/**
 * @file Unit Tests - questionMark
 * @module splat/tokenize/constructs/tests/integration/questionMark
 */

import snapshot from '#tests/utils/snapshot-events'
import tt from '#tokenize/enums/tt'
import {
  chars,
  codes,
  createTokenizer,
  initialize,
  tokenize,
  type TokenizeContext
} from '@flex-development/fsm-tokenizer'
import pathe from '@flex-development/pathe'
import testSubject from '../question-mark.mts'

describe('integration:tokenize/constructs/questionMark', () => {
  let context: TokenizeContext

  beforeEach(() => {
    context = createTokenizer({
      debug: pathe.basename(import.meta.url),
      initial: initialize({ [codes.question]: testSubject })
    })
  })

  it.each<[string | null | undefined]>([
    [null],
    [chars.backslash + chars.question],
    [chars.asterisk + chars.dot + chars.lowercaseC],
    [chars.lowercaseA + chars.backslash + chars.question]
  ])('should produce no events without valid question mark (%j)', chunks => {
    expect(tokenize(chunks, context)).to.be.an('array').that.is.empty
  })

  it.each<[string]>([
    [chars.question],
    [chars.question.repeat(3)]
  ])('should tokenize question mark (%j)', chunks => {
    // Act
    const result = tokenize(chunks, context)

    // Expect
    expect(context).to.have.property('wild', true)
    expect(result).to.each.have.nested.property('1.type', tt.questionMark)
    expect(result).to.each.have.nested.property('1.value', chars.question)
    expect(snapshot(result)).toMatchSnapshot()
  })
})
