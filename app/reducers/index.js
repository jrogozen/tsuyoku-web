import { combineReducers } from 'redux'
import { routeReducer as routing } from 'redux-simple-router'

import user from './user'
import workouts from './workouts'
import guide from './guide'

export default combineReducers({
  user,
  guide,
  workouts,
  routing
})
