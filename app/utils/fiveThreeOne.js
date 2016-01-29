import _ from 'lodash'

export const getBaseWorkout = function getBaseWorkout(workouts = {}) {
  const data = workouts.data

  if (!data || _.isEmpty(data)) {
    return {
      routine: {
        name: '5/3/1',
        week: 1,
        options: {
          accessory: 'boring but big'
        }
      },
      lifts: [{}]
    }
  }

  return _.omit(_.sortBy(data, (workout) => -workout.created_at)[0], ['created_at', 'updated_at', 'userId'])
}

export const getNextLift = function getNextLift(prevLift) {
  const liftDictionary = ['press', 'deadlift', 'bench press', 'squat']
  const index = liftDictionary.indexOf(prevLift)

  if (!prevLift) {
    return 'press'
  }

  if (index === liftDictionary.length -1) {
    return liftDictionary[0]
  } else {
    return liftDictionary[index + 1]
  }
}