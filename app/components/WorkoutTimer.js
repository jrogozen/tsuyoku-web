import _ from 'lodash'
import React from 'react'

export default class WorkoutTimer extends React.Component {
  constructor(props) {
    super(props)
  }

  getWorkoutType(routine, workout) {
    if (routine.name === '5/3/1') {
      return _.keys(workout)[0].toUpperCase()
    } else {
      return routine.name
    }
  }

  render() {
    const { workout, routine } = this.props
    return (
      <div className="workout-timer-component">
        {this.props.display === 'info' ?
          <div>{this.getWorkoutType(routine, workout)}</div> : null
        }
        {this.props.display === 'timer' ?
          <div>TIMER - 00:00</div> : null
        }
      </div>
    )
  }
}