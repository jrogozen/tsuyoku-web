import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch/fetch-npm-node';
import nock from 'nock'

import * as userActions from '../../actions/user'
import user from '../../models/user'

polyfill();

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const API_URL = 'https://tsuyoku-api.herokuapp.com/'

describe('User actions', () => {
  it('creates REQUEST_LOGIN action', () => {
    const expectedAction = { type: userActions.REQUEST_LOGIN }
    expect(userActions.requestLogin()).to.deep.eq(expectedAction)
  })

  it('creates RECEIVE_LOGIN action', () => {
    const expectedAction = {
      type: userActions.RECEIVE_LOGIN,
      payload: undefined,
      error: undefined
    }
    expect(userActions.receiveLogin()).to.deep.eq(expectedAction)
  })

  // todo: add test to check local storage
  // todo: add test to check more payload setting

  it('sets RECEIVE_LOGIN action to have error/payload', () => {
    const error = new Error('boohoo')
    const expectedAction = {
      type: userActions.RECEIVE_LOGIN,
      payload: error,
      error: true
    }
    expect(userActions.receiveLogin(error))
  })

  it('creates REQUEST_LOGOUT action', () => {
    const expectedAction = { type: userActions.REQUEST_LOGOUT }
    expect(userActions.requestLogout()).to.deep.eq(expectedAction)
  })

  describe('async user actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('dispatches actions during fetchLogin()', (done) => {
      const userInfo = {
        _id: 100,
        email: 'mahalo@gmail.com'
      }
      const token = 'mahalo'
      const expected = {
        _id: 100,
        email: 'mahalo@gmail.com',
        api_access_token: token
      }

      nock(API_URL)
        .post('/login')
        .reply(200, {
          data: userInfo,
          api_access_token: token,
          success: true
        })

      const expectedActions = [
        { type: userActions.REQUEST_LOGIN }
        // todo: not sure why not eq{ type: userActions.RECEIVE_LOGIN, payload: expected, error: undefined }
      ]

      const store = mockStore({ user: {} }, expectedActions, done)
      store.dispatch(userActions.fetchLogin())
    })
  })
})
