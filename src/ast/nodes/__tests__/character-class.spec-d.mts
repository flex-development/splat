/**
 * @file Type Tests - CharacterClass
 * @module splat/ast/nodes/tests/unit-d/CharacterClass
 */

import type * as TestSubject from '#ast/nodes/character-class'
import type { Data, Literal } from '@flex-development/splat/ast'
import type { Optional } from '@flex-development/tutils'

describe('unit-d:nodes/CharacterClass', () => {
  type Subject = TestSubject.default
  type SubjectData = TestSubject.CharacterClassData

  it('should extend Literal', () => {
    expectTypeOf<Subject>().toExtend<Literal>()
  })

  it('should match [data?: CharacterClassData | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('data')
      .toEqualTypeOf<Optional<SubjectData>>()
  })

  it('should match [type: "characterClass"]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('type')
      .toEqualTypeOf<'characterClass'>()
  })

  it('should match [value: string]', () => {
    expectTypeOf<Subject>().toHaveProperty('value').toEqualTypeOf<string>()
  })

  describe('CharacterClassData', () => {
    it('should extend Data', () => {
      expectTypeOf<SubjectData>().toExtend<Data>()
    })
  })
})
