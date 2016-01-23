import fetch from '../utils/fetch'

export const REQUEST_GUIDE = 'REQUEST_GUIDE'
export function requestGuide() {
  return { type: REQUEST_GUIDE }
}

export const RECEIVE_GUIDE = 'RECEIVE_GUIDE'
export function receiveGuide(err, data) {
  return {
    type: RECEIVE_GUIDE,
    payload: err ? err : data,
    error: err ? true : undefined
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
  }
}