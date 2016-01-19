import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions as route } from 'redux-simple-router'

export function requireAuthentication(Component) {
  class AuthenticateComponent extends React.Component {
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      const { isAuthenticated, dispatch } = this.props
      if (!isAuthenticated) {
        dispatch(route.push('/login'))
      }
    }

    render() {
      return (
        <Component {...this.props} />
      )
    }
  }

  AuthenticateComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    location: PropTypes.object
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.user.isAuthenticated
    }
  }

  return connect(mapStateToProps)(AuthenticateComponent)
}