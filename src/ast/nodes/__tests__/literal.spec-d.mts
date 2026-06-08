/**
 * @file Type Tests - Literal
 * @module splat/ast/nodes/tests/unit-d/Literal
 */

import type TestSubject from '#ast/nodes/literal'
import type { Node } from '@flex-development/splat/ast'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:nodes/Literal', () => {
  it('should extend Node', () => {
    expectTypeOf<TestSubject>().toExtend<Node>()
  })

  it('should match [value: number | string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('value')
      .toEqualTypeOf<Nilable<number | string>>()
  })
})
