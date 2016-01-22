import React from 'react'

import * as workoutActions from '../actions/workout'
import * as userActions from '../actions/user'

const createWorkout = function createWorkout() {
  return {
    // routine: createRoutine(),
    // lifts: createLifts()
  }
}

const shouldIncWeek = function shouldIncWeek(baseLift) {
  const lastLift = 'squat'

  if (baseLift === lastLift) {
    return true
  }
  return false
}

const getBaseWorkout = function getBaseWorkout(workouts = {}) {
  const data = workouts.data

  if (_.isEmpty(data)) {
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

  return _.sortBy(data, (workout) => -workout.created_at)[0]
}

const getNextLift = function getNextLift(prevLift) {
  if (!prevLift) {
    return 'press'
  }

  const liftDict = ['press', 'deadlift', 'bench press', 'squat']
  const index = liftDict.indexOf(prevLift)

  if (index === liftDict.length -1) {
    return liftDict[0]
  } else {
    return liftDict[index + 1]
  }
}

export default class WorkoutCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      baseWorkout: getBaseWorkout(this.props.workouts)
    }

    this.handleClick = (e) => {
      const { user, dispatch } = this.props
      const baseWorkout = this.state.baseWorkout
      const lift = getNextLift(baseWorkout.lifts[0].name)
      const options = {
        user: user,
        routine: {
          name: baseWorkout.routine.name,
          week: shouldIncWeek(lift) ?
            baseWorkout.routine.week + 1 : baseWorkout.routine.week,
          options: {
            accessory: 'boring but big'
          }
        },
        maxes: {}
      }

      options.maxes[lift] = user.info.maxes[lift] || 135

      dispatch(workoutActions.fetchGuide(options))
    }

    this.handleWorkoutSaveClick = (e) => {
      const { user, dispatch, workouts } = this.props
      const liftName = _.keys(workouts.currentGuide.lifts)[0]
      const options = {
        user,
        workout: {
          routine: workouts.currentGuide.routine,
          lifts: 
            workouts.currentGuide.lifts[liftName].sets.map((set) => {
              return {
                name: liftName,
                weight: set
              }
            })
          
        }
      }

      dispatch(workoutActions.saveWorkout(options))

      // todo: update user maxes if week 3!

      // if (week % 3 === 0) {
        // dispatch(userActions)
      // }
    }
  }

  render() {
    const { user, workouts, dispatch } = this.props
    const guide = workouts.currentGuide

    return (
      <div className="workout-create-container">
        <button disabled={workouts.isWaiting} onClick={this.handleClick}>
          Generate Guide
        </button>
        <button disabled={workouts.isWaiting || !workouts.currentGuide} onClick={this.handleWorkoutSaveClick}>
          Save Workout
        </button>

        <h2>Guide</h2>
        {workouts.isWaiting || !workouts.currentGuide ?
          <span>Generating...</span> :
          <div>
            <h3>{guide.routine.name} - {guide.routine.options.accessory}</h3>
            <h4>Week {guide.routine.week}</h4>
            {_.map(guide.lifts, (details, lift) => {
              return (
                <div>
                  <h5>{lift}</h5>

                  <div>Warmup</div>
                  {details.warmup.map((rep, set) => {
                    return (
                      <ul>
                        <li>Set: {set + 1}</li>
                        <li>Reps: {rep.length}</li>
                        <li>Weight: {rep[0]}</li>
                      </ul>
                    )
                  })}

                  <div>Main Lift</div>
                  {details.sets.map((rep, set) => {
                    return (
                      <ul>
                        <li>Set: {set + 1}</li>
                        <li>Reps: {rep.length}</li>
                        <li>Weight: {rep[0]}</li>
                      </ul>
                    )
                  })}

                  <div>Accessory Lifts</div>
                  {_.map(details.accessoryLifts, (details, lift) => {
                    return (
                      <div>
                        <h5>{lift}</h5>

                        {details.sets.map((rep, set) => {
                          return (
                            <ul>
                              <li>Set: {set + 1}</li>
                              <li>Reps: {rep.length}</li>
                              {rep[0] ? <li>Weight: {rep[0]}</li> : null}
                            </ul>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        }
      </div>
    )
  }
}