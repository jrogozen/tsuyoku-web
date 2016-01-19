import fetch from '../utils/fetch'
import user from '../models/user'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export function requestLogin() {
  return { type: REQUEST_LOGIN }
}

export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export function receiveLogin(err, data) {
  if (!err) {
    const userInfoToStore = {
      _id: data._id,
      api_access_token: data.api_access_token,
      email: data.email,
      updated_at: data.updated_at
    }

    localStorage.setItem('user', JSON.stringify(userInfoToStore))
  }

  return {
    type: RECEIVE_LOGIN,
    payload: err ? err : data,
    error: err ? true : null
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

    return fetch('post', 'login', credentials)
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