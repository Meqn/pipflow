const simpleGit = require('simple-git')
const { promisify } = require('util')

const git = simpleGit()

// 获取从特定 commit ID 开始的所有最新记录
async function getCommitsSince(commitId) {
  const log = promisify(git.log.bind(git))
  const logOptions = {
    from: commitId
  }

  try {
    const commitLogs = await log(logOptions)
    return commitLogs.all
  } catch (error) {
    console.error('Error fetching commit logs:', error.message)
    throw error
  }
}

// 获取从最近的标签开始的所有最新记录
async function getCommitsSinceLatestTag() {
  const tags = promisify(git.tags.bind(git))
  const log = promisify(git.log.bind(git))
  const latestTag = (await tags()).latest

  if (!latestTag) {
    console.error('No tags found.')
    return []
  }

  const logOptions = {
    from: latestTag
  }

  try {
    const commitLogs = await log(logOptions)
    return commitLogs.all
  } catch (error) {
    console.error('Error fetching commit logs:', error.message)
    throw error
  }
}

// 格式化 commit 记录
function formatCommits(commits, filter = commit => commit) {
  const regex = /\(([^)]+)\)/
  return commits.filter(filter).map(commit => {
    const { message } = commit
    const match = message.match(regex)

    return {
      hash: commit.hash,
      author: commit.author_name,
      date: commit.date,
      message: message,
      package: match ? match[1].toLowerCase() : '',
      text: match ? message.replace(match[0], '').trim() : ''
    }
  })
}

;(async () => {
  const moduleRegex = /^[a-z]{1,10}\(\w+\).*/i
  try {
    // const commits = await getCommitsSince('4ac1e7a')
    const commits = await getCommitsSinceLatestTag()
    const formattedCommits = formatCommits(commits, commit => {
      return moduleRegex.test(commit.message)
    }).reduce((acc, commit) => {
      if (!commit.package) throw new Error('No package found in commit message: ' + commit.message)
      if (!acc[commit.package]) {
        acc[commit.package] = []
      }
      acc[commit.package].push(
        `- ${commit.text} ([${commit.hash.slice(0, 7)}](https://github.com/Meqn/pipflow/commit/${commit.hash}))`
      )
      return acc
    }, {})
    console.log('Commit messages:', formatCommits(commits).map(commit => commit.message))
    console.log('Commits:', formattedCommits)
  } catch (error) {
    console.error('error:', error.message)
  }
})()
