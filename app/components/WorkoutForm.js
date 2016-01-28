/*
  Takes a guide and converts it to a Workout for saving

  options:

  1. change guide state
  ~~2. keep interal state for guide and then save it as a new guide~~
  3. have a new reducer state for pending-guide
*/

import _ from 'lodash'
import React from 'react'

import { getDate } from '../utils/time'
import * as workoutActions from '../actions/workout'
import { routeActions } from 'redux-simple-router'

import WorkoutTimer from './WorkoutTimer'
import LiftWidget from './LiftWidget'

const stylesheet = require('../scss/components/WorkoutForm.scss')

export default class WorkoutForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isPending: true,
      routine: Object.assign({}, this.props.guide.routine),
      lifts: {}
    }

    this.updateGuideState = (data) => {
      const updatedState = Object.assign({}, this.state)
      const updatedLifts = data.lifts

      if (updatedLifts) {
        _.forEach(updatedLifts, (lift, liftName) => {
          if (!updatedState.lifts[liftName]) {
            updatedState.lifts[liftName] = {}
          }
          updatedState.lifts[liftName] = _.assign(updatedState.lifts[liftName], updatedLifts[liftName]);
        })
      }

      this.setState(updatedState)
    }

    this.handleClick = (e) => {
      const { user, dispatch } = this.props

      // specific to FTO
      const liftName = _.keys(this.state.lifts)[0]
      let lifts = []

      // todo: extract to util
      _.forEach(this.state.lifts[liftName], (set) => {
        lifts.push({
          name: liftName,
          weight: set
        })
      })

      const options = {
        user,
        workout: {
          routine: this.state.routine,
          lifts
        }
      }

      dispatch(workoutActions.saveWorkout(options))

      // todo: update user maxes if week 3!

      // if (week % 3 === 0) {
        // dispatch(userActions)
      // }
    }
  }

  render() {
    const  { guide, user, dispatch } = this.props
    const currentDate = new Date()

    return (  
      <div className="workout-form-component">
        <WorkoutTimer display={'info'} routine={guide.routine} workout={guide.lifts} />

        <div className="workout-title-bar">
          <div className="left">
            {getDate()}
          </div>
          <div className="right">
            <span className="user-weight" onClick={dispatch.bind(null, routeActions.push('/dashboard'))}>{user.info.weight ? user.info.weight : '--'} lb</span>
          </div>
        </div>

        {/* choose which form component to display */}

        {_.map(guide.lifts, (lift, liftName) => {
          const hasAccessoryLifts = _.includes(_.keys(lift), 'accessoryLifts')

          return (
            <div key={liftName}>
              <div className="lift-widget-title">Warmup</div>
              <LiftWidget
                lift={{
                  type: 'warmup',
                  sets: lift.warmup,
                  liftName: liftName
                }}
                updateGuideState={this.updateGuideState}
              />
              <div className="lift-widget-title">Workout</div>
              <LiftWidget
                lift={{
                  type: 'sets',
                  sets: lift.sets,
                  liftName: liftName
                }}
                updateGuideState={this.updateGuideState}
              />
              {hasAccessoryLifts ?
                <div>
                  <div className="lift-widget-title">Accessory</div>
                  {_.map(lift.accessoryLifts, (accessoryLift, accessoryLiftName) => {
                    return (
                      <LiftWidget
                        lift={{
                          type: 'accessory',
                          title: accessoryLiftName,
                          sets: accessoryLift.sets,
                          liftName: liftName
                        }}
                        updateGuideState={this.updateGuideState}
                      />
                    )
                  })}
                </div> : null
              }
            </div>
          )
        })}
        
        <div className="button-group">
          <button className="alert" onClick={this.handleClick}>Finish Workout</button>
        </div>
      </div>
    )
  }
}