import React from 'react'
import _ from 'lodash'

import WorkoutWidget from '../components/WorkoutWidget'

export default class WorkoutsView extends React.Component {
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