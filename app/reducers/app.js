import * as appActions from '../actions/app'

export const initialState = {
  isPending: true,
  successPopup: false
}

export default function app(state = initialState, action = {}) {
  let { payload, error, type } = action

  switch (action.type) {
    case appActions.SET_APP_BOOL:
      let newState = Object.assign({}, state)
      if (payload.key) {
        newState[payload.key] = payload.bool
        return newState
      } else {
        return state
      }
    default:
      return state
  }
}