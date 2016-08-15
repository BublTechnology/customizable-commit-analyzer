'use strict'

const grabCommitType = (message) => message.split('(')[0]
const breaking = (message) => !!(message.toLowerCase().indexOf('breaking') > -1)

const defaultCommitTypeMap = {
  feat: 'minor',
  fix: 'patch',
  docs: 'patch',
  style: null,
  refactor: 'patch',
  perf: 'patch',
  test: null,
  chore: null
}

const commitTypeValues = (type) => {
  switch (type) {
    case 'major':
      return 3
    case 'minor':
      return 2
    case 'patch':
      return 1
    default:
      return 0
  }
}

const findMostRelevantUpdate = function (commits, map) {
  const commitTypeMap = Object.assign({}, defaultCommitTypeMap, map)
  const typeForCommit = (commit) => breaking(commit) ? 'major' : (commitTypeMap[grabCommitType(commit)] || null)

  return commits
    .map((commit) => typeForCommit(commit.message))
    .reduce((mostRelevantType, commitType) => commitTypeValues(commitType) > commitTypeValues(mostRelevantType) ? commitType : mostRelevantType, null)
}

module.exports = findMostRelevantUpdate
