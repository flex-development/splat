/**
 * @file Type Tests - node
 * @module splat/ast/content/tests/unit-d/node
 */

import type * as TestSubject from '#ast/content/node'
import type { Root } from '@flex-development/splat/ast'
import type {
  InclusiveDescendant,
  Type
} from '@flex-development/unist-util-types'

describe('unit-d:content/node', () => {
  describe('GlobTreeNode', () => {
    type Subject = TestSubject.GlobTreeNode

    it('should equal NodeMap[keyof NodeMap]', () => {
      // Arrange
      type K = keyof TestSubject.NodeMap
      type Expect = TestSubject.NodeMap[K]

      // Expect
      expectTypeOf<Subject>().toEqualTypeOf<Expect>()
    })
  })

  describe('NodeMap', () => {
    type Subject = TestSubject.NodeMap

    it('should register all globtree nodes', () => {
      // Arrange
      type Nodes = Subject[keyof TestSubject.NodeMap]
      type Test = InclusiveDescendant<Root>

      // Expect
      expectTypeOf<Exclude<Test, Nodes>>().toEqualTypeOf<never>()
      expectTypeOf<keyof Subject>().toEqualTypeOf<Type<Test>>()
    })
  })
})
