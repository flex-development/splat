/**
 * @file Type Tests - Escape
 * @module splat/ast/nodes/tests/unit-d/Escape
 */

import type * as TestSubject from '#ast/nodes/escape'
import type { Data, Literal } from '@flex-development/splat/ast'
import type { Optional } from '@flex-development/tutils'

describe('unit-d:nodes/Escape', () => {
  type Subject = TestSubject.default
  type SubjectData = TestSubject.EscapeData

  it('should extend Literal', () => {
    expectTypeOf<Subject>().toExtend<Literal>()
  })

  it('should match [data?: EscapeData | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('data')
      .toEqualTypeOf<Optional<SubjectData>>()
  })

  it('should match [type: "escape"]', () => {
    expectTypeOf<Subject>().toHaveProperty('type').toEqualTypeOf<'escape'>()
  })

  it('should match [value: string]', () => {
    expectTypeOf<Subject>().toHaveProperty('value').toEqualTypeOf<string>()
  })

  describe('EscapeData', () => {
    it('should extend Data', () => {
      expectTypeOf<SubjectData>().toExtend<Data>()
    })
  })
})
