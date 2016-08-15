## customizable-commit-analyzer


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

But you can customize this in your `package.json`.

```json
{
  "config": {
    "commitTypeMap": { "style": "patch" }
  }
}
```


### License

[Apache 2.0](https://github.com/BublTechnology/customizable-commit-analyzer/blob/master/LICENSE)
