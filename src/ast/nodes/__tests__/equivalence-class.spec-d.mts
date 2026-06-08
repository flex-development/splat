/**
 * @file Type Tests - EquivalenceClass
 * @module splat/ast/nodes/tests/unit-d/EquivalenceClass
 */

import type * as TestSubject from '#ast/nodes/equivalence-class'
import type { Data, Literal } from '@flex-development/splat/ast'
import type { Optional } from '@flex-development/tutils'

describe('unit-d:nodes/EquivalenceClass', () => {
  type Subject = TestSubject.default
  type SubjectData = TestSubject.EquivalenceClassData

  it('should extend Literal', () => {
    expectTypeOf<Subject>().toExtend<Literal>()
  })

  it('should match [data?: EquivalenceClassData | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('data')
      .toEqualTypeOf<Optional<SubjectData>>()
  })

  it('should match [type: "equivalenceClass"]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('type')
      .toEqualTypeOf<'equivalenceClass'>()
  })

  it('should match [value: string]', () => {
    expectTypeOf<Subject>().toHaveProperty('value').toEqualTypeOf<string>()
  })

  describe('EquivalenceClassData', () => {
    it('should extend Data', () => {
      expectTypeOf<SubjectData>().toExtend<Data>()
    })
  })
})
