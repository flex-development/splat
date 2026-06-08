/**
 * @file Type Tests - RangeStart
 * @module splat/ast/nodes/tests/unit-d/RangeStart
 */

import type * as TestSubject from '#ast/nodes/range-start'
import type { Data, Literal } from '@flex-development/splat/ast'
import type { Optional } from '@flex-development/tutils'

describe('unit-d:nodes/RangeStart', () => {
  type Subject = TestSubject.default
  type SubjectData = TestSubject.RangeStartData

  it('should extend Literal', () => {
    expectTypeOf<Subject>().toExtend<Literal>()
  })

  it('should match [data?: RangeStartData | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('data')
      .toEqualTypeOf<Optional<SubjectData>>()
  })

  it('should match [type: "rangeStart"]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('type')
      .toEqualTypeOf<'rangeStart'>()
  })

  it('should match [value: number | string]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('value')
      .toEqualTypeOf<number | string>()
  })

  describe('RangeStartData', () => {
    it('should extend Data', () => {
      expectTypeOf<SubjectData>().toExtend<Data>()
    })
  })
})
