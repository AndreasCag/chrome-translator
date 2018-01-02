const WebpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const WebpackBaseConfig = require('./webpack.base.conf');
const resolve = require('../helpers/resolve');

const serverPath = resolve('server-source');

const WebpackDevConfig = {
  output: {
    path: serverPath,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            styl: [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
          cssSourceMap: true,
          // @NOTE: CHECK IT OUT.
          // maybe because of this vue file's debugging is pretty painfull
          cacheBusting: true,
          transformToRequire: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href',
          },
        },
      },
      {
        test: /\.styl$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'stylus-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  devServer: {
    contentBase: [
      resolve('server-source'),
      // @NOTE: resolve('src', 'pug') is used just for hot reloading
      resolve('src', 'pug'),
    ],
    watchContentBase: true,
    open: true,
    port: 3000,
    index: 'popup.html',
  },
  plugins: [

    new WriteFilePlugin(),

    new CleanWebpackPlugin(
      ['server-source'],
      { root: resolve() },
    ),

    new CopyWebpackPlugin([{
      from: resolve('src', 'manifest.json'),
      to: resolve('server-source', 'manifest.json'),
    }]),

    new CopyWebpackPlugin([{
      from: resolve('static'),
      to: resolve('server-source'),
    }]),

  ],
  devtool: 'inline-source-map',
};

module.exports = WebpackMerge(WebpackBaseConfig, WebpackDevConfig);
