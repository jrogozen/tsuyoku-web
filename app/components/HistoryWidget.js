import React from 'react'
import classnames from 'classnames'

import { capitalize, dateToDay } from '../utils/format'

const stylesheet = require('../scss/components/HistoryWidget')

export default class HistoryWidget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      summary: this.parseWorkout(this.props.workout)
    }
  }

  parseWorkout(workout) {
    const lifts = workout.lifts || []
    const summary = {}

    lifts.forEach((lift) => {
      if (!summary[lift.name]) {
        summary[lift.name] = { max: _.max(lift.weight), lifts: [] }
      } else if (_.max(lift.weight) > summary[lift.name].max ) {
        summary[lift.name].max = _.max(lift.weight)
      }

      summary[lift.name].lifts.push(lift.weight)
    })

    return summary
  }

  getCss() {
    return classnames({
      'history-widget-component': true,
      'widget': true,
      'odd': this.props.odd
    })
  }

  render() {
    const { workout, odd } = this.props
    const baseDate = new Date(workout.created_at)

    return (
      <li key={workout.created_at} className={this.getCss()}>
        <div className="history-widget-left">
          <div className="date-title">{baseDate.getDate()}</div>
          <div className="day-title">{dateToDay(baseDate)}</div>
        </div>
        <div className="history-widget-right">
          {_.map(this.state.summary, (liftSummary, liftName) => {
            return (
              <div>
                <div className="lift-title">{capitalize(liftName)} x</div>
                <div className="lift-max">{liftSummary.max}lb</div>
                <div className="lift-sets">
                  {liftSummary.lifts.map((set) => {
                    return <span className="lift-set">{`${set.length} x ${set[0]} lb`}</span>
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </li>
    )
  }
}