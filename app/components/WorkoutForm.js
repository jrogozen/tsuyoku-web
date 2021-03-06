import _ from 'lodash'
import React from 'react'

import { getDate } from '../utils/time'
import * as workoutActions from '../actions/workout'
import * as appActions from '../actions/app'
import { routeActions } from 'react-router-redux'

import WorkoutTimer from './WorkoutTimer'
import LiftWidget from './LiftWidget'

const stylesheet = require('../scss/components/WorkoutForm.scss')

export default class WorkoutForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isPending: true,
      routine: Object.assign({}, this.props.guide.routine),
      lifts: this.getDefaultLifts(),
      timerDisplay: 'info',
      timer: 0
    }

    this.updateGuideState = (data = {}) => {
      let updatedState = Object.assign({}, this.state)
      const updatedLifts = data.lifts

      if (updatedState.lifts.isDefault && updatedLifts) {
        updatedState.lifts = {}
      }

      if (updatedLifts) {
        _.forEach(updatedLifts, (lift, liftName) => {
          if (!updatedState.lifts[liftName]) {
            updatedState.lifts[liftName] = {}
          }
          updatedState.lifts[liftName] = _.assign(updatedState.lifts[liftName], updatedLifts[liftName]);
        })
      }

      updatedState.timerDisplay = 'timer'
      updatedState.timer = 0

      this.startTimer()
      this.setState(updatedState)
    }

    this.clearTimer = () => {
      this.setState({ timerDisplay: 'info' })
      clearInterval(this.interval)
    }

    this.handleClick = (e) => {
      const { user, dispatch } = this.props

      // specific to FTO
      const liftName = _.keys(this.state.lifts)[0]
      let lifts = []

      // todo: extract to util
      _.forEach(this.state.lifts[liftName], (set, setName) => {
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
        .then(() => dispatch(routeActions.push('/workouts')))
        .then(() => {
          if (this.state.routine.week % 4 === 0) {
            dispatch(appActions.setAppBool('successPopup', true))
          }
        })
    }
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  interval: null;

  getDefaultLifts() {
    const defaultGuideLifts = this.props.guide.lifts
    let defaultLifts = {}

    _.forEach(defaultGuideLifts, (lift, name) => {
      defaultLifts[name] = {}

      if (lift.sets.length > 0) {
        lift.sets.forEach((set, key) => {
          set = set.map(() => 0)
          defaultLifts[name][key] = set
        })
      } else {
        defaultLifts[name][0] = [0]
      }
    })

    defaultLifts.isDefault = true;

    return defaultLifts
  }

  startTimer() {
    clearInterval(this.interval)

    this.interval = setInterval(() => {
      this.setState({
        timer: this.state.timer + 1
      })
    }, 1000)
  }

  getWorkoutMax(workout, user) {
    const dict = {
      'press': 'press',
      'deadlift': 'deadlift',
      'squatt': 'squat',
      'bench press': 'bench_press'
    }

    return user.info.maxes[_.keys(workout)[0]]
  }

  render() {
    const  { guide, user, dispatch } = this.props
    const currentDate = new Date()
    const max = this.getWorkoutMax(guide.lifts, user)

    return (  
      <div className="workout-form-component">
        <WorkoutTimer
          clearTimer={this.clearTimer}
          timer={this.state.timer}
          display={this.state.timerDisplay}
          routine={guide.routine}
          workout={guide.lifts}
        />

        <div className="workout-title-bar">
          <div className="left">
            {getDate()}
          </div>
          <div className="right">
            <span className="user-weight" onClick={dispatch.bind(null, routeActions.push('/dashboard'))}>
              based on 1RM of {max} lb
            </span>
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