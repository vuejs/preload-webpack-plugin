const fs = require('fs-extra')
const path = require('path')

const srcPath = path.resolve(__dirname, '../src')
const distSrcPath = path.resolve(__dirname, 'e2e/webpack4/src')

fs.copySync(srcPath, distSrcPath)
