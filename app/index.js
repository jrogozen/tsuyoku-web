import React from 'react'
import { render } from 'react-dom'
import { syncHistory } from 'redux-simple-router'
import { createHistory } from 'history'

import Root from './containers/Root'
import configureStore from './store/configureStore'
import configRoutes from './routes.js'

const history = createHistory()
const store = configureStore(history)
const routes = configRoutes(store)

render(
  <Root store={store} history={history} routes={routes}/>,
  document.getElementById('root')
)