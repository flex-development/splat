/**
 * @file Utilities - listWorkspaces
 * @module utils/listWorkspaces
 */

import fs, { type Dirent } from 'node:fs'

/**
 * Read the `src` directory.
 *
 * @see {@linkcode Dirent}
 *
 * @this {void}
 *
 * @return {ReadonlyArray<Dirent>}
 *  The list of subdomain directory entries
 */
function listWorkspaces(this: void): readonly Dirent[] {
  return fs.readdirSync('src', { withFileTypes: true }).filter(dirent => {
    return dirent.isDirectory() && !dirent.name.startsWith('__')
  })
}

export default listWorkspaces
