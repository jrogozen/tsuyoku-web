import React from 'react'
import { Link } from 'react-router'
import { routeActions } from 'react-router-redux'
import classnames from 'classnames'

import * as userActions from '../actions/user'

const stylesheet = require('../scss/components/Navigation')

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)

    // this.handleLogoutClick = (e) => {
    //   const dispatch = this.props.dispatch

    //   dispatch(userActions.requestLogout())
    //   dispatch(routeActions.push('/'))
    // }
  }

  render() {
    const { dispatch, user } = this.props

    return (
      <nav className="navigation-component">
        <ul>
          <li>
            <Link to="/workouts/create">New Workout</Link>
          </li>
          <li>
            <Link to="/workouts">History</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    )
  }
}