import React from 'react'
import _ from 'lodash'

export default class WorkoutsView extends React.Component {
  render() {
    const { dispatch, user, workouts } = this.props
    const workoutData = workouts.data
    return (
      <div className="workouts-view-component">
        <h2>Workouts View</h2>
        {workouts.isWaiting ? 'Loading...' : null}
        {_.map(workoutData, (workout, id) => {
          const date = new Date(workout.created_at)
          const lifts = workout.lifts
          let weightCount = 0

          return (
            <div>
              <ul key={id}>
                <li>Date: {date.toDateString()}</li>
                {lifts.map((lift, i) => {
                  return (
                    <li key={`${lift.name}-${i}`}>
                      <div>
                      <h3>{lift.name}</h3>
                        {lift.weight.map((val, i) => {
                          weightCount += val
                          return (
                            <div key={`${lift.name}-${i}`}>
                              Rep: {i + 1}, Weight: {val}
                            </div>
                          )
                        })}
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div>
                Total lb lifted: {weightCount}
              </div>
              <hr/>
            </div>
          )
        })}
      </div>
    )
  }
}