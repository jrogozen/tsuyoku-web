import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Home from './containers/Home'
import Login from './containers/Login'

// import { requireAuthentication } from 'components/authenticateComponent'

export default (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
  </Route>
)
