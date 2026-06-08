/**
 * @file Type Tests - Parent
 * @module splat/ast/nodes/tests/unit-d/Parent
 */

import type TestSubject from '#ast/nodes/parent'
import type { Child, Node } from '@flex-development/splat/ast'

describe('unit-d:nodes/Parent', () => {
  it('should extend Node', () => {
    expectTypeOf<TestSubject>().toExtend<Node>()
  })

  it('should match [children: Child[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('children')
      .toEqualTypeOf<Child[]>()
  })
})
