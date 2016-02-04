import React from 'react'

import { formatNumber } from '../utils/format'

const stylesheet = require('../scss/components/HistorySummary')

export default class HistorySummary extends React.Component {
  render() {
    const { month, totalLb, totalWorkouts } = this.props.month
    const user = this.props.user

    return (
      <div className="history-summary-component">
        <ul>
          <li>
            <div className="history-summary-item">
              <span className="history-summary-value">
                {formatNumber(totalLb)} lb <i className="material-icons">fitness_center</i>
              </span>
              <br />
              <span className="history-summary-title">Total Weight Lifted</span>
            </div>
          </li>
          <li>
            <div className="history-summary-item">
              <span className="history-summary-value">
                {formatNumber(totalWorkouts)} <i className="material-icons">favorite_border</i>
              </span>
              <br />
              <span className="history-summary-title">Total Workouts</span>
            </div>
          </li>
          <li>
            <div className="history-summary-item">
              <span className="history-summary-value">
                {formatNumber(totalWorkouts) / 4} <i className="material-icons">update</i>
              </span>
              <br />
              <span className="history-summary-title">Average Workouts Per Week</span>
            </div>
          </li>
          <li>
            <div className="history-summary-item">
              <span className="history-summary-value">
                {user.info.weight} lb  <i className="material-icons">directions_run</i>
              </span>
              <br />
              <span className="history-summary-title">Weight</span>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}