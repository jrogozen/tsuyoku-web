import { expect } from 'chai'
import reducer from '../../reducers/user'
import * as userActions from '../../actions/user'

const initialState = {
  isWaiting: false,
  isAdmin: false,
  isAuthenticated: false
}

describe('User reducer', () => {
  it('return the initial state', () => {
    expect(reducer(undefined)).to.deep.eq(initialState)
  })

  it('set state for REQUEST_LOGIN', () => {
   let action = { type: userActions.REQUEST_LOGIN }
   let expectedState = Object.assign({}, initialState, { isWaiting: true })
   expect(reducer(undefined, action)).to.deep.eq(expectedState)
  })

  it('set state for RECEIVE_LOGIN', () => {
   let action = { type: userActions.RECEIVE_LOGIN, payload: { admin: false } }
   let expectedState = Object.assign({}, initialState, { isWaiting: false, isAuthenticated: true })
   expect(reducer(undefined, action)).to.deep.eq(expectedState)
  })

  it('set admin state for RECEIVE_LOGIN', () => {
   let action = { type: userActions.RECEIVE_LOGIN, payload: { admin: true } }
   let expectedState = Object.assign({}, initialState, { isWaiting: false, isAuthenticated: true, isAdmin: true })
   expect(reducer(undefined, action)).to.deep.eq(expectedState)
  })

  it('set state for rejected RECEIVE_LOGIN', () => {
   let action = { type: userActions.RECEIVE_LOGIN, error: true }
   expect(reducer(undefined, action)).to.deep.eq(initialState)
  })

  it('set state for REQUEST_LOGOUT', () => {
   let action = { type: userActions.REQUEST_LOGOUT }
   expect(reducer(undefined, action)).to.deep.eq(initialState)
  })
})
