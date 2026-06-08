/**
 * @file Unit Tests - isBreak
 * @module splat/tokenize/internal/tests/unit/isBreak
 */

import { codes } from '@flex-development/fsm-tokenizer'
import testSubject from '../is-break.mts'

describe('unit:tokenize/internal/isBreak', () => {
  it('should return `false` if `code` is not eos or stream break code', () => {
    expect(testSubject(codes.leftBracket)).to.be.false
  })

  it('should return `true` if `code` is `codes.break`', () => {
    expect(testSubject(codes.break)).to.be.true
  })

  it('should return `true` if `code` is `codes.eos`', () => {
    expect(testSubject(codes.eos)).to.be.true
  })
})
