'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const util = require('./util')

module.exports = {
  context: util.resolve(),
  entry: {
    app: './src/index.ts'
  },
  output: {
    filename: "[name].[hash:7].js",
    path: util.resolve('./dist')
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: util.resolve('./tsconfig.json')
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader',
            options: {
              // there should be 1 cpu for the fork-ts-checker-webpack-plugin
              workers: require('os').cpus().length - 1
            },
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: [ 'last 2 versions', 'safari >= 7' ]
                    }
                  }
                ]
              ],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-syntax-dynamic-import'
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              context: util.resolve(),
              happyPackMode: true,
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 16384,
          fallback: 'file-loader',
          name: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 0,
          fallback: 'file-loader',
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./dist']),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true
    }),
    new ManifestPlugin()
  ]
}
