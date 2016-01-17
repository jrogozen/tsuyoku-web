import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

export class Navigation extends React.Component {
  render() {
    const { dispatch, user } = this.props

    return (
      <div className="navigation-component">
        <Link to="/">
          Home
        </Link>
        <Link to="/login">
          Login
        </Link>
      </div>
    )
  }
}

Navigation.propTypes = {
  user: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Navigation)
