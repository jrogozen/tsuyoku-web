import {
  expect,
  configureMockStore,
  thunk,
  fetch,
  nock,
  mockLocalStorage,
  guideActions,
  user,
  API_URL
} from '../utils'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Guide actions', () => {
  before(() => {
    mockLocalStorage()
  })

  it('creates REQUEST_GUODE action', () => {
    const expectedAction = { type: guideActions.REQUEST_GUIDE }
    expect(guideActions.requestGuide()).to.deep.eq(expectedAction)
  })

  it('creates RECEIVE_GUIDE action', () => {
    const expectedAction = {
      type: guideActions.RECEIVE_GUIDE,
      payload: undefined,
      error: undefined
    }
    expect(guideActions.receiveGuide()).to.deep.eq(expectedAction)
  })

  it('sets RECEIVE_GUIDE action to have error/payload', () => {
    const error = new Error('boohoo')
    const expectedAction = {
      type: guideActions.RECEIVE_GUIDE,
      payload: error,
      error: true
    }
    expect(guideActions.receiveGuide(error))
  })

  describe('async guide actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('dispatches actions during fetchGuide()', (done) => {
      const user = { info: { _id: 100 } }
      const data = { message: 'sup' }
     

      nock(API_URL)
        .put('/guides')
        .reply(200, {
          data: data,
          success: true
        })

      const expectedActions = [
        { type: guideActions.REQUEST_GUIDE },
        { type: guideActions.RECEIVE_GUIDE, payload: data, error: undefined }
      ]

      const store = mockStore({}, expectedActions, done)
      store.dispatch(guideActions.fetchGuide({ user: { info: {} } }))
    })
  })
})
