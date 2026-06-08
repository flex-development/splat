/**
 * @file Type Tests - AnyParent
 * @module splat/ast/types/tests/unit-d/AnyParent
 */

import type TestSubject from '#ast/types/any-parent'
import type { Root } from '@flex-development/splat/ast'
import type { Parents } from '@flex-development/unist-util-types'

describe('unit-d:types/AnyParent', () => {
  it('should equal Parents<Root>', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<Parents<Root>>()
  })
})
