/**
 * @file Type Tests - content
 * @module splat/ast/content/tests/unit-d/content
 */

import type TestSubject from '#ast/content/content'
import type {
  BracketExpressionContent,
  PatternContent
} from '@flex-development/splat/ast'

describe('unit-d:content/content', () => {
  it('should allow BracketExpressionContent', () => {
    expectTypeOf<BracketExpressionContent>().toExtend<TestSubject>()
  })

  it('should allow PatternContent', () => {
    expectTypeOf<PatternContent>().toExtend<TestSubject>()
  })
})
