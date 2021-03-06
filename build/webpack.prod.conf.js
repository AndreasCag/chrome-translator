const WebpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const WebpackBaseConfig = require('./webpack.base.conf');
const resolve = require('../helpers/resolve');

const distPath = resolve('dist');

const WebpackProdConfig = {
  output: {
    path: distPath,
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'stylus-loader' },
          ],
        }),
      },
    ],
  },
  plugins: [

    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
    }),

    new CleanWebpackPlugin(
      ['dist'],
      { root: resolve() },
    ),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),

    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    }),

    new CopyWebpackPlugin([{
      from: resolve('src', 'manifest.json'),
      to: resolve('dist', 'manifest.json'),
    }]),

    new CopyWebpackPlugin([{
      from: resolve('static'),
      to: resolve('dist'),
    }]),

  ],
};

module.exports = WebpackMerge(WebpackBaseConfig, WebpackProdConfig);