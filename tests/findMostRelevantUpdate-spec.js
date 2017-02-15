const test = require('ava')
const findMostRelevantUpdate = require('../lib/findMostRelevantUpdate')

test('findMostRelevantUpdate - feat', (t) => {
  const fakeCommits = [
    {
      message: 'feat(boom): something changed'
    }, {
      message: 'docs(readme): what an update'
    }]

  t.is(findMostRelevantUpdate(fakeCommits), 'minor')
})

test('findMostRelevantUpdate - docs', (t) => {
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

test('findMostRelevantUpdate - docs -- custom', (t) => {
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

test('findMostRelevantUpdate - fix', (t) => {
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

test('findMostRelevantUpdate - refactor', (t) => {
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

test('findMostRelevantUpdate - refactor -- custom', (t) => {
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
test('findMostRelevantUpdate - perf', (t) => {
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

test('findMostRelevantUpdate - perf -- custom', (t) => {
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

test('findMostRelevantUpdate - breaking', (t) => {
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

test('findMostRelevantUpdate - breaking', (t) => {
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

test('findMostRelevantUpdate - test', (t) => {
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

test('findMostRelevantUpdate - test -- custom', (t) => {
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

test('findMostRelevantUpdate - test -- custom', (t) => {
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

test('findMostRelevantUpdate - chore', (t) => {
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

test('findMostRelevantUpdate - style', (t) => {
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

test('findMostRelevantUpdate - docs -- no scope', (t) => {
  const fakeCommits = [
    {
      message: 'some poorly formatted commit message'
    }, {
      message: 'docs: something changed'
    }, {
      message: 'Merge Commit -- bad commit message'
    }]

  t.is(findMostRelevantUpdate(fakeCommits), 'patch')
})
