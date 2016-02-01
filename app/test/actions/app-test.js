import {
  expect,
  configureMockStore,
  thunk,
  appActions,
} from '../utils'

const middleware = [thunk]
const mockStore = configureMockStore(middleware)

describe('App actions', () => {
  it('creates SET_APP_BOOL action for true', () => {
    const expectedAction = { type: appActions.SET_APP_BOOL, payload: { key: 'fun', bool: true } }
    expect(appActions.setAppBool('fun', true)).to.deep.eq(expectedAction)
  })

  it('creates SET_APP_BOOL action for false', () => {
    const expectedAction = { type: appActions.SET_APP_BOOL, payload: { key: 'pitted', bool: false }}
    expect(appActions.setAppBool('pitted', false)).to.deep.eq(expectedAction)
  })
})