'use strict'

const findMostRelevantUpdate = require('./lib/findMostRelevantUpdate')
const fs = require('fs')

module.exports = (options, parserOpts, cb) => {
  let packageJSON = {}
  try {
    packageJSON = JSON.parse(fs.readFileSync('./package.json'))
  } catch (e) {
    console.warn('could not parse package.json')
  }
  const commitTypeMap = packageJSON.config && packageJSON.config.commitTypeMap
  cb(null, findMostRelevantUpdate(parserOpts.commits, commitTypeMap))
}
