import React from 'react'

import WorkoutForm from '../components/WorkoutForm'
import Loader from '../components/Loader'

import * as workoutActions from '../actions/workout'
import * as guideActions from '../actions/guide'
import * as userActions from '../actions/user'
import { getBaseWorkout, shouldIncrementWeek, getNextLift } from '../utils/fiveThreeOne'

var stylesheet = require('../scss/containers/WorkoutCreate.scss')

export default class WorkoutCreate extends React.Component {

  componentWillMount() {
    const { dispatch, user, guide, workouts } = this.props
    const options = {
      user,
      routineName: '5/3/1'
    }

    dispatch(workoutActions.fetchWorkouts(options))
      .then(() => this.fetchGuide())
  }

  fetchGuide() {
    const { user, workouts, dispatch } = this.props
    const baseWorkout = getBaseWorkout(workouts)
    const baseLifts = baseWorkout.lifts[0] || {}
    const lift = getNextLift(baseLifts.name)
    const options = {
      user: user,
      routine: {
        name: baseWorkout.routine.name,
        week: baseLifts.name === 'squat' ?
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
          <Loader /> : null
        }
        {_.size(guide.lifts) > 0 ?
          <WorkoutForm
            dispatch={dispatch}
            guide={guide}
            user={user}
          /> : null}
      </div>
    )
  }
}