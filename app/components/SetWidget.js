import React from 'react'
import classnames from 'classnames'
import shouldPureComponentUpdate from 'react-pure-render/function';
import * as guideActions from '../actions/guide'

const stylesheet = require('../scss/components/SetWidget.scss')

export default class SetWidget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      enabled: false,
      initialSet: this.props.lift.set,
      set: this.props.lift.set
    }

    this.handleClick = (e) => {
      const { updateGuideState, liftKey, lift } = this.props
      const { type, liftName } = lift
      const set = this.state.set;

      let updatedLifts = {}
      let newState = {}
      let removeLift = false

      if (this.state.enabled) {
        if (this.state.set.length > 0) {
          newState.set = set.slice(0, this.state.set.length - 1);
        } else {
          removeLift = true
          newState.set = this.state.initialSet
        }
      } else {
        newState.enabled = true
      }

      this.setState(newState, () => {
        if (type === 'sets') {
          updatedLifts[liftName] = {}
          if (removeLift) {
            updatedLifts[liftName][liftKey] = []
          } else {
            updatedLifts[liftName][liftKey] = this.state.set
          }

          updateGuideState({
            lifts: updatedLifts
          })
        } else {
          updateGuideState()
        }
      })
    }
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  getCss() {
    return classnames({
      'set-widget-component': true,
      'workout': this.props.lift.type === 'sets',
      'warmup': this.props.lift.type === 'warmup',
      'five-col': (this.props.lift.type !== 'sets' && this.props.lift.type !== 'warmup'), // not sure why equality doesn't work
      'active': this.state.enabled
    })
  }

  render() {
    const weight = this.state.initialSet[0]
    const reps = this.state.set.length

    return (
      <li key={this.props.lift.title + '-' + this.props.liftKey} className={this.getCss()}>
        <div className="outer-circle circle">
          <div onClick={this.handleClick} className="inner-circle circle ">
            <span className="reps">
              {reps} reps @
            </span>
            <br/>
            <span className="weight">
              {weight > 0 ? <span>{weight} lb</span> : <span>-- lb</span>}
            </span>
          </div>
        </div>
      </li>
    )
  }
}