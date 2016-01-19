import React from 'react'
import { routeActions } from 'redux-simple-router'

import * as userActions from '../actions/user'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.handleLogoutClick = (e) => {
      const dispatch = this.props.dispatch

      dispatch(userActions.requestLogout())
      dispatch(routeActions.push('/'))
    }
  }
  render() {
    const { user, dispatch } = this.props

    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h1>Dashboard</h1>
            {user.isAuthenticated ? <div>Welcome user! <a onClick={this.handleLogoutClick}>Logout</a></div> : 'Please login'}
          </div>
        </div>
      </div>
    )
  }
}