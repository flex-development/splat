/**
 * @file Type Tests - RangeExpression
 * @module splat/ast/nodes/tests/unit-d/RangeExpression
 */

import type * as TestSubject from '#ast/nodes/range-expression'
import type {
  Data,
  Parent,
  RangeEnd,
  RangeStart
} from '@flex-development/splat/ast'
import type { Optional } from '@flex-development/tutils'

describe('unit-d:nodes/RangeExpression', () => {
  type Subject = TestSubject.default
  type SubjectData = TestSubject.RangeExpressionData

  it('should extend Parent', () => {
    expectTypeOf<Subject>().toExtend<Parent>()
  })

  it('should match [children: [RangeStart, RangeEnd]]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('children')
      .toEqualTypeOf<[RangeStart, RangeEnd]>()
  })

  it('should match [data?: RangeExpressionData | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('data')
      .toEqualTypeOf<Optional<SubjectData>>()
  })

  it('should match [type: "rangeExpression"]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('type')
      .toEqualTypeOf<'rangeExpression'>()
  })

  describe('RangeExpressionData', () => {
    it('should extend Data', () => {
      expectTypeOf<SubjectData>().toExtend<Data>()
    })
  })
})
