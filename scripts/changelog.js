const simpleGit = require('simple-git')
const { promisify } = require('util')
const log = require('diy-log')
const minimist = require('minimist')
const { readPackageJson, readPackageFile, writePackageFile, updateChangelog } = require('./utils')

const rawArgs = process.argv.slice(2)
const args = minimist(rawArgs)
const git = simpleGit()

// 获取从特定 commit ID 开始的所有最新记录
async function getCommitsSince(commitId) {
  const log = promisify(git.log.bind(git))
  const logOptions = {
    from: commitId,
  }

  try {
    const commitLogs = await log(logOptions)
    return commitLogs.all
  } catch (error) {
    console.error('Error fetching commit logs:', error.message)
    throw error
  }
}

// 从指定标签获取所有最新记录
async function getCommitsSinceTag(tagId) {
  const tags = promisify(git.tags.bind(git))
  const log = promisify(git.log.bind(git))

  if (!tagId) {
    tagId = (await tags()).latest
  }

  if (!tagId) {
    console.error('No tags found.')
    return []
  }

  const logOptions = {
    from: tagId,
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
function formatCommits(commits, filter = (commit) => commit) {
  const regex = /\(([^)]+)\)/
  return commits.filter(filter).map((commit) => {
    const { message } = commit
    const match = message.match(regex)

    return {
      hash: commit.hash,
      author: commit.author_name,
      date: commit.date,
      message: message,
      package: match ? match[1].toLowerCase() : '',
      text: match ? message.replace(match[0], '').trim() : '',
    }
  })
}

// 生成日志记录
async function generateLogs(name, logs) {
  const pkg = await readPackageJson(name)
  const content = await readPackageFile(name)
  const result = updateChangelog(content, pkg.version, logs[name.toLowerCase()])
  await writePackageFile(name, result)

  return result
}

;(async () => {
  const moduleRegex = /^[a-z]{1,10}\(\w+\).*/i
  try {
    // const commits = await getCommitsSince('d9acb96')
    const commitId = args.commit || args.C
    const getCommitLogs = () =>
      commitId ? getCommitsSince(commitId) : getCommitsSinceTag(args.tag)
    const commits = await getCommitLogs()
    const formattedCommits = formatCommits(commits, (commit) => {
      return moduleRegex.test(commit.message)
    }).reduce((acc, commit) => {
      if (!commit.package) throw new Error('No package found in commit message: ' + commit.message)
      if (!acc[commit.package]) {
        acc[commit.package] = []
      }
      acc[commit.package.toLowerCase()].push(
        `- ${commit.text} ([${commit.hash.slice(0, 7)}](https://github.com/Meqn/pipflow/commit/${
          commit.hash
        }))`
      )
      return acc
    }, {})

    console.log(
      'Commit messages:',
      formatCommits(commits).map((commit) => commit.message)
    )

    Object.entries(formattedCommits).forEach(([key, value]) => {
      log.tag.warn('\n' + value.join('\n'), key)
    })

    if (args._.length) {
      for (const name of args._) {
        await generateLogs(name, formattedCommits)
      }

      if (args.push) {
        await git.add(['*/*/package.json', '*/*/CHANGELOG.md'])
        await git.commit('Version Packages')
        await git.push('origin', 'main')
      }
    }
  } catch (err) {
    console.error(err)
  }
})()
