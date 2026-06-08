/**
 * @file Interfaces - Data
 * @module splat/ast/interfaces/Data
 */

import type unist from 'unist'

/**
 * Info associated with nodes.
 *
 * This space is guaranteed to never be specified by unist or splat, but it
 * can be used in utilities and plugins to store custom data.
 *
 * @example
 *  declare module '@flex-development/splat/ast' {
 *    interface Data {
 *      // `node.data.id` is typed as `number | undefined`
 *      id?: number | undefined
 *    }
 *  }
 *
 * @extends {unist.Data}
 */
interface Data extends unist.Data {}

export type { Data as default }
