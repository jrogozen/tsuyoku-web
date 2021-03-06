import { combineReducers } from 'redux'
import { routeReducer as routing } from 'react-router-redux'

import user from './user'
import workouts from './workouts'
import guide from './guide'
import app from './app'

export default combineReducers({
  app,
  user,
  guide,
  workouts,
  routing
})
