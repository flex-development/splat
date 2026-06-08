/**
 * @file Type Tests - CollatingSymbol
 * @module splat/ast/nodes/tests/unit-d/CollatingSymbol
 */

import type * as TestSubject from '#ast/nodes/collating-symbol'
import type { Data, Literal } from '@flex-development/splat/ast'
import type { Optional } from '@flex-development/tutils'

describe('unit-d:nodes/CollatingSymbol', () => {
  type Subject = TestSubject.default
  type SubjectData = TestSubject.CollatingSymbolData

  it('should extend Literal', () => {
    expectTypeOf<Subject>().toExtend<Literal>()
  })

  it('should match [data?: CollatingSymbolData | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('data')
      .toEqualTypeOf<Optional<SubjectData>>()
  })

  it('should match [type: "collatingSymbol"]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('type')
      .toEqualTypeOf<'collatingSymbol'>()
  })

  it('should match [value: string]', () => {
    expectTypeOf<Subject>().toHaveProperty('value').toEqualTypeOf<string>()
  })

  describe('CollatingSymbolData', () => {
    it('should extend Data', () => {
      expectTypeOf<SubjectData>().toExtend<Data>()
    })
  })
})
