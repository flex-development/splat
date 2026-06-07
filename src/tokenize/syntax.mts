/**
 * @file syntax
 * @module splat/tokenize/syntax
 */

import {
  codes,
  type NormalizedExtension
} from '@flex-development/fsm-tokenizer'
import asterisk from './constructs/asterisk.mts'
import escape from './constructs/escape.mts'
import patternNegation from './constructs/pattern-negation.mts'
import questionMark from './constructs/question-mark.mts'
import separator from './constructs/separator.mts'
import ct from './enums/ct.mts'

/**
 * The `splat` syntax extension.
 *
 * @see {@linkcode NormalizedExtension}
 *
 * @const {NormalizedExtension} syntax
 */
const syntax: NormalizedExtension = {
  [ct.pattern]: {
    [codes.backslash]: escape,
    [codes.exclamation]: patternNegation,
    [codes.slash]: separator
  },
  [ct.expression]: {
    [codes.asterisk]: asterisk,
    [codes.questionMark]: questionMark
  }
}

export default syntax
