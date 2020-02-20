'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = require('./webpack.base.config')
const util = require('./util')
const mergeConfig = util.requireIfExisting(`${process.cwd()}/webpack.prod.config.js`)

module.exports = merge(config, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __PRODUCTION__: JSON.stringify(true),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:7].css',
      // chunkFilename: '[id].[chunkhash:7].css'
    })
  ],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new UglifyJsPlugin()
    ],
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
      minSize: 3000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 1,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
          minChunks: 1,
          minSize: 0
        }
      }
    }
  }
}, mergeConfig)
