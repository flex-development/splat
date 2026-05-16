/**
 * @file Unit Tests - tt
 * @module splat/tokenize/enums/tests/unit/tt
 */

import testSubject from '../tt.mts'

describe('unit:tokenize/enums/tt', () => {
  it('should match snapshot', () => {
    expect(testSubject).toMatchSnapshot()
  })
})
