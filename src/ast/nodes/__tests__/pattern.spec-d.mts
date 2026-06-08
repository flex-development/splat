/**
 * @file Type Tests - Pattern
 * @module splat/ast/nodes/tests/unit-d/Pattern
 */

import type * as TestSubject from '#ast/nodes/pattern'
import type { Data, Parent, PatternContent } from '@flex-development/splat/ast'
import type { Optional } from '@flex-development/tutils'

describe('unit-d:nodes/Pattern', () => {
  type Subject = TestSubject.default
  type SubjectData = TestSubject.PatternData

  it('should extend Parent', () => {
    expectTypeOf<Subject>().toExtend<Parent>()
  })

  it('should match [children: PatternContent[]]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('children')
      .toEqualTypeOf<PatternContent[]>()
  })

  it('should match [data?: PatternData | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('data')
      .toEqualTypeOf<Optional<SubjectData>>()
  })

  it('should match [type: "pattern"]', () => {
    expectTypeOf<Subject>().toHaveProperty('type').toEqualTypeOf<'pattern'>()
  })

  describe('PatternData', () => {
    it('should extend Data', () => {
      expectTypeOf<SubjectData>().toExtend<Data>()
    })
  })
})
