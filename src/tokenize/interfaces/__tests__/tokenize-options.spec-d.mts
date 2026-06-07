/**
 * @file Type Tests - TokenizeOptions
 * @module splat/interfaces/tests/unit-d/TokenizeOptions
 */

import type TestSubject from '#tokenize/interfaces/tokenize-options'
import type { Point } from '@flex-development/fsm-tokenizer'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/TokenizeOptions', () => {
  it('should match [from?: Point | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('from')
      .toEqualTypeOf<Nilable<Point>>()
  })

  it('should match [noglobstar?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('noglobstar')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [nonegate?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('nonegate')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
