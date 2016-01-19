import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Navigation from './Navigation'

class Header extends React.Component {
  render() {
    const { user, dispatch } = this.props

    return (
      <header id="header">
        <ul className="left">
          <Link to="/">tsuyoku</Link>
        </ul>
        <Navigation user={user} dispatch={dispatch} />
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