import { expect } from 'chai'
import reducer from '../../reducers/workouts'
import * as workoutActions from '../../actions/workout'

const initialState = {
  isWaiting: false,
  currentGuide: {
    routine: {
      name: null,
      week: null,
      options: {
        accessory: null
      },
      maxes: {}
    }
  },
  data: {}
}
const workoutBase = { lifts: 100, weight: 'a ton' }

describe.only('Workouts reducer', () => {
  it('returns the initial state', () => {
    expect(reducer()).to.deep.eq(initialState)
  })

  it('sets state for REQUEST_WORKOUT', () => {
    const action = { type: workoutActions.REQUEST_WORKOUT }
    const expectedState = Object.assign({}, initialState, { isWaiting: true })
    expect(reducer(undefined, action)).to.deep.eq(expectedState)
  })

  it('sets state for RECEIVE_WORKOUT', () => {
    const data = {
      'workout1': workoutBase,
      'workout2': Object.assign({}, workoutBase, { lifts: 10, weight: 'a little' })
    }
    const action = { type: workoutActions.RECEIVE_WORKOUT, payload: data }
    const expectedState = Object.assign({}, initialState, {
      isWaiting: false,
      data: data
    })
    expect(reducer(undefined, action)).to.deep.eq(expectedState)
  })

  it('sets state for failed RECEIVE_WORKOUT', () => {

  })

  it('sets state for merged data when RECEIVE_WORKOUT', () => {

  })
})