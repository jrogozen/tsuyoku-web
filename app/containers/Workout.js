/*
  Display all workouts, create a new workout, view a single workout
*/

import React from 'react'
import { connect } from 'react-redux'

import * as workoutActions from '../actions/workout'

import WorkoutNavigation from '../components/WorkoutNavigation'

export default class Workout extends React.Component {
  componentWillMount() {
    const { dispatch, user, workouts } = this.props

    if (user.isAuthenticated) {
      const options = {
        user,
        routineName: '5/3/1'
      }

      dispatch(workoutActions.fetchWorkouts(options))
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('hi')
  }

  render() {
    const { user, dispatch, workouts } = this.props

    return (
      <div className="workout-container">
        <h1>Workouts</h1>
        <WorkoutNavigation />

        {React.cloneElement(this.props.children, {
          user: user,
          workouts: workouts,
          dispatch: dispatch
        })}
      </div>
    )
  }
}