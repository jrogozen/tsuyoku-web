import fetch from '../utils/fetch'
import user from '../models/user'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export function requestLogin() {
  return { type: REQUEST_LOGIN }
}

export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export function receiveLogin(err, _data) {
  let data

  if (!err && _data) {
    data = Object.assign({}, _data)
    const userInfoToStore = { api_access_token: data.api_access_token }
    localStorage.setItem('user', JSON.stringify(userInfoToStore))
  }

  return {
    type: RECEIVE_LOGIN,
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

    return fetch(null, dispatch, {
      method: 'post',
      endpoint: 'login',
      data: credentials
    })
      .then(json => {
        if (!json.success) {
          throw json.error
        }

        const parsedUser = user(json)

        dispatch(receiveLogin(null, parsedUser))
        return parsedUser
      })
      .catch(err => dispatch(receiveLogin(err)))
  }
}

export function fetchSignUp(credentials) {

}