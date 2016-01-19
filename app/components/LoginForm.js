import React from 'react'
import { routeActions as route } from 'redux-simple-router'
import { Link } from 'react-router'

import * as userActions from '../actions/user'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = (e) => {
      e.preventDefault()

      const dispatch = this.props.dispatch
      const email = this.email.value
      const password = this.password.value

      if (!email || !password) {
        return
      }

      dispatch(userActions.fetchLogin({ email, password }))
    }
  }

  componentWillMount() {
    const dispatch = this.props.dispatch

    if (this.props.user.isAuthenticated) {
      dispatch(route.push('/dashboard'))
    }
  }

  componentWillReceiveProps(nextProps) {
    const dispatch = this.props.dispatch

    if (nextProps.user.isAuthenticated) {
      dispatch(route.push('/dashboard'))
    }
  }

  render() {
    const { user, dispatch } = this.props

    return (
      <form className="login-form-component">
        <div className="input-group">
          <i className="material-icons prefix">account_circle</i>
          <input ref={(ref) => this.email = ref} type="email" />
        </div>
        <div className="input-group">
          <i className="material-icons prefix">lock</i>
          <input ref={(ref) => this.password = ref} type="password" />
        </div>
        <div className="input-group">
          <button onClick={this.handleSubmit}>
            {user.isWaiting ? 'Logging in...' : 'Login'}
            <i className="material-icons">send</i>
          </button>
        </div>
      </form>
    )
  }
}

