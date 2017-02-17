const test = require('ava')
const typeMapFromPackage = require('../lib/typeMapFromPackage')

const fakeRequireFactory =
  (pName, moc) =>
    (key) => {
      const packageName = pName || ''
      const mock = moc || {}
      if (key === packageName) {
        return mock
      }
      throw new Error('cannot find package')
    }

test('getCommitTypeMap -- no config', (t) => {
  const packageJSONObject = {}
  const getCommitTypeMap = typeMapFromPackage(fakeRequireFactory()).getCommitTypeMap
  t.is(getCommitTypeMap(packageJSONObject), null)
})

test('getCommitTypeMap -- no commitTypeMap', (t) => {
  const packageJSONObject = { config: {} }
  const getCommitTypeMap = typeMapFromPackage(fakeRequireFactory()).getCommitTypeMap
  t.is(getCommitTypeMap(packageJSONObject), null)
})

test('getCommitTypeMap - object', (t) => {
  const getCommitTypeMap = typeMapFromPackage(fakeRequireFactory()).getCommitTypeMap
  const packageJSONObject = {
    config: {
      commitTypeMap: { fix: 'patch' }
    }
  }
  t.deepEqual(getCommitTypeMap(packageJSONObject), { fix: 'patch' })
})

test('getCommitTypeMap - string -- package exists', (t) => {
  const superCommitifier = { style: 'major' }
  const fakeRequire = fakeRequireFactory('super-commitifier', superCommitifier)
  const getCommitTypeMap = typeMapFromPackage(fakeRequire).getCommitTypeMap
  const packageJSONObject = {
    config: {
      commitTypeMap: 'super-commitifier'
    }
  }
  t.is(getCommitTypeMap(packageJSONObject), superCommitifier)
})

test('getCommitTypeMap - string -- package does not exist', (t) => {
  const getCommitTypeMap = typeMapFromPackage(fakeRequireFactory()).getCommitTypeMap
  const packageJSONObject = {
    config: {
      commitTypeMap: 'unknown-commitifier'
    }
  }
  t.throws(getCommitTypeMap.bind(null, packageJSONObject))
})
