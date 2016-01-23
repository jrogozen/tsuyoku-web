import { expect, userActions } from '../utils'

import reducer from '../../reducers/user'
import { base as userBase } from '../../models/user'

const initialState = {
  isWaiting: false,
  isAdmin: false,
  isAuthenticated: false,
  info: userBase
}

describe('User reducer', () => {
  it('return the initial state', () => {
    expect(reducer(undefined)).to.deep.eq(initialState)
  })

  it('set state for REQUEST_LOGIN', () => {
    const action = { type: userActions.REQUEST_LOGIN }
    const expectedState = Object.assign({}, initialState, { isWaiting: true })
    expect(reducer(undefined, action)).to.deep.eq(expectedState)
  })

  it('set state for RECEIVE_LOGIN', () => {
    const action = { type: userActions.RECEIVE_LOGIN, payload: { admin: false } }
    const expectedState = Object.assign({}, initialState,
      { isWaiting: false, isAuthenticated: true, info: Object.assign({}, userBase, { admin: false }) }
    )
    expect(reducer(undefined, action)).to.deep.eq(expectedState)
  })

  it('set admin state for RECEIVE_LOGIN', () => {
    const action = { type: userActions.RECEIVE_LOGIN, payload: { admin: true } }
    const expectedState = Object.assign({}, initialState,
      { isWaiting: false, isAuthenticated: true, isAdmin: true, info: Object.assign({}, userBase, { admin: true }) }
    )
    expect(reducer(undefined, action)).to.deep.eq(expectedState)
  })

  it('set state for rejected RECEIVE_LOGIN', () => {
    const action = { type: userActions.RECEIVE_LOGIN, error: true }
    expect(reducer(undefined, action)).to.deep.eq(initialState)
  })

  it('set state for REQUEST_LOGOUT', () => {
    const action = { type: userActions.REQUEST_LOGOUT }
    expect(reducer(undefined, action)).to.deep.eq(initialState)
  })

  it('correctly merges nested state', () => {
    const action = { type: userActions.RECEIVE_LOGIN, payload: { maxes: { bench_press: 225 } } }
    const expectedState = Object.assign({}, initialState,
      { isWaiting: false, isAuthenticated: true,
        info: Object.assign({}, userBase, { maxes: { bench_press: 225 }})
      }
    )
    expect(reducer(undefined, action)).to.deep.eq(expectedState)
  })

  it('updates passed in state', () => {
    const base = Object.assign({}, initialState, { info: Object.assign({}, userBase, { email: 'jon.rogozen@gmail.com' }) })
    const action = { type: userActions.RECEIVE_LOGIN, payload: { age: 12 }}
    const expectedState = Object.assign({}, initialState,
      { isWaiting: false, isAuthenticated: true,
        info: Object.assign({}, userBase, { age: 12, email: 'jon.rogozen@gmail.com' })
      }
    )
    expect(reducer(base, action)).to.deep.eq(expectedState)
  })
})
