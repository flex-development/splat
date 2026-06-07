/**
 * @file E2E Tests - api
 * @module splat/tokenize/tests/e2e/api
 */

import * as testSubject from '@flex-development/splat/tokenize'

describe('e2e:tokenize', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
