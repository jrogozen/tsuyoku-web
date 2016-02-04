import React from 'react'
import classnames from 'classnames'
import { routeActions as route } from 'react-router-redux'
import { Link } from 'react-router'

import Loader from './Loader'

import * as userActions from '../actions/user'

const stylesheet = require('../scss/components/LoginForm')

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false,
      focusEmail: false,
      focusPassword: false
    }

    this.handleFocusState = (target) => {
      let state = Object.assign({}, this.state)
      state[target] = !state[target]

      this.setState(state)
    }

    this.handleSubmit = (e) => {
      e.preventDefault()

      this.setState( { error: false })

      const dispatch = this.props.dispatch
      const email = this.email.value
      const password = this.password.value

      if (!email || !password) {
        return
      }

      dispatch(userActions.fetchLogin({ email, password }))
        .then(() => {
          if (!this.props.isAuthenticated) {
            this.setState({ error: true })
          }
        })
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
          <input onFocus={this.handleFocusState.bind(null, 'focusEmail')} onBlur={this.handleFocusState.bind(null, 'focusEmail')} ref={(ref) => this.email = ref} type="email" />
          <label className={this.state.focusEmail ? 'filled' : ''}>email</label>
        </div>
        <div className="input-group">
          <input onFocus={this.handleFocusState.bind(null, 'focusPassword')} onBlur={this.handleFocusState.bind(null, 'focusPassword')} ref={(ref) => this.password = ref} type="password" />
          <label className={this.state.focusPassword ? 'filled' : ''}>password</label>
        </div>
        <div className="button-group">
        <button className="alert" onClick={this.handleSubmit}>
          Login
        </button>
        {this.state.error ?
          <div className="error-message">
            Error logging in, please try again.
          </div> : null
        }
        {user.isWaiting ?
          <Loader /> : null
        }
        </div>
      </form>
    )
  }
}

