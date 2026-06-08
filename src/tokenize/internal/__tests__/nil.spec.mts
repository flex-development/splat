/**
 * @file Unit Tests - nil
 * @module splat/tokenize/internal/tests/unit/nil
 */

import { chars, codes } from '@flex-development/fsm-tokenizer'
import testSubject from '../nil.mts'

describe('unit:internal/nil', () => {
  it('should return `false` if `value` is not `null` or `undefined`', () => {
    expect(testSubject(chars.empty)).to.be.false
  })

  it('should return `true` if `value` is `null`', () => {
    expect(testSubject(codes.eos)).to.be.true
  })

  it('should return `true` if `value` is `undefined`', () => {
    expect(testSubject(undefined)).to.be.true
  })
})
