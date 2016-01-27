import React from 'react'

import WorkoutForm from '../components/WorkoutForm'

import * as workoutActions from '../actions/workout'
import * as guideActions from '../actions/guide'
import * as userActions from '../actions/user'
import { shouldIncrementWeek, getNextLift } from '../utils/fiveThreeOne'

var stylesheet = require('../scss/containers/WorkoutCreate.scss')

export default class WorkoutCreate extends React.Component {
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
        {guide.isWaiting ?
          <span>Generating...</span> : null
        }
        {_.size(guide.lifts) > 0 ?
          <WorkoutForm
            dispatch={dispatch}
            guide={guide}
            user={user}
          /> : null
        }
      </div>
    )
  }
}