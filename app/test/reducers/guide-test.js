import { expect, guideActions } from '../utils'

import reducer from '../../reducers/guide'
import { initialState } from '../../reducers/guide'

const workoutBase = { lifts: 100, weight: 'a ton' }

describe('Guide reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined)).to.deep.eq(initialState)
  })

  it('sets state for REQUEST_GUIDE', () => {
    const action = { type: guideActions.REQUEST_GUIDE }
    const expectedState = Object.assign({}, initialState, { isWaiting: true })
    expect(reducer(undefined, action)).to.deep.eq(expectedState)
  })

  it('sets state for RECEIVE_GUIDE', () => {
    const routine = Object.assign({}, initialState.routine, {
      name: '5/3/1',
      week: 2
    })
    const lifts = Object.assign({}, initialState.lifts, {
      'squat': {
        sets: [
          [225, 225, 225]
        ],
        warmup: [
          [135, 135, 135]
        ]
      }
    })
    const action = { type: guideActions.RECEIVE_GUIDE, payload: { routine, lifts } }
    const expectedState = Object.assign({}, initialState, {
      isWaiting: false,
      routine: Object.assign({}, initialState.routine, routine),
      lifts: Object.assign({}, initialState.lifts, lifts)
    })
    expect(reducer(undefined, action)).to.deep.eq(expectedState)
  })

  it('sets error state for RECEIVE_GUIDE', () => {
    const err = new Error('whoops')
    const action = { type: guideActions.RECEIVE_GUIDE, error: true, payload: err }
    const expectedState = Object.assign({}, initialState, {
      isWaiting: false
    })
    expect(reducer(undefined, action)).to.deep.eq(expectedState)
  })
})