'use strict'
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const utils = require('../../build/helper');
const baseConfig = require('../../build/webpack.base.conf');
const pkg = require('./package');

const env = process.env.LIB_ENV;

const webpackConfig = merge(baseConfig, {
  mode: env,
  entry: {
    app: utils.resolve('packages/core/src/index.ts')
  },
  devtool: 'source-map', // cheap-module-eval-source-map
  watch: env === 'development',
  output: {
    path: utils.resolve('packages/core/'),
    filename: env === 'development' ? pkg.unpkg : utils.handleMinEsm(pkg.unpkg),
    publicPath: utils.resolve('packages/core/'),
    library: pkg.namespace,
    libraryTarget: 'umd2',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        enforce: 'pre',
        include: [
          utils.resolve('packages/core/src')
        ],
        options: {
          emitWarning: false
        }
      }
    ]
  },
  plugins: [
    ...(env === 'development' ? [
      new CleanWebpackPlugin([
        'dist',
        'types',
        'lib'
      ], {
        root: path.resolve(__dirname, './')
      }),
      new ParallelUglifyPlugin({
        // cacheDir: path.join(__dirname, './cache/'),
        sourceMap: true,
        uglifyES: {
          output: {
            comments: false
          },
          compress: {
            inline: 1, // https://github.com/mishoo/UglifyJS2/issues/2842
            warnings: false,
            drop_console: true
          }
        }
      })
    ] : [])
  ]
});

module.exports = webpackConfig;
