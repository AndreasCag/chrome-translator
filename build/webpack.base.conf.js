const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const _ = require('lodash');
const path = require('path');

const resolve = require('../helpers/resolve');

const htmlEntryPoints = [
  'popup',
  'options',
  'background',
];

module.exports = {
  entry: {
    ..._.zipObject(
      htmlEntryPoints,
      _.map(htmlEntryPoints, entryPoint => resolve('src', 'js', entryPoint)),
    ),
    'translate-helper': resolve('src', 'js', 'inject-scripts', 'translate-helper.js'),
  },
  output: {
    filename: '[name].bundle.js',
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '..', 'src'),
      root: resolve('.'),
      public: resolve('public'),
    },
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          { loader: 'pug-loader' },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: '/public/',
            },
          },
        ],
      },
    ],
  },
  plugins: [

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: htmlEntryPoints,
      minChunks: 3,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),

    ..._.map(
      htmlEntryPoints,
      entryPoint => (
        new HtmlWebpackPlugin({
          template: resolve('src', 'pug', `${entryPoint}.pug`),
          filename: `${entryPoint}.html`,
          chunks: ['manifest', 'vendor', entryPoint],
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
          },
        })
      ),
    ),

  ],
};
