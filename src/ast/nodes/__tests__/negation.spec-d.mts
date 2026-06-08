/**
 * @file Type Tests - Negation
 * @module splat/ast/nodes/tests/unit-d/Negation
 */

import type * as TestSubject from '#ast/nodes/negation'
import type { Data, Literal } from '@flex-development/splat/ast'
import type { Optional } from '@flex-development/tutils'

describe('unit-d:nodes/Negation', () => {
  type Subject = TestSubject.default
  type SubjectData = TestSubject.NegationData

  it('should extend Literal', () => {
    expectTypeOf<Subject>().toExtend<Literal>()
  })

  it('should match [data?: NegationData | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('data')
      .toEqualTypeOf<Optional<SubjectData>>()
  })

  it('should match [type: "negation"]', () => {
    expectTypeOf<Subject>().toHaveProperty('type').toEqualTypeOf<'negation'>()
  })

  it('should match [value: string]', () => {
    expectTypeOf<Subject>().toHaveProperty('value').toEqualTypeOf<string>()
  })

  describe('NegationData', () => {
    it('should extend Data', () => {
      expectTypeOf<SubjectData>().toExtend<Data>()
    })
  })
})
