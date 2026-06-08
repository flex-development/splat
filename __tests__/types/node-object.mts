/**
 * @file Test Types - NodeObject
 * @module tests/types/NodeObject
 */

import type { Node } from 'unist'

/**
 * Create an object mapping node types to nodes.
 *
 * @see {@linkcode Node}
 *
 * @template {Node} T
 *  The union of nodes to map
 */
type NodeObject<T extends Node> = { [K in T['type']]: T }

export type { NodeObject as default }
