import React from 'react'
import _ from 'lodash'

import * as workoutActions from '../actions/workout'

import WorkoutWidget from '../components/WorkoutWidget'

export default class WorkoutsView extends React.Component {
  componentWillMount() {
    const { dispatch, user, guide, workouts } = this.props
    const options = {
      user,
      routineName: '5/3/1'
    }

    dispatch(workoutActions.fetchWorkouts(options))
  }

  render() {
    const { dispatch, user, workouts } = this.props
    const workoutData = _.sortBy(workouts.data, (workout) => -workout.created_at)

    return (
      <div className="workouts-view-component">
        <h2>Workouts View</h2>
        {workouts.isWaiting ? 'Loading...' : null}
        {_.map(workoutData, (workout) => {
          return <WorkoutWidget workout={workout} />        
        })}
      </div>
    )
  }
}