import * as guideActions from '../actions/guide'

export const initialState = {
  isWaiting: false,
  routine: {
    name: null,
    week: null,
    options: {
      accessory: null
    },
  },
  lifts: {}
}

export default function workouts(state = initialState, action = {}) {
  let { payload, error, type } = action

  switch (action.type) {
    case guideActions.REQUEST_GUIDE:
      return Object.assign({}, state, {
        isWaiting: true
      })
    case guideActions.RECEIVE_GUIDE:
      return Object.assign({}, state, {
        isWaiting: false,
        routine: error ? Object.assign({}, initialState.routine) : Object.assign({}, payload.routine),
        lifts: error ? Object.assign({}, initialState.lifts) : Object.assign({}, payload.lifts)
      })
    default:
      return state
  }
}