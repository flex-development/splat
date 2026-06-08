/**
 * @file Type Tests - Separator
 * @module splat/ast/nodes/tests/unit-d/Separator
 */

import type * as TestSubject from '#ast/nodes/separator'
import type { Data, Node } from '@flex-development/splat/ast'
import type { Optional } from '@flex-development/tutils'

describe('unit-d:nodes/Separator', () => {
  type Subject = TestSubject.default
  type SubjectData = TestSubject.SeparatorData

  it('should extend Node', () => {
    expectTypeOf<Subject>().toExtend<Node>()
  })

  it('should match [data?: SeparatorData | undefined]', () => {
    expectTypeOf<Subject>()
      .toHaveProperty('data')
      .toEqualTypeOf<Optional<SubjectData>>()
  })

  it('should match [type: "separator"]', () => {
    expectTypeOf<Subject>().toHaveProperty('type').toEqualTypeOf<'separator'>()
  })

  describe('SeparatorData', () => {
    it('should extend Data', () => {
      expectTypeOf<SubjectData>().toExtend<Data>()
    })
  })
})
