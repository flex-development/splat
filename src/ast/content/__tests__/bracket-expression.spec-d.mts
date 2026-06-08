/**
 * @file Type Tests - bracketExpression
 * @module splat/ast/content/tests/unit-d/bracketExpression
 */

import type * as TestSubject from '#ast/content/bracket-expression'
import type NodeObject from '#tests/types/node-object'
import type {
  CharacterClass,
  CollatingSymbol,
  EquivalenceClass,
  Negation,
  RangeExpression,
  Wildcard
} from '@flex-development/splat/ast'

describe('unit-d:content/bracketExpression', () => {
  describe('BracketExpressionContent', () => {
    type Subject = TestSubject.BracketExpressionContent

    it('should equal BracketExpressionContentMap[keyof BracketExpressionContentMap]', () => {
      // Arrange
      type K = keyof TestSubject.BracketExpressionContentMap
      type Expect = TestSubject.BracketExpressionContentMap[K]

      // Expect
      expectTypeOf<Subject>().toEqualTypeOf<Expect>()
    })
  })

  describe('BracketExpressionContentMap', () => {
    type Subject = TestSubject.BracketExpressionContentMap

    it('should extend NodeObject<CharacterClass>', () => {
      expectTypeOf<Subject>().toExtend<NodeObject<CharacterClass>>()
    })

    it('should extend NodeObject<CollatingSymbol>', () => {
      expectTypeOf<Subject>().toExtend<NodeObject<CollatingSymbol>>()
    })

    it('should extend NodeObject<EquivalenceClass>', () => {
      expectTypeOf<Subject>().toExtend<NodeObject<EquivalenceClass>>()
    })

    it('should extend NodeObject<Negation>', () => {
      expectTypeOf<Subject>().toExtend<NodeObject<Negation>>()
    })

    it('should extend NodeObject<RangeExpression>', () => {
      expectTypeOf<Subject>().toExtend<NodeObject<RangeExpression>>()
    })

    it('should extend NodeObject<Wildcard>', () => {
      expectTypeOf<Subject>().toExtend<NodeObject<Wildcard>>()
    })
  })
})
