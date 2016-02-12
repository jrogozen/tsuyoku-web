import {
  expect,
  configureMockStore,
  thunk,
  fetch,
  nock,
  mockLocalStorage,
  userActions,
  user,
  API_URL
} from '../utils'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('User actions', () => {
  before(() => {
    mockLocalStorage()
  })

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

  it('sets localStorage after receiveLogin', () => {
    const data = { api_access_token: 'mahalo', email: 'mahalo@gmail.com' }
    userActions.receiveLogin(null, data)
    expect(JSON.parse(window.localStorage.getItem('user')).api_access_token).to.eq('mahalo')
  })

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

  it('creates REQUEST_UPDATE action', () => {
    const expectedAction = { type: userActions.REQUEST_UPDATE }
    expect(userActions.requestUpdate()).to.deep.eq(expectedAction)
  })

  it('creates RECEIVE_UPDATE action', () => {
    const data = { age: 5, api_access_token: 'justdoit' }
    const expectedAction = {
      type: userActions.RECEIVE_UPDATE,
      payload: data,
      error: undefined
    }
    expect(userActions.receiveUpdate(null, data)).to.deep.eq(expectedAction)
  })

  it('handle RECEIVE_UPDATE error', () => {
    const error = new Error('life is hard')
    const expectedAction = {
      type: userActions.RECEIVE_UPDATE,
      payload: error,
      error: true
    }
    expect(userActions.receiveUpdate(error)).to.deep.eq(expectedAction)
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
        { type: userActions.REQUEST_LOGIN },
        { type: userActions.RECEIVE_LOGIN, payload: expected, error: undefined }
      ]

      const store = mockStore({ user: {} }, expectedActions, done)
      store.dispatch(userActions.fetchLogin())
    })

    it('dispatches actions during fetchUpdate()', (done) => {
      const userInfo = {
        _id: 100,
        email: 'mahalo@gmail.com'
      }
      const userData = {
        age: 30
      }
      const token = 'mahalo'
      const expected = {
        _id: 100,
        email: 'mahalo@gmail.com',
        api_access_token: token,
        age: 30
      }

      nock(API_URL)
        .put('/users/100')
        .reply(200, {
          data: Object.assign({}, userInfo, userData),
          api_access_token: token,
          success: true
        })

        const expectedActions = [
          { type: userActions.REQUEST_UPDATE },
          { type: userActions.RECEIVE_UPDATE, payload: expected, error: undefined }
        ]

        const store = mockStore({ user: {} }, expectedActions, done)
        store.dispatch(userActions.fetchUpdate({
          user: userInfo,
          data: userData
        }))
    })
  })
})
