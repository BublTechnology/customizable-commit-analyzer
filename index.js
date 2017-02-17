'use strict'

const findMostRelevantUpdate = require('./lib/findMostRelevantUpdate')
const getCommitTypeMap = require('./lib/typeMapFromPackage')().getCommitTypeMap
const fs = require('fs')

module.exports = (options, parserOpts, cb) => {
  let packageJSON = {}
  try {
    packageJSON = JSON.parse(fs.readFileSync('./package.json'))
  } catch (e) {
    throw new Error('customizable-commit-analyzer could not parse package.json')
  }

  const commitTypeMap = getCommitTypeMap(packageJSON)
  cb(null, findMostRelevantUpdate(parserOpts.commits, commitTypeMap))
}
