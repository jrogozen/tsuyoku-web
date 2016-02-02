import React from 'react'

export default class HistorySummary extends React.Component {
  render() {
    console.log('history summary~~')
    console.log(this.props)
    const { month, totalLb, totalWorkouts } = this.props.month
    const user = this.props.user

    return (
      <div className="history-summary-component">
        <ul>
          <li>
            <div className="history-summary-item">
              {totalLb} lb
              <br />
              <span className="history-summary-title">Total Weight Lifted</span>
            </div>
          </li>
          <li>
            <div className="history-summary-item">
              {totalWorkouts}
              <br />
              <span className="history-summary-title">Total Workouts</span>
            </div>
          </li>
          <li>
            <div className="history-summary-item">
              {user.info.weight} lb
              <br />
              <span className="history-summary-title">Weight</span>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}