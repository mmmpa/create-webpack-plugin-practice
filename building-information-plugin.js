const fs = require('fs')
const path = require('path')
const childProcess = require('child_process')

class BuildingInformationPlugin {
  apply(compiler) {
    const hash = childProcess.execSync('git rev-parse HEAD').toString().replace(/[\n\r]/, '')

    compiler.hooks.afterEmit.tap('BuildingInformationPlugin', (compilation) => {
      const { options: { output: { path: dir, filename } } } = compilation
      const at = path.resolve(dir, filename)

      const log = [
        '##################################################',
        `commit:   ${hash}`,
        `built at: ${new Date().toLocaleString()}`,
        '##################################################',
      ].join('\n')

      fs.writeFileSync(at, [
        `console.log(${JSON.stringify(log)});`,
        fs.readFileSync(at),
      ].join('\n\n'))
    })
  }
}

module.exports = BuildingInformationPlugin
