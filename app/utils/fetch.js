const _fetch = require('isomorphic-fetch')

const API_URL = 'https://tsuyoku-web.herokuapp.com/'

export default function fetch(method, endpoint, data) {
  return _fetch(API_URL + endpoint, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response) => response.json())
}