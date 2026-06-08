/**
 * @file Type Tests - BracketExpression
 * @module splat/ast/nodes/tests/unit-d/BracketExpression
 */

import type * as TestSubject from '#ast/nodes/bracket-expression'
import type {
  BracketExpressionContent,
  Data,
  Parent
} from '@flex-development/splat/ast'
import type { Optional } from '@flex-development/tutils'

describe('unit-d:nodes/BracketExpression', () => {
  type Subject = TestSubject.default
  type SubjectData = TestSubject.BracketExpressionData

  it('should extend Parent', () => {
    expectTypeOf<Subject>().toExtend<Parent>()
  })

  it('should match [children: BracketExpressionContent[]]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('children')
      .toEqualTypeOf<BracketExpressionContent[]>()
  })

  it('should match [data?: BracketExpressionData | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('data')
      .toEqualTypeOf<Optional<SubjectData>>()
  })

  it('should match [type: "bracketExpression"]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('type')
      .toEqualTypeOf<'bracketExpression'>()
  })

  describe('BracketExpressionData', () => {
    it('should extend Data', () => {
      expectTypeOf<SubjectData>().toExtend<Data>()
    })
  })
})
