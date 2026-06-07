/**
 * @file Unit Tests - createTokenizer
 * @module splat/tokenize/tests/unit/createTokenizer
 */

import type { Point } from '@flex-development/fsm-tokenizer'
import testSubject from '../create-tokenizer.mts'

describe('unit:tokenize/createTokenizer', () => {
  it('should create tokenize context', () => {
    expect(testSubject()).toMatchSnapshot()
  })

  it('should create tokenize context with custom start point', () => {
    // Arrange
    const from: Point = { column: 1, line: 3, offset: 3 }

    // Act
    const result = testSubject({ from })

    // Expect
    expect(result.now()).to.eql({ ...from, _bufferIndex: -1, _index: 0 })
  })

  it('should disable pattern negation with `options.nonegate`', () => {
    // Act
    const result = testSubject({ nonegate: true })

    // Expect
    expect(result.parser.constructs.disable).toMatchSnapshot()
  })
})
