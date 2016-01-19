import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Home from './containers/Home'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'

import { requireAuthentication } from './components/authenticate'

export default (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={requireAuthentication(Dashboard)} />
  </Route>
)
