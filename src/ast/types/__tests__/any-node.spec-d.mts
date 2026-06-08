/**
 * @file Type Tests - AnyNode
 * @module splat/ast/types/tests/unit-d/AnyNode
 */

import type TestSubject from '#ast/types/any-node'
import type { Root } from '@flex-development/splat/ast'
import type { InclusiveDescendant } from '@flex-development/unist-util-types'

describe('unit-d:types/AnyNode', () => {
  it('should equal InclusiveDescendant<Root>', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<InclusiveDescendant<Root>>()
  })
})
