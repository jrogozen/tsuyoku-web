import { expect } from 'chai'
import * as utils from '../../utils/fiveThreeOne'

describe('fiveThreeOne utils', () => {
  describe('getBaseWorkout', () => {
    it('returns new 5/3/1 routine if empty', () => {
      const defaultWorkout = {
        routine: {
          name: '5/3/1',
          week: 1,
          options: {
            accessory: 'boring but big'
          }
        },
        lifts: [{}]
      }
      expect(utils.getBaseWorkout()).to.deep.eq(defaultWorkout)
    })

    it('returns latest routine', () => {
      const workouts = {
        data: {
          '1': {
            created_at: 5,
            routine: 'hello'
          },
          '2': {
            created_at: 10,
            routine: 'goodbye'
          }
        }
      }
      expect(utils.getBaseWorkout(workouts)).to.deep.eq({routine: 'goodbye'})
    })

    it('omits created_at, updated_at, and userId', () => {
      const workouts = {
        data: {
          '1': {
            created_at: 5,
            userId: 10,
            updated_at: 6,
            routine: 'hello'
          },
          '2': {
            created_at: 10,
            userId: 10,
            updated_at: 6,
            routine: 'goodbye'
          }
        }
      }
      expect(utils.getBaseWorkout(workouts)).to.deep.eq({routine: 'goodbye'})
    })
  })

  describe('getNextLift', () => {
    it('returns press if no previousLift', () => {
      const expected = 'press'
      expect(utils.getNextLift()).to.eq(expected)
    })

    it('returns first lift in dictionary if at last lift', () => {
      const expected = 'press'
      expect(utils.getNextLift('squat')).to.eq(expected)
    })

    it('returns the next lift', () => {
      const expected = 'bench press'
      expect(utils.getNextLift('deadlift')).to.eq(expected)
    })
  })
})