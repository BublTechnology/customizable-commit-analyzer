const test = require('ava')
const findMostRelevantUpdate = require('../lib/findMostRelevantUpdate')

test.only('findMostRelevantUpdate - feat', (t) => {
  const fakeCommits = [
    {
      message: 'feat(boom): something changed'
    }, {
      message: 'docs(readme): what an update'
    }]

  t.is(findMostRelevantUpdate(fakeCommits), 'minor')
})

test.only('findMostRelevantUpdate - docs', (t) => {
  const fakeCommits = [
    {
      message: 'some poorly formatted commit message'
    }, {
      message: 'docs(boom): something changed'
    }, {
      message: 'Merge Commit -- bad commit message'
    }]

  t.is(findMostRelevantUpdate(fakeCommits), 'patch')
})

test.only('findMostRelevantUpdate - docs', (t) => {
  const fakeCommits = [
    {
      message: 'some poorly formatted commit message'
    }, {
      message: 'docs(boom): something changed'
    }, {
      message: 'Merge Commit -- bad commit message'
    }]

  t.is(findMostRelevantUpdate(fakeCommits, { docs: null }), null)
})

test.only('findMostRelevantUpdate - fix', (t) => {
  const fakeCommits = [
    {
      message: 'fix(code): less bugs in the code'
    }, {
      message: 'boom something changed'
    }, {
      message: 'Merge Commit -- bad commit message'
    }]

  t.is(findMostRelevantUpdate(fakeCommits), 'patch')
})

test.only('findMostRelevantUpdate - refactor', (t) => {
  const fakeCommits = [
    {
      message: 'more bugs in the code'
    }, {
      message: 'boom something changed'
    }, {
      message: 'refactor(code): -- totally different codes'
    }]

  t.is(findMostRelevantUpdate(fakeCommits), 'patch')
})

test.only('findMostRelevantUpdate - refactor', (t) => {
  const fakeCommits = [
    {
      message: 'more bugs in the code'
    }, {
      message: 'boom something changed'
    }, {
      message: 'refactor(code): -- totally different codes'
    }]

  t.is(findMostRelevantUpdate(fakeCommits, { refactor: null }), null)
})

// perf
test.only('findMostRelevantUpdate - perf', (t) => {
  const fakeCommits = [
    {
      message: 'more bugs in the code'
    }, {
      message: 'perf(calculations): crazy fast algorithms'
    }, {
      message: 'some random commit'
    }, {
      message: 'why was this not squashed?'
    }]

  t.is(findMostRelevantUpdate(fakeCommits), 'patch')
})

test.only('findMostRelevantUpdate - perf', (t) => {
  const fakeCommits = [
    {
      message: 'more bugs in the code'
    }, {
      message: 'perf(calculations): crazy fast algorithms'
    }, {
      message: 'some random commit'
    }, {
      message: 'why was this not squashed?'
    }]

  t.is(findMostRelevantUpdate(fakeCommits, { perf: 'minor' }), 'minor')
})

test.only('findMostRelevantUpdate - breaking', (t) => {
  const fakeCommits = [
    {
      message: '\nintense commit\nbreaking change'
    }, {
      message: 'docs(boom) something changed'
    }, {
      message: 'feat(boom) something changed'
    }, {
      message: 'perf(boom) performance improvement'
    }]

  t.is(findMostRelevantUpdate(fakeCommits), 'major')
})

test.only('findMostRelevantUpdate - breaking', (t) => {
  const fakeCommits = [
    {
      message: '\nintense commit\nbreaking change'
    }, {
      message: 'docs(boom) something changed'
    }, {
      message: 'feat(boom) something changed'
    }, {
      message: 'perf(boom) performance improvement'
    }, {
      message: '\nintense commit\nbreaking change'
    }]

  t.is(findMostRelevantUpdate(fakeCommits), 'major')
})

test.only('findMostRelevantUpdate - test', (t) => {
  const fakeCommits = [
    {
      message: 'some poorly formatted commit message'
    }, {
      message: 'something changed'
    }, {
      message: 'Merge Commit -- bad commit message'
    }, {
      message: 'test(release) -- more unit tests'
    }]

  t.is(findMostRelevantUpdate(fakeCommits), null)
})

test.only('findMostRelevantUpdate - test', (t) => {
  const fakeCommits = [
    {
      message: 'some poorly formatted commit message'
    }, {
      message: 'something changed'
    }, {
      message: 'Merge Commit -- bad commit message'
    }, {
      message: 'test(release) -- more unit tests'
    }]

  t.is(findMostRelevantUpdate(fakeCommits, { test: 'patch' }), 'patch')
})

test.only('findMostRelevantUpdate - test', (t) => {
  const fakeCommits = [
    {
      message: 'some poorly formatted commit message'
    }, {
      message: 'something changed'
    }, {
      message: 'Merge Commit -- bad commit message'
    }, {
      message: 'test(release) -- more unit tests'
    }]

  t.is(findMostRelevantUpdate(fakeCommits, { test: 'minor' }), 'minor')
})

test.only('findMostRelevantUpdate - chore', (t) => {
  const fakeCommits = [{
    message: 'chore(test): testing commit analyzer'
  }, {
    message: 'boring commit message'
  }, {
    message: 'useless commit message'
  }, {
    message: 'Merge commit -- super bad'
  }]

  t.is(findMostRelevantUpdate(fakeCommits), null)
})

test.only('findMostRelevantUpdate - style', (t) => {
  const fakeCommits = [{
    message: 'testing commit analyzer'
  }, {
    message: 'boring commit message'
  }, {
    message: 'style(standardjs): standardjs implented'
  }, {
    message: 'Merge commit -- super bad'
  }]

  t.is(findMostRelevantUpdate(fakeCommits), null)
})
