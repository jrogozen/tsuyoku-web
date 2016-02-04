import * as userActions from '../actions/user'
import { base as userBase } from '../models/user'

const initialState = {
  isWaiting: false,
  isAdmin: false,
  isAuthenticated: false,
  info: userBase
}

export default function user(state = initialState, action = {}) {
  let { payload, error, type } = action

  switch (action.type) {
    case userActions.REQUEST_LOGIN:
      return Object.assign({}, state, {
        isWaiting: true,
        isAuthenticated: false
      })
    case userActions.RECEIVE_LOGIN:
      const user = Object.assign({}, state, {
        isWaiting: false,
        isAuthenticated: !error,
        info: (payload  || error ) ? Object.assign({}, state.info, payload) : state.info
      })

      if (payload && payload.admin === false) {
        user.isAdmin = false
      } else if (payload && payload.admin) {
        user.isAdmin = true
      }

      return user
    case userActions.REQUEST_LOGOUT:
      return initialState
    default:
      return state
  }
}