/*
  Display all workouts, create a new workout, view a single workout
*/
import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'

import * as workoutActions from '../actions/workout'

import WorkoutNavigation from '../components/WorkoutNavigation'
import Loader from '../components/Loader'

export default class Workout extends React.Component {
  render() {
    const { app, user, guide, dispatch, workouts } = this.props

    return (
      <div className="workout-container">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {React.cloneElement(this.props.children, {
                user: user,
                guide: guide,
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