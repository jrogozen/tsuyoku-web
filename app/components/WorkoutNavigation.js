/* NOT CURRENTLY USED */

import React from 'react'
import { Link } from 'react-router'
import { routeActions } from 'redux-simple-router'
import classnames from 'classnames'

import * as userActions from '../actions/user'

export default class WorkoutNavigation extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="workout-navigation-component">
        <ul className="right">
          <li>
            <Link to="/workouts/create">
              New Workout
            </Link>
          </li>
          <li>
            <Link to="/workouts">
              Workout History
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}