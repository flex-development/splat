/**
 * @file Type Tests - pattern
 * @module splat/ast/content/tests/unit-d/pattern
 */

import type * as TestSubject from '#ast/content/pattern'
import type NodeObject from '#tests/types/node-object'
import type {
  BracketExpression,
  Escape,
  Negation,
  Separator,
  Text,
  Wildcard
} from '@flex-development/splat/ast'

describe('unit-d:content/pattern', () => {
  describe('PatternContent', () => {
    type Subject = TestSubject.PatternContent

    it('should equal PatternContentMap[keyof PatternContentMap]', () => {
      // Arrange
      type K = keyof TestSubject.PatternContentMap
      type Expect = TestSubject.PatternContentMap[K]

      // Expect
      expectTypeOf<Subject>().toEqualTypeOf<Expect>()
    })
  })

  describe('PatternContentMap', () => {
    type Subject = TestSubject.PatternContentMap

    it('should extend NodeObject<BracketExpression>', () => {
      expectTypeOf<Subject>().toExtend<NodeObject<BracketExpression>>()
    })

    it('should extend NodeObject<Escape>', () => {
      expectTypeOf<Subject>().toExtend<NodeObject<Escape>>()
    })

    it('should extend NodeObject<Negation>', () => {
      expectTypeOf<Subject>().toExtend<NodeObject<Negation>>()
    })

    it('should extend NodeObject<Separator>', () => {
      expectTypeOf<Subject>().toExtend<NodeObject<Separator>>()
    })

    it('should extend NodeObject<Text>', () => {
      expectTypeOf<Subject>().toExtend<NodeObject<Text>>()
    })

    it('should extend NodeObject<Wildcard>', () => {
      expectTypeOf<Subject>().toExtend<NodeObject<Wildcard>>()
    })
  })
})
