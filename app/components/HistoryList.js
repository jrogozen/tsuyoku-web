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
    console.log(workoutHistory)
    // conditionally render list or monthly stat
    return (
      <div className="history-list-component">
        <div className="history-list-title">Month, Year</div>
        {_.map(workoutHistory, (month) => {
          return (
            <ul>
              {this.state.historyDisplay === 'summary' ?
                <li><HistorySummary user={user} month={month} /></li> : null
              }
              {this.state.historyDisplay === 'list' ?
                month.workouts.map((workout) => {
                  return <HistoryWidget workout={workout} />
                }) : null
              }
            </ul>
          )
        })}
      </div>
    )
  }
}

HistoryList.defaultProps = {
  workoutHistory: {}
}