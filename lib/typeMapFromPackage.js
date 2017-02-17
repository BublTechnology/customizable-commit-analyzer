module.exports = function (requireMock) {
  const req = requireMock || require
  function objectOrPackage (typeMap) {
    if (typeof typeMap === 'object') {
      return typeMap
    }

    try {
      return req(typeMap)
    } catch (e) {
      throw new Error(`customizable-commit-analyzer unable find package "${typeMap}"
        - check that ${typeMap} is in your node_modules directory
      `)
    }
  }

  function getCommitTypeMap (packageJSON) {
    return packageJSON.config && packageJSON.config.commitTypeMap
      ? objectOrPackage(packageJSON.config.commitTypeMap)
      : null
  }

  return {
    getCommitTypeMap
  }
}
