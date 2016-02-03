import React from 'react'
import _ from 'lodash'

import HistorySummary from './HistorySummary'
import HistoryWidget from './HistoryWidget'

import { capitalize } from '../utils/format'

const stylesheet = require('../scss/components/HistoryList')

export default class HistoryList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      historyDisplay: 'list' // summary or list
    }
  }
  render() {
    // workouts are from reducer, workoutHistory are from WorkoutsView
    const { user, workouts, workoutHistory } = this.props
    return (
      <div className="history-list-component">
        {_.map(workoutHistory, (month) => {
          return (
            <div className="history-list-month">
              <div className="month-title">
                {`${capitalize(month.month)}, ${new Date(month.workouts[0].created_at).getFullYear()}`}
              </div>
              <ul>
                {this.state.historyDisplay === 'summary' ?
                  <li><HistorySummary user={user} month={month} /></li> : null
                }
                {this.state.historyDisplay === 'list' ?
                  month.workouts.map((workout, i) => {
                    return <HistoryWidget odd={i % 2 === 0} workout={workout} />
                  }) : null
                }
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
}

HistoryList.defaultProps = {
  workoutHistory: {}
}