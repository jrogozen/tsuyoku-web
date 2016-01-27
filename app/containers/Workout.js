/*
  Display all workouts, create a new workout, view a single workout
*/

import React from 'react'
import { connect } from 'react-redux'

import * as workoutActions from '../actions/workout'
import { getBaseWorkout } from '../utils/fiveThreeOne'

import WorkoutNavigation from '../components/WorkoutNavigation'

export default class Workout extends React.Component {
  componentWillMount() {
    const { dispatch, user, guide, workouts } = this.props
    const options = {
      user,
      routineName: '5/3/1'
    }

    dispatch(workoutActions.fetchWorkouts(options))
  }

  render() {
    const { user, guide, dispatch, workouts } = this.props

    return (
      <div className="workout-container">
        <h1>Workouts</h1>
        <WorkoutNavigation />

        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              {React.cloneElement(this.props.children, {
                user: user,
                guide: guide,
                baseWorkout: getBaseWorkout(workouts),
                workouts: workouts,
                dispatch: dispatch
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}