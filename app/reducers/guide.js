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

export default function guide(state = initialState, action = {}) {
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
    // todo: test
    case guideActions.UPDATE_GUIDE:
      return Object.assign({}, state, {
        routine: data.routine ? Object.assign({}, state.routine, data.routine) : state.routine,
        lifts: data.lifts ? Object.assign({}, state.lifts, data.lifts) : state.lifts
      })
    default:
      return state
  }
}