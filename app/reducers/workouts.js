import * as workoutActions from '../actions/workout'

export const initialState = {
  isWaiting: false,
  data: {}
}

export default function workouts(state = initialState, action = {}) {
  let { payload, error, type } = action

  switch (action.type) {
    case workoutActions.REQUEST_WORKOUT:
      return Object.assign({}, state, {
        isWaiting: true
      })
    case workoutActions.RECEIVE_WORKOUT:
      return Object.assign({}, state, {
        isWaiting: false,
        data: error ? state.data : Object.assign({}, state.data, payload)
      })
    default:
      return state
  }
}