import React from 'react'

import * as workoutActions from '../actions/workout'

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

export default class WorkoutCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      baseWorkout: _.sortBy(this.props.workouts.data, (workout) => -workout.created_at)[0]
    }

    this.handleClick = (e) => {
      const { user, dispatch } = this.props
      const baseWorkout = this.state.baseWorkout
      const lift = baseWorkout.lifts[0].name
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

      options.maxes[lift] = user.info.maxes[lift]

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