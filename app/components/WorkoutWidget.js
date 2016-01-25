import React from 'react'

export default class WorkoutWidget extends React.Component {
  render() {
    const { workout } = this.props
    const date = new Date(workout.created_at)
    const lifts = workout.lifts
    let weightCount = 0

    return (
      <div className="workout-widget-component widget">
        <ul>
          <li>Date: {date.toDateString()}</li>
          {lifts.map((lift, i) => {
            return (
              <li key={i}>
                <div>
                  <h3>{lift.name} - set # {i + 1}</h3>
                    {lift.weight.map((val, i) => {
                      weightCount += val

                      return (
                        <div key={i}>
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
        <hr />
      </div>
    )
  }
}