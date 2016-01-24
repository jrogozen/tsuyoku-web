import React from 'react'

import * as workoutActions from '../actions/workout'
import * as guideActions from '../actions/guide'
import * as userActions from '../actions/user'
import { shouldIncrementWeek, getNextLift } from '../utils/fiveThreeOne'

export default class WorkoutCreate extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = (e) => {
      const { user, dispatch } = this.props
      const baseWorkout = this.props.baseWorkout
      const lift = getNextLift(baseWorkout.lifts[0].name)
      const options = {
        user: user,
        routine: {
          name: baseWorkout.routine.name,
          week: lift === 'squat' ?
            baseWorkout.routine.week + 1 : baseWorkout.routine.week,
          options: {
            accessory: 'boring but big'
          }
        },
        maxes: {}
      }

      options.maxes[lift] = user.info.maxes[lift] || 135

      dispatch(guideActions.fetchGuide(options))
    }

    this.handleWorkoutSaveClick = (e) => {
      const { user, dispatch, guide, workouts } = this.props
      const liftName = _.keys(guide.lifts)[0]
      const options = {
        user,
        workout: {
          routine: guide.routine,
          lifts: 
            guide.lifts[liftName].sets.map((set) => {
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
    const { user, workouts, guide, dispatch } = this.props

    return (
      <div className="workout-create-container">
        <button disabled={guide.isWaiting} onClick={this.handleClick}>
          Generate Guide
        </button>
        <button disabled={guide.isWaiting} onClick={this.handleWorkoutSaveClick}>
          Save Workout
        </button>

        <h2>Guide</h2>
        {guide.isWaiting ?
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