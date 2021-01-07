/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const EntryPoint = require('webpack/lib/Entrypoint')

module.exports = function doesChunkBelongToHtml ({
  chunk,
  compilation,
  htmlPluginData,
  pluginOptions
}) {
  const includesChunks = htmlPluginData.plugin.options.chunks || []
  // user defined chunks for html-webpack-lugin
  if (includesChunks.length > 0) {
    const chunkName = recursiveChunkEntryName(chunk)
    if (includesChunks.includes(chunkName)) {
      return true
    } else {
      return false
    }
  }
  return true
}

function recursiveChunkEntryName (chunk) {
  const [chunkGroup] = chunk.groupsIterable
  return _recursiveChunkGroup(chunkGroup)
}

function _recursiveChunkGroup (chunkGroup) {
  if (chunkGroup instanceof EntryPoint) {
    return chunkGroup.name
  } else {
    const [chunkParent] = chunkGroup.getParents()
    return _recursiveChunkGroup(chunkParent)
  }
}
