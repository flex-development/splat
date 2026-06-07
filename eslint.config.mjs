/**
 * @file eslint
 * @module config/eslint
 * @see https://eslint.org/docs/user-guide/configuring
 */

import fldv from '@flex-development/eslint-config'

/**
 * The eslint configuration.
 *
 * @type {import('eslint').Linter.Config[]}
 * @const config
 */
const config = [
  ...fldv.configs.node,
  {
    files: [
      'src/tokenize/constructs/*.mts',
      'src/tokenize/constructs/initialize/*.mts'
    ],
    rules: {
      'unicorn/no-this-assignment': 0
    }
  },
  {
    files: ['src/tokenize/tokenize.mts'],
    rules: {
      '@typescript-eslint/no-base-to-string': 0
    }
  }
]

export default config
