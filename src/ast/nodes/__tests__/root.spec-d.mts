/**
 * @file Type Tests - Root
 * @module splat/ast/nodes/tests/unit-d/Root
 */

import type * as TestSubject from '#ast/nodes/root'
import type {
  Parent,
  PatternContent,
  PatternData
} from '@flex-development/splat/ast'
import type { Optional } from '@flex-development/tutils'

describe('unit-d:nodes/Root', () => {
  type Subject = TestSubject.default
  type SubjectData = TestSubject.RootData

  it('should extend Parent', () => {
    expectTypeOf<Subject>().toExtend<Parent>()
  })

  it('should match [children: PatternContent[]]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('children')
      .toEqualTypeOf<PatternContent[]>()
  })

  it('should match [data?: RootData | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('data')
      .toEqualTypeOf<Optional<SubjectData>>()
  })

  it('should match [type: "root"]', () => {
    expectTypeOf<Subject>().toHaveProperty('type').toEqualTypeOf<'root'>()
  })

  describe('RootData', () => {
    it('should extend PatternData', () => {
      expectTypeOf<SubjectData>().toExtend<PatternData>()
    })
  })
})
