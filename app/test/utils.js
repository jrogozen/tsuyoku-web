import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { polyfill } from 'es6-promise'
import fetch from 'isomorphic-fetch/fetch-npm-node'
import nock from 'nock'

import * as userActions from '../actions/user'
import * as workoutActions from '../actions/workout'
import user from '../models/user'

polyfill()

const API_URL = 'https://tsuyoku-api.herokuapp.com/'

const localStorage = function localStorage () {
  let storage = {}

  return {
    setItem: function(key, value) {
      storage[key] = value || ''
    },
    getItem: function(key) {
      return storage[key] || null
    },
    removeItem: function(key) {
      delete storage[key]
    },
    get length() {
      return Object.keys(storage).length
    },
    key: function(i) {
      const keys = Object.keys(storage)
      return keys[i] || null
    },
    reset: function() {
      storage = {}
    }
  }
}

const mockLocalStorage = function mockLocalStorage() {
  window.localStorage = localStorage()
}

export {
  expect,
  configureMockStore,
  thunk,
  fetch,
  nock,
  userActions,
  workoutActions,
  user,
  mockLocalStorage,
  API_URL
}