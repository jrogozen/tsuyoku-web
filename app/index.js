import React from 'react'
import { render } from 'react-dom'
import { syncHistory } from 'react-router-redux'
import { browserHistory } from 'react-router'

import Root from './containers/Root'
import configureStore from './store/configureStore'
import configRoutes from './routes.js'

const store = configureStore(browserHistory)
const routes = configRoutes(store)

render(
  <Root store={store} history={browserHistory} routes={routes}/>,
  document.getElementById('root')
)