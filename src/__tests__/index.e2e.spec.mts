/**
 * @file E2E Tests - api
 * @module splat/tests/e2e/api
 */

import * as testSubject from '@flex-development/splat'

describe('e2e:splat', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
