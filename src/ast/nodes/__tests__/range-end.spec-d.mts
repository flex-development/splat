/**
 * @file Type Tests - RangeEnd
 * @module splat/ast/nodes/tests/unit-d/RangeEnd
 */

import type * as TestSubject from '#ast/nodes/range-end'
import type { Data, Literal } from '@flex-development/splat/ast'
import type { Optional } from '@flex-development/tutils'

describe('unit-d:nodes/RangeEnd', () => {
  type Subject = TestSubject.default
  type SubjectData = TestSubject.RangeEndData

  it('should extend Literal', () => {
    expectTypeOf<Subject>().toExtend<Literal>()
  })

  it('should match [data?: RangeEndData | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('data')
      .toEqualTypeOf<Optional<SubjectData>>()
  })

  it('should match [type: "rangeEnd"]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('type')
      .toEqualTypeOf<'rangeEnd'>()
  })

  it('should match [value: number | string]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('value')
      .toEqualTypeOf<number | string>()
  })

  describe('RangeEndData', () => {
    it('should extend Data', () => {
      expectTypeOf<SubjectData>().toExtend<Data>()
    })
  })
})
