import _ from 'lodash'
import React from 'react'
import { routeActions } from 'redux-simple-router'

import * as userActions from '../actions/user'

export default class Dashboard extends React.Component {
  render() {
    const { user, dispatch } = this.props
    const maxes = user.info.maxes

    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h1>Dashboard</h1>
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
          </div>
        </div>
      </div>
    )
  }
}