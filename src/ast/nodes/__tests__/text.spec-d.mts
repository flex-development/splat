/**
 * @file Type Tests - Text
 * @module splat/ast/nodes/tests/unit-d/Text
 */

import type * as TestSubject from '#ast/nodes/text'
import type { Data, Literal } from '@flex-development/splat/ast'
import type { Optional } from '@flex-development/tutils'

describe('unit-d:nodes/Text', () => {
  type Subject = TestSubject.default
  type SubjectData = TestSubject.TextData

  it('should extend Literal', () => {
    expectTypeOf<Subject>().toExtend<Literal>()
  })

  it('should match [data?: TextData | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('data')
      .toEqualTypeOf<Optional<SubjectData>>()
  })

  it('should match [type: "text"]', () => {
    expectTypeOf<Subject>().toHaveProperty('type').toEqualTypeOf<'text'>()
  })

  it('should match [value: string]', () => {
    expectTypeOf<Subject>().toHaveProperty('value').toEqualTypeOf<string>()
  })

  describe('TextData', () => {
    it('should extend Data', () => {
      expectTypeOf<SubjectData>().toExtend<Data>()
    })
  })
})
