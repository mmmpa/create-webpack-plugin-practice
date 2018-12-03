const path = require('path')
const BuildingInformationPlugin = require('./building-information-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },
  module: {},
  plugins: [new BuildingInformationPlugin()],
}
