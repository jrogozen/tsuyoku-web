import React from 'react'
import { Link } from 'react-router'
import { routeActions } from 'redux-simple-router'
import classnames from 'classnames'

import * as userActions from '../actions/user'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)

    this.handleLogoutClick = (e) => {
      const dispatch = this.props.dispatch

      dispatch(userActions.requestLogout())
      dispatch(routeActions.push('/'))
    }
  }

  getCss() {
    return {
      'face': {
        'material-icons': true,
        'dark': this.props.user.isAuthenticated
      }
    }
  }

  render() {
    const { dispatch, user } = this.props

    return (
      <nav className="navigation-component">
        <ul className="right">
          <li>
            <Link to='/dashboard'>
              <i className={classnames(this.getCss().face)}>face</i>
            </Link>
            {user.isAuthenticated ?
              <ul>
                <li>
                  <span onClick={this.handleLogoutClick}>Logout</span>
                </li>
              </ul> : null
            }
          </li>
        </ul>
      </nav>
    )
  }
}