import * as userActions from '../actions/user'

const initialState = {
  isWaiting: false,
  isAdmin: false,
  isAuthenticated: false
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
        isAdmin: payload ? !!payload.admin : false
      })
    case userActions.REQUEST_LOGOUT:
      return initialState
    default:
      return initialState
  }
}