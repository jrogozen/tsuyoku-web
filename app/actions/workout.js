import fetch from '../utils/fetch'

export const REQUEST_WORKOUTS = 'REQUEST_WORKOUTS'
export function requestWorkouts() {
  return { type: REQUEST_WORKOUTS }
}

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
    error: err ? err : undefined
  }
}

export const RECEIVE_WORKOUTS = 'RECEIVE_WORKOUTS'
export function receiveWorkouts(err, data) {
  let workoutObj = {}

  if (!err) {
    data.forEach((workout) => {
      let parsedWorkout = Object.assign({}, workout)

      delete parsedWorkout['_id']
      
      workoutObj[workout._id] = parsedWorkout
    })
  }

  return {
    type: RECEIVE_WORKOUT,
    payload: err ? err : workoutObj,
    error: err ? err : undefined
  }
}

export const RECEIVE_GUIDE = 'RECEIVE_GUIDE'
export function receiveGuide(err, data) {
  return {
    type: RECEIVE_GUIDE,
    payload: err ? err : data,
    error: err ? err : undefined
  }
}

export function fetchGuide(options) {
  return (dispatch) => {
    const { user, routine, maxes } = options
    const data = {
      routine,
      maxes,
      userId: user.info._id
    }

    dispatch(requestWorkout())

    return fetch(user, dispatch, {
      method: 'put',
      endpoint: 'guides',
      data: data
    }).then((json) => {
      if (!json.success) {
        throw json.error
      }

      dispatch(receiveGuide(null, json.data))
    }).catch(err => dispatch(receiveGuide(err)))

    // userId, routine, maxes
    /* routine: {
      name: '',
      options: {
        accessory: ''
      }
    },
    maxes: {
      'bench press': 255
    }
    */
  }
}

export function saveWorkout(options) {
  return (dispatch) => {
    const user = options.user
    const workout = options.workout
    const data = {
      lifts: workout.lifts,
      routine: workout.routine,
      userId: user.info._id
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
    }).catch(err => dispatch(receiveWorkout(err)))
  }
}

export function fetchWorkouts(options) {
  return (dispatch) => {
    const user = options.user
    const baseEndpoint = `workouts/byUser?userId=${user.info._id}&routineName=${options.routineName}`

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