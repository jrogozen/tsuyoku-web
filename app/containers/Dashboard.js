import _ from 'lodash'
import React from 'react'
import { Link } from 'react-router'
import { routeActions } from 'react-router-redux'

import * as userActions from '../actions/user'

export default class Dashboard extends React.Component {
  render() {
    const { user, dispatch } = this.props
    const maxes = user.info.maxes

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>Dashboard</h1>
            <h2>User Widgets</h2>
            <ul>
              <li><Link to="/workouts">Workouts</Link></li>
            </ul>
            <h2>User Info</h2>
            <ul>
              <li>email: {user.info.email}</li>
              <li>age: {user.info.age}</li>
              <li>weight: {user.info.weight}</li>
              <li>admin: {user.info.admin ? 'true': 'false'}</li>
              <li>paid: {user.info.paid ? 'true' : 'false'}</li>
            </ul>
            <h2>User Maxes</h2>
            <ul>
              {_.map(maxes, (weight, type) => <li key={type}>{type}: {weight}</li>)}
            </ul>
            <p onClick={() => {
              dispatch(userActions.requestLogout())
              dispatch(routeActions.push('/'))
            }}>[ Logout ]</p>
          </div>
        </div>
      </div>
    )
  }
}