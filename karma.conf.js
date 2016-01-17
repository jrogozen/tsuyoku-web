var webpack = require('webpack');

module.exports = function(config) {
  config.set({

    browsers: ['PhantomJS'],

    frameworks: [ 'mocha' ],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'mocha' ],

    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-mocha-reporter"),
      require("karma-phantomjs-launcher"),
      require("karma-sourcemap-loader")
    ],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: {limit: 10240} },
          { test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
          { test: /\.json$/, loader: 'json-loader' },
          { test: /\.less$/, loader: 'style!css!less' },
          { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' }
        ]
      },
      resolve: {
        modulesDirectories: [
          'app',
          'node_modules'
        ],
        extensions: ['', '.json', '.js']
      },
      node: {
        fs: "empty"
      },
      plugins: [
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          __DEV__: true
        })
      ]
    },

    webpackServer: {
      noInfo: true
    },

    logLevel: config.LOG_INFO,

    browserNoActivityTimeout: 20000

  });
};