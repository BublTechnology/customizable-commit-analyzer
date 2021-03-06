## customizable-commit-analyzer
[![Build Status](https://travis-ci.org/BublTechnology/customizable-commit-analyzer.svg?branch=master)](https://travis-ci.org/BublTechnology/customizable-commit-analyzer)
[![npm version](https://badge.fury.io/js/@bubltechnology%2Fcustomizable-commit-analyzer.svg)](https://www.npmjs.com/package/@bubltechnology/customizable-commit-analyzer)

NPM module for `analyzeCommits` option in [semantic-release](https://github.com/semantic-release/semantic-release). See [semantic-release plugins](https://github.com/semantic-release/semantic-release#plugins).

```bash
  npm install @bubltechnology/customizable-commit-analyzer --save-dev
```

```json
{
  "release": {
    "analyzeCommits": "@bubltechnology/customizable-commit-analyzer"
  }
}
```

The default settings for this package are

```javascript
feat: 'minor',
fix: 'patch',
docs: 'patch',
style: null,
refactor: 'patch',
perf: 'patch',
test: null,
chore: null
```

But you can customize this, by defining an object right in your `package.json`.

```json
{
  "config": {
    "commitTypeMap": { "style": "patch" }
  }
}
```

Or by specifying a package that exports a custom commit-type map object.

```json
{
  "config": {
    "commitTypeMap": "conventional-commit-type-map"
  }
}
```

### License

[Apache 2.0](https://github.com/BublTechnology/customizable-commit-analyzer/blob/master/LICENSE)
