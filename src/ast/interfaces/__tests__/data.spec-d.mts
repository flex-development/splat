/**
 * @file Type Tests - Data
 * @module splat/ast/interfaces/tests/unit-d/Data
 */

import type TestSubject from '#ast/interfaces/data'
import type unist from 'unist'

describe('unit-d:interfaces/Data', () => {
  it('should extend unist.Data', () => {
    expectTypeOf<TestSubject>().toExtend<unist.Data>()
  })
})
