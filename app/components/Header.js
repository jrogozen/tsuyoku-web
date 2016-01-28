import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import classnames from 'classnames'

import Navigation from './Navigation'

const stylesheet = require('../scss/components/Header')

class Header extends React.Component {
  getCss() {
    return {
      'face': {
        'face': true,
        'material-icons': true,
        'dark': this.props.user.isAuthenticated,
      }
    }
  }

  render() {
    const { user, dispatch } = this.props

    return (
      <header id="header">
        <div className="logo">
          <Link className="header-title" to="/">
            <h1>TSUYOKU</h1>
          </Link>
        </div>
        <div className="logo-image">
            <Link to='/dashboard'>
              <i className={classnames(this.getCss().face)}>face</i>
            </Link>
        </div>
        <div className="navigation-wrapper">
          <Navigation user={user} dispatch={dispatch} />
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  user: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Header)