/**
 * @file Unit Tests - tokenize
 * @module splat/tokenize/tests/unit/tokenize
 */

import snapshot from '#tests/utils/snapshot-events'
import { chars } from '@flex-development/fsm-tokenizer'
import type { TokenizeOptions } from '@flex-development/splat/tokenize'
import testSubject from '../tokenize.mts'

describe('unit:tokenize/tokenize', () => {
  it.each<[input: unknown, options?: TokenizeOptions | null | undefined]>([
    [null],
    [chars.empty],
    ['!**'],
    ['!a/b/c*'],
    ['*'],
    ['**'],
    ['*****\\*****'],
    ['**/(a|b)/*.{mts,md}'],
    ['**/[a-z]/*.{mts,md}'],
    ['**/{1..10..2}/*.mts'],
    ['**/{1..10}/*.mts'],
    ['**/{a,/.gitignore}'],
    ['*.mts'],
    ['*.{*,md,mts}'],
    ['*.{*,md}'],
    ['*.{mts,md}'],
    ['.mts'],
    ['?'],
    ['???'],
    ['a/b/c{d,e{f,g}}/*.mts'],
    ['a/{b..s}/xyz/*-{01..10}.mts'],
    ['src/**index.[cm]ts']
  ])('should return list of events (%j)', (input, options) => {
    // Act
    const result = testSubject(input, options)

    // Expect
    expect(result).to.be.an('array')
    expect(result.length).to.be.at.least(2)
    expect(snapshot(result)).toMatchSnapshot()
  })
})
