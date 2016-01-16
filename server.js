const http = require('http')
const express = require('express')
const path = require('path')

const app = express()

app.use(require('morgan')('short'))

const isDev = 'production' !== process.env.NODE_ENV
const port = isDev ? 3030 : (process.env.PORT || 80)

function initWebpack() {
  const webpack = require('webpack')
  const webpackConfig = require('./webpack/webpack.config.js')
  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    lazy: false,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }))

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr'
  }))

  app.use(express.static(__dirname + '/'))
}

isDev ? initWebpack() : null

app.get('*', (req, res) => res.sendFile(__dirname + '/index.html'))

const server = http.createServer(app)

server.listen(port, () => console.log('Express server listening on port ' + port))
