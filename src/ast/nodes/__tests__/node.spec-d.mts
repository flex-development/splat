/**
 * @file Type Tests - Node
 * @module splat/ast/nodes/tests/unit-d/Node
 */

import type TestSubject from '#ast/nodes/node'
import type { Data } from '@flex-development/splat/ast'
import type { Optional } from '@flex-development/tutils'
import type unist from 'unist'

describe('unit-d:nodes/Node', () => {
  it('should extend unist.Node', () => {
    expectTypeOf<TestSubject>().toExtend<unist.Node>()
  })

  it('should match [data?: Data | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('data')
      .toEqualTypeOf<Optional<Data>>()
  })

  it('should match [position?: unist.Position | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('position')
      .toEqualTypeOf<Optional<unist.Position>>()
  })
})
