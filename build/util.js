const path = require('path')
const fs = require('fs')
const chalk = require('chalk').default

const cwd = process.cwd()

console.log(chalk.yellow(`Your project is running in ${cwd}`))

module.exports = {
  resolve: (...pathSegments) => {
    return path.resolve(cwd, ...pathSegments)
  },
  requireIfExisting: (path, defaultValue = null) => {
    const absolutePath = path.resolve(__dirname, path)
    const exists = fs.existsSync(absolutePath)
    return exists ? require(absolutePath) : defaultValue
  }
}
