var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, '..', 'app', 'index.js')
  ],
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      __DEV__: false
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: path.join(__dirname, '..'),
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'raw'],
        include: path.join(__dirname, '..')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/, 
        loader: 'url', 
        query: {limit: 10240} 
      }
    ]
  }
};