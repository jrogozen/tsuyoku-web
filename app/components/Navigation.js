import React from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

export default class Navigation extends React.Component {
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
          </li>
        </ul>
      </nav>
    )
  }
}