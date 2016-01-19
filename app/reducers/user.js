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
      return Object.assign({}, state, {
        isWaiting: false,
        isAuthenticated: !error,
        isAdmin: payload ? !!payload.admin : false,
        info: payload ? Object.assign({}, state.info, payload) : state.info
      })
    case userActions.REQUEST_LOGOUT:
      return initialState
    default:
      return state
  }
}