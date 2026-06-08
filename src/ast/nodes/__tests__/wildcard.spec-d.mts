/**
 * @file Type Tests - Wildcard
 * @module splat/ast/nodes/tests/unit-d/Wildcard
 */

import type * as TestSubject from '#ast/nodes/wildcard'
import type { Data, Literal } from '@flex-development/splat/ast'
import type { Nilable, Optional } from '@flex-development/tutils'

describe('unit-d:nodes/Wildcard', () => {
  type Subject = TestSubject.default
  type SubjectData = TestSubject.WildcardData

  it('should extend Literal', () => {
    expectTypeOf<Subject>().toExtend<Literal>()
  })

  it('should match [data?: WildcardData | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('data')
      .toEqualTypeOf<Optional<SubjectData>>()
  })

  it('should match [type: "wildcard"]', () => {
    expectTypeOf<Subject>().toHaveProperty('type').toEqualTypeOf<'wildcard'>()
  })

  it('should match [value: string]', () => {
    expectTypeOf<Subject>().toHaveProperty('value').toEqualTypeOf<string>()
  })

  describe('WildcardData', () => {
    it('should extend Data', () => {
      expectTypeOf<SubjectData>().toExtend<Data>()
    })

    it('should match [globstar?: boolean | null | undefined]', () => {
      expectTypeOf<SubjectData>()
        .toHaveProperty('globstar')
        .toEqualTypeOf<Nilable<boolean>>()
    })
  })
})
