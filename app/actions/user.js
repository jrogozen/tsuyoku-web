import fetch from '../utils/fetch'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export function requestLogin() {
  return { type: REQUEST_LOGIN }
}

export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export function receiveLogin(err) {
  return {
    type: RECEIVE_LOGIN,
    payload: err ? err : null,
    error: err ? true : null
  }
}

export const REQUEST_LOGOUT = 'REQUEST_LOGOUT'
export function requestLogout() {
  return { type: REQUEST_LOGOUT }
}

export function fetchLogin(credentials) {
  return (dispatch) => {
    dispatch(requestLogin())

    return fetch('post', 'login', credentials)
      .then(json => {
        if (!json.data.success) {
          throw json.error
        }
        dispatch(receiveLogin(null))
      })
      .catch(err => dispatch(receiveLogin(err)))
  }
}

export function fetchSignUp(credentials) {

}