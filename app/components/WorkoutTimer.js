import _ from 'lodash'
import React from 'react'

import { capitalize, secondsToTime } from '../utils/format'

const stylesheet = require('../scss/components/WorkoutTimer')

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
    const { workout, routine, display, timer, clearTimer } = this.props

    return (
      <div className="workout-timer-component">
        {display === 'info' ?
          <div className="info">
            {capitalize(this.getWorkoutType(routine, workout))}
          </div> : null
        }
        {display === 'timer' ?
          <div onClick={clearTimer} className="timer">TIMER - {secondsToTime(timer)}</div> : null
        }
      </div>
    )
  }
}