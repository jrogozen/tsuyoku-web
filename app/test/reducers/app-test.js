import { expect, appActions } from '../utils'

import reducer from '../../reducers/app'
import { initialState } from '../../reducers/app'

describe('App reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined)).to.deep.eq(initialState)
  })

  it('sets state for SET_APP_BOOL', () => {
    const action = { type: appActions.SET_APP_BOOL, payload: { key: 'poop', bool: true } }
    const expectedState = Object.assign({}, initialState, { poop: true })
    expect(reducer(undefined, action)).to.deep.eq(expectedState)
  })

  it('sets state for existing key/bool', () => {
    const action = { type: appActions.SET_APP_BOOL, payload: { key: 'poop', bool: false }}
    const modifiedInitialState = Object.assign({}, initialState, { poop: true })
    const expectedState = Object.assign({}, modifiedInitialState, { poop: false })
    expect(reducer(undefined, action)).to.deep.eq(expectedState)
  })

  it ('returns state if no key', () => {
    const action = { type: appActions.SET_APP_BOOL, payload: { bool: true }}
    const modifiedInitialState = Object.assign({}, initialState, { pool: true })
    expect(reducer(modifiedInitialState, action)).to.deep.eq(modifiedInitialState)
  })
})
