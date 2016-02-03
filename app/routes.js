import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { routeActions } from 'react-router-redux'

import App from './containers/App'
import Home from './containers/Home'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'
import Workout from './containers/Workout'
import WorkoutCreate from './containers/WorkoutCreate'
import WorkoutsView from './containers/WorkoutsView'

export default function configRoutes(store) {
  const authTransition = function authTransition(nextState, replace, callback) {
    const state = store.getState()
    const user = state.user

    // todo: in react-router 2.0, you can pass a single object to replace :)
    if (!user.isAuthenticated) {
      replace({ nextPathname: nextState.location.pathname }, '/login', nextState.location.query)
    }

    callback()
  }

  return (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/dashboard" component={Dashboard} onEnter={authTransition}/>
      <Route path="/workouts" component={Workout} onEnter={authTransition}>
        <IndexRoute component={WorkoutsView}/>
        <Route path="/workouts/create" component={WorkoutCreate}/>
      </Route>
    </Route>
  )
}