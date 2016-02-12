import fetch from '../utils/fetch'
import User from '../models/user'

import timeout from '../utils/timer'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export function requestLogin() {
  return { type: REQUEST_LOGIN }
}

export const REQUEST_UPDATE = 'REQUEST_UPDATE'
export function requestUpdate() {
  return { type: REQUEST_UPDATE }
}

export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export function receiveLogin(err, _data) {
  let data

  if (!err && _data) {
    data = Object.assign({}, _data)

    // todo: more actions should be setting api_access_token
    const userInfoToStore = { api_access_token: data.api_access_token }
    localStorage.setItem('user', JSON.stringify(userInfoToStore))
  }

  return {
    type: RECEIVE_LOGIN,
    payload: err ? err : data,
    error: err ? true : undefined
  }
}

export const RECEIVE_UPDATE = 'RECEIVE_UPDATE'
export function receiveUpdate(err, _data) {
  let data

  // todo: extract into a util function
  if (!err && _data) {
    data = Object.assign({}, _data)

    const userInfoToStore = { api_access_token: data.api_access_token }
    localStorage.setItem('user', JSON.stringify(userInfoToStore))
  }

  return {
    type: RECEIVE_UPDATE,
    payload: err ? err : data,
    error: err ? true : undefined
  }
}

export const REQUEST_LOGOUT = 'REQUEST_LOGOUT'
export function requestLogout() {
  localStorage.removeItem('user')
  return { type: REQUEST_LOGOUT }
}

export function fetchLogin(credentials) {
  return (dispatch) => {
    dispatch(requestLogin())

    return timeout(fetch(null, dispatch, {
      method: 'post',
      endpoint: 'login',
      data: credentials
    }), 2000)
      .then(json => {
        if (!json.success) {
          throw json.error
        }

        const parsedUser = User(json)

        dispatch(receiveLogin(null, parsedUser))
        return parsedUser
      })
      .catch(err => dispatch(receiveLogin(err)))
  }
}

export function fetchUpdate(options) {
  const { user, data } = options

  return (dispatch) => {
    dispatch(requestUpdate())

    return fetch(user, dispatch, {
      method: 'put',
      endpoint: 'users/' + user._id,
      data
    })
      .then(json => {
        if (!json.success) {
          throw json.error
        }

        const parsedUser = User(json)

        dispatch(receiveUpdate(null, parsedUser))
        return parsedUser
      })
      .catch(err => {
        dispatch(receiveLogin(err))
      })
  }
}

export function fetchSignUp(credentials) {
  return (dispatch) => {
    dispatch(requestLogin())

    return fetch(null, dispatch, {
      method: 'post',
      endpoint: 'users',
      data: credentials
    })
      .then(json => {
        if (!json.success) {
          throw json.error
        }

        const parsedUser = User(json)

        dispatch(receiveLogin(null, parsedUser))
        return parsedUser
      })
      .catch(err => dispatch(receiveLogin(err)))
  }
}