import fetch from '../utils/fetch'
import * as guideActions from '../actions/guide'
import * as guideReducer from '../reducers/guide'

export const REQUEST_WORKOUT = 'REQUEST_WORKOUT'
export function requestWorkout() {
  return { type: REQUEST_WORKOUT }
}

export const RECEIVE_WORKOUT = 'RECEIVE_WORKOUT'
export function receiveWorkout(err, data) {
  let workout
  let workoutId
  let workoutObj = {}

  if (!err) {
    workout = Object.assign({}, data)
    workoutId = data._id
    delete workout['_id']

    workoutObj[workoutId] = workout
  }

  return {
    type: RECEIVE_WORKOUT,
    payload: err ? err : workoutObj,
    error: err ? true : undefined
  }
}

export function receiveWorkouts(err, data) {
  let workoutObj = {}

  if (!err) {
    data.forEach((workout) => {
      let parsedWorkout = Object.assign({}, workout)

      delete parsedWorkout['_id']
      
      parsedWorkout.lifts.forEach((lift, i) => {
        if (!lift || !lift.name) {
          delete parsedWorkout.lifts[i]
        }
      })

      if (parsedWorkout.lifts.length > 0) {
        workoutObj[workout._id] = parsedWorkout
      }
    })
  }

  return {
    type: RECEIVE_WORKOUT,
    payload: err ? err : workoutObj,
    error: err ? true : undefined
  }
}

export function saveWorkout(options = {}) {
  return (dispatch) => {
    const user = options.user || {}
    const userInfo = user.info || {}
    const workout = options.workout || {}
    const data = {
      lifts: workout.lifts,
      routine: workout.routine,
      userId: userInfo._id
    }

    dispatch(requestWorkout())

    return fetch(user, dispatch, {
      method: 'post',
      endpoint: 'workouts',
      data: data
    }).then(json => {
      if (!json.success) {
        throw json.error
      }

      dispatch(receiveWorkout(null, json.data))
      // dispatch(fetchWorkouts({
      //   user,
      //   routineName: workout.routine.name
      // }))
      // dispatch(guideActions.receiveGuide(guideReducer.initialState))
    }).catch(err => dispatch(receiveWorkout(err)))
  }
}

export function fetchWorkouts(options = {}) {
  return (dispatch) => {
    const user = options.user || {}
    const userInfo = user.info || {}
    const baseEndpoint = `workouts/byUser?userId=${userInfo._id}&routineName=${options.routineName}`

    let endpoint

    if (options.liftName) {
      endpoint = baseEndpoint + `liftName=${options.liftName}`
    } else {
      endpoint = baseEndpoint
    }

    dispatch(requestWorkout())

    return fetch(user, dispatch, {
      method: 'get',
      endpoint: endpoint
    }).then(json => {
      if (!json.success) {
        throw json.error
      }

      dispatch(receiveWorkouts(null, json.data))
    }).catch(err => dispatch(receiveWorkouts(err)))
  }
}