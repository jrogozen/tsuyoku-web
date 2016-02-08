import promise from 'promise'
import * as userActions from '../actions/user'

const _fetch = require('isomorphic-fetch')

// const API_URL = 'https://tsuyoku-api.herokuapp.com/'
const API_URL = 'http://localhost:1337/'

const baseUser = { info: {} }

export default function fetch(user = baseUser, dispatch, _options) {
  const options = {
    method: _options.method,
    endpoint: _options.endpoint,
    data: Object.assign({}, _options.data)
  }

  const fetchOptions = {
    method: options.method,
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    }
  }

  let apiAccessToken

  try {
    apiAccessToken = JSON.parse(localStorage.getItem('user')).api_access_token
  } catch(err) {
    apiAccessToken = null;
  }

  if (apiAccessToken) {
    fetchOptions.headers['x-access-token'] = apiAccessToken
  }

  if (options.method !== 'get') {
    fetchOptions.body = JSON.stringify(options.data)
  }

  return _fetch(API_URL + options.endpoint, fetchOptions)
    .then((response) => {
      return { json: response.json(), status: response.status  }
    })
    .then((response) => {
      const json = response.json
      const status = response.status

      if (!json.success && status === 402) {
        const apiRefreshToken = user.info.api_refresh_token

        let authChain

        return authChain = new promise((resolve, reject) => {
          if (apiRefreshToken) {
            dispatch(userActions.fetchLogin({ api_refresh_token: apiRefreshToken }))
              .then((parsedUser) => resolve(parsedUser))
              .catch((err) => { throw err })
          } else {
            reject(new Error('No login credentials'))
          }
        })

        authChain.then((parsedUser) => {
          const newFetchOptions = Object.assign({}, options, {
            token: parsedUser.api_access_token
          })
          return fetch(newFetchOptions)
        }).catch((err) => { throw err })
      } else if (json.success && json.api_access_token) { // set localStorage and dispatch update to receive login
        dispatch(userActions.receiveLogin(null, { api_access_token: json.api_access_token }))
      }

      return json
    })
}