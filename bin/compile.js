var webpack = require('webpack');

webpack(require('../webpack/webpack.config.prod'), function() {
  console.log('webpack built!');
});