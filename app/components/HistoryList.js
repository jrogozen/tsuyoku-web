import React from 'react'
import _ from 'lodash'

// import WorkoutWidget from '../'
import HistorySummary from './HistorySummary'

export default class HistoryList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      historyDisplay: 'summary' // summary or list
    }
  }
  render() {
    // workouts are from reducer, workoutHistory are from WorkoutsView
    const { user, workouts, workoutHistory } = this.props

    // conditionally render list or monthly stat
    return (
      <div className="history-list-component">
        {_.map(workoutHistory, (month) => {
          <ul>
            {this.state.historyDisplay === 'summary' ?
              <HistorySummary month={month} /> : null
            }
          </ul>
        })}
      </div>
    )
  }
}

HistoryList.defaultProps = {
  workoutHistory: {}
}