import React from 'react'

import WorkoutForm from '../components/WorkoutForm'

import * as workoutActions from '../actions/workout'
import * as guideActions from '../actions/guide'
import * as userActions from '../actions/user'
import { shouldIncrementWeek, getNextLift } from '../utils/fiveThreeOne'

export default class WorkoutCreate extends React.Component {
  constructor(props) {
    super(props)

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

  componentWillMount() {
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

  render() {
    const { user, workouts, guide, dispatch } = this.props

    return (
      <div className="workout-create-container">
        <h2>Guide</h2>
        {guide.isWaiting ?
          <span>Generating...</span> : null
        }
        {_.size(guide.lifts) > 0 ?
          <WorkoutForm
            guide={guide}
            user={user}
            saveWorkout={this.handleWorkoutSaveClick}
          /> : null
        }
      </div>
    )
  }
}