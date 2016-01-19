import promise from 'promise'
import * as userActions from '../actions/user'

const _fetch = require('isomorphic-fetch')

const API_URL = 'https://tsuyoku-api.herokuapp.com/'
// const badToken = 'Error validating token'

export function fetch(_options) {
  const options = {
    method: _options.method,
    endpoint: _options.endpoint,
    data: Object.assign({}, _options.data, {
      token: _options.api_access_token
    })
  }

  const fetchOptions = {
    method: options.method,
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  }

  if (options.method !== 'get') {
    fetchOptions.body = JSON.stringify(options.data)
  }

  return _fetch(API_URL + options.endpoint, fetchOptions)
    .then((response) => response.json())
}

export function attemptAuth(user, dispatch, options) {
  const apiRefreshToken = user.info.api_refresh_token
  const apiAccessToken = JSON.parse(localStorage.getItem('user')).api_access_token

  let authChain
  console.log('wuht')
  return authChain = new promise((resolve, reject) => {
    if (apiRefreshToken) {
      dispatch(userActions.fetchLogin({ api_refresh_token: apiRefreshToken }))
        .then((parsedUser) => resolve(parsedUser))
    } else if (apiAccessToken) {
      console.log('BLARG')
      dispatch(userActions.fetchLogin({ api_access_token: api_access_token }))
        .then((parsedUser) => resolve(parsedUser))
    } else {
      console.log('TEEHEEEEEEEE')
      reject(new Error('No login credentials'))
    }
  })

  authChain.then((parsedUser) => {
    const newFetchOptions = Object.assign({}, options, {
      token: parsedUser.api_access_token
    })
    console.log('making new fetch!')
    return fetch(newFetchOptions)
  }).catch((err) => {
    console.log('TEEHEE')
    throw new Error('Could not login')
  })
}