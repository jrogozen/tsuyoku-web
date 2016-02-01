import {
  expect,
  configureMockStore,
  thunk,
  fetch,
  nock,
  mockLocalStorage,
  workoutActions,
  API_URL
} from '../utils'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Workout actions', () => {
  before(() => {
    mockLocalStorage()
  })

  it('creates REQUEST_WORKOUT action', () => {
    const expectedAction = { type: workoutActions.REQUEST_WORKOUT }
    expect(workoutActions.requestWorkout()).to.deep.eq(expectedAction)
  })

  it('creates RECEIVE_WORKOUT action', () => {
    const payload = { _id: 1, name: 'bench' }
    const expectedAction = { type: workoutActions.RECEIVE_WORKOUT, payload: {
      1: { name: 'bench' },
    }, error: undefined }
    expect(workoutActions.receiveWorkout(null, payload)).to.deep.eq(expectedAction)
  })

  it('handles error for RECEIVE_WORKOUT', () => {
    const error = new Error('darn')
    const expectedAction = { type: workoutActions.RECEIVE_WORKOUT, payload: error, error: true }
    expect(workoutActions.receiveWorkout(error)).to.deep.eq(expectedAction)
  })

  it('creates RECEIVE_WORKOUT action from receiveWorkouts() action', () => {
    const data = [
      { _id: 1, lifts: [{ name: 'bench' }]},
      { _id: 2, lifts: [{ name: 'press' }]}
    ]
    const expectedAction = { type: workoutActions.RECEIVE_WORKOUT, payload: {
      1: { lifts: [{ name: 'bench' }] },
      2: { lifts: [{ name: 'press' }] }
    }, error: undefined }
    expect(workoutActions.receiveWorkouts(null, data)).to.deep.eq(expectedAction)
  })

  it('handles receiveWorkouts() errors', () => {
    const error = new Error('poop')
    const expectedAction = { type: workoutActions.RECEIVE_WORKOUT, payload: error, error: true }
    expect(workoutActions.receiveWorkouts(error)).to.deep.eq(expectedAction)
  })

  describe('async workout actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('dispatches actions for saveWorkout()', (done) => {
      nock(API_URL)
        .post('/workouts')
        .reply(200, {
          data: { _id: 1, name: 'bench' },
          api_access_token: 'mahalo',
          success: true
        })

      const expectedActions = [
        { type: workoutActions.REQUEST_WORKOUT },
        { type: workoutActions.RECEIVE_WORKOUT, payload: {
          1: { name: 'bench' }
        }, error: undefined }
      ]

      const store = mockStore({}, expectedActions, done)
      store.dispatch(workoutActions.saveWorkout())
    })

    it('dispatches actions for fetchWorkouts()', (done) => {
      nock(API_URL)
        .get('/workouts/byUser')
        .query(true)
        .reply(200, {
          data: [{ _id: 1, lifts: [{ name: 'bench' }]}],
          api_access_token: 'mahalo',
          success: true
        })

      const expectedActions = [
        { type: workoutActions.REQUEST_WORKOUT },
        { type: workoutActions.RECEIVE_WORKOUT, payload: {
          1: { lifts: [{ name: 'bench' }] }
        }, error: undefined }
      ]

      const store = mockStore({}, expectedActions, done)
      store.dispatch(workoutActions.fetchWorkouts())
    })
  })
})