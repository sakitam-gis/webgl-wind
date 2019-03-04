'use strict'
const path = require('path')
const webpack = require('webpack')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = {
  entry: {
    extlib: [
      'react'
    ]
  },
  output: {
    path: path.join(__dirname, '../dll'),
    filename: '[name].dll.[chunkhash].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dll', '[name]-manifest.json'),
      name: '[name]'
    }),
    new ParallelUglifyPlugin({
      sourceMap: false,
      uglifyES: {
        output: {
          comments: false
        },
        compress: {
          warnings: false,
          drop_console: true
        }
      }
    })
  ]
}
