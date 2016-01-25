/*
  Takes a guide and converts it to a Workout for saving
*/

import _ from 'lodash'
import React from 'react'

import WorkoutTimer from './WorkoutTimer'
import { getDate } from '../utils/time'

import LiftWidget from './LiftWidget'

export default class WorkoutForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const  { guide, user, saveWorkout } = this.props
    const currentDate = new Date()

    return (
      <div className="workout-form-component">
        <WorkoutTimer routine={guide.routine} workout={guide.lifts} />

        <div>
          <div className="left">
            {getDate()}
          </div>
          <div className="right">
            {user.info.weight ? user.info.weight : '--'} lb
          </div>
        </div>

        {/* choose which form component to display */}

        {_.map(guide.lifts, (lift, liftName) => {
          return (
            <div>
              <LiftWidget title="Warmup" sets={lift.warmup}/>
              <LiftWidget title="Workout" sets={lift.sets}/>
            </div>
          )
        })}

        <button onClick={this.props.saveWorkout}>
          Finish Workout
        </button>
      </div>
    )
  }
}