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

// todo: test
export const UPDATE_GUIDE = 'UPDATE_GUIDE'
export function updateGuide(data) {
  return {
    type: UPDATE_GUIDE,
    payload: data
  }
}

export function fetchGuide(options = {}) {
  return (dispatch) => {
    const { user, routine, maxes } = options
    const data = {
      routine,
      maxes,
      userId: user.info._id
    }

    dispatch(requestGuide())

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